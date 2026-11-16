import React, { useState, useMemo, useEffect } from 'react';
import { 
  Award, 
  ExternalLink, 
  X, 
  Calendar, 
  ShieldCheck, 
  Cloud, 
  Code, 
  Cpu, 
  CheckCircle2, 
  Eye, 
  Sparkles,
  Layers,
  FileCheck,
  Hash
} from 'lucide-react';
import { CERTIFICATIONS_DATA } from '../data/content';

export default function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxCert, setLightboxCert] = useState(null);

  // Gracefully hide component if array is empty
  if (!CERTIFICATIONS_DATA || CERTIFICATIONS_DATA.length === 0) {
    return null;
  }

  // Handle ESC key for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxCert(null);
      }
    };
    if (lightboxCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxCert]);

  // Categories generated automatically from data
  const categories = useMemo(() => {
    const cats = Array.from(new Set(CERTIFICATIONS_DATA.map(c => c.category).filter(Boolean)));
    return ['All', ...cats];
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: CERTIFICATIONS_DATA.length };
    CERTIFICATIONS_DATA.forEach(c => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered certifications
  const filteredCerts = useMemo(() => {
    if (selectedCategory === 'All') return CERTIFICATIONS_DATA;
    return CERTIFICATIONS_DATA.filter(c => c.category === selectedCategory);
  }, [selectedCategory]);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Cloud':
        return <Cloud size={13} className="cat-icon" />;
      case 'Security':
        return <ShieldCheck size={13} className="cat-icon" />;
      case 'Development':
        return <Code size={13} className="cat-icon" />;
      case 'AI/Data':
        return <Cpu size={13} className="cat-icon" />;
      default:
        return <Award size={13} className="cat-icon" />;
    }
  };

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-subtitle">Verified Credentials</span>
          <h2 className="section-title">Certifications & Licenses</h2>
          <p className="certifications-lead-text">
            Industry credentials, professional qualifications, and certified domain competencies.
          </p>
        </div>

        {/* Category Filter Row (Generated automatically from data) */}
        <div className="cert-category-filter-wrap" role="group" aria-label="Filter certifications by category">
          <div className="cert-filter-pills glass-card">
            {categories.map((cat) => {
              const count = categoryCounts[cat] || 0;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`cert-filter-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isActive}
                >
                  {cat !== 'All' && getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className="cert-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {filteredCerts.map((cert, idx) => {
            const hasImage = Boolean(cert.image && cert.image.trim() !== '');
            const hasVerifyLink = Boolean(cert.credentialUrl && cert.credentialUrl.trim() !== '' && cert.credentialUrl !== '#');
            const isPlaceholder = cert.title.includes('[add') || cert.id.includes('placeholder');

            return (
              <article 
                key={cert.id || idx} 
                className={`cert-card glass-card cert-entry-animation ${hasImage ? 'has-image-clickable' : ''} ${isPlaceholder ? 'is-placeholder-card' : ''}`}
                style={{ animationDelay: `${idx * 0.08}s` }}
                onClick={() => {
                  if (hasImage) setLightboxCert(cert);
                }}
              >
                {/* Card Header: Category & Issuer Tag */}
                <div className="cert-card-header">
                  <div className="cert-category-badge">
                    {getCategoryIcon(cert.category)}
                    <span>{cert.category}</span>
                  </div>

                  {hasImage && (
                    <button 
                      type="button"
                      className="cert-preview-badge-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxCert(cert);
                      }}
                      title="View certificate image preview"
                      aria-label="Preview certificate lightbox"
                    >
                      <Eye size={12} />
                      <span>Preview</span>
                    </button>
                  )}
                </div>

                {/* Title & Issuer */}
                <div className="cert-titles-wrap">
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-issuer">
                    <Award size={13} className="issuer-icon" />
                    <span>{cert.issuer}</span>
                  </span>
                </div>

                {/* Meta details: Issue Date, Expiry, Credential ID */}
                <div className="cert-meta-group">
                  <div className="cert-date-row">
                    <span className="cert-date-item">
                      <Calendar size={12} className="meta-icon" />
                      <span>Issued: <strong>{cert.issueDate}</strong></span>
                    </span>
                    {cert.expiryDate && (
                      <span className="cert-date-item expiry">
                        <span>Expires: {cert.expiryDate}</span>
                      </span>
                    )}
                  </div>

                  {cert.credentialId && (
                    <div className="cert-credential-id-row">
                      <Hash size={11} className="meta-icon" />
                      <span className="id-label">ID:</span>
                      <code className="id-code">{cert.credentialId}</code>
                    </div>
                  )}
                </div>

                {/* Skill Chips */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-skills-wrap" aria-label="Skills covered">
                    {cert.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="cert-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                {/* Card Action: Verify Link */}
                <div className="cert-card-footer" onClick={(e) => e.stopPropagation()}>
                  {hasVerifyLink ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-verify-credential"
                      title="Verify credential on official provider registry"
                    >
                      <span>Verify credential</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="credential-pending-indicator">
                      <FileCheck size={13} />
                      <span>Self-Attested / Pending URL</span>
                    </span>
                  )}
                </div>

              </article>
            );
          })}
        </div>

        {/* Lightbox Preview Modal */}
        {lightboxCert && (
          <div 
            className="cert-lightbox-backdrop" 
            onClick={() => setLightboxCert(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-cert-title"
          >
            <div 
              className="cert-lightbox-container glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Header */}
              <div className="lightbox-header">
                <div className="lightbox-titles">
                  <span className="lightbox-category">{lightboxCert.category}</span>
                  <h3 id="lightbox-cert-title" className="lightbox-title">{lightboxCert.title}</h3>
                  <span className="lightbox-issuer">{lightboxCert.issuer}</span>
                </div>
                <button
                  type="button"
                  className="lightbox-close-btn"
                  onClick={() => setLightboxCert(null)}
                  aria-label="Close certificate preview"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Lightbox Body / Image Preview */}
              <div className="lightbox-body">
                {lightboxCert.image ? (
                  <div className="lightbox-image-wrap">
                    <img 
                      src={lightboxCert.image} 
                      alt={`Certificate for ${lightboxCert.title}`}
                      className="lightbox-image"
                    />
                  </div>
                ) : (
                  <div className="lightbox-placeholder-preview">
                    <Award size={48} className="text-glow-accent" />
                    <p>Certificate credential image slot</p>
                    <span className="placeholder-subtext">[add certificate image or badge file]</span>
                  </div>
                )}

                {/* Lightbox Footer Details */}
                <div className="lightbox-details-footer">
                  <div className="lightbox-meta-info">
                    <span>Issued: <strong>{lightboxCert.issueDate}</strong></span>
                    {lightboxCert.credentialId && (
                      <span>ID: <code>{lightboxCert.credentialId}</code></span>
                    )}
                  </div>

                  {lightboxCert.credentialUrl && lightboxCert.credentialUrl !== '#' && (
                    <a
                      href={lightboxCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary lightbox-verify-btn"
                    >
                      <span>Verify Credential on Provider Registry</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Embedded CSS for Certifications Section */}
      <style>{`
        .certifications-section {
          position: relative;
        }

        .certifications-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 640px;
          text-align: center;
          margin-top: 12px;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* --- Category Filter Row --- */
        .cert-category-filter-wrap {
          display: flex;
          justify-content: center;
          margin: 20px 0 32px;
        }

        .cert-filter-pills {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          border-radius: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .cert-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cert-filter-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.04);
        }

        .cert-filter-btn.active {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.12);
          border-color: rgba(var(--accent-rgb), 0.35);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .cat-icon {
          color: var(--accent);
        }

        .cert-filter-count {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-light);
        }

        .cert-filter-btn.active .cert-filter-count {
          background: rgba(var(--accent-rgb), 0.25);
          color: var(--accent);
        }

        /* --- Certifications Grid --- */
        .certifications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          margin-bottom: 20px;
        }

        @media (max-width: 600px) {
          .certifications-grid {
            grid-template-columns: 1fr;
          }
        }

        .cert-card {
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border: 1px solid var(--border-glass);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .cert-card:hover {
          transform: translateY(-5px);
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px rgba(var(--accent-rgb), 0.12);
        }

        .cert-card.has-image-clickable {
          cursor: pointer;
        }

        .is-placeholder-card {
          border-style: dashed;
          border-color: rgba(255, 255, 255, 0.14);
        }

        .cert-entry-animation {
          animation: certFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes certFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Card Header */
        .cert-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cert-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          color: var(--accent);
        }

        .cert-preview-badge-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2px 7px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cert-preview-badge-btn:hover {
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.4);
        }

        /* Title & Issuer */
        .cert-titles-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cert-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--text-white);
          line-height: 1.4;
          margin: 0;
        }

        .cert-issuer {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          color: var(--accent);
        }

        .issuer-icon {
          color: var(--accent);
        }

        /* Meta details */
        .cert-meta-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .cert-date-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px;
        }

        .cert-date-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
        }

        .cert-date-item strong {
          color: var(--text-light);
        }

        .cert-date-item.expiry {
          color: var(--text-dark);
          font-size: 11px;
        }

        .meta-icon {
          color: var(--text-dark);
        }

        .cert-credential-id-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .id-label {
          color: var(--text-dark);
        }

        .id-code {
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 10.5px;
        }

        /* Skills Chips */
        .cert-skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .cert-skill-chip {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 2px 7px;
          border-radius: 5px;
        }

        /* Footer */
        .cert-card-footer {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
        }

        .btn-verify-credential {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 6px;
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          color: var(--accent);
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-verify-credential:hover {
          background: rgba(var(--accent-rgb), 0.2);
          border-color: var(--accent);
          transform: translateX(3px);
        }

        .credential-pending-indicator {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
        }

        /* --- Lightbox Modal --- */
        .cert-lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.85);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: lightboxFadeIn 0.25s ease-out;
        }

        @keyframes lightboxFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .cert-lightbox-container {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          border-radius: 18px;
          background: rgba(11, 11, 20, 0.98);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(var(--accent-rgb), 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: lightboxScale 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes lightboxScale {
          from { transform: scale(0.95); }
          to { transform: scale(1); }
        }

        .lightbox-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 18px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .lightbox-titles {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lightbox-category {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          text-transform: uppercase;
        }

        .lightbox-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .lightbox-issuer {
          font-size: 13px;
          color: var(--text-light);
        }

        .lightbox-close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .lightbox-close-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.1);
        }

        .lightbox-body {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lightbox-image-wrap {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: #000;
        }

        .lightbox-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .lightbox-placeholder-preview {
          padding: 48px 24px;
          border: 2px dashed rgba(var(--accent-rgb), 0.3);
          border-radius: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: rgba(var(--accent-rgb), 0.03);
          color: var(--text-light);
        }

        .placeholder-subtext {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
        }

        .lightbox-details-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .lightbox-meta-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .lightbox-meta-info strong {
          color: var(--text-light);
        }

        .lightbox-verify-btn {
          font-size: 13px;
          padding: 10px 18px;
        }
      `}</style>
    </section>
  );
}
