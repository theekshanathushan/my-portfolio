import { useEffect, useState } from 'react';
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
  const [activeView, setActiveView] = useState('interactive');

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
            <div className="modal-actions-brand">
              <FileText size={18} className="text-glow-accent" />
              <span className="modal-actions-title">Curriculum Vitae</span>
            </div>
            
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
                Official PDF
              </button>
            </div>
          </div>
          <div className="modal-actions-right">
            {activeView === 'interactive' && (
              <button className="btn-action-icon" onClick={handlePrint} title="Print Resume">
                <Printer size={16} />
                <span>Print / Save</span>
              </button>
            )}
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
        {activeView === 'interactive' ? (
          <div className="cv-modal-content cv-printable-area">
          
          {/* Main Top Header */}
          <div className="cv-header">
            <div className="cv-header-text">
              <h1 className="cv-name">Theekshana Thushan</h1>
              <p className="cv-title-sub">Undergraduate Student</p>
            </div>
            
            <div className="cv-contact-grid">
              <div className="cv-contact-item">
                <Mail size={14} className="cv-icon" />
                <a href="mailto:theekshanathushan89@gmail.com">theekshanathushan89@gmail.com</a>
              </div>
              <div className="cv-contact-item">
                <Phone size={14} className="cv-icon" />
                <a href="tel:0772921684">0772921684</a>
              </div>
              <div className="cv-contact-item">
                <MapPin size={14} className="cv-icon" />
                <span>No 62, Bategallana, Mahagama</span>
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
                  A highly motivated Computer Science undergraduate at NSBM University (expected 2028) with a strong foundation in full-stack development. Proficient in building robust, scalable web applications using Java, Spring Boot, React, and MySQL. Experienced in delivering end-to-end solutions, from e-commerce platforms to enterprise management systems. Passionate about writing clean code and applying usability heuristics to create intuitive, user-centric digital experiences.
                </p>
              </div>

              {/* Education */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <GraduationCap size={16} className="cv-section-icon" /> Education
                </h3>
                <div className="cv-edu-item" style={{ marginBottom: '16px' }}>
                  <h4 className="cv-item-title">BSc (Honours) in Computer Science</h4>
                  <p className="cv-item-subtitle">NSBM Green University | 2024 - 2028</p>
                </div>
                <div className="cv-edu-item">
                  <h4 className="cv-item-title">G.C.E (A/L) Examination</h4>
                  <p className="cv-item-subtitle">Ananda Sasthralaya Mathugama | 2023</p>
                  <ul className="cv-bullets" style={{ marginTop: '4px', fontSize: '12.5px' }}>
                    <li>Physics - S</li>
                    <li>Combined Mathematics - C</li>
                    <li>Information and Communication Technology - B</li>
                  </ul>
                </div>
              </div>

              {/* Soft Skills */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Code size={16} className="cv-section-icon" /> Soft Skills
                </h3>
                <ul className="cv-bullets">
                  <li>Project Management</li>
                  <li>Public Relations</li>
                  <li>Teamwork</li>
                  <li>Time Management</li>
                  <li>Leadership</li>
                  <li>Effective Communication</li>
                  <li>Critical Thinking</li>
                  <li>Digital Marketing</li>
                </ul>
              </div>

              {/* Languages */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Globe size={16} className="cv-section-icon" /> Languages
                </h3>
                <ul className="cv-bullets">
                  <li>English (Intermediate)</li>
                  <li>Sinhala (Fluent)</li>
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
                    <h4 className="cv-item-title">Teckzuno: E-Business Store Platform</h4>
                    <span className="cv-item-date">2026 - NOW</span>
                  </div>
                  <p className="cv-item-subtitle" style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    Tech Stack: Java 17, Spring Boot, Spring Security (JWT), MySQL, WebSockets, Google OAuth2, Vanilla JavaScript
                  </p>
                  <ul className="cv-exp-bullets">
                    <li>Built a responsive, full-stack e-commerce application featuring secure JWT-based authentication and Google OAuth2 integration for streamlined user access.</li>
                    <li>Developed a dynamic product catalog with a real-time "in-stock" search autocomplete. Engineered a shopping cart and checkout system that automatically routes order confirmations and details through WhatsApp.</li>
                    <li>Created a user order tracking interface equipped with printable HTML invoice generation. Implemented an interactive customer support chat widget, a dynamic dark/light theme toggle, and a dedicated Admin dashboard for managing inventory and sales analytics.</li>
                  </ul>
                </div>

                <div className="cv-exp-item">
                  <div className="cv-exp-header">
                    <h4 className="cv-item-title">CareConnect: Disaster Relief Support System</h4>
                    <span className="cv-item-date">2025 - 2025</span>
                  </div>
                  <p className="cv-item-subtitle" style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    Tech Stack: Java 17, Spring Boot, MySQL, WebSockets, JavaScript, Leaflet.js
                  </p>
                  <ul className="cv-exp-bullets">
                    <li>Built a crisis coordination platform to efficiently connect displaced persons, donors, and government officials.</li>
                    <li>Integrated Leaflet.js to create a live, geographic operations map tracking help requests and active donors.</li>
                    <li>Developed real-time chat functionality, dynamic donation processing, and a comprehensive resource allocation dashboard.</li>
                  </ul>
                </div>

                <div className="cv-exp-item">
                  <div className="cv-exp-header">
                    <h4 className="cv-item-title">PharmaCare: Local Pharmacy Stock & Delivery System</h4>
                    <span className="cv-item-date">2024 - 2025</span>
                  </div>
                  <p className="cv-item-subtitle" style={{ fontStyle: 'italic', fontSize: '12px' }}>
                    Tech Stack: Java 21, Spring Boot, Spring Security (JWT), MySQL, WebSockets
                  </p>
                  <ul className="cv-exp-bullets">
                    <li>Developed a secure, multi-role e-commerce platform for local pharmacy management and delivery.</li>
                    <li>Implemented JWT-based authentication to manage distinct access for customers, pharmacists, delivery staff, and admins.</li>
                    <li>Engineered features for digital prescription uploads, real-time order tracking, and centralized inventory monitoring.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="cv-section">
                <h3 className="cv-section-title">
                  <Code size={16} className="cv-section-icon" /> Technical Skills
                </h3>
                <div className="cv-skills-grid">
                  <div className="cv-skill-tag">Java</div>
                  <div className="cv-skill-tag">Spring Boot</div>
                  <div className="cv-skill-tag">Spring Security (JWT)</div>
                  <div className="cv-skill-tag">React</div>
                  <div className="cv-skill-tag">JavaScript</div>
                  <div className="cv-skill-tag">MySQL</div>
                  <div className="cv-skill-tag">WebSockets</div>
                  <div className="cv-skill-tag">Google OAuth2</div>
                  <div className="cv-skill-tag">Leaflet.js</div>
                  <div className="cv-skill-tag">HTML5 / CSS3</div>
                  <div className="cv-skill-tag">Git & GitHub</div>
                </div>
              </div>

            </div>

          </div>
        </div>
        ) : (
          <div className="cv-pdf-viewer">
            <object 
              data={cvPath} 
              type="application/pdf" 
              width="100%" 
              height="100%"
              className="cv-pdf-object"
            >
              <iframe 
                src={`${cvPath}#toolbar=0`}
                title="Theekshana Thushan CV PDF" 
                width="100%" 
                height="100%"
                style={{ border: 'none' }}
              />
            </object>
          </div>
        )}

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

        .modal-actions-brand {
          display: flex;
          align-items: center;
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

        .cv-pdf-viewer {
          flex-grow: 1;
          height: calc(90vh - 70px);
          background: #0d0d16;
          display: flex;
          flex-direction: column;
        }

        .cv-pdf-object {
          width: 100%;
          height: 100%;
          border: none;
        }

        .cv-view-toggle {
          display: flex;
          padding: 2px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          margin-left: 20px;
        }

        @media (max-width: 640px) {
          .cv-modal-overlay {
            padding: 8px;
          }
          
          .cv-modal-card {
            max-height: 96vh;
            border-radius: 12px;
          }

          .modal-actions-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            padding: 12px 16px;
            position: relative;
          }

          .modal-actions-left {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            width: 100%;
          }

          .modal-actions-brand {
            margin-bottom: 2px;
          }

          .cv-view-toggle {
            margin-left: 0;
            width: 100%;
            display: flex;
          }

          .toggle-tab {
            flex: 1;
            text-align: center;
            padding: 6px 10px;
          }

          .modal-actions-right {
            width: 100%;
            justify-content: stretch;
            gap: 8px;
          }

          .btn-action-icon {
            flex: 1;
            justify-content: center;
            padding: 8px 10px;
            font-size: 11px;
          }

          .btn-action-close {
            position: absolute;
            right: 12px;
            top: 12px;
            margin-left: 0;
            padding: 6px;
          }

          .cv-modal-content {
            padding: 20px;
          }

          .cv-contact-item {
            word-break: break-all;
            overflow-wrap: break-word;
          }

          .cv-contact-item a {
            word-break: break-all;
            overflow-wrap: break-word;
          }

          .cv-exp-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
        }

        @media (max-width: 480px) {
          .btn-action-icon span {
            display: none;
          }
          
          .btn-action-icon {
            padding: 8px;
            border-radius: 50%;
            width: 36px;
            height: 36px;
            flex: 0 0 auto;
            justify-content: center;
          }

          .modal-actions-right {
            justify-content: flex-end;
            gap: 12px;
          }
        }

        .toggle-tab {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-sans);
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 6px 14px;
          border-radius: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .toggle-tab:hover {
          color: var(--text-white);
        }

        .toggle-tab.active {
          background: var(--accent);
          color: var(--bg-dark);
          box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.3);
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
