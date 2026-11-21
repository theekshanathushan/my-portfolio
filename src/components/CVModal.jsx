import { useEffect, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileText, 
  ExternalLink 
} from 'lucide-react';
import { cvData } from '../data/content';

export default function CVModal({ isOpen, onClose }) {
  const [activeView, setActiveView] = useState('interactive'); // 'interactive' | 'pdf'

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

  if (!isOpen) return null;

  const handlePrint = () => {
    if (activeView === 'pdf') {
      const iframe = document.querySelector('.cv-pdf-iframe');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
          return;
        } catch {
          // fallback to window.print()
        }
      }
    }
    window.print();
  };

  const cvPdfPath = `${import.meta.env.BASE_URL}Theekshana_CV.pdf`;

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Action Panel (Hidden on Print) */}
        <div className="modal-actions-header no-print">
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
              download="Theekshana_CV.pdf" 
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
            <article className="cv-document-sheet" id="cv-interactive-sheet">
              
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
          </div>
        ) : (
          /* Original PDF View */
          <div className="cv-pdf-viewer-wrap">
            <div className="cv-pdf-toolbar no-print">
              <span>Displaying authentic ATS-compliant document (Theekshana_CV.pdf)</span>
              <a href={cvPdfPath} download="Theekshana_CV.pdf" className="btn btn-primary btn-sm">
                <Download size={14} /> Download PDF
              </a>
            </div>
            <iframe 
              src={`${cvPdfPath}#toolbar=0&navpanes=0&scrollbar=1`}
              title="Theekshana CV PDF"
              className="cv-pdf-iframe"
            />
          </div>
        )}

      </div>

      {/* Scoped CSS for CV Modal and Print */}
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
          max-width: 960px;
          height: 92vh;
          max-height: 960px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: #0f111a;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.85);
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-actions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
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
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
        }

        .cv-view-toggle {
          display: flex;
          padding: 3px;
          border-radius: 8px;
          gap: 4px;
          background: rgba(0, 0, 0, 0.4);
        }

        .toggle-tab {
          padding: 5px 12px;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: #94a3b8;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .toggle-tab.active {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
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
          padding: 6px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #e2e8f0;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-icon:hover {
          color: #38bdf8;
          border-color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
        }

        .btn-action-primary {
          background: #0284c7;
          color: #ffffff;
          border: none;
        }

        .btn-action-primary:hover {
          background: #0369a1;
          color: #ffffff;
        }

        .btn-action-close {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .btn-action-close:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        /* --- Interactive Content Sheet --- */
        .cv-modal-content {
          overflow-y: auto;
          padding: 24px 20px;
          background: #0a0b12;
          display: flex;
          justify-content: center;
        }

        .cv-document-sheet {
          width: 100%;
          max-width: 820px;
          background: #ffffff;
          color: #111827;
          border-radius: 6px;
          padding: 32px 36px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
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
          background: rgba(255, 255, 255, 0.04);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-size: 12px;
          color: #94a3b8;
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

        /* --- Print Mode: Only the clean A4 CV Sheet prints --- */
        @media print {
          @page {
            size: A4;
            margin: 8mm;
          }

          body * {
            visibility: hidden !important;
          }

          .cv-modal-overlay,
          .cv-modal-card,
          .cv-modal-content,
          .cv-document-sheet,
          .cv-document-sheet * {
            visibility: visible !important;
          }

          .no-print,
          .modal-actions-header,
          .cv-view-toggle,
          .navbar-container,
          .custom-cursor,
          .custom-cursor-ring,
          .ambient-bg,
          .footer-wrap {
            display: none !important;
          }

          .cv-modal-overlay {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .cv-modal-card {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .cv-modal-content {
            padding: 0 !important;
            background: #ffffff !important;
          }

          .cv-document-sheet {
            max-width: 100% !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
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
