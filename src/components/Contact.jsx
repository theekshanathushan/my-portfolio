import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, sending, success

  const validateField = (name, value) => {
    let err = '';
    if (!value.trim()) {
      err = 'This field is required';
    } else if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        err = 'Please enter a valid email address';
      }
    }
    return err;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formState).forEach((key) => {
      const error = validateField(key, formState[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate sending
    setSubmitStatus('sending');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '' });
      
      // Reset after a delay
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-subtitle">Say Hello</span>
          <h2 className="section-title">Contact Me</h2>
        </div>

        <div className="contact-grid">
          {/* Column 1: Info Cards */}
          <div className="contact-info-col">
            <h3 className="contact-subheading">Let's connect and discuss your projects</h3>
            <p className="contact-p-desc">
              Have a proposal or just want to chat about a new website or app idea? Drop me a line! I normally respond within 24 hours.
            </p>

            <div className="contact-cards">
              <div className="contact-detail-card glass-card">
                <div className="contact-detail-icon"><Mail size={20} /></div>
                <div className="contact-detail-text">
                  <span className="detail-label">Email</span>
                  <a href="mailto:theekshanathushan89@gmail.com" className="detail-link">theekshanathushan89@gmail.com</a>
                </div>
              </div>

              <div className="contact-detail-card glass-card">
                <div className="contact-detail-icon"><MapPin size={20} /></div>
                <div className="contact-detail-text">
                  <span className="detail-label">Location</span>
                  <span className="detail-val">Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Availability Widget */}
            <div className="availability-card glass-card">
              <span className="availability-indicator"></span>
              <div className="availability-text">
                <strong>Current Availability:</strong>
                <p>Available for freelance projects, design contracts, and full-time roles.</p>
              </div>
            </div>
          </div>

          {/* Column 2: Form */}
          <div className="contact-form-col">
            <form onSubmit={handleFormSubmit} className="contact-form-widget glass-card">
              
              <div className="form-group-row">
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? 'invalid' : formState.name ? 'valid' : ''}`}
                    placeholder="John Doe"
                    disabled={submitStatus === 'sending'}
                  />
                  {errors.name && <span className="field-error-text"><AlertTriangle size={12} /> {errors.name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'invalid' : formState.email ? 'valid' : ''}`}
                    placeholder="john@example.com"
                    disabled={submitStatus === 'sending'}
                  />
                  {errors.email && <span className="field-error-text"><AlertTriangle size={12} /> {errors.email}</span>}
                </div>
              </div>

              {/* Subject */}
              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  className={`form-input ${errors.subject ? 'invalid' : formState.subject ? 'valid' : ''}`}
                  placeholder="Project Inquiry"
                  disabled={submitStatus === 'sending'}
                />
                {errors.subject && <span className="field-error-text"><AlertTriangle size={12} /> {errors.subject}</span>}
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formState.message}
                  onChange={handleInputChange}
                  className={`form-input textarea ${errors.message ? 'invalid' : formState.message ? 'valid' : ''}`}
                  placeholder="Hey, let's work on a new web project together..."
                  disabled={submitStatus === 'sending'}
                />
                {errors.message && <span className="field-error-text"><AlertTriangle size={12} /> {errors.message}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn btn-primary submit-form-btn"
                disabled={submitStatus === 'sending'}
              >
                {submitStatus === 'idle' && (
                  <>Send Message <Send size={16} /></>
                )}
                {submitStatus === 'sending' && (
                  <span className="spinner-wrap"><span className="loader-spinner"></span> Sending...</span>
                )}
                {submitStatus === 'success' && (
                  <span className="success-wrap"><CheckCircle size={16} /> Sent Successfully!</span>
                )}
              </button>

            </form>
          </div>
        </div>

      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .contact-subheading {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 16px;
          text-align: left;
        }
        .contact-p-desc {
          color: var(--text-muted);
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 32px;
          text-align: left;
        }
        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }
        .contact-detail-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          text-align: left;
        }
        .contact-detail-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(var(--accent-rgb), 0.05);
          border: 1px solid rgba(var(--accent-rgb), 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
        }
        .contact-detail-text {
          display: flex;
          flex-direction: column;
        }
        .detail-label {
          font-size: 12px;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .detail-link, .detail-val {
          font-size: 15px;
          color: var(--text-light);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s;
        }
        .detail-link:hover {
          color: var(--accent);
        }
        .availability-card {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 20px;
          text-align: left;
        }
        .availability-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #10b981;
          box-shadow: 0 0 10px #10b981;
          display: inline-block;
          margin-top: 6px;
          flex-shrink: 0;
          animation: pulse 2s infinite;
        }
        .availability-text strong {
          color: var(--text-white);
          font-size: 14px;
        }
        .availability-text p {
          color: var(--text-muted);
          font-size: 13px;
          margin-top: 4px;
        }

        /* Form styling */
        .contact-form-widget {
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        @media (max-width: 576px) {
          .contact-form-widget {
            padding: 20px;
          }
        }
        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 576px) {
          .form-group-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
        }
        .form-label {
          font-family: var(--font-heading);
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
        }
        .form-input {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: var(--font-sans);
          font-size: 14px;
          color: var(--text-light);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .form-input::placeholder {
          color: var(--text-dark);
        }
        .form-input:focus {
          outline: none;
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--accent);
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.15);
        }
        .form-input.valid {
          border-color: rgba(16, 185, 129, 0.3);
        }
        .form-input.invalid {
          border-color: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.15);
        }
        .field-error-text {
          font-size: 11px;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .form-input.textarea {
          resize: none;
        }
        .submit-form-btn {
          width: 100%;
          justify-content: center;
          height: 48px;
          align-items: center;
        }
        .spinner-wrap, .success-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }
        .success-wrap {
          color: #059669;
        }
        .loader-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(7, 7, 11, 0.3);
          border-top-color: #07070b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
