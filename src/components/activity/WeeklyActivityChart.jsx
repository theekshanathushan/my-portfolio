import { useState, useMemo } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatWeekDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  if (isNaN(d.getTime())) return dateStr;
  return `${MONTHS[d.getMonth()]} ${d.getDate()}`;
}

/**
 * Creates smooth SVG cubic bezier path from array of [x, y] coordinates
 */
function createSmoothPath(points) {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0][0]},${points[0][1]}`;

  let d = `M ${points[0][0]},${points[0][1]}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;

    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }

  return d;
}

export default function WeeklyActivityChart({ weekly = [] }) {
  const [activePoint, setActivePoint] = useState(null);

  // Normalize to 12 weeks
  const data = useMemo(() => {
    if (Array.isArray(weekly) && weekly.length > 0) {
      return weekly.slice(-12);
    }
    // Fallback 12 empty weeks
    const emptyWeeks = [];
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      emptyWeeks.push({
        weekStart: d.toISOString().split('T')[0],
        total: 0
      });
    }
    return emptyWeeks;
  }, [weekly]);

  // Viewbox & geometry
  const width = 560;
  const height = 210;
  const paddingLeft = 38;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 38;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxTotal = useMemo(() => {
    const maxVal = Math.max(...data.map(d => d.total), 0);
    if (maxVal === 0) return 10;
    // Round up to nice number
    if (maxVal <= 5) return 5;
    if (maxVal <= 10) return 10;
    if (maxVal <= 25) return 25;
    if (maxVal <= 50) return 50;
    return Math.ceil(maxVal / 10) * 10;
  }, [data]);

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = paddingLeft + (i / (data.length - 1)) * chartWidth;
      const ratio = d.total / maxTotal;
      const y = paddingTop + chartHeight - ratio * chartHeight;
      return [x, y, d];
    });
  }, [data, maxTotal, chartWidth, chartHeight]);

  const linePath = useMemo(() => {
    return createSmoothPath(points.map(([x, y]) => [x, y]));
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = paddingTop + chartHeight;
    const firstX = points[0][0];
    const lastX = points[points.length - 1][0];
    return `${linePath} L ${lastX},${bottomY} L ${firstX},${bottomY} Z`;
  }, [linePath, points, chartHeight]);

  const midTotal = Math.round(maxTotal / 2);

  return (
    <div className="weekly-chart-card glass-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Weekly Momentum</h3>
          <span className="chart-subtitle">Contribution velocity over last 12 weeks</span>
        </div>
      </div>

      <div className="chart-svg-container">
        <svg 
          viewBox={`0 0 ${width} ${height}`} 
          className="weekly-svg"
          role="img"
          aria-label="Line and area chart showing weekly GitHub contributions over the last 12 weeks"
        >
          <defs>
            <linearGradient id="weeklyAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
              <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines & Y-axis labels */}
          {/* Top line (max) */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={width - paddingRight}
            y2={paddingTop}
            className="chart-grid-line"
          />
          <text x={paddingLeft - 8} y={paddingTop + 4} className="chart-axis-label y-label">
            {maxTotal}
          </text>

          {/* Middle line */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight / 2}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight / 2}
            className="chart-grid-line"
          />
          <text x={paddingLeft - 8} y={paddingTop + chartHeight / 2 + 4} className="chart-axis-label y-label">
            {midTotal}
          </text>

          {/* Bottom baseline */}
          <line
            x1={paddingLeft}
            y1={paddingTop + chartHeight}
            x2={width - paddingRight}
            y2={paddingTop + chartHeight}
            className="chart-grid-line chart-baseline"
          />
          <text x={paddingLeft - 8} y={paddingTop + chartHeight + 4} className="chart-axis-label y-label">
            0
          </text>

          {/* Area fill */}
          {areaPath && (
            <path d={areaPath} fill="url(#weeklyAreaGradient)" className="chart-area" />
          )}

          {/* Line stroke */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="chart-line"
              filter="url(#glow)"
            />
          )}

          {/* Interactive Points */}
          {points.map(([x, y, d], index) => {
            const isHovered = activePoint?.index === index;
            const weekLabel = formatWeekDate(d.weekStart);

            return (
              <g key={`point-${index}`}>
                {/* Invisible larger hit area for easy hover/tap */}
                <circle
                  cx={x}
                  cy={y}
                  r={12}
                  fill="transparent"
                  className="chart-hit-area"
                  tabIndex={0}
                  role="graphics-symbol"
                  aria-label={`Week of ${weekLabel}: ${d.total} contributions`}
                  onMouseEnter={() => setActivePoint({ index, x, y, data: d, label: weekLabel })}
                  onMouseLeave={() => setActivePoint(null)}
                  onFocus={() => setActivePoint({ index, x, y, data: d, label: weekLabel })}
                  onBlur={() => setActivePoint(null)}
                />

                {/* Visible dot */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 6 : 3.5}
                  className={`chart-point ${isHovered ? 'point-active' : ''}`}
                />

                {/* X-axis tick labels (alternate weeks or key weeks to prevent crowding) */}
                {(index % 2 === 0 || index === points.length - 1) && (
                  <text
                    x={x}
                    y={height - 12}
                    className="chart-axis-label x-label"
                  >
                    {weekLabel}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {activePoint && (
          <div
            className="chart-tooltip"
            style={{
              left: `${(activePoint.x / width) * 100}%`,
              top: `${(activePoint.y / height) * 100}%`
            }}
            role="tooltip"
          >
            <div className="chart-tooltip-week">Week of {activePoint.label}</div>
            <div className="chart-tooltip-val">
              <span className="tooltip-accent-num">{activePoint.data.total}</span> contributions
            </div>
          </div>
        )}
      </div>

      <style>{`
        .weekly-chart-card {
          padding: 24px 28px;
          position: relative;
          background: rgba(13, 13, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .chart-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .chart-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .chart-subtitle {
          font-family: var(--font-sans);
          font-size: 13px;
          color: var(--text-muted);
        }

        .chart-svg-container {
          position: relative;
          width: 100%;
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .weekly-svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .chart-grid-line {
          stroke: rgba(255, 255, 255, 0.06);
          stroke-dasharray: 4 4;
          stroke-width: 1;
        }

        .chart-baseline {
          stroke: rgba(255, 255, 255, 0.12);
          stroke-dasharray: none;
        }

        .chart-axis-label {
          font-family: var(--font-mono);
          font-size: 10px;
          fill: var(--text-dark);
          user-select: none;
        }

        .y-label {
          text-anchor: end;
        }

        .x-label {
          text-anchor: middle;
        }

        .chart-line {
          transition: stroke 0.3s ease;
        }

        .chart-hit-area {
          cursor: pointer;
          outline: none;
        }

        .chart-point {
          fill: var(--bg-dark);
          stroke: var(--accent);
          stroke-width: 2.5px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .chart-point.point-active {
          fill: var(--accent);
          stroke: #ffffff;
          filter: drop-shadow(0 0 6px var(--accent));
        }

        .chart-tooltip {
          position: absolute;
          transform: translate(-50%, -120%);
          background: rgba(10, 10, 18, 0.95);
          border: 1px solid rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7), 0 0 12px rgba(var(--accent-rgb), 0.2);
          border-radius: 8px;
          padding: 7px 12px;
          pointer-events: none;
          z-index: 50;
          white-space: nowrap;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: chart-tooltip-fade 0.15s ease-out;
        }

        @keyframes chart-tooltip-fade {
          from {
            opacity: 0;
            transform: translate(-50%, -105%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -120%);
          }
        }

        .chart-tooltip-week {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .chart-tooltip-val {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-white);
        }

        .tooltip-accent-num {
          color: var(--accent);
          font-weight: 700;
        }

        @media (max-width: 640px) {
          .weekly-chart-card {
            padding: 18px 16px;
          }
        }
      `}</style>
    </div>
  );
}
