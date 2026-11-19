// scripts/test-activity.js
// Unit tests for GitHub activity calculation functions
import assert from 'node:assert/strict';
import { 
  calculateLevels, 
  calculateStreaks, 
  processWeekly, 
  calculateActiveRepos, 
  processLanguages, 
  processGitHubData,
  getFallbackData 
} from '../api/activity.js';

console.log('🧪 Starting GitHub Activity Unit Tests...\n');

let passedTests = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  ✅ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ FAIL: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Level Bucketing (Quartiles 0-4)
test('calculateLevels handles empty array', () => {
  const result = calculateLevels([]);
  assert.deepEqual(result, []);
});

test('calculateLevels assigns level 0 to all 0-count days', () => {
  const days = [
    { date: '2026-01-01', count: 0 },
    { date: '2026-01-02', count: 0 },
    { date: '2026-01-03', count: 0 }
  ];
  const result = calculateLevels(days);
  assert.equal(result.every(d => d.level === 0), true);
});

test('calculateLevels assigns levels 1 through 4 based on quartile distribution', () => {
  const days = [
    { date: '2026-01-01', count: 0 },
    { date: '2026-01-02', count: 1 },
    { date: '2026-01-03', count: 2 },
    { date: '2026-01-04', count: 4 },
    { date: '2026-01-05', count: 8 },
    { date: '2026-01-06', count: 12 },
    { date: '2026-01-07', count: 20 },
    { date: '2026-01-08', count: 35 }
  ];
  const result = calculateLevels(days);
  assert.equal(result[0].level, 0, 'Count 0 should be level 0');
  assert.equal(result[1].level >= 1, true, 'Positive count should have level >= 1');
  assert.equal(result[7].level, 4, 'Highest count should reach level 4');
  assert.equal(result.every(d => d.level >= 0 && d.level <= 4), true, 'All levels must be 0-4');
});

// 2. Streak Calculations
test('calculateStreaks: active streak ending today', () => {
  const days = [
    { date: '2026-01-01', count: 0 },
    { date: '2026-01-02', count: 3 },
    { date: '2026-01-03', count: 5 },
    { date: '2026-01-04', count: 2 } // Today
  ];
  const { currentStreak, longestStreak } = calculateStreaks(days);
  assert.equal(currentStreak, 3, 'Streak active up to today');
  assert.equal(longestStreak, 3);
});

test('calculateStreaks: active streak continuing from yesterday when today has 0', () => {
  const days = [
    { date: '2026-01-01', count: 0 },
    { date: '2026-01-02', count: 2 },
    { date: '2026-01-03', count: 4 }, // Yesterday
    { date: '2026-01-04', count: 0 }  // Today (not yet contributed)
  ];
  const { currentStreak, longestStreak } = calculateStreaks(days);
  assert.equal(currentStreak, 2, 'Streak is still active if yesterday had contributions');
  assert.equal(longestStreak, 2);
});

test('calculateStreaks: broken streak (today=0, yesterday=0)', () => {
  const days = [
    { date: '2026-01-01', count: 5 },
    { date: '2026-01-02', count: 0 }, // Yesterday
    { date: '2026-01-03', count: 0 }  // Today
  ];
  const { currentStreak, longestStreak } = calculateStreaks(days);
  assert.equal(currentStreak, 0, 'Current streak should be 0');
  assert.equal(longestStreak, 1, 'Longest streak was 1');
});

test('calculateStreaks: longest streak exceeds current streak', () => {
  const days = [
    { date: '2026-01-01', count: 1 },
    { date: '2026-01-02', count: 2 },
    { date: '2026-01-03', count: 3 },
    { date: '2026-01-04', count: 4 }, // 4-day streak
    { date: '2026-01-05', count: 0 }, // break
    { date: '2026-01-06', count: 2 },
    { date: '2026-01-07', count: 1 }  // current 2-day streak
  ];
  const { currentStreak, longestStreak } = calculateStreaks(days);
  assert.equal(currentStreak, 2);
  assert.equal(longestStreak, 4);
});

