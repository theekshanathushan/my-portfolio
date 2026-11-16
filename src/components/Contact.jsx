import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Download, 
  ExternalLink,
  Briefcase,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { content } from '../content';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 18} height={props.size || 18} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  const [formState, setFormState] = useState({ 
    name: '', 
    email: '', 
    subject: '', 
    message: '',
    botField: '' // Honeypot field for spam prevention
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const cvPdfPath = `${import.meta.env.BASE_URL}Theekshana_Thushan_CV.pdf`;

  const validateField = (name, value) => {
    let err = '';
    const trimmed = value.trim();

    if (name === 'name') {
      if (!trimmed) err = 'Please enter your name';
      else if (trimmed.length < 2) err = 'Name must be at least 2 characters';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!trimmed) err = 'Please enter your email address';
      else if (!emailRegex.test(trimmed)) err = 'Please enter a valid email address';
    } else if (name === 'subject') {
      if (!trimmed) err = 'Please specify a subject';
      else if (trimmed.length < 3) err = 'Subject must be at least 3 characters';
    } else if (name === 'message') {
      if (!trimmed) err = 'Please enter your message';
      else if (trimmed.length < 10) err = 'Message must be at least 10 characters';
    }
    return err;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check honeypot
    if (formState.botField) {
      setSubmitStatus('success');
      setStatusMessage('Thank you! Your message has been sent.');
      return;
    }
    
    // Validate all fields
    const newErrors = {};
    ['name', 'email', 'subject', 'message'].forEach((key) => {
      const error = validateField(key, formState[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitStatus('sending');
    setStatusMessage('');

    try {
      const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
      let response;

      if (formspreeId) {
        // Direct Formspree submission
        response = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            subject: formState.subject.trim(),
            message: formState.message.trim()
          })
        });
      } else {
        // Vercel Serverless Function (/api/contact)
        response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({
            name: formState.name.trim(),
            email: formState.email.trim(),
            subject: formState.subject.trim(),
            message: formState.message.trim()
          })
        });
      }

      if (response && response.ok) {
        setSubmitStatus('success');
        setStatusMessage('Thank you! Your message has been sent successfully. I usually reply within 24 hours.');
        setFormState({ name: '', email: '', subject: '', message: '', botField: '' });
        setErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to submit form.');
      }
    } catch (err) {
      console.warn('Contact form error fallback:', err);
      // If endpoint is not deployed yet or offline, show error with direct email link
      setSubmitStatus('error');
      setStatusMessage(
        'Could not reach server endpoint. Please email directly at theekshanathushan89@gmail.com.'
      );
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        
        {/* Section Heading */}
        <div className="section-title-wrap">
          <span className="section-subtitle">Get In Touch</span>
          <h2 className="section-title">Hiring or collaborating? Let's talk.</h2>
          <p className="contact-lead-text">
            Actively seeking software engineering internship and graduate opportunities. Whether you have an open role, an engineering challenge, or an innovative collaboration in mind, I welcome the conversation.
          </p>
        </div>

        <div className="contact-grid">
          
          {/* Column 1: Recruiter Contact Details & Quick Actions */}
          <div className="contact-info-col">
            
            {/* Opportunity Status Pill */}
            <div className="recruiter-status-card glass-card">
              <span className="status-live-dot"></span>
              <div className="status-card-content">
                <strong>Current Status: Open to Opportunities</strong>
                <p>Software Engineering Internships & Junior / Graduate Roles.</p>
              </div>
            </div>

            {/* Contact Detail Cards */}
            <div className="contact-cards-stack">
              
              {/* Email */}
              <a href={`mailto:${content.personal.email}`} className="contact-detail-card glass-card">
                <div className="contact-detail-icon">
                  <Mail size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="detail-label">Email Address</span>
                  <span className="detail-link">{content.personal.email}</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href={content.personal.linkedinUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="contact-detail-card glass-card"
              >
                <div className="contact-detail-icon">
                  <Linkedin size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="detail-label">LinkedIn Profile</span>
                  <span className="detail-link">linkedin.com/in/theekshana-thushan-57b866328</span>
                </div>
                <ExternalLink size={14} className="external-corner-icon" />
              </a>

              {/* GitHub */}
              <a 
                href={content.personal.githubUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="contact-detail-card glass-card"
              >
                <div className="contact-detail-icon">
                  <Github size={18} />
                </div>
                <div className="contact-detail-text">
                  <span className="detail-label">GitHub Repositories</span>
                  <span className="detail-link">github.com/theekshanathushan</span>
                </div>
                <ExternalLink size={14} className="external-corner-icon" />
              </a>

              {/* Location & Response Time */}
              <div className="contact-meta-split">
                <div className="contact-meta-item glass-card">
                  <MapPin size={16} className="text-glow-accent" />
                  <div>
                    <span className="meta-label">Location</span>
                    <span className="meta-val">Colombo, Sri Lanka</span>
                  </div>
                </div>

                <div className="contact-meta-item glass-card">
                  <Clock size={16} className="text-glow-accent" />
                  <div>
                    <span className="meta-label">Response Time</span>
                    <span className="meta-val">Usually replies within 24 hours</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Action: Download CV / View A4 Route */}
            <div className="cv-download-cta-wrap">
              <a 
                href={cvPdfPath} 
                download="Theekshana_Thushan_CV.pdf" 
                className="btn btn-primary cv-cta-btn"
                title="Download Clean ATS-Friendly PDF"
              >
                <Download size={16} />
                <span>Download CV (PDF)</span>
              </a>
              <a 
                href="#/cv" 
                className="btn btn-secondary cv-cta-btn"
                title="View Print-Optimized A4 Version"
              >
                <span>View A4 Web Sheet</span>
                <ArrowRight size={15} />
              </a>
            </div>

          </div>

          {/* Column 2: Working Recruiter Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card glass-card">
              
              <div className="form-header">
                <h3 className="form-heading">Send a Message</h3>
                <span className="form-subheading">I'll receive this directly in my inbox.</span>
              </div>

              {/* Status Notifications */}
              {submitStatus === 'success' && (
                <div className="form-alert alert-success">
                  <CheckCircle size={18} className="alert-icon-success" />
                  <div className="alert-text-body">
                    <strong>Message Delivered!</strong>
                    <p>{statusMessage}</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="form-alert alert-error">
                  <AlertTriangle size={18} className="alert-icon-error" />
                  <div className="alert-text-body">
                    <strong>Notice:</strong>
                    <p>{statusMessage}</p>
                    <a 
                      href={`mailto:${content.personal.email}?subject=Recruiter Inquiry`} 
                      className="alert-fallback-link"
                    >
                      Click here to open email client directly
                    </a>
                  </div>
                </div>
              )}

              <form onSubmit={handleFormSubmit} noValidate>
                
                {/* Honeypot Spam Protection Field (Invisible to human users) */}
                <input
                  type="text"
                  name="botField"
                  value={formState.botField}
                  onChange={handleInputChange}
                  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="form-group-row">
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Your Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      className={`form-input ${errors.name ? 'invalid' : ''}`}
                      placeholder="e.g. Sarah Jenkins (Recruiter)"
                      disabled={submitStatus === 'sending'}
                    />
                    {errors.name && <span className="field-error-text">{errors.name}</span>}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Work / Personal Email <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'invalid' : ''}`}
                      placeholder="e.g. s.jenkins@company.com"
                      disabled={submitStatus === 'sending'}
                    />
                    {errors.email && <span className="field-error-text">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className={`form-input ${errors.subject ? 'invalid' : ''}`}
                    placeholder="e.g. Software Engineering Internship Opening"
                    disabled={submitStatus === 'sending'}
                  />
                  {errors.subject && <span className="field-error-text">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleInputChange}
                    className={`form-input form-textarea ${errors.message ? 'invalid' : ''}`}
                    placeholder="Tell me about the role, technical team, project scope, or interview schedule..."
                    disabled={submitStatus === 'sending'}
                  ></textarea>
                  {errors.message && <span className="field-error-text">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn"
                  disabled={submitStatus === 'sending'}
                >
                  {submitStatus === 'sending' ? (
                    <>
                      <Loader2 size={16} className="btn-spinner" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Scoped CSS for Contact Section */}
      <style>{`
        .contact-section {
          position: relative;
        }

        .contact-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 680px;
          text-align: center;
          margin-top: -12px;
          line-height: 1.6;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 40px;
          margin-top: 48px;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        /* --- Recruiter Status Pill --- */
        .recruiter-status-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border-radius: 14px;
          border-left: 3px solid #10b981;
          margin-bottom: 20px;
          background: rgba(16, 185, 129, 0.05);
        }

        .status-live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          flex-shrink: 0;
          animation: pulseGreen 2s infinite ease-in-out;
        }

        @keyframes pulseGreen {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.7; }
        }

        .status-card-content strong {
          display: block;
          font-size: 13.5px;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .status-card-content p {
          font-size: 12px;
          color: var(--text-muted);
          margin: 0;
        }

        /* --- Contact Cards Stack --- */
        .contact-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .contact-detail-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: transform 0.2s, border-color 0.2s, background 0.2s;
        }

        .contact-detail-card:hover {
          transform: translateY(-2px);
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.04);
        }

        .contact-detail-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .contact-detail-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .detail-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .detail-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-white);
        }

        .external-corner-icon {
          color: var(--text-dark);
          transition: color 0.2s;
        }

        .contact-detail-card:hover .external-corner-icon {
          color: var(--accent);
        }

        /* Meta Split */
        .contact-meta-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 500px) {
          .contact-meta-split {
            grid-template-columns: 1fr;
          }
        }

        .contact-meta-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
        }

        .meta-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .meta-val {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-light);
        }

        /* CV Download CTA */
        .cv-download-cta-wrap {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .cv-cta-btn {
          flex: 1;
          min-width: 170px;
          justify-content: center;
          padding: 12px 18px;
          font-size: 13.5px;
        }

        /* --- Working Form Card --- */
        .contact-form-card {
          padding: 32px;
          border-radius: 18px;
        }

        .form-header {
          margin-bottom: 24px;
        }

        .form-heading {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 4px;
        }

        .form-subheading {
          font-size: 13px;
          color: var(--text-muted);
        }

        /* Alerts */
        .form-alert {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 14px 18px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 13px;
          line-height: 1.5;
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #d1fae5;
        }

        .alert-icon-success {
          color: #34d399;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fee2e2;
        }

        .alert-icon-error {
          color: #f87171;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .alert-text-body p {
          margin: 2px 0 0 0;
        }

        .alert-fallback-link {
          display: inline-block;
          margin-top: 6px;
          color: var(--accent);
          font-weight: 600;
          text-decoration: underline;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .form-group-row {
            grid-template-columns: 1fr;
          }
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .form-label {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-light);
        }

        .req {
          color: #f43f5e;
        }

        .form-input {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid var(--border-glass);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--text-white);
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.25);
        }

        .form-input.invalid {
          border-color: #f43f5e;
          background: rgba(244, 63, 94, 0.03);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .field-error-text {
          font-size: 11.5px;
          color: #f87171;
        }

        .form-submit-btn {
          width: 100%;
          justify-content: center;
          padding: 13px 24px;
          margin-top: 8px;
          font-size: 15px;
          cursor: pointer;
        }

        .btn-spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
