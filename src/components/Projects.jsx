import React, { useState } from 'react';
import { ExternalLink, X, Laptop, Smartphone, Eye, AudioLines, ShoppingCart } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


const PROJECTS_DATA = [
  {
    id: 1,
    title: "Zenith Business Dashboard",
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    description: "A comprehensive business analytics portal featuring live dashboard tracking, client data grids, and report exports.",
    detailedDesc: "Zenith Dashboard is a custom portal engineered for small-to-medium businesses. It bridges the gap between MongoDB data streams and frontend chart representations, rendering real-time business statistics.",
    features: ["MongoDB data collections integration", "Dynamic bar/line charts rendering", "Express REST API backend flow", "Visual report PDF exports"],
    visualIcon: <Laptop size={40} />,
    color: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    demoLink: "https://example.com",
    codeLink: "https://github.com/G-T-Thushan"
  },
  {
    id: 2,
    title: "Nova Care Medical Portal",
    category: "web",
    tags: ["React", "Express", "Node.js", "MongoDB"],
    description: "A telemedicine consultation system connecting patients with doctors, offering scheduling and record storage.",
    detailedDesc: "Nova Care is a full-stack medical consulting system. It enables secure patient registration, medical history management, and direct scheduling with specialist doctors.",
    features: ["Secure JWT session validation", "Direct specialist scheduling calendar", "Document storage integration", "Doctor notes history feed"],
    visualIcon: <Smartphone size={40} />,
    color: "linear-gradient(135deg, #ff007f 0%, #7f00ff 100%)",
    demoLink: "https://example.com",
    codeLink: "https://github.com/G-T-Thushan"
  },
  {
    id: 3,
    title: "Ceylon Heritage Branding",
    category: "creative",
    tags: ["Figma", "Adobe Illustrator", "Branding", "UI/UX"],
    description: "A comprehensive rebranding project and mobile guide app prototype for Sri Lankan heritage tourism.",
    detailedDesc: "This project showcases brand guidelines, print collateral, and a fully interactive Figma mobile application mockup designed to promote Sri Lankan tourism destinations.",
    features: ["Vector logo family guidelines", "Brand color palettes and typography", "Interactive mobile high-fidelity UI prototypes", "Print collateral and posters layout"],
    visualIcon: <AudioLines size={40} />,
    color: "linear-gradient(135deg, #ffb703 0%, #fb8500 100%)",
    demoLink: "https://example.com",
    codeLink: "https://github.com/G-T-Thushan"
  },
  {
    id: 4,
    title: "Vapor E-Commerce Shop",
    category: "web",
    tags: ["Next.js", "Stripe", "Framer Motion", "MongoDB"],
    description: "A high-performance headless streetwear storefront featuring dynamic cart drawers and Stripe checkouts.",
    detailedDesc: "Vapor Storefront uses Next.js server components to render catalog pages instantly. It connects to a custom Node.js/MongoDB inventory database and handles secure checkouts using Stripe.",
    features: ["Headless inventory database synchronization", "Stripe checkout secure redirects", "Animated product cart drawer", "Search filters by size and tag"],
    visualIcon: <ShoppingCart size={40} />,
    color: "linear-gradient(135deg, #b5179e 0%, #7209b7 100%)",
    demoLink: "https://example.com",
    codeLink: "https://github.com/G-T-Thushan"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-subtitle">My Works</span>
          <h2 className="section-title">Featured Projects</h2>
        </div>

        {/* Filter Navigation */}
        <div className="project-filters">
          {['all', 'web', 'mobile', 'creative'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="project-card glass-card"
              onClick={() => setSelectedProject(project)}
            >
              {/* Creative Project Visual Banner */}
              <div className="project-visual-header" style={{ background: project.color }}>
                <div className="project-mesh-blob"></div>
                <div className="project-card-icon">{project.visualIcon}</div>
                <div className="project-hover-overlay">
                  <div className="overlay-btn glass-card">
                    <Eye size={20} />
                    <span>View Details</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="project-card-body">
                <div className="project-tags">
                  {project.tags.slice(0, 3).map((t, i) => (
                    <span key={i} className="project-tag-pill">{t}</span>
                  ))}
                </div>
                <h4 className="project-title-text">{project.title}</h4>
                <p className="project-desc-short">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div className="project-modal-container glass-card" onClick={(e) => e.stopPropagation()}>
              
              {/* Close Button */}
              <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                <X size={20} />
              </button>

              {/* Modal Banner Header */}
              <div className="modal-visual-header" style={{ background: selectedProject.color }}>
                <div className="project-mesh-blob"></div>
                <div className="modal-header-content">
                  {selectedProject.visualIcon}
                  <h3>{selectedProject.title}</h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="modal-body">
                <div className="modal-info-grid">
                  
                  {/* Summary Column */}
                  <div className="modal-summary-col">
                    <h4 className="modal-subtitle">Project Overview</h4>
                    <p className="modal-desc">{selectedProject.detailedDesc}</p>

                    <h4 className="modal-subtitle">Technologies</h4>
                    <div className="modal-tech-list">
                      {selectedProject.tags.map((tag, idx) => (
                        <span key={idx} className="modal-tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Features Column */}
                  <div className="modal-features-col">
                    <h4 className="modal-subtitle">Key Features</h4>
                    <ul className="modal-features-list">
                      {selectedProject.features.map((feat, idx) => (
                        <li key={idx} className="modal-feature-item">
                          <span className="bullet-glow"></span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="modal-ctas">
                      <a href={selectedProject.demoLink} target="_blank" rel="noreferrer" className="btn btn-primary">
                        Live Preview <ExternalLink size={16} />
                      </a>
                      <a href={selectedProject.codeLink} target="_blank" rel="noreferrer" className="btn btn-secondary">
                        View Code <Github size={16} />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .project-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .filter-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 8px 16px;
          border-radius: 6px;
          transition: all 0.3s;
        }
        .filter-btn:hover {
          color: var(--text-white);
        }
        .filter-btn.active {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.05);
          box-shadow: inset 0 0 1px rgba(var(--accent-rgb), 0.3);
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
        }
        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          text-align: left;
        }
        .project-visual-header {
          height: 180px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .project-mesh-blob {
          position: absolute;
          width: 150px;
          height: 150px;
          background: rgba(255,255,255,0.15);
          filter: blur(40px);
          border-radius: 50%;
        }
        .project-card-icon {
          color: var(--text-white);
          z-index: 1;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.25));
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(7, 7, 11, 0.75);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover .project-hover-overlay {
          opacity: 1;
        }
        .project-card:hover .project-card-icon {
          transform: scale(0.9) translateY(-10px);
        }
        .overlay-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          color: var(--text-white);
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
        }
        .project-card-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        .project-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .project-tag-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2px 8px;
          border-radius: 4px;
          color: var(--text-muted);
        }
        .project-title-text {
          font-size: 18px;
          font-weight: 600;
          color: var(--text-white);
        }
        .project-desc-short {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        /* Modal Overlay */
        .project-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2000;
          background: rgba(4, 4, 7, 0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fade-in 0.25s ease-out;
        }
        .project-modal-container {
          width: 100%;
          max-width: 800px;
          background: var(--bg-card);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
          animation: slide-up-scale 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .modal-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-white);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: all 0.2s;
        }
        .modal-close-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }
        .modal-visual-header {
          height: 220px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 40px;
          color: var(--text-white);
        }
        .modal-header-content {
          display: flex;
          align-items: center;
          gap: 20px;
          z-index: 1;
        }
        .modal-header-content h3 {
          font-size: 26px;
          font-weight: 700;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        @media (max-width: 576px) {
          .modal-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .modal-header-content h3 {
            font-size: 20px;
          }
        }
        .modal-body {
          padding: 40px;
          text-align: left;
        }
        .modal-info-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
        }
        @media (max-width: 768px) {
          .modal-info-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
        .modal-subtitle {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-white);
          margin-bottom: 12px;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
        }
        .modal-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .modal-tech-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .modal-tech-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          background: rgba(var(--accent-rgb), 0.05);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          color: var(--accent);
          padding: 4px 10px;
          border-radius: 4px;
        }
        .modal-features-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
        }
        .modal-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--text-light);
          line-height: 1.4;
        }
        .bullet-glow {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--accent);
          box-shadow: 0 0 6px var(--accent);
          margin-top: 7px;
          flex-shrink: 0;
        }
        .modal-ctas {
          display: flex;
          gap: 12px;
        }
        .modal-ctas a {
          flex-grow: 1;
          justify-content: center;
          padding: 10px 20px;
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up-scale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
