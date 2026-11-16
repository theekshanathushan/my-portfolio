import React from 'react';
import { 
  Trophy, 
  Calendar, 
  MapPin, 
  Users, 
  UserCheck, 
  ExternalLink, 
  ArrowRight, 
  Cpu, 
  Award, 
  Sparkles, 
  Layers, 
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { HACKATHONS_DATA } from '../data/content';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Hackathons() {
  const totalJoined = HACKATHONS_DATA.length;

  const scrollToProject = (projectId) => {
    const projectElement = document.getElementById('projects');
    if (projectElement) {
      projectElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hackathons" className="section hackathons-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-subtitle">Competitive Engineering</span>
          <h2 className="section-title">Hackathons & Sprints</h2>
          <p className="hackathons-lead-text">
            High-velocity prototyping, telemetry problem-solving, and cross-functional team sprints under tight constraints.
          </p>
        </div>

        {/* Dynamic Summary Strip */}
        <div className="hackathon-summary-strip glass-card" role="region" aria-label="Hackathons Summary">
          <div className="summary-metric-group">
            <div className="metric-icon-bubble">
              <Trophy size={20} className="text-glow-accent" />
            </div>
            <div className="metric-text-group">
              <span className="metric-count">{totalJoined}</span>
              <span className="metric-label">{totalJoined === 1 ? 'Hackathon Joined' : 'Hackathons Joined'}</span>
            </div>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-pills-row">
            <span className="summary-pill">
              <Sparkles size={12} className="text-glow-accent" />
              <span>Rapid System Prototyping</span>
            </span>
            <span className="summary-pill">
              <Cpu size={12} className="text-glow-accent" />
              <span>AI & Diagnostic Engines</span>
            </span>
            <span className="summary-pill">
              <Users size={12} className="text-glow-accent" />
              <span>Cross-Functional Team Collaboration</span>
            </span>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="hackathon-timeline-wrap" role="feed" aria-label="Hackathon journey timeline">
          <div className="timeline-spine"></div>

          <div className="hackathon-cards-list">
            {HACKATHONS_DATA.map((hackathon, idx) => {
              const isPlaceholder = hackathon.name.includes('[add') || hackathon.id.includes('placeholder');
              
              return (
                <div 
                  key={hackathon.id || idx} 
                  className={`hackathon-timeline-node ${isPlaceholder ? 'is-placeholder-node' : ''}`}
                >
                  {/* Timeline Marker Ring */}
                  <div className="timeline-node-pin">
                    <span className="pin-dot"></span>
                  </div>

                  {/* Hackathon Card */}
                  <article className="hackathon-card glass-card">
                    
                    {/* Top Bar: Event, Organizer & Badges */}
                    <div className="hackathon-card-header">
                      <div className="hackathon-title-wrap">
                        <div className="hackathon-name-row">
                          <h3 className="hackathon-name">{hackathon.name}</h3>
                          {hackathon.result && (
                            <span className={`hackathon-result-badge ${hackathon.result.includes('[') ? 'pending' : ''}`}>
                              <Award size={12} />
                              <span>{hackathon.result}</span>
                            </span>
                          )}
                        </div>
                        <span className="hackathon-organizer">{hackathon.organizer}</span>
                      </div>

                      {/* Meta Pills (Date, Format, Location) */}
                      <div className="hackathon-meta-chips">
                        <span className="meta-chip">
                          <Calendar size={11} className="chip-icon" />
                          <span>{hackathon.date}</span>
                        </span>
                        {hackathon.format && (
                          <span className="meta-chip">
                            <MapPin size={11} className="chip-icon" />
                            <span>{hackathon.format}</span>
                          </span>
                        )}
                        {hackathon.location && !hackathon.location.includes('[') && (
                          <span className="meta-chip location-chip">
                            <span>{hackathon.location}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Track & Problem Domain */}
                    <div className="hackathon-track-bar">
                      <Bookmark size={13} className="track-icon" />
                      <span className="track-label">Track:</span>
                      <span className="track-title">{hackathon.track}</span>
                    </div>

                    {/* Team & Role Substrip */}
                    <div className="hackathon-roles-row">
                      <div className="role-subitem">
                        <UserCheck size={13} className="text-glow-accent" />
                        <span><strong>My Role:</strong> {hackathon.myRole}</span>
                      </div>
                      <div className="role-subitem">
                        <Users size={13} className="text-glow-accent" />
                        <span><strong>Team:</strong> {hackathon.teamName} {hackathon.teamSize ? `(${hackathon.teamSize} members)` : ''}</span>
                      </div>
                    </div>

                    {/* Project Solution & 2-Line Summary */}
                    <div className="hackathon-project-details">
                      <h4 className="project-solution-title">
                        Solution: <span>{hackathon.projectName}</span>
                      </h4>
                      <p className="hackathon-summary-text">{hackathon.summary}</p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="hackathon-tech-chips" aria-label="Technologies used">
                      {hackathon.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className={`tech-chip-sm ${tech.includes('[') ? 'placeholder-chip' : ''}`}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions & Links Bar */}
                    <div className="hackathon-card-footer">
                      <div className="footer-left-actions">
                        {hackathon.projectId && (
                          <button
                            type="button"
                            className="btn-view-linked-project"
                            onClick={() => scrollToProject(hackathon.projectId)}
                            aria-label={`View ${hackathon.projectName} in Projects section`}
                          >
                            <span>View project</span>
                            <ArrowRight size={13} />
                          </button>
                        )}
                      </div>

                      <div className="footer-external-links">
                        {hackathon.links?.github && hackathon.links.github !== '#' && (
                          <a
                            href={hackathon.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="external-hack-link"
                            title="View GitHub Repository"
                          >
                            <Github size={14} />
                            <span>Repository</span>
                          </a>
                        )}

                        {hackathon.links?.demo && hackathon.links.demo !== '#' && (
                          <a
                            href={hackathon.links.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="external-hack-link"
                            title="View Live Demo"
                          >
                            <ExternalLink size={14} />
                            <span>Demo</span>
                          </a>
                        )}

                        {hackathon.links?.certificate && hackathon.links.certificate !== '#' && (
                          <a
                            href={hackathon.links.certificate}
                            target="_blank"
                            rel="noreferrer"
                            className="external-hack-link"
                            title="View Certificate"
                          >
                            <Award size={14} />
                            <span>Certificate</span>
                          </a>
                        )}
                      </div>
                    </div>

                  </article>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Embedded Styles for Hackathons Section */}
      <style>{`
        .hackathons-section {
          position: relative;
        }

        .hackathons-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 640px;
          text-align: center;
          margin-top: 12px;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* --- Dynamic Summary Strip --- */
        .hackathon-summary-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          padding: 16px 24px;
          border-radius: 14px;
          margin: 10px auto 36px;
          background: rgba(11, 11, 20, 0.7);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
        }

        .summary-metric-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .metric-icon-bubble {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .metric-text-group {
          display: flex;
          flex-direction: column;
        }

        .metric-count {
          font-size: 24px;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--accent);
          line-height: 1;
        }

        .metric-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 2px;
        }

        .summary-divider {
          width: 1px;
          height: 36px;
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 768px) {
          .summary-divider {
            display: none;
          }
        }

        .summary-pills-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .summary-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-light);
        }

        /* --- Vertical Timeline --- */
        .hackathon-timeline-wrap {
          position: relative;
          max-width: 920px;
          margin: 0 auto;
          padding: 10px 0 20px;
        }

        .timeline-spine {
          position: absolute;
          top: 15px;
          bottom: 15px;
          left: 20px;
          width: 2px;
          background: linear-gradient(180deg, var(--accent) 0%, rgba(var(--accent-rgb), 0.3) 70%, transparent 100%);
          border-radius: 1px;
        }

        @media (max-width: 600px) {
          .timeline-spine {
            left: 12px;
          }
        }

        .hackathon-cards-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hackathon-timeline-node {
          position: relative;
          padding-left: 54px;
        }

        @media (max-width: 600px) {
          .hackathon-timeline-node {
            padding-left: 36px;
          }
        }

        .timeline-node-pin {
          position: absolute;
          top: 22px;
          left: 12px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 2px solid var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 12px var(--accent);
          z-index: 2;
        }

        @media (max-width: 600px) {
          .timeline-node-pin {
            left: 4px;
            width: 16px;
            height: 16px;
          }
        }

        .pin-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
        }

        .is-placeholder-node .timeline-node-pin {
          border-color: rgba(255, 255, 255, 0.3);
          box-shadow: none;
        }

        .is-placeholder-node .pin-dot {
          background: rgba(255, 255, 255, 0.4);
        }

        /* --- Hackathon Card --- */
        .hackathon-card {
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid var(--border-glass);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .hackathon-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.35);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-rgb), 0.1);
        }

        .is-placeholder-node .hackathon-card {
          border-style: dashed;
          border-color: rgba(255, 255, 255, 0.15);
        }

        /* Header */
        .hackathon-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hackathon-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .hackathon-name-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }

        .hackathon-name {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .hackathon-organizer {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
        }

        .hackathon-result-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 6px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fbbf24;
        }

        .hackathon-result-badge.pending {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: var(--text-muted);
        }

        .hackathon-meta-chips {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .chip-icon {
          color: var(--accent);
        }

        /* Track Bar */
        .hackathon-track-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(var(--accent-rgb), 0.06);
          border-left: 3px solid var(--accent);
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12.5px;
        }

        .track-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .track-label {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--text-white);
        }

        .track-title {
          color: var(--text-light);
        }

        /* Roles & Team Row */
        .hackathon-roles-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 12.5px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          padding: 8px 12px;
          border-radius: 6px;
        }

        .role-subitem {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .role-subitem strong {
          color: var(--text-light);
        }

        /* Project Solution & Summary */
        .hackathon-project-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .project-solution-title {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .project-solution-title span {
          color: var(--accent);
          font-family: var(--font-heading);
        }

        .hackathon-summary-text {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
          margin: 0;
        }

        /* Tech Chips */
        .hackathon-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-chip-sm {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .placeholder-chip {
          border-style: dashed;
          color: var(--text-dark);
        }

        /* Footer */
        .hackathon-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 4px;
        }

        .btn-view-linked-project {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.35);
          color: var(--accent);
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-view-linked-project:hover {
          background: rgba(var(--accent-rgb), 0.22);
          transform: translateX(3px);
        }

        .footer-external-links {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .external-hack-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-muted);
          padding: 5px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          text-decoration: none;
          transition: all 0.2s;
        }

        .external-hack-link:hover {
          color: var(--text-white);
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.08);
        }
      `}</style>
    </section>
  );
}
