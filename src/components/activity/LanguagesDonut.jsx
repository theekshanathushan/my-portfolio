import { useState, useMemo } from 'react';

const RADIUS = 44;
const STROKE_WIDTH = 14;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function LanguagesDonut({ languages = [] }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Normalize percentages if needed to ensure 100% total coverage
  const normalized = useMemo(() => {
    if (!Array.isArray(languages) || languages.length === 0) return [];
    const sum = languages.reduce((acc, l) => acc + (Number(l.percent) || 0), 0);
    if (sum === 0) return [];

    let accumulatedPercent = 0;
    return languages.map((lang, idx) => {
      const pct = Number(lang.percent) || 0;
      const strokeDasharray = `${(pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`;
      const strokeDashoffset = -((accumulatedPercent / 100) * CIRCUMFERENCE);
      accumulatedPercent += pct;

      return {
        ...lang,
        index: idx,
        strokeDasharray,
        strokeDashoffset
      };
    });
  }, [languages]);

  const activeLang = hoveredIndex !== null ? normalized[hoveredIndex] : null;

  return (
    <div className="languages-card glass-card">
      <div className="languages-header">
        <h3 className="languages-title">Top Languages</h3>
        <span className="languages-subtitle">By repository ratio</span>
      </div>

      {normalized.length === 0 ? (
        <div className="languages-empty">
          <div className="empty-donut-ring" aria-hidden="true"></div>
          <p className="empty-text">No repository language data available yet</p>
        </div>
      ) : (
        <div className="languages-body">
          {/* Donut SVG */}
          <div className="donut-wrap">
            <svg 
              width={140} 
              height={140} 
              viewBox="0 0 140 140" 
              className="donut-svg"
              role="img"
              aria-label="Donut chart showing distribution of top programming languages in public repositories"
            >
              {/* Background ring */}
              <circle
                cx={70}
                cy={70}
                r={RADIUS}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth={STROKE_WIDTH}
              />

              {/* Slices */}
              <g transform="rotate(-90 70 70)">
                {normalized.map((lang) => {
                  const isHovered = hoveredIndex === lang.index;
                  return (
                    <circle
                      key={lang.name}
                      cx={70}
                      cy={70}
                      r={RADIUS}
                      fill="none"
                      stroke={lang.color || 'var(--accent)'}
                      strokeWidth={isHovered ? STROKE_WIDTH + 4 : STROKE_WIDTH}
                      strokeDasharray={lang.strokeDasharray}
                      strokeDashoffset={lang.strokeDashoffset}
                      strokeLinecap="round"
                      className={`donut-slice ${isHovered ? 'slice-hovered' : ''}`}
                      tabIndex={0}
                      role="graphics-symbol"
                      aria-label={`${lang.name}: ${lang.percent}%`}
                      onMouseEnter={() => setHoveredIndex(lang.index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(lang.index)}
                      onBlur={() => setHoveredIndex(null)}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Center label */}
            <div className="donut-center" aria-hidden="true">
              {activeLang ? (
                <>
                  <div className="center-value">{activeLang.percent}%</div>
                  <div className="center-name" title={activeLang.name}>{activeLang.name}</div>
                </>
              ) : (
                <>
                  <div className="center-value">{normalized.length}</div>
                  <div className="center-name">Languages</div>
                </>
              )}
            </div>
          </div>

          {/* Languages Legend */}
          <div className="languages-legend">
            {normalized.map((lang) => {
              const isHovered = hoveredIndex === lang.index;
              return (
                <div
                  key={lang.name}
                  className={`legend-item ${isHovered ? 'item-active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(lang.index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${lang.name}: ${lang.percent}%`}
                  onFocus={() => setHoveredIndex(lang.index)}
                  onBlur={() => setHoveredIndex(null)}
                >
                  <div className="legend-dot-name">
                    <span 
                      className="lang-color-dot" 
                      style={{ backgroundColor: lang.color || 'var(--accent)' }}
                    />
                    <span className="lang-name">{lang.name}</span>
                  </div>
                  <span className="lang-percent">{lang.percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        .languages-card {
          padding: 24px 28px;
          position: relative;
          background: rgba(13, 13, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .languages-header {
          margin-bottom: 18px;
        }

        .languages-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .languages-subtitle {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-muted);
        }

        .languages-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 10px;
          text-align: center;
          flex-grow: 1;
        }

        .empty-donut-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 8px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 14px;
        }

        .empty-text {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-muted);
        }

        .languages-body {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-grow: 1;
        }

        .donut-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .donut-svg {
          display: block;
        }

        .donut-slice {
          cursor: pointer;
          transition: stroke-width 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
          outline: none;
        }

        .donut-slice.slice-hovered {
          filter: drop-shadow(0 0 8px currentColor);
        }

        .donut-center {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
          max-width: 70px;
        }

        .center-value {
          font-family: var(--font-heading);
          font-size: 19px;
          font-weight: 800;
          color: var(--text-white);
          line-height: 1.1;
        }

        .center-name {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 100%;
        }

        .languages-legend {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .legend-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          outline: none;
        }

        .legend-item:hover,
        .legend-item.item-active {
          background: rgba(255, 255, 255, 0.05);
        }

        .legend-dot-name {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
        }

        .lang-color-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .lang-name {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-light);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lang-percent {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          margin-left: 8px;
        }

        @media (max-width: 900px) and (min-width: 768px) {
          .languages-body {
            flex-direction: column;
            gap: 16px;
          }
        }

        @media (max-width: 520px) {
          .languages-card {
            padding: 18px 16px;
          }

          .languages-body {
            flex-direction: column;
            gap: 16px;
          }

          .languages-legend {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
