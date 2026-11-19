// scripts/fetch-activity.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { processGitHubData } from '../api/activity.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const envPath = path.resolve(__dirname, '../.env');
  let token = process.env.GITHUB_TOKEN;
  if (!token && fs.existsSync(envPath)) {
    const env = fs.readFileSync(envPath, 'utf8');
    const match = env.match(/GITHUB_TOKEN=(.*)/);
    if (match) token = match[1].trim();
  }

  if (!token) {
    console.error('No GITHUB_TOKEN found');
    process.exit(1);
  }

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

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'User-Agent': 'NodeJS',
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        login: 'theekshanathushan',
        from: from.toISOString(),
        to: to.toISOString()
      }
    })
  });

  if (!res.ok) {
    throw new Error(`GraphQL query failed with status ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  const processed = processGitHubData(json);
  console.log('Successfully fetched GitHub data:');
  console.log('- Total contributions:', processed.totalContributions);
  console.log('- Current streak:', processed.currentStreak, 'days');
  console.log('- Longest streak:', processed.longestStreak, 'days');
  console.log('- Active repos:', processed.activeRepos);
  console.log('- Top languages:', processed.languages.map(l => `${l.name} (${l.percent}%)`).join(', '));
  console.log('- Total days mapped:', processed.days.length);

  // Mark fallback data with isFallback: false so UI shows "Updated just now" instead of "Sample data"
  const fallbackPayload = {
    ...processed,
    isFallback: false
  };

  const targetPath = path.resolve(__dirname, '../src/data/activity-fallback.json');
  fs.writeFileSync(targetPath, JSON.stringify(fallbackPayload, null, 2), 'utf8');
  console.log(`Saved updated snapshot to ${targetPath}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