// 3. Weekly Aggregation
test('processWeekly extracts last 12 weeks with totals', () => {
  const weeks = Array.from({ length: 20 }, (_, i) => ({
    contributionDays: [
      { date: `2026-01-${String(i + 1).padStart(2, '0')}`, contributionCount: 2 },
      { date: `2026-01-${String(i + 2).padStart(2, '0')}`, contributionCount: 3 }
    ]
  }));
  const result = processWeekly(weeks);
  assert.equal(result.length, 12, 'Must return last 12 weeks');
  assert.equal(result[0].total, 5, 'Sum of days in week');
  assert.ok(result[0].weekStart, 'Must have weekStart');
});

// 4. Active Repositories (90-day window)
test('calculateActiveRepos filters repos pushed in last 90 days', () => {
  const now = new Date('2026-06-01T12:00:00Z');
  const repos = [
    { name: 'recent-1', pushedAt: '2026-05-20T10:00:00Z' }, // 12 days ago (< 90)
    { name: 'recent-2', pushedAt: '2026-04-01T10:00:00Z' }, // 61 days ago (< 90)
    { name: 'old-1', pushedAt: '2026-01-01T10:00:00Z' },    // 151 days ago (> 90)
    { name: 'none', pushedAt: null }
  ];
  const activeCount = calculateActiveRepos(repos, now);
  assert.equal(activeCount, 2);
});

// 5. Languages Distribution
test('processLanguages calculates top 6 percentages', () => {
  const repos = [
    { primaryLanguage: { name: 'TypeScript', color: '#3178c6' } },
    { primaryLanguage: { name: 'TypeScript', color: '#3178c6' } },
    { primaryLanguage: { name: 'JavaScript', color: '#f1e05a' } },
    { primaryLanguage: { name: 'C#', color: '#178600' } },
    { primaryLanguage: null }
  ];
  const langs = processLanguages(repos);
  assert.equal(langs.length, 3);
  assert.equal(langs[0].name, 'TypeScript');
  assert.equal(langs[0].percent, 50.0); // 2 out of 4 with language
  assert.equal(langs[0].color, '#3178c6');
});

// 6. Full Data Transformation Pipeline
test('processGitHubData transforms mock GraphQL into target schema', () => {
  const mockGraphQL = {
    data: {
      user: {
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 42,
            weeks: [
              {
                contributionDays: [
                  { date: '2026-05-15', contributionCount: 3 },
                  { date: '2026-05-16', contributionCount: 5 }
                ]
              }
            ]
          }
        },
        repositories: {
          nodes: [
            {
              name: 'TalentAI',
              pushedAt: new Date().toISOString(),
              primaryLanguage: { name: 'TypeScript', color: '#3178c6' }
            }
          ]
        }
      }
    }
  };

  const payload = processGitHubData(mockGraphQL);
  
  // Verify all required keys
  assert.equal(typeof payload.totalContributions, 'number');
  assert.ok(Array.isArray(payload.days));
  assert.equal(typeof payload.currentStreak, 'number');
  assert.equal(typeof payload.longestStreak, 'number');
  assert.ok(Array.isArray(payload.weekly));
  assert.equal(typeof payload.activeRepos, 'number');
  assert.ok(Array.isArray(payload.languages));
  assert.ok(payload.updatedAt);
  assert.equal(payload.totalContributions, 42);
  assert.equal(payload.activeRepos, 1);
  assert.equal(payload.languages[0].name, 'TypeScript');
});

// 7. Fallback Data Structure
test('getFallbackData contains isFallback flag and schema conformity', () => {
  const fallback = getFallbackData();
  assert.equal(typeof fallback.isFallback, 'boolean');
  assert.equal(typeof fallback.totalContributions, 'number');
  assert.equal(typeof fallback.currentStreak, 'number');
  assert.equal(typeof fallback.longestStreak, 'number');
  assert.equal(typeof fallback.activeRepos, 'number');
  assert.ok(Array.isArray(fallback.days));
  assert.ok(Array.isArray(fallback.weekly));
  assert.ok(Array.isArray(fallback.languages));
  assert.ok(fallback.updatedAt);
});

console.log(`\n🎉 All ${passedTests} tests passed successfully!`);
