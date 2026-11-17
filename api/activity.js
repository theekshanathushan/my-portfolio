// api/activity.js - Vercel Serverless Function
// Secure backend endpoint providing processed GitHub activity and metrics
// Target user: theekshanathushan

import fs from 'fs';
import path from 'path';

/**
 * Calculates contribution levels (0 to 4) based on quartile distribution of positive counts.
 * count = 0 -> level 0
 * count > 0 -> levels 1 through 4 based on quartiles Q1, Q2, Q3
 */
export function calculateLevels(days) {
  if (!Array.isArray(days) || days.length === 0) return [];

  const counts = days.map(d => Number(d.count) || 0);
  const positive = counts.filter(c => c > 0).sort((a, b) => a - b);

  if (positive.length === 0) {
    return days.map(d => ({ date: d.date, count: 0, level: 0 }));
  }

  // Quartile thresholds (25th, 50th, 75th percentiles)
  const q1 = positive[Math.floor(positive.length * 0.25)];
  const q2 = positive[Math.floor(positive.length * 0.50)];
  const q3 = positive[Math.floor(positive.length * 0.75)];

  return days.map(d => {
    const count = Number(d.count) || 0;
    let level = 0;
    if (count > 0) {
      if (q1 < q2 && q2 < q3) {
        if (count <= q1) level = 1;
        else if (count <= q2) level = 2;
        else if (count <= q3) level = 3;
        else level = 4;
      } else {
        // Fallback when quartiles collapse due to low variance in counts
        const max = positive[positive.length - 1];
        if (count <= Math.max(1, Math.round(max * 0.25))) level = 1;
        else if (count <= Math.max(2, Math.round(max * 0.50))) level = 2;
        else if (count <= Math.max(3, Math.round(max * 0.75))) level = 3;
        else level = 4;
      }
    }
    return {
      date: d.date,
      count,
      level
    };
  });
}

/**
 * Calculates current streak and longest streak from chronological day entries.
 * If today has 0 contributions, the streak continues from yesterday.
 */
export function calculateStreaks(days) {
  if (!Array.isArray(days) || days.length === 0) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  // Ensure chronological ascending order by date
  const sorted = [...days].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 1. Longest streak across the entire period
  let longestStreak = 0;
  let running = 0;
  for (const day of sorted) {
    if (day.count > 0) {
      running++;
      if (running > longestStreak) {
        longestStreak = running;
      }
    } else {
      running = 0;
    }
  }

  // 2. Current streak (scanning backwards from the latest day)
  let currentStreak = 0;
  let idx = sorted.length - 1;

  // If the latest day (today) has 0 contributions, the streak is alive if yesterday had contributions
  if (idx >= 0 && sorted[idx].count === 0) {
    idx--;
  }

  while (idx >= 0 && sorted[idx].count > 0) {
    currentStreak++;
    idx--;
  }

  return {
    currentStreak,
    longestStreak
  };
}

/**
 * Processes the last 12 weeks of activity into [{ weekStart, total }].
 */
export function processWeekly(weeks) {
  if (!Array.isArray(weeks) || weeks.length === 0) return [];
  const last12 = weeks.slice(-12);
  return last12.map(week => {
    const days = week.contributionDays || [];
    const weekStart = days[0]?.date || '';
    const total = days.reduce((sum, d) => sum + (Number(d.contributionCount) || 0), 0);
    return {
      weekStart,
      total
    };
  });
}

/**
 * Counts repositories pushed within the last 90 days.
 */
export function calculateActiveRepos(repoNodes, referenceDate = new Date()) {
  if (!Array.isArray(repoNodes) || repoNodes.length === 0) return 0;
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;
  const cutoff = new Date(referenceDate.getTime() - ninetyDaysMs);
  return repoNodes.filter(r => r && r.pushedAt && new Date(r.pushedAt) >= cutoff).length;
}

/**
 * Computes top 6 languages by repository count and calculates rounded percentage.
 */
