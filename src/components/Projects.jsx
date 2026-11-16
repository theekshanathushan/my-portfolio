import React, { useState, useEffect } from 'react';
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
  Info
} from 'lucide-react';

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

// 4 Primary Case Studies ordered strictly by importance
const CASE_STUDIES = [
  {
    id: 'talentai',
    rank: 1,
    title: 'TalentAI',
    subtitle: 'AI-Powered Recruitment & Screening Platform',
    summary: 'Full-stack enterprise hiring ecosystem pairing Google Gemini AI candidate screening with automated scheduling and notification pipelines.',
    problem: 'Traditional recruiting suffers from manual resume backlogs, inconsistent evaluation criteria across hiring managers, and fragmented communication channels leading to candidate drop-off.',
    whatIBuilt: 'Architected and built a multi-portal recruitment platform with role-based workflows for Candidates, Recruiters, Hiring Managers, and Admins. Developed an automated resume-to-job matching pipeline powered by Google Gemini AI, integrated calendar-based interview scheduling, and engineered background services for automated SMS and email notifications.',
    role: 'Full-Stack Architect & Lead Developer (Backend API, Frontend SPA, AI Pipeline)',
    techStack: ['ASP.NET Core', 'Angular', 'TypeScript', 'MySQL', 'Entity Framework Core', 'JWT', 'Gemini API', 'Twilio', 'MailKit'],
    achievements: [
      'Implemented role-based JWT authentication and authorization covering 4 distinct user roles with strict API endpoint permission guards.',
      'Integrated Google Gemini AI for automated candidate screening and qualification matching against job requisitions, reducing initial resume review overhead [add measurable result].',
      'Engineered an automated background notification worker using MailKit and Twilio to dispatch interview reminders, improving candidate attendance rate by [add measurable result].'
    ],
    mockupType: 'browser',
    mockupUrl: 'https://talentai.preview/recruiter/screening',
    imagePlaceholder: '[screenshot needed: TalentAI candidate evaluation & AI match dashboard]',
    links: {
      demo: '#',
      demoLabel: 'Demo Link [add live demo URL]',
      github: 'https://github.com/theekshanathushan/TalentAI',
      githubLabel: 'GitHub Repo'
    },
    badge: 'Flagship Platform'
  },
  {
    id: 'agriai',
    rank: 2,
    title: 'AgriAI',
    subtitle: 'Smart Agriculture & Native-Language Farming Agent',
    summary: 'Cross-platform mobile farming assistant empowering smallholders with AI leaf disease diagnosis, a native-language conversational agent, weather alerts, and crop market pricing.',
    problem: 'Smallholder and regional farmers suffer severe crop yield losses due to delayed disease identification, linguistic barriers in existing digital agtech solutions, and volatile marketplace pricing.',
    whatIBuilt: 'Designed and developed a cross-platform Flutter application featuring an AI crop health scanner for instant disease diagnosis, an interactive advisory agent supporting native-language voice and text queries (Sinhala & English), localized weather alert triggers, and an agricultural market price aggregation board.',
    role: 'Mobile Application Engineer & AI Integration Lead',
    techStack: ['Flutter', 'Dart', 'Gemini API', 'AI Vision', 'REST APIs', 'Weather APIs'],
    achievements: [
      'Integrated an on-device/cloud vision pipeline to analyze plant leaf imagery and deliver instant disease diagnostics with treatment guidelines [add measurable result].',
      'Built a localized conversational advisory agent fluent in local agricultural terminology and native languages to make agtech guidance accessible to non-technical farmers.',
      'Implemented real-time market price aggregation and predictive weather alert feeds, helping farmers optimize harvest and sales timing by [add measurable result].'
    ],
    mockupType: 'phone',
    mockupUrl: 'agriai://dashboard/scanner',
    imagePlaceholder: '[screenshot needed: AgriAI leaf disease scanner & native advisory assistant]',
    links: {
      demo: '#',
      demoLabel: 'Demo Link [add APK / demo URL]',
      github: 'https://github.com/theekshanathushan/AgriAI',
      githubLabel: 'GitHub Repo'
    },
    badge: 'Mobile & AI Vision'
  },
  {
    id: 'novaexplorer',
    rank: 3,
    title: 'NovaExplorer',
    subtitle: 'NASA Educational Spacecraft & Mission Explorer',
    summary: 'Interactive NASA educational web application visualizing deep-space missions, interplanetary trajectories, and telemetry archives.',
    problem: 'Rich astronomical datasets and historical spacecraft mission records are scattered across fragmented legacy portals, making them inaccessible and unengaging for students and space enthusiasts.',
    whatIBuilt: 'Developed a high-performance web experience that queries NASA Open APIs to render interactive timelines of historical and active space missions, high-resolution celestial photography, and planetary telemetry explorers.',
    role: 'Frontend Engineer & Interface Designer',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'NASA Open APIs', 'Vercel'],
    achievements: [
      'Successfully deployed to production at novaexplorer.vercel.app, achieving [add measurable result] Lighthouse performance rating on desktop.',
      'Integrated NASA Open APIs to curate and cache real-time mission telemetry, Mars rover photography, and astronomical catalog archives.',
      'Engineered responsive interactive timelines and orbital mission exploration modules, increasing average user session engagement to [add measurable result].'
    ],
    mockupType: 'browser',
    mockupUrl: 'https://novaexplorer.vercel.app',
    imagePlaceholder: '[screenshot needed: NovaExplorer mission visualization & NASA telemetry explorer]',
    links: {
      demo: 'https://novaexplorer.vercel.app',
      demoLabel: 'Live at novaexplorer.vercel.app',
      github: 'https://github.com/theekshanathushan/NovaExplorer',
      githubLabel: 'GitHub Repo'
    },
    badge: 'Live on Vercel'
  },
  {
    id: 'ignitx',
    rank: 4,
    title: 'IgnitX by Hutch Hackathon: Track A',
    subtitle: 'Root-Cause AI Engine for Self-Care Platforms',
    summary: 'Intelligent root-cause diagnosis engine built for Hutch IgnitX to predict user friction, analyze distress signals, and recommend proactive self-care interventions.',
    problem: 'Self-care applications often fail to retain users because they log complaints after churn has already happened, treating surface symptoms rather than diagnosing underlying friction drivers.',
    whatIBuilt: 'Engineered an AI-driven root-cause analytical engine for Track A that ingests customer interaction logs, patterns user mood/behavioral signals, identifies root drop-off drivers, and prescribes targeted self-care remediation actions.',
    role: 'Hackathon Competitor & Backend AI Engineer',
    techStack: ['Python', 'REST APIs', 'Predictive Analytics', 'AI / LLM Engine', 'Telemetry Processing'],
    achievements: [
      'Formulated an end-to-end diagnostic pipeline during the hackathon sprint to isolate root causes behind user self-care drop-offs with [add measurable result] precision.',
      'Designed automated recommendation heuristic workflows delivering tailored intervention plans and habit recovery paths.',
      'Pitched and demonstrated the live proof-of-concept prototype to the Hutch industry judging panel, ranking among [add measurable result].'
    ],
    mockupType: 'browser',
    mockupUrl: 'https://ignitx-selfcare-ai.demo',
    imagePlaceholder: '[screenshot needed: IgnitX Track A root-cause AI dashboard & diagnostic telemetry]',
    links: {
      demo: '#',
      demoLabel: 'Demo Link [add prototype URL]',
      github: 'https://github.com/theekshanathushan/IgnitX-TrackA',
      githubLabel: 'GitHub Repo'
    },
    badge: 'Hackathon Track A'
  }
];

