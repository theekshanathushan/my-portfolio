import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Laptop, Smartphone, Eye, AudioLines, ShoppingCart, Search, GitFork, Star, Folder, AlertCircle } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  Python: "#3572A5",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  Ruby: "#701516",
  Go: "#00ADD8",
  PHP: "#4F5D95",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Rust: "#dea584",
  Shell: "#89e051"
};

const FALLBACK_REPOS = [
  {
    id: 1263633291,
    name: "CareConnect-application",
    description: "A full-stack web application built with a Spring Boot backend and a custom HTML/CSS frontend.",
    html_url: "https://github.com/theekshanathushan/CareConnect-application",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-06-09T08:11:58Z"
  },
  {
    id: 1262641401,
    name: "my-portfolio",
    description: "Modern glassmorphism portfolio built with React and Vite showing interactive 3D particle elements.",
    html_url: "https://github.com/theekshanathushan/my-portfolio",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-06-08T10:21:03Z"
  },
  {
    id: 1074059326,
    name: "Business-web-page",
    description: "A professional business web page built using HTML, CSS, and JavaScript to promote business services.",
    html_url: "https://github.com/theekshanathushan/Business-web-page",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2025-10-11T09:39:05Z"
  },
  {
    id: 1074531327,
    name: "Final-assignment-web-course",
    description: "This is my final assignment in the Web Design for Beginners course.",
    html_url: "https://github.com/theekshanathushan/Final-assignment-web-course",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-05-25T14:44:48Z"
  }
];

const PROJECTS_DATA = [
  {
    id: 1,
    title: "CareConnect Application",
    category: "web",
    tags: ["Spring Boot", "Java", "HTML5", "CSS3", "JavaScript"],
    description: "A full-stack medical consulting and care management web platform.",
    detailedDesc: "CareConnect is a robust healthcare management system designed to coordinate care. It couples a secure Spring Boot MVC backend engine with custom HTML/CSS responsive user screens, enabling medical history tracking and service coordination.",
    features: ["Spring Boot MVC backend architecture", "Custom semantic HTML/CSS styling structures", "Secure session handling and record storage", "Database persistence for patient data integration"],
    visualIcon: <Laptop size={40} />,
    color: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
    demoLink: "https://github.com/theekshanathushan/CareConnect-application",
    codeLink: "https://github.com/theekshanathushan/CareConnect-application"
  },
  {
    id: 2,
    title: "Beacon Mobile Utility",
    category: "mobile",
    tags: ["Android", "BLE Proximity", "Kotlin/Java", "Mobile Services"],
    description: "A proximity scanning mobile app that detects and interacts with BLE beacons.",
    detailedDesc: "Beacon App is a lightweight native Android service environment engineered to interface with Bluetooth Low Energy (BLE) transmitters. It scans proximity beacons, processes signal indicators (RSSI), and handles notifications.",
    features: ["Bluetooth Low Energy signal scanning", "Real-time proximity and distance estimations", "Custom action handlers for device event triggers", "Optimized background location performance"],
    visualIcon: <Smartphone size={40} />,
    color: "linear-gradient(135deg, #ff007f 0%, #7f00ff 100%)",
    demoLink: "https://github.com/theekshanathushan/Beacon_App",
    codeLink: "https://github.com/theekshanathushan/Beacon_App"
  },
  {
    id: 3,
    title: "Business Showcase Web Platform",
    category: "web",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    description: "A professional service presentation website featuring custom interactive components.",
    detailedDesc: "This is a premium, high-fidelity landing page system built from the ground up using clean CSS structure and custom JavaScript interactions. It serves to showcase corporate services, improve online conversion rates, and run smoothly across all modern screen resolutions.",
    features: ["Fully responsive layouts and responsive grid maps", "Clean typography hierarchy and structural grids", "Interactive CSS glassmorphism cards and visual headers", "Vanilla JS animations and navigation helpers"],
    visualIcon: <Laptop size={40} />,
    color: "linear-gradient(135deg, #ffb703 0%, #fb8500 100%)",
    demoLink: "https://github.com/theekshanathushan/Business-web-page",
    codeLink: "https://github.com/theekshanathushan/Business-web-page"
  },
  {
    id: 4,
    title: "Web Course Final Capstone",
    category: "creative",
    tags: ["Web Design", "UI/UX Layout", "HTML5", "CSS3 Canvas"],
    description: "A creative design capstone showcasing semantic front-end fundamentals.",
    detailedDesc: "Representing the cumulative final design project for the Web Design for Beginners course, this project demonstrates clean semantic document layouts, interactive grids, fluid design structures, and creative styling components.",
    features: ["Semantic HTML5 standard design frameworks", "Pixel-perfect CSS styling templates", "Interactive media query adaptions for modern viewing", "Intuitive user experience focus and navigation grids"],
    visualIcon: <AudioLines size={40} />,
    color: "linear-gradient(135deg, #b5179e 0%, #7209b7 100%)",
    demoLink: "https://github.com/theekshanathushan/Final-assignment-web-course",
    codeLink: "https://github.com/theekshanathushan/Final-assignment-web-course"
  }
];