export function processLanguages(repoNodes) {
  if (!Array.isArray(repoNodes) || repoNodes.length === 0) return [];

  const counts = {};
  const colors = {};
  let totalWithLang = 0;

  for (const repo of repoNodes) {
    const lang = repo?.primaryLanguage;
    if (lang && lang.name) {
      counts[lang.name] = (counts[lang.name] || 0) + 1;
      if (!colors[lang.name] && lang.color) {
        colors[lang.name] = lang.color;
      }
      totalWithLang++;
    }
  }

  if (totalWithLang === 0) return [];

  const sortedNames = Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, 6);

  return sortedNames.map(name => {
    const count = counts[name];
    const percent = Math.round((count / totalWithLang) * 1000) / 10;
    return {
      name,
      color: colors[name] || '#8b949e',
      percent
    };
  });
}

/**
 * Transforms raw GitHub GraphQL data into the target JSON structure.
 */
export function processGitHubData(graphQLData) {
  const user = graphQLData?.data?.user;
  if (!user) {
    throw new Error('Invalid GraphQL payload: user not found');
  }

  const calendar = user.contributionsCollection?.contributionCalendar;
  const totalContributions = Number(calendar?.totalContributions) || 0;
  const weeks = calendar?.weeks || [];

  // Flatten days
  const rawDays = [];
  weeks.forEach(week => {
    (week.contributionDays || []).forEach(d => {
      rawDays.push({
        date: d.date,
        count: Number(d.contributionCount) || 0
      });
    });
  });

  const days = calculateLevels(rawDays);
  const { currentStreak, longestStreak } = calculateStreaks(days);
  const weekly = processWeekly(weeks);

  const repos = user.repositories?.nodes || [];
  const activeRepos = calculateActiveRepos(repos);
  const languages = processLanguages(repos);

  return {
    totalContributions,
    days,
    currentStreak,
    longestStreak,
    weekly,
    activeRepos,
    languages,
    updatedAt: new Date().toISOString()
  };
}

/**
 * Loads safe fallback data from src/data/activity-fallback.json
 */
export function getFallbackData() {
  try {
    const fallbackPath = path.resolve(process.cwd(), 'src/data/activity-fallback.json');
    if (fs.existsSync(fallbackPath)) {
      const content = fs.readFileSync(fallbackPath, 'utf8');
      const parsed = JSON.parse(content);
      return {
        ...parsed,
        updatedAt: new Date().toISOString()
      };
    }
  } catch {
    // ignore filesystem errors
  }

  return {
    isFallback: true,
    totalContributions: 0,
    days: [],
    currentStreak: 0,
    longestStreak: 0,
    weekly: [],
    activeRepos: 0,
    languages: [],
    updatedAt: new Date().toISOString()
  };
}

/**
 * Universal JSON response sender compatible with both Vercel and Node HTTP ServerResponse
 */
function sendJson(res, statusCode, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

/**
 * Main Vercel Serverless Function Handler
 */
export default async function handler(req, res) {
  // Method check
  if (req.method && req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', ['GET', 'HEAD']);
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  // Set Cache-Control header
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'theekshanathushan';

  if (!token) {
    console.warn('[activity-api] GITHUB_TOKEN not configured. Returning fallback activity data.');
    return sendJson(res, 200, getFallbackData());
  }

  try {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - 365);

    const query = `
      query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
          contributionsCollection(from: $from, to: $to) {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
          repositories(
            first: 100
            isFork: false
            orderBy: { field: PUSHED_AT, direction: DESC }
            privacy: PUBLIC
          ) {
            nodes {
              name
              pushedAt
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    `;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'portfolio-activity-tracker'
      },
      body: JSON.stringify({
        query,
        variables: {
          login: username,
          from: from.toISOString(),
          to: to.toISOString()
        }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[activity-api] GitHub API HTTP error: ${response.status}`);
      return sendJson(res, 200, getFallbackData());
    }

    const json = await response.json();

    if (json.errors && json.errors.length > 0) {
      console.error('[activity-api] GitHub GraphQL returned errors');
      return sendJson(res, 200, getFallbackData());
    }

    const payload = processGitHubData(json);
    return sendJson(res, 200, payload);
  } catch (err) {
    console.error('[activity-api] Error fetching or processing GitHub activity:', err.name || 'Error');
    return sendJson(res, 200, getFallbackData());
  }
}
