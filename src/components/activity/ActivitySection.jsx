import { RefreshCw, ExternalLink, AlertTriangle, Clock, Database } from 'lucide-react';
import useActivity from './useActivity';
import ActivityStats from './ActivityStats';
import ContributionHeatmap from './ContributionHeatmap';
import WeeklyActivityChart from './WeeklyActivityChart';
import LanguagesDonut from './LanguagesDonut';

/**
 * Shimmer Loading Skeleton matching the final layout
 */
function ActivitySkeleton() {
  return (
    <div className="activity-skeleton-wrap" aria-label="Loading coding activity..." role="status">
      {/* 4 Stats Cards */}
      <div className="skeleton-stats-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton-card skeleton-stat-card">
            <div className="skeleton-bar skeleton-title-bar"></div>
            <div className="skeleton-bar skeleton-number-bar"></div>
            <div className="skeleton-bar skeleton-sub-bar"></div>
          </div>
        ))}
      </div>

      {/* Heatmap Card */}
      <div className="skeleton-card skeleton-heatmap-card">
        <div className="skeleton-bar skeleton-header-bar"></div>
        <div className="skeleton-grid-placeholder"></div>
        <div className="skeleton-bar skeleton-footer-bar"></div>
      </div>

      {/* Chart & Donut Row */}
      <div className="skeleton-bottom-grid">
        <div className="skeleton-card skeleton-chart-card">
          <div className="skeleton-bar skeleton-header-bar"></div>
          <div className="skeleton-chart-placeholder"></div>
        </div>
        <div className="skeleton-card skeleton-donut-card">
          <div className="skeleton-bar skeleton-header-bar"></div>
          <div className="skeleton-donut-placeholder"></div>
        </div>
      </div>

      <style>{`
        .activity-skeleton-wrap {
          animation: skeleton-fade 0.3s ease;
        }

        .skeleton-card {
          background: rgba(13, 13, 23, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
        }

        .skeleton-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
          animation: skeleton-shimmer 1.8s infinite;
        }

        @keyframes skeleton-shimmer {
          100% {
            left: 100%;
          }
        }

        .skeleton-bar {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .skeleton-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .skeleton-stat-card {
          padding: 22px 24px;
          height: 120px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-title-bar {
          width: 60%;
          height: 14px;
        }

        .skeleton-number-bar {
          width: 45%;
          height: 32px;
        }

        .skeleton-sub-bar {
          width: 75%;
          height: 10px;
        }

        .skeleton-heatmap-card {
          padding: 24px 28px;
          height: 220px;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-header-bar {
          width: 200px;
          height: 18px;
        }

        .skeleton-grid-placeholder {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        .skeleton-footer-bar {
          width: 120px;
          height: 12px;
          align-self: flex-end;
        }

        .skeleton-bottom-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 20px;
        }

        .skeleton-chart-card,
        .skeleton-donut-card {
          padding: 24px 28px;
          height: 260px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .skeleton-chart-placeholder,
        .skeleton-donut-placeholder {
          flex-grow: 1;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
        }

        @media (max-width: 1024px) {
          .skeleton-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .skeleton-bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 540px) {
          .skeleton-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function ActivitySection() {
  const { data, loading, error, refetch, lastUpdatedAgo, isFallback } = useActivity();

  // Screen-reader textual summary of live metrics
  const srSummary = data
    ? `GitHub Activity Summary: Total contributions this year: ${data.totalContributions}. Current streak: ${data.currentStreak} days. Longest streak: ${data.longestStreak} days. Active repositories in the past 90 days: ${data.activeRepos}. Top languages: ${
        (data.languages || []).map((l) => `${l.name} (${l.percent}%)`).join(', ') || 'None specified'
      }.`
    : '';

  return (
    <section id="activity" className="section activity-section" aria-label="Coding Activity">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-subtitle">ACTIVITY</span>
          <h2 className="section-title">Coding Activity</h2>
          <p className="activity-lead-text">
            My real GitHub contributions, updated automatically.
          </p>
        </div>

        {/* Status & Meta Bar */}
        <div className="activity-meta-strip">
          <div className="meta-strip-left">
            <span className="live-pulse-dot" aria-hidden="true"></span>
            <span className="meta-status-text">
              <Clock size={13} className="inline-icon" />
              {lastUpdatedAgo ? `Updated ${lastUpdatedAgo}` : 'Real-time telemetry'}
            </span>

            {isFallback && (
              <span className="fallback-badge" title="GitHub token not configured on server; displaying sample activity">
                <Database size={11} className="inline-icon" />
                Sample data
              </span>
            )}
          </div>

          <div className="meta-strip-right">
            <a 
              href="https://github.com/theekshanathushan" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-profile-link"
              aria-label="View Theekshana Thushan's profile on GitHub (opens in new tab)"
            >
              <span>github.com/theekshanathushan</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Visually hidden screen reader summary */}
        {srSummary && <div className="sr-only" aria-live="polite">{srSummary}</div>}

        {/* Loading State */}
        {loading && <ActivitySkeleton />}

        {/* Error State with Retry Button */}
        {!loading && error && (
          <div className="activity-error-card glass-card" role="alert">
            <div className="error-icon-wrap" aria-hidden="true">
              <AlertTriangle size={24} />
            </div>
            <div className="error-content">
              <h4 className="error-title">Unable to Load Activity</h4>
              <p className="error-description">
                {error || 'Could not reach the GitHub telemetry endpoint.'}
              </p>
            </div>
            <button 
              onClick={() => refetch()} 
              className="btn btn-secondary retry-btn"
              aria-label="Retry loading GitHub activity"
            >
              <RefreshCw size={15} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loaded Content */}
        {!loading && !error && data && (
          <div className="activity-content-animate">
            {/* 1. ActivityStats: 4 Key Metric Cards */}
            <ActivityStats
              totalContributions={data.totalContributions}
              currentStreak={data.currentStreak}
              longestStreak={data.longestStreak}
              activeRepos={data.activeRepos}
            />

            {/* 2. ContributionHeatmap: 53-week interactive grid */}
            <ContributionHeatmap days={data.days} />

            {/* 3 & 4. Charts Grid: Weekly Trend & Languages Donut */}
            <div className="activity-charts-grid">
              <div className="weekly-chart-column">
                <WeeklyActivityChart weekly={data.weekly} />
              </div>
              <div className="languages-column">
                <LanguagesDonut languages={data.languages} />
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .activity-section {
          position: relative;
        }

        .activity-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 640px;
          text-align: center;
          margin-top: 0;
          margin-bottom: 0;
        }

        /* Meta bar */
        .activity-meta-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: -10px;
          margin-bottom: 24px;
          padding: 8px 14px;
          background: rgba(13, 13, 23, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }

        .meta-strip-left {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .live-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: live-pulse 2s infinite ease-in-out;
        }

        @keyframes live-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }

        .meta-status-text {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .inline-icon {
          display: inline-block;
          vertical-align: middle;
        }

        .fallback-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 183, 3, 0.12);
          color: #ffb703;
          border: 1px solid rgba(255, 183, 3, 0.25);
          padding: 2px 7px;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 500;
        }

        .meta-strip-right {
          display: flex;
          align-items: center;
        }

        .github-profile-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 12px;
          text-decoration: none;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .github-profile-link:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* Error state */
        .activity-error-card {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 16px;
        }

        .error-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.15);
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .error-content {
          flex-grow: 1;
        }

        .error-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .error-description {
          font-size: 13px;
          color: var(--text-muted);
        }

        .retry-btn {
          padding: 8px 18px;
          font-size: 13px;
          flex-shrink: 0;
        }

        /* Bottom charts layout */
        .activity-charts-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 20px;
        }

        .activity-content-animate {
          animation: activity-fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes activity-fade-in {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 1024px) {
          .activity-charts-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }

        @media (max-width: 640px) {
          .activity-meta-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .activity-error-card {
            flex-direction: column;
            align-items: flex-start;
          }

          .retry-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
