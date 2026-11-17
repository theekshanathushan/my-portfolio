import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ExternalLink, 
  X, 
  Search, 
  Star, 
  GitFork, 
  Folder, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Layers, 
  Globe, 
  ChevronRight,
  Shield, 
  Target, 
  UserCheck, 
  Cpu, 
  Info,
  Users,
  User,
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Tag,
  Check
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

const Github = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 20} height={props.size || 20} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
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
  Dart: "#00b4ab",
  Kotlin: "#A97BFF",
  Shell: "#89e051"
};

// Fallback Repositories (non-forks only)
const FALLBACK_REPOS = [
  {
    id: 1263633291,
    name: "CareConnect-application",
    description: "A full-stack web application built with a Spring Boot backend and a custom HTML/CSS frontend.",
    html_url: "https://github.com/theekshanathushan/CareConnect-application",
    language: "HTML",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-06-09T08:11:58Z"
  },
  {
    id: 1268861203,
    name: "Moodmirror",
    description: "An interactive, mood-reflective application designed to gauge and mirror emotions.",
    html_url: "https://github.com/theekshanathushan/Moodmirror",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-06-14T06:17:52Z"
  },
  {
    id: 1262641401,
    name: "my-portfolio",
    description: "Modern glassmorphism portfolio built with React and Vite showing interactive 3D particle elements.",
    html_url: "https://github.com/theekshanathushan/my-portfolio",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-06-15T15:16:01Z"
  },
  {
    id: 1258042809,
    name: "profile-readme-generator",
    description: "Enhance your GitHub profile with this amazing tool, which allows you to create a personalized README quickly and easily.",
    html_url: "https://github.com/theekshanathushan/profile-readme-generator",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-06-03T08:21:00Z"
  },
  {
    id: 1240854412,
    name: "Beacon_App",
    description: "A proximity scanning mobile app that detects and interacts with BLE beacons.",
    html_url: "https://github.com/theekshanathushan/Beacon_App",
    language: "Kotlin",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-05-16T17:03:05Z"
  },
  {
    id: 1074059326,
    name: "Business-web-page",
    description: "A professional business web page built using HTML, CSS, and JavaScript to promote business services and improve online presence.",
    html_url: "https://github.com/theekshanathushan/Business-web-page",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2025-10-11T09:39:05Z"
  },
  {
    id: 1240656305,
    name: "Test_API",
    description: "RESTful API test engine for route prototyping and route debugging.",
    html_url: "https://github.com/theekshanathushan/Test_API",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    updated_at: "2026-05-16T12:29:49Z"
  }
];

