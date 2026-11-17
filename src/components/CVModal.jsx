import { useEffect, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Mail, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Globe, 
  FileText, 
  ExternalLink,
  Trophy,
  Award
} from 'lucide-react';
import { content } from '../content';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 16} height={props.size || 16} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function CVModal({ isOpen, onClose }) {
  const [activeView, setActiveView] = useState('interactive'); // 'interactive' | 'pdf'
  const [contributionsCount, setContributionsCount] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fetch GitHub telemetry once when modal is opened
  useEffect(() => {
    if (!isOpen) return;
    let isCancelled = false;

    fetch('/api/activity', { headers: { Accept: 'application/json' } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (!isCancelled && json && typeof json.totalContributions === 'number' && json.totalContributions > 0) {
          setContributionsCount(json.totalContributions);
        }
      })
      .catch(() => {
        // Silently ignore if API is unavailable; line remains hidden
      });

    return () => {
      isCancelled = true;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const cvPdfPath = `${import.meta.env.BASE_URL}Theekshana_Thushan_CV.pdf`;

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Action Panel */}
        <div className="modal-actions-header">
          <div className="modal-actions-left">
            <div className="modal-actions-brand">
              <FileText size={18} className="text-glow-accent" />
              <span className="modal-actions-title">Curriculum Vitae</span>
            </div>
            
            {/* View Toggle */}
            <div className="cv-view-toggle glass-card">
              <button 
                className={`toggle-tab ${activeView === 'interactive' ? 'active' : ''}`}
                onClick={() => setActiveView('interactive')}
              >
                Interactive
              </button>
              <button 
                className={`toggle-tab ${activeView === 'pdf' ? 'active' : ''}`}
                onClick={() => setActiveView('pdf')}
              >
                Original View (PDF)
              </button>
            </div>
          </div>

          <div className="modal-actions-right">
            <a 
              href="#/cv" 
              className="btn-action-icon cv-open-page-btn"
              onClick={onClose}
              title="Open Full Page /cv Route"
            >
              <ExternalLink size={14} />
              <span>Full Page /cv</span>
            </a>
            
            <button className="btn-action-icon" onClick={handlePrint} title="Print or Save PDF">
              <Printer size={15} />
              <span>Print / Save</span>
            </button>
            
            <a 
              href={cvPdfPath} 
              download="Theekshana_Thushan_CV.pdf" 
              className="btn-action-icon btn-action-primary" 
              title="Download ATS-Friendly PDF"
            >
              <Download size={15} />
              <span>Download CV</span>
            </a>
            
            <button className="btn-action-close" onClick={onClose} title="Close Modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* CV Display Body */}
        {activeView === 'interactive' ? (
          <div className="cv-modal-content cv-printable-area">
            
            {/* Top Header */}
            <div className="cv-header">
              <div className="cv-header-text">
                <h1 className="cv-name">{content.personal.name}</h1>
                <p className="cv-title-sub">{content.personal.tagline}</p>
              </div>
              
              <div className="cv-contact-grid">
                <div className="cv-contact-item">
                  <Mail size={14} className="cv-icon" />
                  <a href={`mailto:${content.personal.email}`}>{content.personal.email}</a>
                </div>
                <div className="cv-contact-item">
                  <Linkedin size={14} className="cv-icon" />
                  <a href={content.personal.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn Profile</a>
                </div>
                <div className="cv-contact-item">
                  <Github size={14} className="cv-icon" />
                  <a href={content.personal.githubUrl} target="_blank" rel="noreferrer">github.com/theekshanathushan</a>
                </div>
                <div className="cv-contact-item">
                  <Globe size={14} className="cv-icon" />
                  <a href={content.personal.portfolioUrl} target="_blank" rel="noreferrer">theekshanathushan.dev</a>
                </div>
                {contributionsCount > 0 && (
                  <div className="cv-contact-item cv-activity-item" title="Verified GitHub contributions in the last 365 days">
                    <span className="cv-activity-live-dot" aria-hidden="true"></span>
                    <span className="cv-activity-text">
                      <strong>{contributionsCount.toLocaleString()}</strong> GitHub contributions in the last year
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="cv-divider"></div>

            {/* Two-Column Body Grid */}
            <div className="cv-body-grid">
              
              {/* Left Column: Profile & Education */}
              <div className="cv-body-left">
                
                {/* Professional Profile (3 Sharp Outcome-Focused Sentences) */}
                <div className="cv-section">
                  <h3 className="cv-section-title">
                    <FileText size={16} className="cv-section-icon" /> Professional Profile
                  </h3>
                  <div className="cv-profile-box">
                    <p className="cv-desc-p">{content.profile.sentences[0]}</p>
                    <p className="cv-desc-p">{content.profile.sentences[1]}</p>
                    <p className="cv-desc-p">{content.profile.sentences[2]}</p>
                  </div>
                </div>

                {/* Education */}
                <div className="cv-section">
                  <h3 className="cv-section-title">
                    <GraduationCap size={16} className="cv-section-icon" /> Education
                  </h3>
                  
                  {content.education.map((edu, idx) => (
                    <div key={idx} className="cv-exp-item">
                      <div className="cv-exp-header">
                        <h4 className="cv-item-title">{edu.degree}</h4>
                        <span className="cv-item-date">{edu.period}</span>
                      </div>
                      <p className="cv-item-subtitle">{edu.institution}</p>
                      {edu.details && <p className="cv-edu-p">{edu.details}</p>}
                      {edu.keyModules && (
                        <div className="cv-modules-wrap">
                          <span className="cv-modules-label">Core Modules:</span>
                          <ul className="cv-bullets-compact">
                            {edu.keyModules.map((m, mIdx) => (
                              <li key={mIdx}>{m}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Technical Skills Grouped */}
                <div className="cv-section">
                  <h3 className="cv-section-title">
                    <Code size={16} className="cv-section-icon" /> Technical Stack
                  </h3>
                  <div className="cv-skills-stacked">
                    {content.skills.map((group) => (
                      <div key={group.category} className="cv-skill-group">
                        <span className="cv-skill-group-name">{group.category}</span>
                        <div className="cv-skills-tags-wrap">
                          {group.skills.map(s => (
                            <span key={s} className="cv-skill-tag">{s}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Key Projects */}
              <div className="cv-body-right">
                
                <div className="cv-section">
                  <h3 className="cv-section-title">
                    <Briefcase size={16} className="cv-section-icon" /> Key Projects
                  </h3>

                  {content.projects.map((project) => (
                    <div key={project.id} className="cv-exp-item">
                      <div className="cv-exp-header">
                        <h4 className="cv-item-title">{project.title}: {project.subtitle}</h4>
                        <span className="cv-item-date">{project.period}</span>
                      </div>
                      <p className="cv-item-tech">
                        Tech Stack: {project.techStack.join(', ')}
                      </p>
                      <ul className="cv-exp-bullets">
                        {project.bullets.map((bullet, bIdx) => (
                          <li key={bIdx}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Hackathons & Competitions */}
                {content.hackathons && content.hackathons.length > 0 && (
                  <div className="cv-section">
                    <h3 className="cv-section-title">
                      <Trophy size={16} className="cv-section-icon" /> Hackathons & Competitions
                    </h3>
                    {content.hackathons.map((hack, hIdx) => (
                      <div key={hack.id || hIdx} className="cv-exp-item">
                        <div className="cv-exp-header">
                          <h4 className="cv-item-title">{hack.name} — {hack.track}</h4>
                          <span className="cv-item-date">{hack.date}</span>
                        </div>
                        <p className="cv-item-subtitle">{hack.organizer} | Role: {hack.myRole}</p>
                        <p className="cv-exp-desc">{hack.summary}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Certifications & Credentials */}
                {content.certifications && content.certifications.length > 0 && (
                  <div className="cv-section">
                    <h3 className="cv-section-title">
                      <Award size={16} className="cv-section-icon" /> Certifications & Credentials
                    </h3>
                    {content.certifications.map((cert, cIdx) => (
                      <div key={cert.id || cIdx} className="cv-exp-item">
                        <div className="cv-exp-header">
                          <h4 className="cv-item-title">{cert.title}</h4>
                          <span className="cv-item-date">{cert.issueDate}</span>
                        </div>
                        <p className="cv-item-subtitle">{cert.issuer} | Category: {cert.category}</p>
                        {cert.skills && cert.skills.length > 0 && (
                          <p className="cv-item-tech">Skills: {cert.skills.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>

            </div>
          </div>
        ) : (
          /* Original PDF View */
          <div className="cv-pdf-viewer-wrap">
            <div className="cv-pdf-toolbar">
              <span>Displaying searchable ATS-compliant document (public/Theekshana_Thushan_CV.pdf)</span>
              <a href={cvPdfPath} download="Theekshana_Thushan_CV.pdf" className="btn btn-primary btn-sm">
                <Download size={14} /> Download PDF
              </a>
            </div>
            <iframe 
              src={`${cvPdfPath}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Theekshana Thushan CV PDF"
              className="cv-pdf-iframe"
            />
          </div>
        )}

      </div>

      {/* Scoped CSS for CV Modal */}
      <style>{`
        .cv-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 4, 8, 0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cv-modal-card {
          width: 100%;
          max-width: 980px;
          height: 90vh;
          max-height: 950px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(12, 12, 22, 0.96);
          border: 1px solid var(--border-glass-hover);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(var(--accent-rgb), 0.12);
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* --- Header Actions --- */
        .modal-actions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
          flex-wrap: wrap;
          gap: 12px;
        }

        .modal-actions-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .modal-actions-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-actions-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
        }

        .cv-view-toggle {
          display: flex;
          padding: 3px;
          border-radius: 8px;
          gap: 4px;
          background: rgba(0, 0, 0, 0.3);
        }

        .toggle-tab {
          padding: 5px 12px;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-tab.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-white);
        }

        .modal-actions-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-action-icon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-icon:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
        }

        .btn-action-primary {
          background: var(--gradient-accent);
          color: var(--bg-dark);
          border: none;
        }

        .btn-action-primary:hover {
          color: var(--bg-dark);
          box-shadow: 0 0 15px var(--accent);
        }

        .btn-action-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .btn-action-close:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.08);
        }

        /* --- Interactive Content --- */
        .cv-modal-content {
          overflow-y: auto;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }

        .cv-name {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-white);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: -0.01em;
        }

        .cv-title-sub {
          font-size: 13.5px;
          color: var(--accent);
          font-family: var(--font-mono);
          margin: 0;
        }

        .cv-contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 16px;
        }

        @media (max-width: 600px) {
          .cv-contact-grid {
            grid-template-columns: 1fr;
          }
        }

        .cv-contact-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .cv-contact-item a {
          color: var(--text-light);
          text-decoration: none;
          transition: color 0.2s;
        }

        .cv-contact-item a:hover {
          color: var(--accent);
        }

        .cv-activity-item {
          color: var(--text-light);
          grid-column: 1 / -1;
          background: rgba(var(--accent-rgb), 0.05);
          border: 1px solid rgba(var(--accent-rgb), 0.18);
          border-radius: 6px;
          padding: 4px 10px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 4px;
        }

        .cv-activity-live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          flex-shrink: 0;
        }

        .cv-activity-text {
          font-size: 11.5px;
          color: var(--text-light);
        }

        .cv-activity-text strong {
          color: var(--accent);
          font-weight: 700;
        }

        .cv-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .cv-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        /* Body Grid */
        .cv-body-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .cv-body-grid {
            grid-template-columns: 1fr;
          }
        }

        .cv-body-left, .cv-body-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cv-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 6px;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .cv-section-icon {
          color: var(--accent);
        }

        .cv-profile-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cv-desc-p {
          font-size: 12.5px;
          color: var(--text-light);
          line-height: 1.55;
          margin: 0;
        }

        .cv-exp-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 14px;
        }

        .cv-exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 8px;
        }

        .cv-item-title {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .cv-item-date {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--accent);
          white-space: nowrap;
        }

        .cv-item-subtitle {
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }

        .cv-item-tech {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          font-style: italic;
          margin: 2px 0 4px 0;
        }

        .cv-edu-p {
          font-size: 11.5px;
          color: var(--text-muted);
          margin: 2px 0;
        }

        .cv-modules-wrap {
          margin-top: 4px;
        }

        .cv-modules-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--text-light);
          display: block;
          margin-bottom: 2px;
        }

        .cv-bullets-compact {
          margin: 0;
          padding-left: 16px;
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .cv-exp-bullets {
          margin: 0;
          padding-left: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cv-exp-bullets li {
          font-size: 12px;
          color: var(--text-light);
          line-height: 1.5;
        }

        .cv-skills-stacked {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cv-skill-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cv-skill-group-name {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          font-weight: 600;
          text-transform: uppercase;
        }

        .cv-skills-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .cv-skill-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          padding: 2px 7px;
          border-radius: 4px;
        }

        /* --- PDF Viewer Pane --- */
        .cv-pdf-viewer-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #0f0f18;
          height: 100%;
          overflow: hidden;
        }

        .cv-pdf-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 12px;
          color: var(--text-muted);
        }

        .btn-sm {
          padding: 6px 14px !important;
          font-size: 12px !important;
        }

        .cv-pdf-iframe {
          flex: 1;
          width: 100%;
          border: none;
          background: #2a2a38;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
