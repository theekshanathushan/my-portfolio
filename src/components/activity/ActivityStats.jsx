import { useState, useEffect, useRef } from 'react';
import { GitCommit, Flame, Trophy, GitBranch } from 'lucide-react';

/**
 * Animated number counter that counts up to the target value when visible.
 */
function CountUp({ target, duration = 1200, isVisible, suffix = '' }) {
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [current, setCurrent] = useState(() => (isReducedMotion ? target : 0));

  useEffect(() => {
    if (!isVisible || isReducedMotion) return;
    if (target === 0) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.floor(easeProgress * target);
      setCurrent(val);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCurrent(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, isVisible, isReducedMotion]);

  const displayVal = isReducedMotion ? target : current;

  return (
    <span>
      {displayVal.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ActivityStats({ 
  totalContributions = 0, 
  currentStreak = 0, 
  longestStreak = 0, 
  activeRepos = 0 
}) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      id: 'contributions',
      label: 'Contributions this year',
      value: totalContributions,
      suffix: '',
      unit: 'commits & PRs',
      icon: GitCommit,
      accentClass: 'stat-cyan'
    },
    {
      id: 'current-streak',
      label: 'Current streak',
      value: currentStreak,
      suffix: ' days',
      unit: currentStreak === 1 ? 'day active' : 'consecutive days',
      icon: Flame,
      accentClass: 'stat-glow'
    },
    {
      id: 'longest-streak',
      label: 'Longest streak',
      value: longestStreak,
      suffix: ' days',
      unit: 'personal best',
      icon: Trophy,
      accentClass: 'stat-cyan'
    },
    {
      id: 'active-repos',
      label: 'Active repos',
      value: activeRepos,
      suffix: '',
      unit: 'pushed in 90 days',
      icon: GitBranch,
      accentClass: 'stat-glow'
    }
  ];

  return (
    <div ref={containerRef} className="activity-stats-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div 
            key={stat.id} 
            className="activity-stat-card glass-card"
            tabIndex={0}
            role="region"
            aria-label={`${stat.label}: ${stat.value}${stat.suffix}`}
          >
            <div className="stat-card-header">
              <span className="stat-card-label">{stat.label}</span>
              <div className="stat-card-icon-wrap" aria-hidden="true">
                <Icon size={18} />
              </div>
            </div>

            <div className="stat-card-number">
              <CountUp 
                target={stat.value} 
                isVisible={isVisible} 
                suffix={stat.suffix} 
              />
            </div>

            <div className="stat-card-unit">{stat.unit}</div>
          </div>
        );
      })}

      <style>{`
        .activity-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          margin-bottom: 28px;
        }

        .activity-stat-card {
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          position: relative;
          background: rgba(13, 13, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          backdrop-filter: blur(14px);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .activity-stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45), 0 0 20px rgba(var(--accent-rgb), 0.12);
        }

        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stat-card-label {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        .stat-card-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: rgba(var(--accent-rgb), 0.08);
          color: var(--accent);
          border: 1px solid rgba(var(--accent-rgb), 0.15);
        }

        .stat-card-number {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 6px;
        }

        .stat-card-unit {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          .activity-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }

        @media (max-width: 540px) {
          .activity-stats-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .stat-card-number {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
}