// Secondary Verified Projects
const MORE_PROJECTS = [
  {
    id: 'careconnect',
    title: 'CareConnect Application',
    category: 'Healthcare & Disaster Relief',
    summary: 'Crisis coordination and medical consulting system connecting displaced individuals, donors, and relief teams with live geographic operations mapping.',
    role: 'Full-Stack Developer (Spring Boot, Java 17, MySQL, WebSockets, Leaflet.js)',
    techStack: ['Spring Boot', 'Java 17', 'MySQL', 'WebSockets', 'JavaScript', 'Leaflet.js'],
    achievements: [
      'Built a crisis coordination platform connecting displaced persons, donors, and government relief officials.',
      'Integrated Leaflet.js to create a live, geographic operations map tracking help requests and active supply donors.',
      'Developed real-time chat functionality, donation processing, and a centralized resource allocation dashboard.'
    ],
    links: {
      demo: 'https://github.com/theekshanathushan/CareConnect-application',
      github: 'https://github.com/theekshanathushan/CareConnect-application'
    }
  },
  {
    id: 'moodmirror',
    title: 'MoodMirror Platform',
    category: 'Mental Wellness & Reflection',
    summary: 'Comprehensive mental health web application featuring daily mood reflection, interactive trend analytics, and guided coping workflows.',
    role: 'Frontend Architect (React, TypeScript, Recharts, Framer Motion, Web Notifications)',
    techStack: ['React', 'TypeScript', 'Recharts', 'Web Notification API', 'RLS', 'Framer Motion'],
    achievements: [
      'Architected interactive wellness modules for journaling, habit tracking, and guided coping exercises (e.g., box breathing).',
      'Developed an analytics dashboard using Recharts to visualize long-term mood patterns, emotion distribution, and habit streaks.',
      'Engineered client-side push reminders via Web Notification API to foster consistent daily reflection habits without backend overhead.'
    ],
    links: {
      demo: 'https://github.com/theekshanathushan/Moodmirror',
      github: 'https://github.com/theekshanathushan/Moodmirror'
    }
  }
];

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
  const [activeTab, setActiveTab] = useState('featured'); // 'featured' | 'github'
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  // GitHub state
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('updated'); // 'updated' | 'stars'

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedCaseStudy) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCaseStudy]);

  const fetchGitHubRepos = async () => {
    setIsLoading(true);
    setIsOfflineMode(false);
    try {
      const res = await fetch('https://api.github.com/users/theekshanathushan/repos?sort=updated&per_page=100');
      if (!res.ok) throw new Error('Failed to fetch repositories');
      const data = await res.json();
      
      // Filter out own profile readme AND hide forks
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
    if (activeTab === 'github' && repos.length === 0) {
      fetchGitHubRepos();
    }
  }, [activeTab]);

  // GitHub filter and sort
  const filteredRepos = repos
    .filter(repo => {
      if (repo.fork) return false; // Ensure forks are strictly hidden
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

  // Render high-fidelity realistic mockups for cards & modal
  const renderMockup = (item, isModal = false) => {
    // 1. TalentAI: Rich Recruiter & AI Match Workspace Preview
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
              <span className="url-text">{item.mockupUrl}</span>
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

    // 2. AgriAI: Leaf Disease Vision Scanner & Voice Agent
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

    // 3. NovaExplorer: NASA Deep-Space Missions & Telemetry Explorer
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
              <span className="url-text">{item.mockupUrl}</span>
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

    // 4. IgnitX Track A: Root-Cause AI Engine
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

        {/* Tab Toggle Switch */}
        <div className="project-type-toggle-container">
          <div className="project-type-toggle glass-card">
            <button 
              className={`type-toggle-btn ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              <Sparkles size={16} />
              <span>Featured Case Studies</span>
            </button>
            <button 
              className={`type-toggle-btn ${activeTab === 'github' ? 'active' : ''}`}
              onClick={() => setActiveTab('github')}
            >
              <Folder size={16} />
              <span>GitHub Repositories</span>
            </button>
          </div>
        </div>

        {activeTab === 'featured' ? (
          <div className="case-studies-container">
            
            {/* 4 Primary Case Studies Grid */}
            <div className="case-studies-grid">
              {CASE_STUDIES.map((study) => (
                <article 
                  key={study.id} 
                  className="case-study-card glass-card"
                  onClick={() => setSelectedCaseStudy(study)}
                >
                  {/* Top Mockup Slot */}
                  <div className="card-mockup-wrapper">
                    {renderMockup(study)}
                    <div className="card-rank-badge">
                      <span>#{study.rank}</span>
                    </div>
                    {study.badge && (
                      <div className="card-category-badge">
                        <span>{study.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="case-study-body">
                    
                    <div className="case-study-titles">
                      <h3 className="case-study-title">{study.title}</h3>
                      <span className="case-study-subtitle">{study.subtitle}</span>
                    </div>

                    <p className="case-study-summary">{study.summary}</p>

                    {/* Problem teaser */}
                    <div className="case-study-problem-box">
                      <Target size={14} className="problem-icon" />
                      <p className="problem-text">
                        <strong>The Problem:</strong> {study.problem}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="case-study-chips">
                      {study.techStack.map((tech) => (
                        <span key={tech} className="tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Card Actions */}
                    <div className="case-study-actions" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="btn-read-case-study"
                        onClick={() => setSelectedCaseStudy(study)}
                      >
                        <span>Case Study Details</span>
                        <ChevronRight size={15} />
                      </button>

                      <div className="case-study-external-links">
                        {study.links.demo && study.links.demo !== '#' && (
                          <a 
                            href={study.links.demo} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="external-icon-link"
                            title="Open Live Demo"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                        <a 
                          href={study.links.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="external-icon-link"
                          title="Open GitHub Repository"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                  </div>
                </article>
              ))}
            </div>

            {/* Secondary "More Projects" Section */}
            <div className="more-projects-section">
              <div className="more-projects-header">
                <Layers size={20} className="text-glow-accent" />
                <h3 className="more-projects-title">More Projects</h3>
                <span className="more-projects-divider"></span>
              </div>

              <div className="more-projects-grid">
                {MORE_PROJECTS.map((proj) => (
                  <div key={proj.id} className="secondary-project-card glass-card">
                    <div className="secondary-card-head">
                      <div>
                        <span className="secondary-cat-badge">{proj.category}</span>
                        <h4 className="secondary-title">{proj.title}</h4>
                      </div>
                      <div className="secondary-links">
                        <a 
                          href={proj.links.github} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="secondary-icon-btn"
                          title="View Repository"
                        >
                          <Github size={16} />
                        </a>
                      </div>
                    </div>

                    <p className="secondary-summary">{proj.summary}</p>

                    <div className="secondary-role-box">
                      <UserCheck size={13} className="role-icon" />
                      <span>{proj.role}</span>
                    </div>

                    <div className="secondary-chips">
                      {proj.techStack.map(t => (
                        <span key={t} className="tech-chip-sm">{t}</span>
                      ))}
                    </div>

                    <ul className="secondary-bullets">
                      {proj.achievements.map((a, i) => (
                        <li key={i}>
                          <CheckCircle2 size={13} className="bullet-check" />
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

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

            {/* Search & Sort Panel */}
            <div className="github-controls glass-card">
              <div className="github-search-wrap">
                <Search size={18} className="github-search-icon" />
                <input 
                  type="text"
                  placeholder="Filter original repositories (forks hidden)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="github-search-input"
                />
              </div>

              <div className="github-sort-wrap">
                <span className="github-sort-label">Sort:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="github-sort-select"
                >
                  <option value="updated">Recent Activity</option>
                  <option value="stars">Stars Count</option>
                </select>
              </div>
            </div>

            {/* Repos Grid */}
            {isLoading ? (
              <div className="github-repos-grid">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="repo-card-skeleton glass-card">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-desc-line-1"></div>
                    <div className="skeleton-desc-line-2"></div>
                  </div>
                ))}
              </div>
            ) : filteredRepos.length === 0 ? (
              <div className="github-empty glass-card">
                <p>No original repositories match your search.</p>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '8px 16px', fontSize: '13px', marginTop: '12px' }} 
                  onClick={() => setSearchQuery('')}
                >
                  Reset Filter
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
                        {repo.description || "No description provided."}
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
                      </div>

                      <div className="repo-footer">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="repo-link-btn"
                        >
                          Code <Github size={13} />
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

        {/* Premium Case Study Detail Modal */}
        {selectedCaseStudy && (
          <div className="case-study-modal-backdrop" onClick={() => setSelectedCaseStudy(null)}>
            <div 
              className="case-study-modal-container glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar */}
              <div className="modal-top-bar">
                <div className="modal-top-brand">
                  <span className="modal-rank-badge">Case Study #{selectedCaseStudy.rank}</span>
                  <span className="modal-badge-category">{selectedCaseStudy.badge}</span>
                </div>
                <button 
                  className="modal-close-icon-btn"
                  onClick={() => setSelectedCaseStudy(null)}
                  aria-label="Close Case Study"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="modal-scroll-body">
                
                {/* Title & Summary */}
                <div className="modal-title-section">
                  <h2 className="modal-main-title">{selectedCaseStudy.title}</h2>
                  <p className="modal-main-subtitle">{selectedCaseStudy.subtitle}</p>
                  <p className="modal-one-line-summary">{selectedCaseStudy.summary}</p>
                </div>

                {/* Mockup Preview Slot */}
                <div className="modal-mockup-wrapper">
                  {renderMockup(selectedCaseStudy, true)}
                </div>

                {/* Two Column Deep Dive Info */}
                <div className="modal-detail-columns">
                  
                  {/* Left Column: Problem, What I Built & Role */}
                  <div className="modal-detail-col">
                    
                    <div className="detail-section-block">
                      <div className="detail-block-title">
                        <Target size={16} className="text-glow-accent" />
                        <h4>The Problem</h4>
                      </div>
                      <p className="detail-block-p">{selectedCaseStudy.problem}</p>
                    </div>

                    <div className="detail-section-block">
                      <div className="detail-block-title">
                        <Cpu size={16} className="text-glow-accent" />
                        <h4>What I Built</h4>
                      </div>
                      <p className="detail-block-p">{selectedCaseStudy.whatIBuilt}</p>
                    </div>

                    <div className="detail-section-block role-highlight-block">
                      <div className="detail-block-title">
                        <UserCheck size={16} className="text-glow-accent" />
                        <h4>My Role</h4>
                      </div>
                      <p className="detail-role-p">{selectedCaseStudy.role}</p>
                    </div>

                  </div>

                  {/* Right Column: Key Achievements, Tech Stack & Links */}
                  <div className="modal-detail-col">
                    
                    <div className="detail-section-block">
                      <div className="detail-block-title">
                        <CheckCircle2 size={16} className="text-glow-accent" />
                        <h4>3 Key Achievements</h4>
                      </div>
                      <ul className="modal-achievements-list">
                        {selectedCaseStudy.achievements.map((ach, idx) => (
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
                        {selectedCaseStudy.techStack.map(t => (
                          <span key={t} className="modal-tech-chip">{t}</span>
                        ))}
                      </div>
                    </div>

                    {/* External CTAs */}
                    <div className="modal-ctas-panel">
                      {selectedCaseStudy.links.demo && (
                        <a 
                          href={selectedCaseStudy.links.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="btn btn-primary"
                        >
                          <ExternalLink size={16} />
                          <span>{selectedCaseStudy.links.demoLabel}</span>
                        </a>
                      )}
                      <a 
                        href={selectedCaseStudy.links.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="btn btn-secondary"
                      >
                        <Github size={16} />
                        <span>{selectedCaseStudy.links.githubLabel}</span>
                      </a>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Embedded CSS for Projects & Case Studies */}
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

        /* --- Toggle Bar --- */
        .project-type-toggle-container {
          display: flex;
          justify-content: center;
          margin: 20px 0 28px;
        }

        .project-type-toggle {
          display: inline-flex;
          padding: 6px;
          border-radius: 14px;
          gap: 6px;
        }

        .type-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 22px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 600;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .type-toggle-btn:hover {
          color: var(--text-white);
        }

        .type-toggle-btn.active {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
          border-color: rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* --- Case Studies Grid --- */
        .case-studies-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
          margin-bottom: 60px;
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

        .case-study-card:hover {
          transform: translateY(-8px);
          border-color: rgba(var(--accent-rgb), 0.4);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(var(--accent-rgb), 0.15);
        }

        /* --- Mockup Frames --- */
        .card-mockup-wrapper {
          position: relative;
          background: rgba(10, 10, 18, 0.7);
          padding: 24px 24px 16px;
          border-bottom: 1px solid var(--border-glass);
          overflow: hidden;
        }

        .card-rank-badge {
          position: absolute;
          top: 14px;
          left: 14px;
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

        .card-category-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-mono);
          font-size: 11px;
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

        /* --- Case Study Body --- */
        .case-study-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
        }

        .case-study-title {
          font-size: 22px;
          font-weight: 700;
          color: var(--text-white);
          margin-bottom: 2px;
        }

        .case-study-subtitle {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          display: block;
        }

        .case-study-summary {
          font-size: 14px;
          color: var(--text-light);
          line-height: 1.55;
        }

        .case-study-problem-box {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid rgba(var(--accent-rgb), 0.6);
        }

        .problem-icon {
          color: var(--accent);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .problem-text {
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }

        .problem-text strong {
          color: var(--text-light);
        }

        .case-study-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 3px 8px;
          border-radius: 6px;
          transition: border-color 0.2s, color 0.2s;
        }

        .case-study-card:hover .tech-chip {
          border-color: rgba(var(--accent-rgb), 0.25);
          color: var(--text-light);
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
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          transition: all 0.2s;
        }

        .external-icon-link:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(var(--accent-rgb), 0.1);
        }

        /* --- "More Projects" Section --- */
        .more-projects-section {
          margin-top: 48px;
        }

        .more-projects-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
        }

        .more-projects-title {
          font-size: 20px;
          font-weight: 700;
          color: var(--text-white);
          white-space: nowrap;
        }

        .more-projects-divider {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.06);
        }

        .more-projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        @media (max-width: 800px) {
          .more-projects-grid {
            grid-template-columns: 1fr;
          }
        }

        .secondary-project-card {
          padding: 24px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: transform 0.25s, border-color 0.25s;
        }

        .secondary-project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.3);
        }

        .secondary-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .secondary-cat-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
          padding: 2px 6px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 4px;
        }

        .secondary-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-white);
        }

        .secondary-icon-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          transition: all 0.2s;
        }

        .secondary-icon-btn:hover {
          color: var(--accent);
          border-color: var(--accent);
        }

        .secondary-summary {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .secondary-role-box {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.02);
          padding: 6px 10px;
          border-radius: 8px;
          border: 1px dashed rgba(255, 255, 255, 0.08);
        }

        .role-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .secondary-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-chip-sm {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-glass);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .secondary-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .secondary-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.45;
        }

        .bullet-check {
          color: #34d399;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* --- Case Study Detail Modal --- */
        .case-study-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 4, 8, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .case-study-modal-container {
          max-width: 900px;
          width: 100%;
          max-height: 90vh;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(var(--accent-rgb), 0.15);
          animation: modalScaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(11, 11, 20, 0.95);
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
          padding: 3px 8px;
          border-radius: 6px;
        }

        .modal-badge-category {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.06);
          padding: 3px 8px;
          border-radius: 6px;
        }

        .modal-close-icon-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .modal-close-icon-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.08);
        }

        .modal-scroll-body {
          overflow-y: auto;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .modal-main-title {
          font-size: 28px;
          font-weight: 800;
          color: var(--text-white);
          margin-bottom: 4px;
        }

        .modal-main-subtitle {
          font-family: var(--font-mono);
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 10px;
        }

        .modal-one-line-summary {
          font-size: 15px;
          color: var(--text-light);
          line-height: 1.6;
        }

        .modal-mockup-wrapper {
          padding: 20px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .modal-browser .browser-viewport {
          min-height: 200px;
        }

        .modal-phone .phone-screen {
          min-height: 200px;
        }

        .modal-detail-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
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
          font-size: 15px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .detail-block-p {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .role-highlight-block {
          background: rgba(var(--accent-rgb), 0.05);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          padding: 14px 16px;
          border-radius: 12px;
        }

        .detail-role-p {
          font-size: 13.5px;
          color: var(--text-light);
          font-weight: 600;
          margin: 0;
        }

        .modal-achievements-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .achievement-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 13px;
          color: var(--text-light);
          line-height: 1.5;
        }

        .achievement-idx {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid #10b981;
          color: #34d399;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .measurable-placeholder-tag {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          color: #fbbf24;
          background: rgba(251, 191, 36, 0.15);
          border: 1px dashed rgba(251, 191, 36, 0.4);
          padding: 1px 6px;
          border-radius: 4px;
          margin: 0 4px;
        }

        .modal-tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .modal-tech-chip {
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          padding: 4px 10px;
          border-radius: 8px;
        }

        .modal-ctas-panel {
          display: flex;
          gap: 12px;
          margin-top: 8px;
          flex-wrap: wrap;
        }

        /* --- GitHub Repositories Section --- */
        .github-alert {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          margin-bottom: 24px;
          border-left: 3px solid #ffb703;
          border-radius: 12px;
        }

        .alert-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .alert-icon {
          color: #ffb703;
          flex-shrink: 0;
        }

        .alert-text {
          font-size: 13px;
          color: var(--text-light);
        }

        .alert-retry-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-glass);
          color: var(--text-white);
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }

        .github-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-radius: 14px;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .github-search-wrap {
          flex: 1;
          min-width: 240px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .github-search-icon {
          color: var(--text-muted);
        }

        .github-search-input {
          background: transparent;
          border: none;
          color: var(--text-white);
          font-family: var(--font-sans);
          font-size: 14px;
          width: 100%;
          outline: none;
        }

        .github-search-input::placeholder {
          color: var(--text-dark);
        }

        .github-sort-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .github-sort-label {
          font-size: 13px;
          color: var(--text-muted);
        }

        .github-sort-select {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
          padding: 6px 12px;
          border-radius: 8px;
          font-family: var(--font-sans);
          font-size: 13px;
          outline: none;
          cursor: pointer;
        }

        .github-repos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .github-repo-card {
          padding: 22px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: transform 0.25s, border-color 0.25s;
        }

        .github-repo-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.35);
        }

        .repo-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .repo-folder-icon {
          color: var(--accent);
          flex-shrink: 0;
        }

        .repo-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .repo-description {
          font-size: 13px;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
          flex: 1;
        }

        .repo-tags-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .repo-lang-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-light);
        }

        .lang-color-circle {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .repo-stat-badge {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--text-muted);
        }

        .repo-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: auto;
        }

        .repo-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          color: var(--text-light);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-glass);
          transition: all 0.2s;
        }

        .repo-link-btn:hover {
          color: var(--text-white);
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.08);
        }

        .repo-link-btn.demo-btn {
          color: var(--accent);
          border-color: rgba(var(--accent-rgb), 0.3);
        }

        .github-empty {
          padding: 40px;
          text-align: center;
          color: var(--text-muted);
        }

        /* --- Skeletons --- */
        .repo-card-skeleton {
          padding: 22px;
          border-radius: 14px;
          height: 180px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .skeleton-title {
          width: 60%;
          height: 18px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }

        .skeleton-desc-line-1 {
          width: 90%;
          height: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }

        .skeleton-desc-line-2 {
          width: 70%;
          height: 12px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 4px;
        }

        /* --- Animations --- */
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScaleUp {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
