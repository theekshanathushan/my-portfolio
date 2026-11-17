import { useState, useRef, useEffect, useMemo } from 'react';

const CELL_SIZE = 11;
const CELL_GAP = 3;
const STEP = CELL_SIZE + CELL_GAP; // 14px pitch
const GUTTER_LEFT = 34;
const GUTTER_TOP = 24;

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_LABELS = [
  { index: 1, label: 'Mon' },
  { index: 3, label: 'Wed' },
  { index: 5, label: 'Fri' }
];

/**
 * Format a Date object or YYYY-MM-DD string to "MMM D, YYYY"
 */
function formatDateLabel(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + (dateStr.includes('T') ? '' : 'T00:00:00'));
  if (isNaN(d.getTime())) return dateStr;
  const month = MONTH_NAMES[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${month} ${day}, ${year}`;
}

export default function ContributionHeatmap({ days = [] }) {
  const scrollContainerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);

  // Build a fast lookup map for days: 'YYYY-MM-DD' -> { date, count, level }
  const dayMap = useMemo(() => {
    const map = new Map();
    if (Array.isArray(days)) {
      days.forEach(d => {
        if (d && d.date) {
          map.set(d.date, d);
        }
      });
    }
    return map;
  }, [days]);

  // Construct 53 weeks x 7 days ending on the most recent Saturday/today
  const { weeksGrid, monthLabels } = useMemo(() => {
    let endDate;
    if (days && days.length > 0 && days[days.length - 1]?.date) {
      endDate = new Date(days[days.length - 1].date + 'T00:00:00');
    } else {
      endDate = new Date();
    }

    // Align end date to the end of that week (Saturday)
    const endDayOfWeek = endDate.getDay(); // 0 is Sun, 6 is Sat
    const daysUntilSaturday = 6 - endDayOfWeek;
    const calendarEnd = new Date(endDate);
    calendarEnd.setDate(calendarEnd.getDate() + daysUntilSaturday);

    // Calculate total days for 53 weeks = 53 * 7 = 371 days
    const totalDays = 53 * 7;
    const calendarStart = new Date(calendarEnd);
    calendarStart.setDate(calendarStart.getDate() - totalDays + 1);

    const weeks = [];
    const months = [];
    let lastMonth = -1;

    let curr = new Date(calendarStart);

    for (let w = 0; w < 53; w++) {
      const weekDays = [];
      for (let d = 0; d < 7; d++) {
        const dateStr = curr.toISOString().split('T')[0];
        const match = dayMap.get(dateStr);
        const count = match ? match.count : 0;
        const level = match ? match.level : 0;

        // Check for month label trigger on Sunday (first day of column)
        const currMonth = curr.getMonth();
        if (d === 0 && currMonth !== lastMonth) {
          // Avoid placing label too close to the end column
          if (w < 51) {
            months.push({
              weekIndex: w,
              name: MONTH_NAMES[currMonth]
            });
            lastMonth = currMonth;
          }
        }

        weekDays.push({
          date: dateStr,
          count,
          level,
          dayOfWeek: d,
          weekIndex: w
        });

        // Advance 1 day
        curr.setDate(curr.getDate() + 1);
      }
      weeks.push(weekDays);
    }

    return { weeksGrid: weeks, monthLabels: months };
  }, [days, dayMap]);

  // Scroll to the latest weeks on mobile on mount
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      const scrollToEnd = () => {
        el.scrollLeft = Math.max(0, el.scrollWidth - el.clientWidth);
      };
      scrollToEnd();
      const timer = setTimeout(scrollToEnd, 150);
      return () => clearTimeout(timer);
    }
  }, [weeksGrid]);

  const svgWidth = GUTTER_LEFT + 53 * STEP + 14;
  const svgHeight = GUTTER_TOP + 7 * STEP + 6;

  const showTooltip = (day, cellX, cellY) => {
    setTooltip({
      date: formatDateLabel(day.date),
      count: day.count,
      x: cellX + CELL_SIZE / 2,
      y: cellY - 6
    });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  return (
    <div className="heatmap-card glass-card">
      <div className="heatmap-header">
        <h3 className="heatmap-title">Contribution Calendar</h3>
        <span className="heatmap-meta">Last 365 Days</span>
      </div>

      {/* Horizontal Scroll Wrapper (page never scrolls horizontally) */}
      <div 
        ref={scrollContainerRef} 
        className="heatmap-scroll-container"
        tabIndex={0}
        aria-label="Interactive GitHub Contribution Heatmap. Scroll horizontally to view past months."
      >
        <div className="heatmap-svg-wrapper">
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="heatmap-svg"
            role="grid"
            aria-label="GitHub 53-week contribution grid"
          >
            {/* Month labels */}
            {monthLabels.map((m, i) => (
              <text
                key={`month-${i}`}
                x={GUTTER_LEFT + m.weekIndex * STEP}
                y={14}
                className="heatmap-label month-label"
              >
                {m.name}
              </text>
            ))}

            {/* Day of week labels */}
            {DAY_LABELS.map((d) => (
              <text
                key={d.label}
                x={8}
                y={GUTTER_TOP + d.index * STEP + 9}
                className="heatmap-label day-label"
              >
                {d.label}
              </text>
            ))}

            {/* Grid of cells */}
            {weeksGrid.map((week, wIdx) => (
              <g key={`week-${wIdx}`} role="row">
                {week.map((day) => {
                  const x = GUTTER_LEFT + wIdx * STEP;
                  const y = GUTTER_TOP + day.dayOfWeek * STEP;
                  const formattedDate = formatDateLabel(day.date);
                  const ariaText = `${formattedDate}: ${day.count} contribution${day.count === 1 ? '' : 's'}`;

                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx={2.5}
                      className={`heatmap-cell level-${day.level}`}
                      tabIndex={0}
                      role="gridcell"
                      aria-label={ariaText}
                      onMouseEnter={() => showTooltip(day, x, y)}
                      onMouseLeave={hideTooltip}
                      onFocus={() => showTooltip(day, x, y)}
                      onBlur={hideTooltip}
                    />
                  );
                })}
              </g>
            ))}
          </svg>

          {/* Floating Tooltip */}
          {tooltip && (
            <div 
              className="heatmap-floating-tooltip"
              style={{
                left: `${tooltip.x}px`,
                top: `${tooltip.y}px`
              }}
              role="tooltip"
            >
              <div className="tooltip-date">{tooltip.date}</div>
              <div className="tooltip-count">
                <span className="tooltip-count-val">{tooltip.count}</span> {tooltip.count === 1 ? 'contribution' : 'contributions'}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Heatmap Legend */}
      <div className="heatmap-footer">
        <div className="heatmap-hint">Hover or focus any square for details</div>
        <div className="heatmap-legend" aria-hidden="true">
          <span className="legend-label">Less</span>
          <span className="legend-cell level-0"></span>
          <span className="legend-cell level-1"></span>
          <span className="legend-cell level-2"></span>
          <span className="legend-cell level-3"></span>
          <span className="legend-cell level-4"></span>
          <span className="legend-label">More</span>
        </div>
      </div>

      <style>{`
        .heatmap-card {
          padding: 24px 28px;
          margin-bottom: 28px;
          position: relative;
          background: rgba(13, 13, 23, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
        }

        .heatmap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .heatmap-title {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
        }

        .heatmap-meta {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 4px 10px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .heatmap-scroll-container {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 12px;
          position: relative;
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }

        .heatmap-scroll-container::-webkit-scrollbar {
          height: 6px;
        }

        .heatmap-scroll-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }

        .heatmap-scroll-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }

        .heatmap-scroll-container::-webkit-scrollbar-thumb:hover {
          background: var(--accent);
        }

        .heatmap-svg-wrapper {
          min-width: ${svgWidth}px;
          position: relative;
          display: inline-block;
        }

        .heatmap-svg {
          display: block;
        }

        .heatmap-label {
          font-family: var(--font-mono);
          font-size: 10px;
          fill: var(--text-dark);
          user-select: none;
        }

        .month-label {
          letter-spacing: 0.04em;
        }

        .day-label {
          dominant-baseline: middle;
        }

        /* 5 Intensity Levels */
        .heatmap-cell {
          cursor: pointer;
          transition: transform 0.15s ease, stroke 0.15s ease, filter 0.15s ease;
          outline: none;
        }

        .heatmap-cell.level-0 {
          fill: rgba(255, 255, 255, 0.04);
          stroke: rgba(255, 255, 255, 0.03);
          stroke-width: 0.5px;
        }

        .heatmap-cell.level-1 {
          fill: rgba(var(--accent-rgb), 0.25);
        }

        .heatmap-cell.level-2 {
          fill: rgba(var(--accent-rgb), 0.52);
        }

        .heatmap-cell.level-3 {
          fill: rgba(var(--accent-rgb), 0.78);
        }

        .heatmap-cell.level-4 {
          fill: var(--accent);
          filter: drop-shadow(0 0 3px rgba(var(--accent-rgb), 0.6));
        }

        .heatmap-cell:hover,
        .heatmap-cell:focus {
          stroke: #ffffff;
          stroke-width: 1.5px;
          transform: scale(1.25);
          transform-origin: center;
          filter: drop-shadow(0 0 6px var(--accent));
        }

        /* Floating Tooltip */
        .heatmap-floating-tooltip {
          position: absolute;
          transform: translate(-50%, -100%);
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
          animation: tooltip-fade 0.15s ease-out;
        }

        @keyframes tooltip-fade {
          from {
            opacity: 0;
            transform: translate(-50%, -90%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -100%);
          }
        }

        .tooltip-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .tooltip-count {
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-white);
        }

        .tooltip-count-val {
          color: var(--accent);
          font-weight: 700;
        }

        /* Footer & Legend */
        .heatmap-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .heatmap-hint {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
        }

        .heatmap-legend {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .legend-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        .legend-cell {
          width: 11px;
          height: 11px;
          border-radius: 2.5px;
          display: inline-block;
        }

        .legend-cell.level-0 {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .legend-cell.level-1 {
          background: rgba(var(--accent-rgb), 0.25);
        }

        .legend-cell.level-2 {
          background: rgba(var(--accent-rgb), 0.52);
        }

        .legend-cell.level-3 {
          background: rgba(var(--accent-rgb), 0.78);
        }

        .legend-cell.level-4 {
          background: var(--accent);
          box-shadow: 0 0 6px rgba(var(--accent-rgb), 0.6);
        }

        @media (max-width: 640px) {
          .heatmap-card {
            padding: 18px 16px;
          }

          .heatmap-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .heatmap-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
}
