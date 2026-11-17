import React from 'react';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  Mail, 
  Globe 
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

export default function CVPage({ onBack }) {
  const cvPdfPath = `${import.meta.env.BASE_URL}Theekshana_Thushan_CV.pdf`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cv-route-wrapper">
      
      {/* Non-printed Top Toolbar */}
      <header className="cv-toolbar glass-card no-print">
        <div className="cv-toolbar-left">
          <button 
            className="cv-back-btn" 
            onClick={onBack || (() => { window.location.hash = '#home'; })}
            title="Return to Portfolio"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>
          <div className="cv-toolbar-meta">
            <span className="cv-meta-title">Theekshana Thushan — Curriculum Vitae</span>
            <span className="cv-meta-badge">A4 Print Ready</span>
          </div>
        </div>

        <div className="cv-toolbar-actions">
          <button 
            className="btn btn-secondary cv-action-btn" 
            onClick={handlePrint}
            title="Print or Save as PDF"
          >
            <Printer size={15} />
            <span>Print / Save</span>
          </button>
          <a 
            href={cvPdfPath} 
            download="Theekshana_Thushan_CV.pdf" 
            className="btn btn-primary cv-action-btn"
            title="Download Searchable ATS-Friendly PDF"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* A4 Sheet Container */}
      <main className="cv-sheet-outer">
        <article className="cv-sheet-a4" id="cv-printable-document">
          
          {/* Header (ATS-Friendly Single Column, No Phone/Address/DOB) */}
          <header className="cv-doc-header">
            <h1 className="cv-doc-name">{content.personal.name}</h1>
            <p className="cv-doc-tagline">{content.personal.tagline}</p>
            
            {/* Links Bar */}
            <div className="cv-doc-links">
              <a href={`mailto:${content.personal.email}`} className="cv-doc-link">
                <Mail size={12} className="link-icon" />
                <span>{content.personal.email}</span>
              </a>
              <span className="link-divider">|</span>
              <a href={content.personal.linkedinUrl} target="_blank" rel="noreferrer" className="cv-doc-link">
                <Linkedin size={12} className="link-icon" />
                <span>LinkedIn</span>
              </a>
              <span className="link-divider">|</span>
              <a href={content.personal.githubUrl} target="_blank" rel="noreferrer" className="cv-doc-link">
                <Github size={12} className="link-icon" />
                <span>GitHub</span>
              </a>
              <span className="link-divider">|</span>
              <a href={content.personal.portfolioUrl} target="_blank" rel="noreferrer" className="cv-doc-link">
                <Globe size={12} className="link-icon" />
                <span>theekshanathushan.dev</span>
              </a>
            </div>
          </header>

          <hr className="cv-doc-rule" />

          {/* Section: Professional Summary (3 Outcome-Focused Sentences) */}
          <section className="cv-doc-section">
            <h2 className="cv-section-heading">PROFESSIONAL SUMMARY</h2>
            <div className="cv-section-body">
              <p className="cv-profile-text">
                {content.profile.sentences[0]}{' '}
                {content.profile.sentences[1]}{' '}
                {content.profile.sentences[2]}
              </p>
            </div>
          </section>

          {/* Section: Technical Skills */}
          <section className="cv-doc-section">
            <h2 className="cv-section-heading">TECHNICAL SKILLS</h2>
            <div className="cv-section-body cv-skills-list">
              {content.skills.map((group) => (
                <div key={group.category} className="cv-skill-row">
                  <span className="cv-skill-category">{group.category}:</span>
                  <span className="cv-skill-items">{group.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Key Projects */}
          <section className="cv-doc-section">
            <h2 className="cv-section-heading">KEY PROJECTS</h2>
            <div className="cv-section-body cv-projects-list">
              {content.projects.map((project) => (
                <article key={project.id} className="cv-project-entry">
                  <div className="cv-project-header">
                    <h3 className="cv-project-title">
                      {project.title} — {project.subtitle}
                    </h3>
                    <span className="cv-project-period">{project.period}</span>
                  </div>
                  <p className="cv-project-tech">
                    <strong>Tech Stack:</strong> {project.techStack.join(', ')}
                  </p>
                  <ul className="cv-project-bullets">
                    {project.bullets.map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Section: Education */}
          <section className="cv-doc-section">
            <h2 className="cv-section-heading">EDUCATION</h2>
            <div className="cv-section-body cv-edu-list">
              {content.education.map((edu, idx) => (
                <div key={idx} className="cv-edu-entry">
                  <div className="cv-edu-header">
                    <h3 className="cv-edu-degree">{edu.degree}</h3>
                    <span className="cv-edu-period">{edu.period}</span>
                  </div>
                  <p className="cv-edu-institution">{edu.institution}</p>
                  {edu.details && <p className="cv-edu-details">{edu.details}</p>}
                  {edu.keyModules && (
                    <p className="cv-edu-modules">
                      <strong>Relevant Coursework:</strong> {edu.keyModules.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section: Hackathons & Competitions */}
          {content.hackathons && content.hackathons.length > 0 && (
            <section className="cv-doc-section">
              <h2 className="cv-section-heading">HACKATHONS & SPRINT COMPETITIONS</h2>
              <div className="cv-section-body cv-projects-list">
                {content.hackathons.map((hack, hIdx) => (
                  <article key={hack.id || hIdx} className="cv-project-entry">
                    <div className="cv-project-header">
                      <h3 className="cv-project-title">
                        {hack.name} — {hack.track}
                      </h3>
                      <span className="cv-project-period">{hack.date}</span>
                    </div>
                    <p className="cv-project-tech">
                      <strong>Organizer:</strong> {hack.organizer} | <strong>Role:</strong> {hack.myRole} | <strong>Result:</strong> {hack.result}
                    </p>
                    <p className="cv-edu-details">{hack.summary}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Section: Certifications & Credentials */}
          {content.certifications && content.certifications.length > 0 && (
            <section className="cv-doc-section">
              <h2 className="cv-section-heading">CERTIFICATIONS & PROFESSIONAL CREDENTIALS</h2>
              <div className="cv-section-body cv-skills-list">
                {content.certifications.map((cert, cIdx) => (
                  <div key={cert.id || cIdx} className="cv-skill-row">
                    <span className="cv-skill-category">{cert.title} ({cert.issuer}):</span>
                    <span className="cv-skill-items">Issued {cert.issueDate} | Skills: {cert.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

        </article>
      </main>

      {/* Scoped CSS for Route and Print Optimization */}
      <style>{`
        .cv-route-wrapper {
          min-height: 100vh;
          background: #08080e;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 24px 16px 60px;
        }

        /* --- Toolbar --- */
        .cv-toolbar {
          width: 100%;
          max-width: 860px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-radius: 14px;
          margin-bottom: 24px;
          position: sticky;
          top: 16px;
          z-index: 100;
          background: rgba(13, 13, 23, 0.85);
          backdrop-filter: blur(14px);
          border: 1px solid var(--border-glass);
        }

        .cv-toolbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cv-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          padding: 8px 14px;
          border-radius: 8px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cv-back-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
        }

        .cv-toolbar-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 650px) {
          .cv-toolbar-meta {
            display: none;
          }
        }

        .cv-meta-title {
          font-size: 13px;
          color: var(--text-light);
          font-weight: 600;
        }

        .cv-meta-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .cv-toolbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cv-action-btn {
          padding: 8px 16px !important;
          font-size: 13px !important;
          cursor: pointer;
        }

        /* --- A4 Document Sheet --- */
        .cv-sheet-outer {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .cv-sheet-a4 {
          width: 210mm;
          min-height: 297mm;
          padding: 16mm 18mm;
          background: #ffffff;
          color: #1a1a24;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.45;
        }

        /* --- Document Typography & Sections --- */
        .cv-doc-header {
          text-align: left;
        }

        .cv-doc-name {
          font-family: 'Space Grotesk', -apple-system, sans-serif;
          font-size: 24px;
          font-weight: 800;
          color: #0b0c16;
          letter-spacing: -0.02em;
          margin: 0 0 3px 0;
          text-transform: uppercase;
        }

        .cv-doc-tagline {
          font-size: 12px;
          color: #4b5563;
          margin: 0 0 8px 0;
          font-weight: 500;
        }

        .cv-doc-links {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 11px;
          color: #2563eb;
        }

        .cv-doc-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #1e40af;
          text-decoration: none;
          font-weight: 500;
        }

        .cv-doc-link:hover {
          text-decoration: underline;
        }

        .link-icon {
          color: #4b5563;
        }

        .link-divider {
          color: #cbd5e1;
        }

        .cv-doc-rule {
          border: none;
          border-top: 1.5px solid #0f172a;
          margin: 4px 0 6px 0;
        }

        .cv-doc-section {
          margin-bottom: 6px;
        }

        .cv-section-heading {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: 0.05em;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 2px;
          margin: 0 0 6px 0;
          text-transform: uppercase;
        }

        .cv-profile-text {
          font-size: 11px;
          color: #334155;
          margin: 0;
          line-height: 1.5;
        }

        /* Skills */
        .cv-skills-list {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .cv-skill-row {
          font-size: 11px;
          line-height: 1.45;
        }

        .cv-skill-category {
          font-weight: 700;
          color: #0f172a;
          margin-right: 6px;
        }

        .cv-skill-items {
          color: #334155;
        }

        /* Projects */
        .cv-projects-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cv-project-entry {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .cv-project-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .cv-project-title {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .cv-project-period {
          font-size: 10.5px;
          color: #64748b;
          font-weight: 600;
          font-family: 'Fira Code', monospace;
        }

        .cv-project-tech {
          font-size: 10px;
          color: #475569;
          font-style: italic;
          margin: 0 0 2px 0;
        }

        .cv-project-tech strong {
          font-style: normal;
          color: #1e293b;
        }

        .cv-project-bullets {
          margin: 0;
          padding-left: 16px;
          list-style-type: disc;
        }

        .cv-project-bullets li {
          font-size: 10.5px;
          color: #334155;
          line-height: 1.42;
          margin-bottom: 2px;
        }

        /* Education */
        .cv-edu-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cv-edu-entry {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .cv-edu-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .cv-edu-degree {
          font-size: 11.5px;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .cv-edu-period {
          font-size: 10.5px;
          color: #64748b;
          font-weight: 600;
          font-family: 'Fira Code', monospace;
        }

        .cv-edu-institution {
          font-size: 11px;
          color: #334155;
          margin: 0;
        }

        .cv-edu-details, .cv-edu-modules {
          font-size: 10px;
          color: #64748b;
          margin: 1px 0 0 0;
        }

        .cv-edu-modules strong {
          color: #334155;
        }

        /* --- Print Optimization Styles --- */
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }

          body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .no-print,
          .navbar-container,
          .custom-cursor,
          .custom-cursor-ring,
          .ambient-bg,
          .grid-overlay,
          .footer-wrap {
            display: none !important;
          }

          .cv-route-wrapper {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
          }

          .cv-sheet-outer {
            padding: 0 !important;
            margin: 0 !important;
          }

          .cv-sheet-a4 {
            width: 100% !important;
            min-height: auto !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
          }

          a {
            color: #000000 !important;
            text-decoration: none !important;
          }
        }
      `}</style>
    </div>
  );
}