export default function Projects() {
  const [projectType, setProjectType] = useState('featured'); // 'featured' | 'github'
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  // GitHub integration state
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated');

  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    setIsOfflineMode(false);
    try {
      const res = await fetch('https://api.github.com/users/theekshanathushan/repos?sort=updated&per_page=100');
      if (!res.ok) {
        throw new Error('Failed to fetch repositories');
      }
      const data = await res.json();
      // Filter out own profile readme (theekshanathushan)
      const cleanData = data.filter(repo => repo.name.toLowerCase() !== 'theekshanathushan');
      setRepos(cleanData);
    } catch (err) {
      console.error('Error fetching repositories: ', err);
      // Fallback to static cache
      setRepos(FALLBACK_REPOS);
      setIsOfflineMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger fetch once when switching to GitHub tab
  useEffect(() => {
    if (projectType === 'github' && repos.length === 0) {
      fetchGitHubRepos();
    }
  }, [projectType]);

  const filteredProjects = filter === 'all' 
    ? PROJECTS_DATA 
    : PROJECTS_DATA.filter(p => p.category === filter);

  // GitHub filter and sort logic
  const filteredRepos = repos
    .filter(repo => {
      const term = searchQuery.toLowerCase();
      const nameMatch = repo.name?.toLowerCase().includes(term) || false;
      const descMatch = repo.description?.toLowerCase().includes(term) || false;
      const langMatch = repo.language?.toLowerCase().includes(term) || false;
      return nameMatch || descMatch || langMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else {
        // default: updated
        return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

  return (
    <section id="projects" className="section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-subtitle">My Works</span>
          <h2 className="section-title">
            {projectType === 'featured' ? 'Featured Projects' : 'GitHub Repositories'}
          </h2>
        </div>

        {/* Top Toggle Switch */}
        <div className="project-type-toggle-container">
          <div className="project-type-toggle glass-card">
            <button 
              className={`type-toggle-btn ${projectType === 'featured' ? 'active' : ''}`}
              onClick={() => setProjectType('featured')}
            >
              Featured Works
            </button>
            <button 
              className={`type-toggle-btn ${projectType === 'github' ? 'active' : ''}`}
              onClick={() => setProjectType('github')}
            >
              GitHub Repositories
            </button>
          </div>
        </div>

        {projectType === 'featured' ? (
          <>
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
          </>
        ) : (
          <div className="github-section">
            {/* Offline/Error Notification */}
            {isOfflineMode && (
              <div className="github-alert glass-card">
                <div className="alert-content">
                  <AlertCircle size={18} className="alert-icon" />
                  <span className="alert-text">
                    Showing cached repositories. Latest live sync failed (rate limit reached or offline).
                  </span>
                </div>
                <button onClick={fetchGitHubRepos} className="alert-retry-btn" disabled={isLoading}>
                  {isLoading ? 'Retrying...' : 'Retry Sync'}
                </button>
              </div>
            )}

            {/* Search & Sort Panel */}
            <div className="github-controls glass-card">
              <div className="github-search-wrap">
                <Search size={18} className="github-search-icon" />
                <input 
                  type="text"
                  placeholder="Search repository names or languages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="github-search-input"
                />
              </div>

              <div className="github-sort-wrap">
                <span className="github-sort-label">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="github-sort-select"
                >
                  <option value="updated">Recent Update</option>
                  <option value="stars">Stars Count</option>
                  <option value="name">Repo Name</option>
                </select>
              </div>
            </div>

            {/* Loader / Empty / Grid */}
            {isLoading ? (
              <div className="github-repos-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="repo-card-skeleton glass-card">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-desc-line-1"></div>
                    <div className="skeleton-desc-line-2"></div>
                    <div className="skeleton-footer">
                      <div className="skeleton-badge"></div>
                      <div className="skeleton-badge"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="github-empty glass-card">
                <p>No repositories found matching your criteria.</p>
                <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '13px', marginTop: '12px' }} onClick={() => { setSearchQuery(''); setSortBy('updated'); }}>
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="github-repos-grid">
                {filteredRepos.map((repo) => {
                  const langColor = LANGUAGE_COLORS[repo.language] || "#8b5cf6";
                  return (
                    <div key={repo.id} className="github-repo-card glass-card">
                      <div className="repo-header">
                        <Folder size={18} className="repo-folder-icon" />
                        <h4 className="repo-title" title={repo.name}>{repo.name}</h4>
                      </div>
                      
                      <p className="repo-description">
                        {repo.description || "No description provided. Click below to view code."}
                      </p>

                      <div className="repo-tags-wrap">
                        {repo.language && (
                          <span className="repo-lang-badge">
                            <span className="lang-color-circle" style={{ backgroundColor: langColor }}></span>
                            {repo.language}
                          </span>
                        )}
                        <span className="repo-stat-badge" title="Stars">
                          <Star size={12} fill={repo.stargazers_count > 0 ? "currentColor" : "none"} /> {repo.stargazers_count}
                        </span>
                        <span className="repo-stat-badge" title="Forks">
                          <GitFork size={12} /> {repo.forks_count}
                        </span>
                      </div>

                      <div className="repo-footer">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="repo-link-btn"
                          title="View Source Code"
                        >
                          Code <Github size={12} />
                        </a>
                        {repo.homepage && (
                          <a 
                            href={repo.homepage} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="repo-link-btn demo-btn"
                            title="View Live Demo"
                          >
                            Live <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

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
          max-height: 90vh;
          overflow-y: auto;
          background: var(--bg-card);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
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

        @media (max-width: 768px) {
          .projects-grid {
            gap: 20px;
          }
          .modal-visual-header {
            height: 160px;
            padding: 0 24px;
          }
          .modal-body {
            padding: 24px;
          }
          .modal-info-grid {
            gap: 24px;
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .modal-ctas {
            flex-direction: column;
          }
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

        /* Sliding Toggle Switch for Projects View */
        .project-type-toggle-container {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }
        .project-type-toggle {
          display: flex;
          padding: 4px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 30px;
        }
        .type-toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          padding: 10px 24px;
          border-radius: 26px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none;
        }
        .type-toggle-btn:hover {
          color: var(--text-white);
        }
        .type-toggle-btn.active {
          color: var(--bg-dark);
          background: var(--gradient-accent);
          box-shadow: 0 4px 15px rgba(var(--accent-rgb), 0.3);
        }

        /* GitHub Repos Section */
        .github-section {
          animation: fade-in 0.4s ease-out;
        }

        /* Alert and notification */
        .github-alert {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          margin-bottom: 24px;
          border-color: rgba(239, 68, 68, 0.2);
          background: rgba(239, 68, 68, 0.03);
          border-radius: 12px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .alert-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .alert-icon {
          color: #ef4444;
          flex-shrink: 0;
        }
        .alert-text {
          font-size: 14px;
          color: var(--text-light);
          text-align: left;
        }
        .alert-retry-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-white);
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: none;
          transition: all 0.2s;
        }
        .alert-retry-btn:hover:not(:disabled) {
          border-color: var(--accent);
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.05);
        }

        /* Search and Sort controls */
        .github-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          gap: 20px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .github-search-wrap {
          position: relative;
          flex-grow: 1;
          max-width: 500px;
          display: flex;
          align-items: center;
        }
        .github-search-icon {
          position: absolute;
          left: 16px;
          color: var(--text-muted);
          pointer-events: none;
        }
        .github-search-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 12px 16px 12px 48px;
          border-radius: 10px;
          color: var(--text-white);
          font-size: 14px;
          outline: none;
          transition: all 0.3s;
        }
        .github-search-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.15);
          background: rgba(0, 0, 0, 0.4);
        }
        .github-sort-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .github-sort-label {
          font-size: 13px;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-weight: 600;
        }
        .github-sort-select {
          background: rgba(8, 8, 14, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-white);
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          outline: none;
          transition: all 0.3s;
          cursor: none;
        }
        .github-sort-select:focus {
          border-color: var(--accent);
        }

        /* Repo Cards Grid */
        .github-repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        /* Repo Card */
        .github-repo-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          text-align: left;
          height: 100%;
          min-height: 220px;
        }
        .repo-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .repo-folder-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
        .repo-title {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-white);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .repo-description {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .repo-tags-wrap {
          display: flex;
          gap: 14px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }
        .repo-lang-badge {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .lang-color-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .repo-stat-badge {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .repo-footer {
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
          padding-top: 16px;
        }
        .repo-link-btn {
          flex-grow: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: var(--text-light);
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-heading);
          text-decoration: none;
          transition: all 0.2s;
          cursor: none;
        }
        .repo-link-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.04);
        }
        .repo-link-btn.demo-btn:hover {
          color: var(--text-white);
          background: var(--gradient-accent);
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(var(--accent-rgb), 0.2);
        }

        /* Repo Empty State */
        .github-empty {
          padding: 60px 40px;
          text-align: center;
          color: var(--text-muted);
          font-size: 15px;
        }

        /* Skeletons */
        .repo-card-skeleton {
          padding: 24px;
          height: 220px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          animation: skeleton-pulse 1.5s infinite ease-in-out;
        }
        .skeleton-title {
          height: 18px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          width: 60%;
        }
        .skeleton-desc-line-1, .skeleton-desc-line-2 {
          height: 12px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 3px;
        }
        .skeleton-desc-line-1 { width: 90%; margin-top: 10px; }
        .skeleton-desc-line-2 { width: 75%; }
        .skeleton-footer {
          margin-top: auto;
          display: flex;
          gap: 10px;
        }
        .skeleton-badge {
          height: 16px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 4px;
          width: 50px;
        }

        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        @media (max-width: 768px) {
          .github-controls {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            padding: 16px;
          }
          .github-search-wrap {
            max-width: 100%;
          }
          .github-sort-wrap {
            justify-content: space-between;
          }
          .github-sort-select {
            flex-grow: 1;
            text-align-last: right;
          }
        }
      `}</style>
    </section>
  );
}
