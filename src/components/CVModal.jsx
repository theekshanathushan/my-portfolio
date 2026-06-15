import React, { useEffect } from 'react';
import { X, Download, Printer, Mail, MapPin, Briefcase, GraduationCap, Code, Globe, Phone, FileText } from 'lucide-react';

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
  // Disable body scroll when modal is open
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
    window.print();
  };

  const cvPath = `${import.meta.env.BASE_URL}cv.pdf`;

  return (
    <div className="cv-modal-overlay" onClick={onClose}>
      <div className="cv-modal-card glass-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Action Panel */}
        <div className="modal-actions-header">
          <div className="modal-actions-left">
            <FileText size={18} className="text-glow-accent" />
            <span className="modal-actions-title">Curriculum Vitae</span>
          </div>
          <div className="modal-actions-right">
            <button className="btn-action-icon" onClick={handlePrint} title="Print Resume">
              <Printer size={16} />
              <span>Print / Save</span>
            </button>
            <a href={cvPath} download="Theekshana_Thushan_CV.pdf" className="btn-action-icon btn-action-primary" title="Download PDF">
              <Download size={16} />
              <span>Download PDF</span>
            </a>
            <button className="btn-action-close" onClick={onClose} title="Close Modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* CV Display Body */}
        <div className="cv-modal-content cv-printable-area">
          
          {/* Main Top Header */}
          <div className="cv-header">
            <div className="cv-header-text">
              <h1 className="cv-name">Theekshana Thushan</h1>
              <p className="cv-title-sub">Full-Stack Developer & UI/UX Designer</p>
            </div>
            
            <div className="cv-contact-grid">
              <div className="cv-contact-item">
                <Mail size={14} className="cv-icon" />
                <a href="mailto:theekshanathushan89@gmail.com">theekshanathushan89@gmail.com</a>
              </div>
              <div className="cv-contact-item">
                <MapPin size={14} className="cv-icon" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="cv-contact-item">
                <Github size={14} className="cv-icon" />
                <a href="https://github.com/theekshanathushan" target="_blank" rel="noreferrer">github.com/theekshanathushan</a>
              </div>
              <div className="cv-contact-item">
                <Linkedin size={14} className="cv-icon" />
                <a href="https://linkedin.com/in/theekshana-thushan-57b866328" target="_blank" rel="noreferrer">linkedin.com/in/theekshana-thushan-57b866328</a>
              </div>
            </div>
          </div>

          <hr className="cv-divider" />

          {/* CV Body Columns */}
          <div className="cv-body-grid">
            
            {/* Left Column: Profile & Details */}
            <div className="cv-body-left">
              
              {/* Summary */}
              <div className="cv-section">
                <h3 className="cv-section-title">Professional Profile</h3>
                <p className="cv-section-text">
                  A dedicated Full-Stack Developer and UI/UX Designer based in Sri Lanka, passionate about building performant, visually-stunning digital products. Combines a solid software engineering foundation with design system expertise to translate complex business needs into elegant, high-impact user experiences.
                </p>
              </div>

              {/* Education */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <GraduationCap size={16} className="cv-section-icon" /> Education
                </h3>
                <div className="cv-edu-item">
                  <h4 className="cv-item-title">BSc (Hons) in Software Engineering</h4>
                  <p className="cv-item-subtitle">NSBM Green University | 2020 - 2024</p>
                  <p className="cv-item-desc">Focused on advanced systems design, data structures, UI/UX engineering, and modular development frameworks.</p>
                </div>
              </div>

              {/* Languages */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Globe size={16} className="cv-section-icon" /> Languages
                </h3>
                <ul className="cv-bullets">
                  <li><strong>English</strong> - Professional Working Proficiency</li>
                  <li><strong>Sinhala</strong> - Native / Bilingual Proficiency</li>
                </ul>
              </div>

            </div>

            {/* Right Column: Experience & Technical Skills */}
            <div className="cv-body-right">
              
              {/* Experience */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Briefcase size={16} className="cv-section-icon" /> Work Experience
                </h3>
                
                <div className="cv-exp-item">
                  <div className="cv-exp-header">
                    <h4 className="cv-item-title">Full-Stack Developer & UI/UX Designer</h4>
                    <span className="cv-item-date">2024 - Present</span>
                  </div>
                  <p className="cv-item-subtitle">Ceylon Tech Labs</p>
                  <ul className="cv-exp-bullets">
                    <li>Build and optimize React.js frontends and Node.js backend architectures.</li>
                    <li>Design interactive, high-fidelity prototypes and UI component kits in Figma.</li>
                    <li>Conduct code reviews and drive development best practices for client web projects.</li>
                  </ul>
                </div>

                <div className="cv-exp-item">
                  <div className="cv-exp-header">
                    <h4 className="cv-item-title">Associate Software Engineer</h4>
                    <span className="cv-item-date">2022 - 2024</span>
                  </div>
                  <p className="cv-item-subtitle">Apex Digital Solutions</p>
                  <ul className="cv-exp-bullets">
                    <li>Developed secure, robust RESTful APIs and structured data pipelines using MongoDB.</li>
                    <li>Collaborated on design system updates and client portal responsive layouts.</li>
                    <li>Wrote automated unit tests and maintained comprehensive API documentation.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Code size={16} className="cv-section-icon" /> Technical Skills
                </h3>
                <div className="cv-skills-grid">
                  <div className="cv-skill-tag">React.js</div>
                  <div className="cv-skill-tag">Node.js</div>
                  <div className="cv-skill-tag">Express.js</div>
                  <div className="cv-skill-tag">JavaScript (ES6+)</div>
                  <div className="cv-skill-tag">HTML5 / CSS3</div>
                  <div className="cv-skill-tag">MongoDB</div>
                  <div className="cv-skill-tag">RESTful APIs</div>
                  <div className="cv-skill-tag">Vite</div>
                  <div className="cv-skill-tag">UI/UX Design (Figma)</div>
                  <div className="cv-skill-tag">Git & GitHub</div>
                  <div className="cv-skill-tag">Responsive Layouts</div>
                  <div className="cv-skill-tag">Tailwind CSS</div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Styled Sheets */}
      <style>{`
        .cv-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(4, 4, 6, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          overflow-y: auto;
          animation: cvFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .cv-modal-card {
          width: 100%;
          max-width: 850px;
          background: rgba(13, 13, 22, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(var(--accent-rgb), 0.05) inset;
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow: hidden;
          animation: cvScaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .modal-actions-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(255, 255, 255, 0.02);
        }

        .modal-actions-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-white);
          margin-left: 8px;
        }

        .modal-actions-left {
          display: flex;
          align-items: center;
        }

        .modal-actions-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .btn-action-icon {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: var(--text-light);
          padding: 8px 14px;
          font-family: var(--font-sans);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-action-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-white);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .btn-action-icon.btn-action-primary {
          background: var(--accent);
          color: var(--bg-dark);
          font-weight: 600;
          border-color: var(--accent);
          text-decoration: none;
        }

        .btn-action-icon.btn-action-primary:hover {
          background: var(--text-white);
          color: var(--bg-dark);
          border-color: var(--text-white);
          box-shadow: 0 0 15px rgba(var(--accent-rgb), 0.4);
          transform: translateY(-1px);
        }

        .btn-action-close {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
          margin-left: 8px;
        }

        .btn-action-close:hover {
          color: var(--text-white);
        }

        .cv-modal-content {
          padding: 40px;
          overflow-y: auto;
          flex-grow: 1;
          background: radial-gradient(circle at top right, rgba(var(--accent-rgb), 0.03), transparent 60%);
          text-align: left;
        }

        /* CV Text Styles */
        .cv-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          margin-bottom: 24px;
        }

        @media (max-width: 768px) {
          .cv-header {
            flex-direction: column;
            gap: 16px;
          }
        }

        .cv-name {
          font-family: var(--font-heading);
          font-size: 32px;
          font-weight: 800;
          color: var(--text-white);
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .cv-title-sub {
          font-family: var(--font-mono);
          font-size: 15px;
          font-weight: 500;
          color: var(--accent);
        }

        .cv-contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
          font-size: 13px;
        }

        @media (min-width: 576px) and (max-width: 768px) {
          .cv-contact-grid {
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }
        }

        .cv-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-muted);
        }

        .cv-contact-item a {
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .cv-contact-item a:hover {
          color: var(--accent);
        }

        .cv-icon {
          color: var(--accent);
          opacity: 0.85;
          flex-shrink: 0;
        }

        .cv-divider {
          border: 0;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(var(--accent-rgb), 0.15) 50%, rgba(255,255,255,0.08) 100%);
          margin: 0 0 28px 0;
        }

        .cv-body-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .cv-body-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }

        .cv-section {
          margin-bottom: 28px;
        }

        .cv-section-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-white);
          margin-bottom: 16px;
          border-bottom: 2px solid rgba(var(--accent-rgb), 0.3);
          padding-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cv-section-icon {
          color: var(--accent);
        }

        .cv-section-text {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
        }

        .cv-edu-item {
          margin-bottom: 16px;
        }

        .cv-item-title {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--text-white);
          margin-bottom: 3px;
        }

        .cv-item-subtitle {
          font-family: var(--font-sans);
          font-size: 12.5px;
          color: var(--accent);
          margin-bottom: 8px;
          font-weight: 500;
        }

        .cv-item-desc {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .cv-bullets {
          padding-left: 16px;
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.7;
        }

        .cv-bullets li {
          margin-bottom: 6px;
        }

        .cv-exp-item {
          margin-bottom: 20px;
        }

        .cv-exp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 3px;
        }

        .cv-item-date {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 8px;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .cv-exp-bullets {
          padding-left: 16px;
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .cv-exp-bullets li {
          margin-bottom: 6px;
          position: relative;
        }

        .cv-skills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cv-skill-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-light);
          padding: 4px 10px;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .cv-skill-tag:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.05);
        }

        @keyframes cvFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cvScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* PRINT STYLES */
        @media print {
          /* Hide everything in layout except printable area */
          body * {
            visibility: hidden;
          }
          
          .cv-printable-area, .cv-printable-area * {
            visibility: visible;
          }

          .cv-printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: #fff !important;
            color: #111 !important;
          }

          /* Hide Web UI components */
          .cv-modal-overlay {
            background: #fff !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            position: absolute !important;
            overflow: visible !important;
            padding: 0 !important;
            display: block !important;
            z-index: auto !important;
          }

          .cv-modal-card {
            background: #fff !important;
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
            max-width: 100% !important;
            max-height: none !important;
            overflow: visible !important;
            padding: 0 !important;
            margin: 0 !important;
            transform: none !important;
          }

          .modal-actions-header {
            display: none !important;
          }

          /* General tag conversions */
          h1, h2, h3, h4, p, span, li, a {
            color: #111 !important;
            text-shadow: none !important;
          }

          .cv-name {
            color: #000 !important;
            font-size: 28px !important;
          }

          .cv-title-sub {
            color: #222 !important;
            font-size: 14px !important;
            font-weight: 700 !important;
          }

          .cv-icon {
            color: #333 !important;
          }

          .cv-contact-item, .cv-contact-item a {
            color: #333 !important;
          }

          .cv-divider {
            background: #ccc !important;
            margin-bottom: 20px !important;
          }

          .cv-section-title {
            color: #000 !important;
            border-bottom: 2px solid #555 !important;
          }

          .cv-section-icon {
            color: #000 !important;
          }

          .cv-item-title {
            color: #111 !important;
          }

          .cv-item-subtitle {
            color: #444 !important;
          }

          .cv-item-desc {
            color: #555 !important;
          }

          .cv-item-date {
            color: #444 !important;
            background: none !important;
            border: none !important;
            padding: 0 !important;
          }

          .cv-exp-bullets {
            color: #333 !important;
          }

          .cv-skill-tag {
            color: #111 !important;
            background: #f0f0f0 !important;
            border: 1px solid #ccc !important;
          }

          /* Prevent page breaks inside items */
          .cv-edu-item, .cv-exp-item, .cv-section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}
