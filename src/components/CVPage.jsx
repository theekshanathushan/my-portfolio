import React from 'react';
import { 
  Printer, 
  Download, 
  ArrowLeft 
} from 'lucide-react';
import { cvData } from '../data/content';

export default function CVPage({ onBack }) {
  const cvPdfPath = `${import.meta.env.BASE_URL}Theekshana_CV.pdf`;

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
            <span className="cv-meta-title">{cvData.personal.fullName} — Curriculum Vitae</span>
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
            download="Theekshana_CV.pdf" 
            className="btn btn-primary cv-action-btn"
            title="Download Authentic ATS-Friendly PDF"
          >
            <Download size={15} />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* A4 Sheet Container */}
      <main className="cv-sheet-outer">
        <article className="cv-sheet-a4" id="cv-printable-document">
          
          {/* Header */}
          <header className="cv-doc-header">
            <h1 className="cv-doc-name">{cvData.personal.fullName}</h1>
            <p className="cv-doc-role">{cvData.personal.role}</p>
            <div className="cv-doc-meta-line">
              <span>{cvData.personal.location}</span>
              <span className="sep">|</span>
              <a href={`mailto:${cvData.personal.email}`}>{cvData.personal.email}</a>
              <span className="sep">|</span>
              <a href={`tel:${cvData.personal.phone}`}>{cvData.personal.phone}</a>
              <span className="sep">|</span>
              <a href={cvData.personal.websiteUrl} target="_blank" rel="noreferrer">{cvData.personal.website}</a>
            </div>
            <div className="cv-doc-meta-line">
              <a href={cvData.personal.linkedinUrl} target="_blank" rel="noreferrer">{cvData.personal.linkedin}</a>
              <span className="sep">|</span>
              <a href={cvData.personal.githubUrl} target="_blank" rel="noreferrer">{cvData.personal.github}</a>
            </div>
          </header>

          {/* Section: SUMMARY */}
          <section className="cv-doc-section">
            <h2 className="cv-sec-title">SUMMARY</h2>
            <hr className="cv-sec-divider" />
            <p className="cv-summary-text">{cvData.summary}</p>
          </section>

          {/* Section: EDUCATION */}
          <section className="cv-doc-section">
            <h2 className="cv-sec-title">EDUCATION</h2>
            <hr className="cv-sec-divider" />
            {cvData.education.map((edu, idx) => (
              <div key={idx} className="cv-edu-row">
                <div className="cv-edu-top">
                  <span className="cv-edu-degree">{edu.degree}</span>
                  <span className="cv-edu-period">{edu.period}</span>
                </div>
                <div className="cv-edu-inst">{edu.institution}</div>
              </div>
            ))}
          </section>

          {/* Section: SOFTWARE DEVELOPMENT SKILLS */}
          <section className="cv-doc-section">
            <h2 className="cv-sec-title">SOFTWARE DEVELOPMENT SKILLS</h2>
            <hr className="cv-sec-divider" />
            <div className="cv-skills-grid">
              <div className="cv-skills-col">
                <div className="cv-skill-item">
                  <strong>Programming Languages:</strong> {cvData.skills.find(s => s.category.includes('Languages'))?.skills.join(', ')}
                </div>
                <div className="cv-skill-item">
                  <strong>Backend Development:</strong> {cvData.skills.find(s => s.category.includes('Backend'))?.skills.join(', ')}
                </div>
                <div className="cv-skill-item">
                  <strong>Dev Tools:</strong> {cvData.skills.find(s => s.category.includes('Dev Tools'))?.skills.join(', ')}
                </div>
              </div>
              <div className="cv-skills-col">
                <div className="cv-skill-item">
                  <strong>Frontend & Mobile:</strong> {cvData.skills.find(s => s.category.includes('Frontend'))?.skills.join(', ')}
                </div>
                <div className="cv-skill-item">
                  <strong>Databases:</strong> {cvData.skills.find(s => s.category.includes('Databases'))?.skills.join(', ')}
                </div>
                <div className="cv-skill-item">
                  <strong>AI & ML:</strong> {cvData.skills.find(s => s.category.includes('AI & ML'))?.skills.join(', ')}
                </div>
              </div>
            </div>
          </section>

          {/* Section: PROJECTS */}
          <section className="cv-doc-section">
            <h2 className="cv-sec-title">PROJECTS</h2>
            <hr className="cv-sec-divider" />
            <div className="cv-projects-list">
              {cvData.projects.map((proj) => (
                <article key={proj.id} className="cv-proj-entry">
                  <div className="cv-proj-header">
                    <div className="cv-proj-title-group">
                      <strong className="cv-proj-title">{proj.title}</strong>{' '}
                      <span className="cv-proj-tag">({proj.tag})</span>
                    </div>
                    <div className="cv-proj-links">
                      {proj.demo && (
                        <>
                          <a href={proj.demo} target="_blank" rel="noreferrer" className="cv-proj-link">
                            {proj.demoLabel || 'Demo'}
                          </a>
                          <span className="sep">|</span>
                        </>
                      )}
                      <a href={proj.github} target="_blank" rel="noreferrer" className="cv-proj-link">
                        {proj.githubLabel}
                      </a>
                    </div>
                  </div>

                  <ul className="cv-proj-bullets">
                    {proj.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>

                  <div className="cv-proj-tech">
                    <strong>Tech Stack:</strong> {proj.techStack}
                  </div>
                </article>
              ))}
            </div>
          </section>

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
          background: rgba(13, 13, 23, 0.9);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cv-toolbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .cv-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e2e8f0;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cv-back-btn:hover {
          color: #38bdf8;
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
        }

        .cv-toolbar-meta {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cv-meta-title {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
        }

        .cv-meta-badge {
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 20px;
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .cv-toolbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cv-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.06);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
        }

        .btn-primary {
          background: #0284c7;
          color: #ffffff;
          border: none;
        }

        .btn-primary:hover {
          background: #0369a1;
        }

        .cv-sheet-outer {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .cv-sheet-a4 {
          width: 100%;
          max-width: 820px;
          background: #ffffff;
          color: #111827;
          border-radius: 6px;
          padding: 36px 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          line-height: 1.45;
          font-size: 11px;
        }

        .cv-doc-header {
          text-align: center;
          margin-bottom: 14px;
        }

        .cv-doc-name {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 4px 0;
          letter-spacing: -0.3px;
        }

        .cv-doc-role {
          font-size: 13px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 6px 0;
        }

        .cv-doc-meta-line {
          font-size: 10px;
          color: #4b5563;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 2px;
        }

        .cv-doc-meta-line a {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .sep {
          color: #9ca3af;
        }

        .cv-doc-section {
          margin-bottom: 12px;
        }

        .cv-sec-title {
          font-size: 11px;
          font-weight: 800;
          color: #111827;
          margin: 0 0 3px 0;
          letter-spacing: 0.4px;
        }

        .cv-sec-divider {
          border: none;
          border-top: 1px solid #111827;
          margin: 0 0 6px 0;
        }

        .cv-summary-text {
          font-size: 10px;
          color: #1f2937;
          margin: 0;
          text-align: justify;
          line-height: 1.4;
        }

        .cv-edu-row {
          margin-bottom: 4px;
        }

        .cv-edu-top {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 10.5px;
          font-weight: 700;
          color: #111827;
        }

        .cv-edu-inst {
          font-size: 10px;
          color: #374151;
        }

        .cv-skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4px 20px;
          font-size: 9.8px;
          color: #1f2937;
        }

        .cv-skill-item {
          margin-bottom: 4px;
          line-height: 1.35;
        }

        .cv-skill-item strong {
          color: #111827;
        }

        .cv-projects-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cv-proj-entry {
          margin-bottom: 2px;
        }

        .cv-proj-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 3px;
        }

        .cv-proj-title {
          font-size: 10.5px;
          font-weight: 700;
          color: #111827;
        }

        .cv-proj-tag {
          font-size: 9.5px;
          font-weight: 600;
          color: #4b5563;
        }

        .cv-proj-links {
          font-size: 9.5px;
          display: flex;
          gap: 5px;
          align-items: center;
        }

        .cv-proj-link {
          color: #1d4ed8;
          text-decoration: underline;
        }

        .cv-proj-bullets {
          margin: 0 0 3px 18px;
          padding: 0;
          font-size: 9.5px;
          color: #1f2937;
          line-height: 1.38;
        }

        .cv-proj-bullets li {
          margin-bottom: 2px;
        }

        .cv-proj-tech {
          font-size: 9.3px;
          color: #374151;
          margin-top: 1px;
        }

        .cv-proj-tech strong {
          color: #111827;
        }

        /* --- Print Optimization Styles --- */
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }

          body * {
            visibility: hidden !important;
          }

          .cv-sheet-outer,
          .cv-sheet-a4,
          .cv-sheet-a4 * {
            visibility: visible !important;
          }

          .no-print,
          .cv-toolbar,
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
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .cv-sheet-a4 {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background: #ffffff !important;
            color: #000000 !important;
          }

          a {
            color: #000000 !important;
            text-decoration: underline !important;
          }
        }
      `}</style>
    </div>
  );
}