export default function Projects() {
  // Main view switcher ('projects' | 'github')
  const [activeView, setActiveView] = useState('projects');

  // Selected project for deep-dive modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Expander for tech chips (> 8)
  const [showAllTechs, setShowAllTechs] = useState(false);

  // GitHub state
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'stars'

  // --- 1. URL Query State Sync (?type=group&tech=react,angular) ---
  const [selectedType, setSelectedType] = useState(() => {
    if (typeof window === 'undefined') return 'all';
    try {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type')?.toLowerCase();
      if (typeParam === 'group') return 'group';
      if (typeParam === 'individual') return 'individual';
    } catch {
      // Fallback
    }
    return 'all';
  });

  const [selectedTechs, setSelectedTechs] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const params = new URLSearchParams(window.location.search);
      const techParam = params.get('tech');
      if (!techParam) return [];
      const techList = techParam.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
      
      // Match case-insensitively with actual tech names in PROJECTS_DATA
      const canonicalMap = {};
      PROJECTS_DATA.forEach(p => {
        p.techStack.forEach(t => {
          canonicalMap[t.toLowerCase()] = t;
        });
      });

      return techList.map(t => canonicalMap[t] || t).filter(Boolean);
    } catch {
      return [];
    }
  });

  // Sync state to URL Query
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      
      // Sync Type
      if (selectedType && selectedType !== 'all') {
        params.set('type', selectedType);
      } else {
        params.delete('type');
      }

      // Sync Techs
      if (selectedTechs.length > 0) {
        params.set('tech', selectedTechs.map(t => t.toLowerCase()).join(','));
      } else {
        params.delete('tech');
      }

      const newQuery = params.toString();
      const newRelativePathQuery = window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;
      
      if (window.location.search !== (newQuery ? `?${newQuery}` : '')) {
        window.history.replaceState(null, '', newRelativePathQuery);
      }
    } catch (e) {
      console.warn('URL sync failed:', e);
    }
  }, [selectedType, selectedTechs]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const typeParam = params.get('type')?.toLowerCase();
        setSelectedType(typeParam === 'group' || typeParam === 'individual' ? typeParam : 'all');

        const techParam = params.get('tech');
        if (techParam) {
          const techList = techParam.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
          const canonicalMap = {};
          PROJECTS_DATA.forEach(p => {
            p.techStack.forEach(t => {
              canonicalMap[t.toLowerCase()] = t;
            });
          });
          setSelectedTechs(techList.map(t => canonicalMap[t] || t).filter(Boolean));
        } else {
          setSelectedTechs([]);
        }
      } catch (e) {
        console.warn('Popstate sync failed:', e);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // --- 2. Filter Calculations & Combinations ---

  // Unique tech stacks sorted by frequency across all projects
  const allUniqueTechs = useMemo(() => {
    const frequency = {};
    PROJECTS_DATA.forEach(project => {
      project.techStack.forEach(tech => {
        frequency[tech] = (frequency[tech] || 0) + 1;
      });
    });

    return Object.keys(frequency).sort((a, b) => {
      if (frequency[b] !== frequency[a]) {
        return frequency[b] - frequency[a]; // most used first
      }
      return a.localeCompare(b);
    });
  }, []);

  // Filtered projects: combines Type filter + Multi-Select Tech Stack (AND logic)
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      // 1. Type filter match
      if (selectedType !== 'all' && project.type !== selectedType) {
        return false;
      }
      // 2. Tech stack match: Project must contain ALL selected tech stack chips
      if (selectedTechs.length > 0) {
        const hasAllSelectedTechs = selectedTechs.every(reqTech => 
          project.techStack.some(t => t.toLowerCase() === reqTech.toLowerCase())
        );
        if (!hasAllSelectedTechs) {
          return false;
        }
      }
      return true;
    });
  }, [selectedType, selectedTechs]);

  // Row 1 Type counts based on current tech filters
  const typeCounts = useMemo(() => {
    const techMatches = (proj) => {
      if (selectedTechs.length === 0) return true;
      return selectedTechs.every(reqTech => 
        proj.techStack.some(t => t.toLowerCase() === reqTech.toLowerCase())
      );
    };

    const matchingProjects = PROJECTS_DATA.filter(techMatches);
    return {
      all: matchingProjects.length,
      group: matchingProjects.filter(p => p.type === 'group').length,
      individual: matchingProjects.filter(p => p.type === 'individual').length,
    };
  }, [selectedTechs]);

  // Meta for each tech chip: calculates match count if added/active, and disables if 0 results
  const getTechChipMeta = (tech) => {
    const isSelected = selectedTechs.some(t => t.toLowerCase() === tech.toLowerCase());

    if (isSelected) {
      return {
        count: filteredProjects.length,
        disabled: false,
        isSelected: true
      };
    }

    // How many projects would match if this tech is added to current filters?
    const potentialTechs = [...selectedTechs, tech];
    const wouldMatchCount = PROJECTS_DATA.filter(project => {
      if (selectedType !== 'all' && project.type !== selectedType) {
        return false;
      }
      return potentialTechs.every(reqTech => 
        project.techStack.some(t => t.toLowerCase() === reqTech.toLowerCase())
      );
    }).length;

    return {
      count: wouldMatchCount,
      disabled: wouldMatchCount === 0,
      isSelected: false
    };
  };

  // Visible tech chips: top 8 by default, or all when expanded, plus any active tech outside top 8
  const visibleTechs = useMemo(() => {
    if (showAllTechs) return allUniqueTechs;
    const top8 = allUniqueTechs.slice(0, 8);
    // Ensure any currently selected tech is always visible even if outside top 8
    const extraSelected = selectedTechs.filter(t => !top8.some(item => item.toLowerCase() === t.toLowerCase()));
    return [...top8, ...extraSelected];
  }, [showAllTechs, allUniqueTechs, selectedTechs]);

  // Toggle tech chip in multi-select array
  const toggleTech = (tech) => {
    setSelectedTechs(prev => {
      const exists = prev.some(t => t.toLowerCase() === tech.toLowerCase());
      if (exists) {
        return prev.filter(t => t.toLowerCase() !== tech.toLowerCase());
      } else {
        return [...prev, tech];
      }
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedType('all');
    setSelectedTechs([]);
  };

  const hasActiveFilters = selectedType !== 'all' || selectedTechs.length > 0;

  // --- GitHub Repo Fetching ---
  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    setIsOfflineMode(false);
    try {
      const res = await fetch('https://api.github.com/users/theekshanathushan/repos?sort=updated&per_page=100');
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      
      const cleanData = data.filter(repo => 
        repo.name.toLowerCase() !== 'theekshanathushan' && !repo.fork
      );
      setRepos(cleanData);
    } catch (err) {
      console.error('Error fetching repositories: ', err);
      setRepos(FALLBACK_REPOS.filter(r => !r.fork));
      setIsOfflineMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeView === 'github' && repos.length === 0) {
      let isCancelled = false;
      fetch('https://api.github.com/users/theekshanathushan/repos?sort=updated&per_page=100')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch repositories');
          return res.json();
        })
        .then(data => {
          if (!isCancelled) {
            const cleanData = data.filter(repo => 
              repo.name.toLowerCase() !== 'theekshanathushan' && !repo.fork
            );
            setRepos(cleanData);
            setIsLoading(false);
          }
        })
        .catch(err => {
          if (!isCancelled) {
            console.error('Error fetching repositories: ', err);
            setRepos(FALLBACK_REPOS.filter(r => !r.fork));
            setIsOfflineMode(true);
            setIsLoading(false);
          }
        });
      return () => {
        isCancelled = true;
      };
    }
  }, [activeView, repos.length]);

  const filteredRepos = repos
    .filter(repo => {
      if (repo.fork) return false;
      const term = searchQuery.toLowerCase();
      const nameMatch = repo.name?.toLowerCase().includes(term) || false;
      const descMatch = repo.description?.toLowerCase().includes(term) || false;
      const langMatch = repo.language?.toLowerCase().includes(term) || false;
      return nameMatch || descMatch || langMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at) - new Date(a.updated_at);
    });

  // --- Render Interactive Mockups for Cards & Modal ---
  const renderMockup = (item, isModal = false) => {
    // 1. TalentAI
    if (item.id === 'talentai') {
      return (
        <div className={`browser-mockup-frame ${isModal ? 'modal-browser' : ''}`}>
          <div className="browser-header">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-url-bar">
              <Globe size={11} className="url-icon" />
              <span className="url-text">{item.mockupUrl || 'https://talentai.preview/recruiter/screening'}</span>
            </div>
          </div>
          <div className="browser-viewport talentai-preview">
            <div className="mockup-ui-topbar">
              <div className="mockup-ui-brand">
                <span className="ui-brand-badge">TalentAI</span>
                <span className="ui-role-label">Recruiter Portal</span>
              </div>
              <div className="mockup-metric-pill">
                <Sparkles size={11} className="text-glow-accent" />
                <span>94% Gemini Match</span>
              </div>
            </div>

            <div className="mockup-ui-card">
              <div className="ui-candidate-row">
                <div className="ui-avatar">TT</div>
                <div className="ui-candidate-info">
                  <span className="ui-cand-title">Senior Full-Stack Applicant</span>
                  <span className="ui-cand-sub">Screening Status: Highly Recommended</span>
                </div>
              </div>
              <div className="ui-tags-cluster">
                <span className="ui-micro-tag">ASP.NET Core</span>
                <span className="ui-micro-tag">Angular</span>
                <span className="ui-micro-tag">JWT</span>
                <span className="ui-micro-tag">MySQL</span>
              </div>
              <div className="ui-ai-summary-bar">
                <Cpu size={12} className="ai-bar-icon" />
                <span>Gemini: Verified proficiency in clean architecture, microservices, and automated workers.</span>
              </div>
            </div>

            <div className="mockup-footer-cue">
              <span>📷 [Replace with screenshot anytime]</span>
            </div>
          </div>
        </div>
      );
    }

    // 2. AgriAI
    if (item.id === 'agriai') {
      return (
        <div className={`phone-mockup-frame ${isModal ? 'modal-phone' : ''}`}>
          <div className="phone-notch">
            <div className="phone-speaker"></div>
            <div className="phone-camera"></div>
          </div>
          <div className="phone-screen agriai-screen">
            <div className="phone-status-bar">
              <span className="status-time">9:41</span>
              <div className="status-icons">
                <span className="status-dot"></span>
                <span className="status-dot"></span>
              </div>
            </div>
            
            <div className="agri-viewfinder">
              <div className="agri-reticle">
                <span className="reticle-bracket top-l"></span>
                <span className="reticle-bracket top-r"></span>
                <span className="reticle-bracket btm-l"></span>
                <span className="reticle-bracket btm-r"></span>
                <span className="agri-leaf-icon">🌿</span>
                <span className="agri-scan-label">Leaf Vision Scanner</span>
              </div>
            </div>

            <div className="agri-diagnosis-card">
              <div className="agri-diag-head">
                <span className="diag-dot"></span>
                <strong>Early Blight Identified (92%)</strong>
              </div>
              <span className="agri-diag-tip">Rx: Apply organic copper fungicide</span>
              <div className="agri-audio-badge">
                <span>🎙️ Native Voice Agent (Sinhala / EN)</span>
              </div>
            </div>

            <div className="mockup-footer-cue">
              <span>📱 [Replace with screenshot anytime]</span>
            </div>
          </div>
        </div>
      );
    }

    // 3. NovaExplorer
    if (item.id === 'novaexplorer') {
      return (
        <div className={`browser-mockup-frame ${isModal ? 'modal-browser' : ''}`}>
          <div className="browser-header">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-url-bar">
              <Globe size={11} className="url-icon" />
              <span className="url-text">{item.mockupUrl || 'https://novaexplorer.vercel.app'}</span>
            </div>
          </div>
          <div className="browser-viewport nova-preview">
            <div className="mockup-ui-topbar">
              <div className="mockup-ui-brand">
                <span className="ui-brand-badge" style={{ color: '#00f2fe' }}>NovaExplorer</span>
                <span className="ui-role-label">NASA Telemetry Portal</span>
              </div>
              <div className="mockup-metric-pill" style={{ color: '#38bdf8' }}>
                <span>🛰️ Live on Vercel</span>
              </div>
            </div>

            <div className="mockup-ui-card nova-ui-card">
              <div className="nova-head-row">
                <span className="nova-tag">Mars 2020 Mission</span>
                <strong>Perseverance Rover — Jezero Crater</strong>
              </div>
              <div className="nova-telemetry-grid">
                <div className="telemetry-box">
                  <span className="t-label">Sol</span>
                  <span className="t-val">1042</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-label">Telemetry</span>
                  <span className="t-val text-glow-accent">Nominal</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-label">Raw Photos</span>
                  <span className="t-val">4,200+</span>
                </div>
              </div>
              <div className="nova-orbit-track">
                <span className="orbit-step active">Launch</span>
                <span className="orbit-sep">➔</span>
                <span className="orbit-step active">Cruise</span>
                <span className="orbit-sep">➔</span>
                <span className="orbit-step active">Martian Surface</span>
              </div>
            </div>

            <div className="mockup-footer-cue">
              <span>💻 [Live at novaexplorer.vercel.app]</span>
            </div>
          </div>
        </div>
      );
    }

    // 4. IgnitX Track A
    if (item.id === 'ignitx') {
      return (
        <div className={`browser-mockup-frame ${isModal ? 'modal-browser' : ''}`}>
          <div className="browser-header">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-url-bar">
              <Globe size={11} className="url-icon" />
              <span className="url-text">ignitx.hutch-hackathon.ai/track-a</span>
            </div>
          </div>
          <div className="browser-viewport ignitx-preview">
            <div className="mockup-ui-topbar">
              <div className="mockup-ui-brand">
                <span className="ui-brand-badge" style={{ color: '#f59e0b' }}>Hutch IgnitX</span>
                <span className="ui-role-label">Track A: Root-Cause AI</span>
              </div>
              <div className="mockup-metric-pill" style={{ color: '#10b981' }}>
                <span>🏆 Hackathon Entry</span>
              </div>
            </div>

            <div className="mockup-ui-card ignitx-ui-card">
              <div className="ignitx-status-row">
                <strong>Telemetry Friction Diagnostics</strong>
                <span className="ignitx-live-badge">Heuristic Active</span>
              </div>
              <div className="ignitx-metrics-row">
                <div className="ignitx-metric">
                  <span className="m-label">Dropout Risk</span>
                  <div className="m-track"><div className="m-fill" style={{ width: '14%' }}></div></div>
                  <span className="m-val" style={{ color: '#10b981' }}>14% (Minimal)</span>
                </div>
                <div className="ignitx-metric">
                  <span className="m-label">Isolated Root Cause</span>
                  <span className="m-cause">Friction in morning self-care onboarding step</span>
                </div>
              </div>
              <div className="ignitx-intervention-pill">
                <CheckCircle2 size={12} className="text-glow-accent" />
                <span>Prescription: Trigger adaptive coping prompt</span>
              </div>
            </div>

            <div className="mockup-footer-cue">
              <span>🏆 [Hutch IgnitX Hackathon Prototype]</span>
            </div>
          </div>
        </div>
      );
    }

    // 5. CareConnect
    if (item.id === 'careconnect') {
      return (
        <div className={`browser-mockup-frame ${isModal ? 'modal-browser' : ''}`}>
          <div className="browser-header">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-url-bar">
              <Globe size={11} className="url-icon" />
              <span className="url-text">careconnect.relief-ops.org/dashboard</span>
            </div>
          </div>
          <div className="browser-viewport careconnect-preview">
            <div className="mockup-ui-topbar">
              <div className="mockup-ui-brand">
                <span className="ui-brand-badge" style={{ color: '#10b981' }}>CareConnect</span>
                <span className="ui-role-label">Disaster Relief Operations</span>
              </div>
              <div className="mockup-metric-pill" style={{ color: '#10b981' }}>
                <span>🚨 Active Dispatch</span>
              </div>
            </div>

            <div className="mockup-ui-card">
              <div className="care-status-row">
                <span className="care-zone-title">Leaflet Geographic Operations Grid</span>
                <span className="care-live-tag">Live Geo-Tracking</span>
              </div>
              <div className="care-telemetry-row">
                <div className="telemetry-box">
                  <span className="t-label">Active Zones</span>
                  <span className="t-val">12</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-label">Donors Matched</span>
                  <span className="t-val text-glow-accent">184</span>
                </div>
                <div className="telemetry-box">
                  <span className="t-label">WebSocket Latency</span>
                  <span className="t-val">32ms</span>
                </div>
              </div>
              <div className="care-dispatch-banner">
                <CheckCircle2 size={12} className="text-glow-accent" />
                <span>Emergency resource allocation synchronized via Spring Boot backend.</span>
              </div>
            </div>

            <div className="mockup-footer-cue">
              <span>🗺️ [CareConnect Disaster Relief Platform]</span>
            </div>
          </div>
        </div>
      );
    }

    // 6. MoodMirror
    return (
      <div className={`browser-mockup-frame ${isModal ? 'modal-browser' : ''}`}>
        <div className="browser-header">
          <div className="browser-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <div className="browser-url-bar">
            <Globe size={11} className="url-icon" />
            <span className="url-text">moodmirror.wellness.app/analytics</span>
          </div>
        </div>
        <div className="browser-viewport moodmirror-preview">
          <div className="mockup-ui-topbar">
            <div className="mockup-ui-brand">
              <span className="ui-brand-badge" style={{ color: '#c084fc' }}>MoodMirror</span>
              <span className="ui-role-label">Mental Wellness Hub</span>
            </div>
            <div className="mockup-metric-pill" style={{ color: '#c084fc' }}>
              <span>✨ 14-Day Streak</span>
            </div>
          </div>

          <div className="mockup-ui-card">
            <div className="mood-stats-row">
              <span className="mood-chart-title">Long-Term Mood Analytics (Recharts)</span>
              <span className="mood-score-tag">Positive (78%)</span>
            </div>
            <div className="mood-bars-grid">
              <div className="mood-bar-item">
                <span className="mood-label">Calm</span>
                <div className="m-track"><div className="m-fill" style={{ width: '85%', background: '#38bdf8' }}></div></div>
              </div>
              <div className="mood-bar-item">
                <span className="mood-label">Focus</span>
                <div className="m-track"><div className="m-fill" style={{ width: '70%', background: '#a855f7' }}></div></div>
              </div>
              <div className="mood-bar-item">
                <span className="mood-label">Joy</span>
                <div className="m-track"><div className="m-fill" style={{ width: '92%', background: '#10b981' }}></div></div>
              </div>
            </div>
            <div className="mood-routine-pill">
              <Sparkles size={11} className="text-glow-accent" />
              <span>Push Notification Scheduled: 8:00 PM Mindful Reflection</span>
            </div>
          </div>

          <div className="mockup-footer-cue">
            <span>📊 [MoodMirror Wellness Analytics Platform]</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-title-wrap">
          <span className="section-subtitle">Engineering Portfolio</span>
          <h2 className="section-title">Case Studies & Projects</h2>
          <p className="projects-lead-text">
            Deep-dive case studies showcasing full-stack systems, mobile AI solutions, and open-source contributions.
          </p>
        </div>

        {/* View Switcher: Curated Projects vs GitHub Repositories */}
        <div className="view-mode-toggle-wrap">
          <div className="view-mode-toggle glass-card" role="tablist" aria-label="Project view mode">
            <button 
              role="tab"
              aria-selected={activeView === 'projects'}
              className={`view-mode-btn ${activeView === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveView('projects')}
            >
              <Sparkles size={15} />
              <span>Curated Projects ({PROJECTS_DATA.length})</span>
            </button>
            <button 
              role="tab"
              aria-selected={activeView === 'github'}
              className={`view-mode-btn ${activeView === 'github' ? 'active' : ''}`}
              onClick={() => setActiveView('github')}
            >
              <Folder size={15} />
              <span>GitHub Repositories</span>
            </button>
          </div>
        </div>

        {activeView === 'projects' ? (
          <div className="projects-filtering-system">
            
            {/* === FILTER CONTROL PANEL (Premium Dark UI) === */}
            <div className="filter-dashboard-card glass-card">
              
              {/* Row 1: Segmented Control (All | Group | Individual) */}
              <div className="filter-row-primary">
                <div className="filter-segment-group" role="group" aria-label="Filter projects by structure">
                  <button
                    type="button"
                    className={`segment-btn ${selectedType === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedType('all')}
                    aria-pressed={selectedType === 'all'}
                  >
                    <span>All Projects</span>
                    <span className="segment-badge">{typeCounts.all}</span>
                  </button>

                  <button
                    type="button"
                    className={`segment-btn ${selectedType === 'group' ? 'active' : ''}`}
                    onClick={() => setSelectedType('group')}
                    aria-pressed={selectedType === 'group'}
                  >
                    <Users size={14} className="segment-icon" />
                    <span>Group Projects</span>
                    <span className="segment-badge">{typeCounts.group}</span>
                  </button>

                  <button
                    type="button"
                    className={`segment-btn ${selectedType === 'individual' ? 'active' : ''}`}
                    onClick={() => setSelectedType('individual')}
                    aria-pressed={selectedType === 'individual'}
                  >
                    <User size={14} className="segment-icon" />
                    <span>Individual Projects</span>
                    <span className="segment-badge">{typeCounts.individual}</span>
                  </button>
                </div>

                {/* Reset Filters Action Button */}
                {hasActiveFilters && (
                  <button 
                    type="button"
                    className="btn-clear-filters"
                    onClick={clearFilters}
                    aria-label="Clear all applied filters"
                  >
                    <RotateCcw size={13} />
                    <span>Clear filters</span>
                  </button>
                )}
              </div>

              {/* Row 2: Tech Stack Multi-Select Filter Chips */}
              <div className="filter-row-secondary">
                <div className="tech-filter-header">
                  <div className="tech-filter-title">
                    <SlidersHorizontal size={13} className="text-glow-accent" />
                    <span>Filter by Tech Stack (Multi-Select • AND logic):</span>
                  </div>
                  {allUniqueTechs.length > 8 && (
                    <button
                      type="button"
                      className="tech-expand-toggle-btn"
                      onClick={() => setShowAllTechs(!showAllTechs)}
                      aria-expanded={showAllTechs}
                    >
                      {showAllTechs ? (
                        <>
                          <span>Show top 8</span>
                          <ChevronUp size={13} />
                        </>
                      ) : (
                        <>
                          <span>Show all ({allUniqueTechs.length})</span>
                          <ChevronDown size={13} />
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Horizontal Scroll / Wrap Tech Chips Container */}
                <div 
                  className="tech-chips-scroll-container" 
                  role="group" 
                  aria-label="Filter projects by technology stack"
                >
                  {visibleTechs.map((tech) => {
                    const meta = getTechChipMeta(tech);
                    return (
                      <button
                        key={tech}
                        type="button"
                        className={`tech-filter-chip ${meta.isSelected ? 'selected' : ''} ${meta.disabled ? 'disabled' : ''}`}
                        onClick={() => !meta.disabled && toggleTech(tech)}
                        disabled={meta.disabled}
                        aria-pressed={meta.isSelected}
                        aria-disabled={meta.disabled}
                        title={meta.disabled ? `No matching projects using ${tech} with current filters` : `Filter by ${tech}`}
                      >
                        {meta.isSelected && <Check size={12} className="chip-check-icon" />}
                        <span className="chip-label">{tech}</span>
                        <span className="chip-count-bubble">{meta.count}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Active Filter Summary Strip */}
                {hasActiveFilters && (
                  <div className="active-filters-summary-bar">
                    <div className="active-tags-cluster">
                      <span className="active-summary-label">Active:</span>
                      
                      {selectedType !== 'all' && (
                        <span className="active-pill">
                          <span>{selectedType === 'group' ? 'Group Projects' : 'Individual Projects'}</span>
                          <button 
                            type="button" 
                            className="remove-pill-btn" 
                            onClick={() => setSelectedType('all')}
                            aria-label={`Remove ${selectedType} filter`}
                          >
                            <X size={11} />
                          </button>
                        </span>
                      )}

                      {selectedTechs.map(tech => (
                        <span key={tech} className="active-pill tech-pill">
                          <span>{tech}</span>
                          <button 
                            type="button" 
                            className="remove-pill-btn" 
                            onClick={() => toggleTech(tech)}
                            aria-label={`Remove ${tech} filter`}
                          >
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="results-counter-indicator">
                      <span>Showing <strong>{filteredProjects.length}</strong> of {PROJECTS_DATA.length} projects</span>
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* === PROJECTS GRID === */}
            {filteredProjects.length > 0 ? (
              <div className="case-studies-grid">
                {filteredProjects.map((project, idx) => (
                  <article 
                    key={project.id} 
                    className="case-study-card glass-card project-animated-entry"
                    style={{ animationDelay: `${idx * 0.06}s` }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Top Mockup Slot */}
                    <div className="card-mockup-wrapper">
                      {renderMockup(project)}
                      
                      {/* Structure Type Badge (Group or Individual) */}
                      <div className="card-type-badge-pill">
                        {project.type === 'group' ? (
                          <span className="type-badge group" title={`Group Project (${project.teamSize || 4} members)`}>
                            <Users size={11} />
                            <span>Group {project.teamSize ? `• ${project.teamSize}` : ''}</span>
                          </span>
                        ) : (
                          <span className="type-badge individual" title="Individual Project">
                            <User size={11} />
                            <span>Individual</span>
                          </span>
                        )}
                      </div>

                      {/* Rank or Category Badge */}
                      {project.rank ? (
                        <div className="card-rank-badge">
                          <span>#{project.rank}</span>
                        </div>
                      ) : (
                        <div className="card-rank-badge secondary">
                          <span>{project.category}</span>
                        </div>
                      )}

                      {project.badge && (
                        <div className="card-category-badge">
                          <span>{project.badge}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Content Area */}
                    <div className="case-study-body">
                      
                      <div className="case-study-titles">
                        <div className="title-and-year-row">
                          <h3 className="case-study-title">{project.title}</h3>
                          <span className="project-year-pill">{project.year}</span>
                        </div>
                        <span className="case-study-subtitle">{project.subtitle}</span>
                      </div>

                      <p className="case-study-summary">{project.summary}</p>

                      {/* Role Highlight */}
                      <div className="card-role-strip">
                        <UserCheck size={13} className="role-icon" />
                        <span><strong>Role:</strong> {project.role}</span>
                      </div>

                      {/* Problem or Highlight Teaser */}
                      {project.problem ? (
                        <div className="case-study-problem-box">
                          <Target size={14} className="problem-icon" />
                          <p className="problem-text">
                            <strong>The Problem:</strong> {project.problem}
                          </p>
                        </div>
                      ) : (
                        <div className="case-study-problem-box highlight">
                          <CheckCircle2 size={14} className="problem-icon" />
                          <p className="problem-text">
                            <strong>Core Focus:</strong> {project.achievements[0]}
                          </p>
                        </div>
                      )}

                      {/* Clickable Tech Stack Chips */}
                      <div className="case-study-chips" role="group" aria-label="Project technologies">
                        {project.techStack.map((tech) => {
                          const isActive = selectedTechs.some(t => t.toLowerCase() === tech.toLowerCase());
                          return (
                            <button
                              key={tech}
                              type="button"
                              className={`tech-chip-interactive ${isActive ? 'active' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTech(tech);
                              }}
                              aria-pressed={isActive}
                              title={`Filter projects by ${tech}`}
                            >
                              {tech}
                            </button>
                          );
                        })}
                      </div>

                      {/* Card Actions */}
                      <div className="case-study-actions" onClick={(e) => e.stopPropagation()}>
                        <button 
                          type="button"
                          className="btn-read-case-study"
                          onClick={() => setSelectedProject(project)}
                          aria-label={`Open details for ${project.title}`}
                        >
                          <span>Case Study Details</span>
                          <ChevronRight size={15} />
                        </button>

                        <div className="case-study-external-links">
                          {project.links.demo && project.links.demo !== '#' && (
                            <a 
                              href={project.links.demo} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="external-icon-link"
                              title="Open Live Demo"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}
                          {project.links.github && (
                            <a 
                              href={project.links.github} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="external-icon-link"
                              title="Open GitHub Repository"
                            >
                              <Github size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Friendly Empty State */
              <div className="projects-empty-state glass-card">
                <div className="empty-icon-wrap">
                  <SlidersHorizontal size={40} className="empty-sliders-icon text-glow-accent" />
                </div>
                <h3 className="empty-state-title">No matching projects found</h3>
                <p className="empty-state-desc">
                  No projects match your current filter combination of{' '}
                  <span className="empty-highlight">
                    {selectedType !== 'all' ? (selectedType === 'group' ? 'Group Projects' : 'Individual Projects') : 'All Projects'}
                  </span>
                  {selectedTechs.length > 0 && (
                    <>
                      {' '}and technology stack{' '}
                      <span className="empty-highlight">{selectedTechs.join(' + ')}</span>
                    </>
                  )}.
                </p>
                <button 
                  type="button" 
                  className="btn btn-primary empty-reset-btn"
                  onClick={clearFilters}
                >
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* GitHub Repositories Tab */
          <div className="github-section">
            
            {/* Offline Alert */}
            {isOfflineMode && (
              <div className="github-alert glass-card">
                <div className="alert-content">
                  <AlertCircle size={18} className="alert-icon" />
                  <span className="alert-text">
                    Displaying cached original repositories. Live sync rate-limited or offline.
                  </span>
                </div>
                <button onClick={fetchGitHubRepos} className="alert-retry-btn" disabled={isLoading}>
                  {isLoading ? 'Retrying...' : 'Retry Live Sync'}
                </button>
              </div>
            )}

            {/* Repos Controls */}
            <div className="repos-controls-bar">
              <div className="search-box-wrap glass-card">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Filter repositories by name or tech..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="repo-search-input"
                />
                {searchQuery && (
                  <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="sort-box-wrap">
                <label htmlFor="repo-sort-select" className="sort-label">Sort by:</label>
                <select 
                  id="repo-sort-select"
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)} 
                  className="repo-sort-select glass-card"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                </select>
              </div>
            </div>

            {/* Repos Grid */}
            {isLoading ? (
              <div className="repos-loading-state">
                <div className="loading-spinner"></div>
                <p>Syncing public GitHub repositories...</p>
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="repos-empty-state glass-card">
                <Folder size={36} className="empty-icon text-glow-accent" />
                <p>No non-fork repositories found matching your query.</p>
              </div>
            ) : (
              <div className="repos-grid">
                {filteredRepos.map(repo => {
                  const langColor = LANGUAGE_COLORS[repo.language] || '#8b949e';
                  return (
                    <div key={repo.id} className="repo-card glass-card">
                      <div className="repo-header">
                        <div className="repo-title-wrap">
                          <Folder size={18} className="repo-folder-icon" />
                          <h4 className="repo-name" title={repo.name}>{repo.name}</h4>
                        </div>
                        <div className="repo-stars">
                          <Star size={13} className="star-icon" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                      </div>

                      <p className="repo-desc">
                        {repo.description || "Open-source software engineering repository."}
                      </p>

                      <div className="repo-footer">
                        {repo.language && (
                          <div className="repo-language">
                            <span className="lang-color-dot" style={{ backgroundColor: langColor }}></span>
                            <span className="lang-name">{repo.language}</span>
                          </div>
                        )}
                        <span className="repo-updated-time">
                          Updated {new Date(repo.updated_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="repo-links-row">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="repo-link-btn"
                        >
                          <Github size={14} /> View Code
                        </a>
                        {repo.homepage && (
                          <a 
                            href={repo.homepage} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="repo-link-btn demo-btn"
                          >
                            Live <ExternalLink size={13} />
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

        {/* Premium Project Deep-Dive Modal */}
        {selectedProject && (
          <div className="case-study-modal-backdrop" onClick={() => setSelectedProject(null)}>
            <div 
              className="case-study-modal-container glass-card"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
            >
              {/* Modal Header Bar */}
              <div className="modal-top-bar">
                <div className="modal-top-brand">
                  {selectedProject.rank ? (
                    <span className="modal-rank-badge">Case Study #{selectedProject.rank}</span>
                  ) : (
                    <span className="modal-rank-badge secondary">{selectedProject.category}</span>
                  )}
                  <span className="modal-badge-category">
                    {selectedProject.type === 'group' 
                      ? `Group Project (${selectedProject.teamSize || 4} members)` 
                      : 'Individual Project'}
                  </span>
                </div>
                <button 
                  type="button"
                  className="modal-close-icon-btn"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close Case Study"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="modal-scroll-body">
                
                {/* Title & Summary */}
                <div className="modal-title-section">
                  <div className="modal-title-row">
                    <h2 id="modal-project-title" className="modal-main-title">{selectedProject.title}</h2>
                    <span className="modal-year-tag">{selectedProject.year}</span>
                  </div>
                  <p className="modal-main-subtitle">{selectedProject.subtitle}</p>
                  <p className="modal-one-line-summary">{selectedProject.summary}</p>
                </div>

                {/* Mockup Preview Slot */}
                <div className="modal-mockup-wrapper">
                  {renderMockup(selectedProject, true)}
                </div>

                {/* Two Column Deep Dive Info */}
                <div className="modal-detail-columns">
                  
                  {/* Left Column: Problem, What I Built & Role */}
                  <div className="modal-detail-col">
                    
                    {selectedProject.problem && (
                      <div className="detail-section-block">
                        <div className="detail-block-title">
                          <Target size={16} className="text-glow-accent" />
                          <h4>The Problem</h4>
                        </div>
                        <p className="detail-block-p">{selectedProject.problem}</p>
                      </div>
                    )}

                    {selectedProject.whatIBuilt && (
                      <div className="detail-section-block">
                        <div className="detail-block-title">
                          <Cpu size={16} className="text-glow-accent" />
                          <h4>What I Built</h4>
                        </div>
                        <p className="detail-block-p">{selectedProject.whatIBuilt}</p>
                      </div>
                    )}

                    <div className="detail-section-block role-highlight-block">
                      <div className="detail-block-title">
                        <UserCheck size={16} className="text-glow-accent" />
                        <h4>My Role & Project Type</h4>
                      </div>
                      <p className="detail-role-p">
                        <strong>Role:</strong> {selectedProject.role}
                      </p>
                      <p className="detail-structure-p">
                        <strong>Classification:</strong> {selectedProject.type === 'group' ? `Group Project (Team size: ${selectedProject.teamSize || 4})` : 'Individual Project'}
                      </p>
                    </div>

                  </div>

                  {/* Right Column: Key Achievements, Tech Stack & Links */}
                  <div className="modal-detail-col">
                    
                    <div className="detail-section-block">
                      <div className="detail-block-title">
                        <CheckCircle2 size={16} className="text-glow-accent" />
                        <h4>Key Engineering Achievements</h4>
                      </div>
                      <ul className="modal-achievements-list">
                        {selectedProject.achievements.map((ach, idx) => (
                          <li key={idx} className="achievement-item">
                            <span className="achievement-idx">{idx + 1}</span>
                            <span className="achievement-text">
                              {ach.includes('[add measurable result]') ? (
                                <>
                                  {ach.split('[add measurable result]')[0]}
                                  <span className="measurable-placeholder-tag">[add measurable result]</span>
                                  {ach.split('[add measurable result]')[1]}
                                </>
                              ) : (
                                ach
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="detail-section-block">
                      <div className="detail-block-title">
                        <Layers size={16} className="text-glow-accent" />
                        <h4>Technologies Used</h4>
                      </div>
                      <div className="modal-tech-chips">
                        {selectedProject.techStack.map(t => (
                          <span key={t} className="modal-tech-chip">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* External CTAs */}
                    <div className="modal-ctas-panel">
                      {selectedProject.links.demo && selectedProject.links.demo !== '#' && (
                        <a 
                          href={selectedProject.links.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary"
                        >
                          <ExternalLink size={16} />
                          <span>{selectedProject.links.demoLabel || 'Live Demo'}</span>
                        </a>
                      )}
                      {selectedProject.links.github && (
                        <a 
                          href={selectedProject.links.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-secondary"
                        >
                          <Github size={16} />
                          <span>{selectedProject.links.githubLabel || 'View GitHub Repo'}</span>
                        </a>
                      )}
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Embedded CSS for Projects & Filter Dashboard */}
      <style>{`
        .projects-section {
          position: relative;
        }

        .projects-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 640px;
          text-align: center;
          margin-top: 12px;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* --- View Mode Switcher --- */
        .view-mode-toggle-wrap {
          display: flex;
          justify-content: center;
          margin: 20px 0 28px;
        }

        .view-mode-toggle {
          display: inline-flex;
          padding: 5px;
          border-radius: 12px;
          gap: 6px;
        }

        .view-mode-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 18px;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 13.5px;
          font-weight: 600;
          transition: all 0.25s ease;
          cursor: pointer;
        }

        .view-mode-btn:hover {
          color: var(--text-white);
        }

        .view-mode-btn.active {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.12);
          border-color: rgba(var(--accent-rgb), 0.35);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        /* --- Filter Dashboard Panel --- */
        .filter-dashboard-card {
          margin-bottom: 32px;
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border: 1px solid rgba(var(--accent-rgb), 0.18);
          background: rgba(11, 11, 20, 0.7);
        }

        /* Row 1: Segmented Group/Individual Control */
        .filter-row-primary {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          padding-bottom: 16px;
        }

        .filter-segment-group {
          display: inline-flex;
          background: rgba(0, 0, 0, 0.4);
          padding: 4px;
          border-radius: 10px;
          gap: 4px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
        }

        .segment-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 7px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .segment-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.04);
        }

        .segment-btn.active {
          background: rgba(var(--accent-rgb), 0.15);
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
        }

        .segment-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-light);
        }

        .segment-btn.active .segment-badge {
          background: rgba(var(--accent-rgb), 0.3);
          color: var(--accent);
        }

        .btn-clear-filters {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-clear-filters:hover {
          background: rgba(239, 68, 68, 0.2);
          border-color: #ef4444;
          color: #ffffff;
        }

        /* Row 2: Tech Stack Multi-Select Filter Chips */
        .filter-row-secondary {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tech-filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }

        .tech-filter-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--text-light);
        }

        .tech-expand-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: transparent;
          border: none;
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 2px 4px;
          transition: opacity 0.2s;
        }

        .tech-expand-toggle-btn:hover {
          opacity: 0.8;
          text-decoration: underline;
        }

        /* Tech Chips Container (Horizontal scrolling on mobile, wrap on desktop) */
        .tech-chips-scroll-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }

        @media (max-width: 768px) {
          .tech-chips-scroll-container {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 6px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .tech-chips-scroll-container::-webkit-scrollbar {
            display: none;
          }
        }

        .tech-filter-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-light);
          font-family: var(--font-mono);
          font-size: 11.5px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          flex-shrink: 0;
        }

        .tech-filter-chip:hover:not(:disabled) {
          border-color: rgba(var(--accent-rgb), 0.5);
          color: var(--text-white);
          background: rgba(var(--accent-rgb), 0.08);
          transform: translateY(-2px);
        }

        .tech-filter-chip.selected {
          background: rgba(var(--accent-rgb), 0.18);
          border-color: var(--accent);
          color: var(--accent);
          font-weight: 600;
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.2);
        }

        .tech-filter-chip.disabled {
          opacity: 0.35;
          cursor: not-allowed;
          border-color: rgba(255, 255, 255, 0.04);
          background: rgba(0, 0, 0, 0.2);
          color: var(--text-dark);
        }

        .chip-check-icon {
          color: var(--accent);
        }

        .chip-count-bubble {
          font-size: 10px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-muted);
        }

        .tech-filter-chip.selected .chip-count-bubble {
          background: rgba(var(--accent-rgb), 0.25);
          color: var(--accent);
        }

        /* Active Filters Summary Strip */
        .active-filters-summary-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 4px;
          padding-top: 10px;
          border-top: 1px dashed rgba(255, 255, 255, 0.08);
        }

        .active-tags-cluster {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .active-summary-label {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          margin-right: 4px;
        }

        .active-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 2px 8px;
          border-radius: 6px;
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 11px;
        }

        .remove-pill-btn {
          background: transparent;
          border: none;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          padding: 0;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .remove-pill-btn:hover {
          opacity: 1;
        }

        .results-counter-indicator {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-muted);
        }

        .results-counter-indicator strong {
          color: var(--accent);
        }

        /* --- Case Studies Grid --- */
        .case-studies-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 40px;
        }

        @media (max-width: 960px) {
          .case-studies-grid {
            grid-template-columns: 1fr;
          }
        }

        .case-study-card {
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-glass);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          cursor: pointer;
        }

        .project-animated-entry {
          animation: cardEntryFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardEntryFade {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .case-study-card:hover {
          transform: translateY(-8px);
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(var(--accent-rgb), 0.15);
        }

        /* --- Mockup Frames & Card Badges --- */
        .card-mockup-wrapper {
          position: relative;
          background: rgba(10, 10, 18, 0.7);
          padding: 24px 24px 16px;
          border-bottom: 1px solid var(--border-glass);
          overflow: hidden;
        }

        .card-type-badge-pill {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 3;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .type-badge.group {
          background: rgba(56, 189, 248, 0.15);
          border: 1px solid rgba(56, 189, 248, 0.35);
          color: #38bdf8;
        }

        .type-badge.individual {
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.35);
          color: #c084fc;
        }

        .card-rank-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.15);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          padding: 2px 8px;
          border-radius: 6px;
          z-index: 2;
        }

        .card-rank-badge.secondary {
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .card-category-badge {
          position: absolute;
          bottom: 12px;
          right: 14px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 2px 8px;
          border-radius: 6px;
          z-index: 2;
        }

        /* Browser Mockup */
        .browser-mockup-frame {
          border-radius: 12px;
          background: rgba(7, 7, 12, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .browser-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .browser-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .dot-red { background: #ff5f56; }
        .dot-yellow { background: #ffbd2e; }
        .dot-green { background: #27c93f; }

        .browser-url-bar {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.4);
          padding: 3px 8px;
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .browser-viewport {
          min-height: 190px;
          display: flex;
          flex-direction: column;
          padding: 14px 16px;
          background: rgba(8, 10, 18, 0.9);
        }

        /* Mockup UI Topbar */
        .mockup-ui-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-bottom: 12px;
        }

        .mockup-ui-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ui-brand-badge {
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          color: var(--accent);
        }

        .ui-role-label {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }

        .mockup-metric-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.12);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          padding: 3px 8px;
          border-radius: 999px;
        }

        /* Mockup UI Card inside Browser */
        .mockup-ui-card {
          width: 100%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ui-candidate-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ui-avatar {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.3), rgba(var(--accent-rgb), 0.05));
          border: 1px solid rgba(var(--accent-rgb), 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          flex-shrink: 0;
        }

        .ui-candidate-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ui-cand-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-white);
        }

        .ui-cand-sub {
          font-size: 10px;
          color: #10b981;
          font-family: var(--font-mono);
        }

        .ui-tags-cluster {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .ui-micro-tag {
          font-size: 9.5px;
          font-family: var(--font-mono);
          padding: 2px 7px;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-light);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .ui-ai-summary-bar {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 10.5px;
          color: var(--text-light);
          line-height: 1.4;
          background: rgba(var(--accent-rgb), 0.06);
          padding: 7px 10px;
          border-radius: 6px;
          border-left: 2px solid var(--accent);
        }

        .ai-bar-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .mockup-footer-cue {
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-dark);
          text-align: center;
        }

        /* Phone Mockup Frame */
        .phone-mockup-frame {
          max-width: 220px;
          margin: 0 auto;
          border-radius: 22px;
          border: 2px solid rgba(255, 255, 255, 0.15);
          background: rgba(7, 7, 12, 0.95);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
        }

        .phone-notch {
          height: 14px;
          background: rgba(255, 255, 255, 0.03);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .phone-speaker {
          width: 32px;
          height: 3px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        .phone-camera {
          width: 5px;
          height: 5px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
        }

        .phone-status-bar {
          display: flex;
          justify-content: space-between;
          padding: 4px 10px;
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--text-dark);
        }

        .status-icons {
          display: flex;
          gap: 3px;
        }

        .status-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--text-dark);
        }

        /* AgriAI Screen */
        .agriai-screen {
          min-height: 190px;
          padding: 8px 10px 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: linear-gradient(180deg, #09130d 0%, #060a08 100%);
        }

        .agri-viewfinder {
          position: relative;
          height: 72px;
          border-radius: 10px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px dashed rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .agri-reticle {
          position: relative;
          width: 54px;
          height: 44px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .reticle-bracket {
          position: absolute;
          width: 8px;
          height: 8px;
          border-color: #10b981;
          border-style: solid;
        }

        .reticle-bracket.top-l { top: 0; left: 0; border-width: 2px 0 0 2px; }
        .reticle-bracket.top-r { top: 0; right: 0; border-width: 2px 2px 0 0; }
        .reticle-bracket.btm-l { bottom: 0; left: 0; border-width: 0 0 2px 2px; }
        .reticle-bracket.btm-r { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

        .agri-leaf-icon {
          font-size: 16px;
          line-height: 1;
        }

        .agri-scan-label {
          font-family: var(--font-mono);
          font-size: 7.5px;
          color: #10b981;
          margin-top: 2px;
        }

        .agri-diagnosis-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(16, 185, 129, 0.25);
          border-radius: 8px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .agri-diag-head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9.5px;
          color: #10b981;
        }

        .diag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
        }

        .agri-diag-tip {
          font-size: 8.5px;
          color: var(--text-muted);
        }

        .agri-audio-badge {
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          width: fit-content;
          margin-top: 2px;
        }

        /* NovaExplorer Screen */
        .nova-preview {
          background: radial-gradient(circle at 70% 30%, rgba(0, 242, 254, 0.08) 0%, rgba(8, 10, 20, 0.95) 70%);
        }

        .nova-ui-card {
          gap: 8px;
        }

        .nova-head-row {
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 11px;
          color: var(--text-white);
        }

        .nova-tag {
          font-family: var(--font-mono);
          font-size: 9px;
          color: #38bdf8;
        }

        .nova-telemetry-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .telemetry-box {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 6px;
          padding: 5px 4px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .t-label {
          font-family: var(--font-mono);
          font-size: 7.5px;
          color: var(--text-dark);
        }

        .t-val {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-white);
        }

        .nova-orbit-track {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px;
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          font-family: var(--font-mono);
          font-size: 8px;
        }

        .orbit-step.active {
          color: #00f2fe;
          font-weight: 600;
        }

        .orbit-sep {
          color: var(--text-dark);
          font-size: 7px;
        }

        /* IgnitX Screen */
        .ignitx-preview {
          background: radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.06) 0%, rgba(8, 10, 18, 0.95) 70%);
        }

        .ignitx-ui-card {
          gap: 8px;
        }

        .ignitx-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 10.5px;
          color: var(--text-white);
        }

        .ignitx-live-badge {
          font-family: var(--font-mono);
          font-size: 8.5px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .ignitx-metrics-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ignitx-metric {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .m-label {
          font-family: var(--font-mono);
          font-size: 7.5px;
          color: var(--text-dark);
        }

        .m-track {
          height: 4px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .m-fill {
          height: 100%;
          background: #10b981;
          border-radius: 2px;
        }

        .m-val {
          font-family: var(--font-mono);
          font-size: 8.5px;
          font-weight: 600;
        }

        .m-cause {
          font-size: 9.5px;
          color: var(--text-light);
        }

        .ignitx-intervention-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 4px 8px;
          border-radius: 6px;
        }

        /* CareConnect Mockup */
        .careconnect-preview {
          background: radial-gradient(circle at 40% 30%, rgba(16, 185, 129, 0.08) 0%, rgba(8, 12, 16, 0.95) 70%);
        }

        .care-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
        }

        .care-zone-title {
          font-weight: 600;
          color: var(--text-white);
        }

        .care-live-tag {
          font-family: var(--font-mono);
          font-size: 8.5px;
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .care-telemetry-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }

        .care-dispatch-banner {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9.5px;
          color: var(--text-light);
          background: rgba(16, 185, 129, 0.08);
          border-left: 2px solid #10b981;
          padding: 5px 8px;
          border-radius: 4px;
        }

        /* MoodMirror Mockup */
        .moodmirror-preview {
          background: radial-gradient(circle at 60% 30%, rgba(192, 132, 252, 0.08) 0%, rgba(12, 8, 18, 0.95) 70%);
        }

        .mood-stats-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
        }

        .mood-chart-title {
          font-weight: 600;
          color: var(--text-white);
        }

        .mood-score-tag {
          font-family: var(--font-mono);
          font-size: 8.5px;
          color: #c084fc;
          background: rgba(192, 132, 252, 0.15);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .mood-bars-grid {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .mood-bar-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mood-label {
          font-family: var(--font-mono);
          font-size: 8px;
          color: var(--text-muted);
          width: 32px;
        }

        .mood-routine-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 9.5px;
          color: #c084fc;
          background: rgba(192, 132, 252, 0.08);
          border: 1px solid rgba(192, 132, 252, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
        }

        /* --- Case Study Body --- */
        .case-study-body {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
        }

        .title-and-year-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .case-study-title {
          font-size: 21px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .project-year-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
          background: rgba(255, 255, 255, 0.04);
          padding: 2px 7px;
          border-radius: 4px;
        }

        .case-study-subtitle {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          display: block;
        }

        .case-study-summary {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.55;
        }

        .card-role-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          padding: 6px 10px;
          border-radius: 6px;
        }

        .role-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .case-study-problem-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid rgba(var(--accent-rgb), 0.6);
        }

        .case-study-problem-box.highlight {
          border-left-color: #10b981;
        }

        .problem-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .case-study-problem-box.highlight .problem-icon {
          color: #10b981;
        }

        .problem-text {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .problem-text strong {
          color: var(--text-light);
        }

        /* Clickable Tech Stack Chips on Cards */
        .case-study-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-chip-interactive {
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 3px 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .tech-chip-interactive:hover {
          border-color: rgba(var(--accent-rgb), 0.4);
          color: var(--text-white);
          background: rgba(var(--accent-rgb), 0.06);
        }

        .tech-chip-interactive.active {
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.15);
          color: var(--accent);
          font-weight: 600;
        }

        .case-study-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
        }

        .btn-read-case-study {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: var(--accent);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 0;
          transition: transform 0.2s;
        }

        .btn-read-case-study:hover {
          transform: translateX(4px);
        }

        .case-study-external-links {
          display: flex;
          gap: 10px;
        }

        .external-icon-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          transition: all 0.2s;
        }

        .external-icon-link:hover {
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.1);
          transform: scale(1.08);
        }

        /* --- Empty State --- */
        .projects-empty-state {
          padding: 60px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          max-width: 580px;
          margin: 32px auto 48px;
        }

        .empty-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(var(--accent-rgb), 0.08);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-state-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-white);
        }

        .empty-state-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .empty-highlight {
          color: var(--accent);
          font-family: var(--font-mono);
          font-weight: 600;
        }

        .empty-reset-btn {
          margin-top: 8px;
        }

        /* --- Modal Styles --- */
        .case-study-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.82);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.25s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .case-study-modal-container {
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          border-radius: 20px;
          background: rgba(11, 11, 20, 0.98);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(var(--accent-rgb), 0.15);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalScaleUp {
          from { transform: scale(0.96) translateY(10px); }
          to { transform: scale(1) translateY(0); }
        }

        .modal-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.02);
        }

        .modal-top-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .modal-rank-badge {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.15);
          border: 1px solid rgba(var(--accent-rgb), 0.35);
          padding: 3px 10px;
          border-radius: 6px;
        }

        .modal-rank-badge.secondary {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.15);
          border-color: rgba(56, 189, 248, 0.3);
        }

        .modal-badge-category {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3px 10px;
          border-radius: 6px;
        }

        .modal-close-icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .modal-close-icon-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.25);
        }

        .modal-scroll-body {
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .modal-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .modal-main-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .modal-year-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .modal-main-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 8px;
        }

        .modal-one-line-summary {
          font-size: 15px;
          color: var(--text-light);
          line-height: 1.6;
        }

        .modal-mockup-wrapper {
          border-radius: 14px;
          overflow: hidden;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 16px;
        }

        .modal-detail-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 768px) {
          .modal-detail-columns {
            grid-template-columns: 1fr;
          }
        }

        .modal-detail-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .detail-section-block {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .detail-block-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .detail-block-title h4 {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
          letter-spacing: -0.01em;
        }

        .detail-block-p {
          font-size: 13.5px;
          color: var(--text-light);
          line-height: 1.6;
        }

        .role-highlight-block {
          border-left: 3px solid var(--accent);
        }

        .detail-role-p {
          font-size: 13.5px;
          color: var(--accent);
          line-height: 1.5;
        }

        .detail-structure-p {
          font-size: 12.5px;
          color: var(--text-muted);
          font-family: var(--font-mono);
        }

        .modal-achievements-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.5;
        }

        .achievement-idx {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(var(--accent-rgb), 0.15);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .measurable-placeholder-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.12);
          border: 1px dashed rgba(251, 191, 36, 0.4);
          padding: 1px 6px;
          border-radius: 4px;
          margin: 0 4px;
        }

        .modal-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .modal-tech-chip {
          font-family: var(--font-mono);
          font-size: 11.5px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .modal-ctas-panel {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 4px;
        }

        /* --- GitHub Repos Section --- */
        .github-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .github-alert {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          background: rgba(245, 158, 11, 0.08);
          border-left: 3px solid #f59e0b;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .alert-icon {
          color: #f59e0b;
        }

        .alert-text {
          font-size: 13.5px;
          color: var(--text-light);
        }

        .alert-retry-btn {
          background: transparent;
          border: 1px solid #f59e0b;
          color: #f59e0b;
          padding: 6px 14px;
          border-radius: 6px;
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .repos-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .search-box-wrap {
          flex: 1;
          min-width: 260px;
          display: flex;
          align-items: center;
          padding: 10px 16px;
          gap: 10px;
        }

        .search-icon {
          color: var(--text-dark);
        }

        .repo-search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-white);
          font-family: var(--font-sans);
          font-size: 14px;
          outline: none;
        }

        .search-clear-btn {
          background: transparent;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
        }

        .sort-box-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .sort-label {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .repo-sort-select {
          padding: 8px 14px;
          background: rgba(13, 13, 23, 0.8);
          border: 1px solid var(--border-glass);
          color: var(--text-white);
          font-family: var(--font-sans);
          font-size: 13px;
          border-radius: 8px;
          outline: none;
          cursor: pointer;
        }

        .repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .repo-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .repo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .repo-title-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          overflow: hidden;
        }

        .repo-folder-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .repo-name {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .repo-stars {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
        }

        .star-icon {
          color: #eab308;
        }

        .repo-desc {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          flex-grow: 1;
        }

        .repo-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-dark);
          padding-top: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .repo-language {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .lang-color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .repo-links-row {
          display: flex;
          gap: 10px;
          margin-top: 4px;
        }

        .repo-link-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          font-family: var(--font-heading);
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .repo-link-btn:hover {
          color: var(--text-white);
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.1);
        }

        .repo-link-btn.demo-btn {
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.3);
        }

        .repos-loading-state,
        .repos-empty-state {
          padding: 60px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(var(--accent-rgb), 0.15);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
