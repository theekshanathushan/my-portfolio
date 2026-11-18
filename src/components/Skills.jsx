import React, { useState } from 'react';
import { 
  Terminal, 
  Server, 
  Layout, 
  Database, 
  Cpu, 
  Wrench, 
  ChevronDown, 
  ChevronUp, 
  GitBranch,
  Users,
  User
} from 'lucide-react';

const TIERS = [
  { id: 'all', label: 'All Tiers' },
  { id: 'Use regularly', label: 'Use regularly' },
  { id: 'Comfortable', label: 'Comfortable' },
  { id: 'Learning', label: 'Learning' }
];

const SKILL_CATEGORIES = [
  {
    id: 'languages',
    title: 'Languages',
    icon: Terminal,
    description: 'Core programming languages for distributed backend logic, client architecture, and mobile engineering',
    skills: [
      { name: 'Java (17/21)', tier: 'Use regularly', note: 'Spring Boot REST APIs, Collections, OOP' },
      { name: 'TypeScript', tier: 'Use regularly', note: 'Strict typing for React & Angular applications' },
      { name: 'JavaScript (ES6+)', tier: 'Use regularly', note: 'Modern ES6+, async/await, DOM APIs' },
      { name: 'C#', tier: 'Use regularly', note: 'ASP.NET Core, EF Core & LINQ in TalentAI' },
      { name: 'Dart', tier: 'Use regularly', note: 'Flutter reactive state in smart-farming-ai & VendorFlow' },
      { name: 'Python', tier: 'Comfortable', note: 'Predictive analytics & telemetry in IgnitX' },
      { name: 'C++', tier: 'Comfortable', note: 'Object-Oriented computing & algorithm design' },
      { name: 'HTML5 & CSS3', tier: 'Use regularly', note: 'Semantic structure & responsive layouts' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Systems',
    icon: Server,
    description: 'Enterprise server frameworks, distributed architectures, and secure token authentication',
    skills: [
      { name: 'Spring Boot', tier: 'Use regularly', note: 'REST APIs, JPA, Dependency Injection & MVC' },
      { name: 'ASP.NET Core (.NET 8)', tier: 'Use regularly', note: 'Modular controllers, middleware & services' },
      { name: 'RESTful APIs', tier: 'Use regularly', note: 'Clean endpoint architecture & JSON contracts' },
      { name: 'JWT Auth', tier: 'Use regularly', note: 'Stateless role-based authorization guards' },
      { name: 'WebSockets', tier: 'Comfortable', note: 'Real-time bi-directional crisis messaging' },
      { name: 'Microservices Concepts', tier: 'Comfortable', note: 'Decoupled layered services & API architecture' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend & Mobile',
    icon: Layout,
    description: 'Single-page web applications, cross-platform mobile apps, and interactive UI engineering',
    skills: [
      { name: 'React', tier: 'Use regularly', note: 'Hooks, reactive state trees, Vite & Tailwind' },
      { name: 'Angular', tier: 'Use regularly', note: 'Component hierarchy, services & routing in TalentAI' },
      { name: 'Flutter', tier: 'Use regularly', note: 'Cross-platform mobile UI in smart-farming-ai' },
      { name: 'Tailwind CSS', tier: 'Use regularly', note: 'Utility-first styling, glassmorphism & dark theme' },
      { name: 'Recharts', tier: 'Comfortable', note: 'Data analytics charts & trend visualizations' },
      { name: 'Framer Motion', tier: 'Comfortable', note: 'Physics-based animations & page transitions' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases & ORM',
    icon: Database,
    description: 'Relational data modeling, schema normalization, and ORM persistence layers',
    skills: [
      { name: 'MySQL', tier: 'Use regularly', note: 'Relational schemas, constraints & indexing' },
      { name: 'PostgreSQL / PLpgSQL', tier: 'Comfortable', note: 'Relational tables, functions & migrations' },
      { name: 'Entity Framework Core', tier: 'Comfortable', note: 'Code-First ORM, migrations & LINQ' },
      { name: 'Hibernate / Spring Data JPA', tier: 'Comfortable', note: 'Entity relationships, repositories & transactions' }
    ]
  },
  {
    id: 'ai-apis',
    title: 'AI & Intelligent Services',
    icon: Cpu,
    description: 'Generative AI prompt integration, computer vision diagnostics, and automated cloud services',
    skills: [
      { name: 'Google Gemini API', tier: 'Use regularly', note: 'Candidate screening & reasoning workflows' },
      { name: 'Computer Vision', tier: 'Comfortable', note: 'Crop leaf pathology diagnostics in under 2s' },
      { name: 'Prompt Engineering', tier: 'Comfortable', note: 'Structured conditioning & JSON output schemas' },
      { name: 'Leaflet.js', tier: 'Comfortable', note: 'Geospatial mapping & emergency route tracking' },
      { name: 'Twilio & MailKit', tier: 'Comfortable', note: 'Automated SMS & email notification workers' }
    ]
  },
  {
    id: 'tools-devops',
    title: 'Tools & DevOps',
    icon: Wrench,
    description: 'Source control versioning, continuous deployment, API testing, and build pipelines',
    skills: [
      { name: 'Git & GitHub', tier: 'Use regularly', note: 'Multi-branch workflows, PRs & code reviews' },
      { name: 'Vercel', tier: 'Use regularly', note: 'Production hosting & CI/CD deployment' },
      { name: 'Postman', tier: 'Comfortable', note: 'REST API testing, collections & assertions' },
      { name: 'Docker', tier: 'Learning', note: 'Containerization basics & Dockerfile setup' },
      { name: 'Vite', tier: 'Use regularly', note: 'Modern fast ESM build tooling & HMR' }
    ]
  }
];

// Verified repository stack sources from GitHub analysis
const GITHUB_VERIFIED_INSIGHTS = [
  {
    type: 'group',
    title: 'Group Projects & Hackathons',
    icon: Users,
    items: [
      { name: 'TalentAI (AI-Recruitment-Platform)', team: '6 Contributors (Rank #2, 46 commits)', stack: 'ASP.NET Core, Angular, TypeScript, C#, MySQL, Gemini API' },
      { name: 'NovaExplorer (NASASpaceApps)', team: '5 Contributors (NASA Space Apps)', stack: 'React, TypeScript, Tailwind CSS, PostgreSQL, NASA APIs, Vercel' },
      { name: 'Suwadaru Healthcare', team: '4 Contributors (Rank #2, 16 commits)', stack: 'TypeScript, JavaScript, PostgreSQL, Vercel' },
      { name: 'CrisisCopilot', team: '4 Contributors (Hackathon Team)', stack: 'TypeScript, JavaScript, PostgreSQL, Vercel' },
      { name: 'Pharmacy Stock Management System', team: '4 Contributors (Rank #2, 36 commits)', stack: 'Java, JavaScript, HTML, CSS, MySQL' },
      { name: 'DEA Enterprise Project', team: '2 Contributors (11 commits each)', stack: 'Java, Spring Boot, REST APIs' }
    ]
  },
  {
    type: 'individual',
    title: 'Individual & Solo Projects',
    icon: User,
    items: [
      { name: 'smart-farming-ai (AgriAI)', team: '142 Commits (100% Solo)', stack: 'Flutter, Dart, Python, Gemini Vision, Computer Vision' },
      { name: 'CareConnect Application', team: 'Full-Stack Architecture', stack: 'Java 17, Spring Boot, MySQL, WebSockets, Leaflet.js' },
      { name: 'MoodMirror Platform', team: 'Wellness & Emotion Analytics', stack: 'React, TypeScript, Recharts, Web Notification API, Framer Motion' },
      { name: 'VendorFlow', team: 'Mobile Inventory App', stack: 'Dart, Flutter, Java, C++' }
    ]
  }
];

export default function Skills() {
  const [selectedTier, setSelectedTier] = useState('all');
  const [isTodoOpen, setIsTodoOpen] = useState(false);

  // Compute counts for tiers
  const allSkills = SKILL_CATEGORIES.flatMap(cat => cat.skills);
  const tierCounts = {
    all: allSkills.length,
    'Use regularly': allSkills.filter(s => s.tier === 'Use regularly').length,
    'Comfortable': allSkills.filter(s => s.tier === 'Comfortable').length,
    'Learning': allSkills.filter(s => s.tier === 'Learning').length
  };

  const getTierClass = (tier) => {
    switch (tier) {
      case 'Use regularly':
        return 'tier-regularly';
      case 'Comfortable':
        return 'tier-comfortable';
      case 'Learning':
        return 'tier-learning';
      default:
        return '';
    }
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        
        {/* Section Heading */}
        <div className="section-title-wrap">
          <span className="section-subtitle">Technical Proficiency</span>
          <h2 className="section-title">Skills & Stack</h2>
          <p className="skills-lead-text">
            Categorized strictly by proficiency tier, verified across full-stack projects, group hackathons, and individual repositories.
          </p>
        </div>

        {/* Tier Filter / Legend Controls */}
        <div className="tier-filter-container">
          <div className="tier-filter-pills glass-card">
            {TIERS.map(t => {
              const count = tierCounts[t.id];
              const isActive = selectedTier === t.id;
              return (
                <button
                  key={t.id}
                  className={`tier-filter-btn ${isActive ? 'active' : ''} ${t.id !== 'all' ? getTierClass(t.id) : ''}`}
                  onClick={() => setSelectedTier(t.id)}
                >
                  {t.id !== 'all' && <span className="tier-pill-dot"></span>}
                  <span>{t.label}</span>
                  <span className="tier-filter-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Categories & Skill Chips Grid */}
        <div className="categories-grid">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const IconComponent = category.icon;
            const filteredSkills = category.skills.filter(
              skill => selectedTier === 'all' || skill.tier === selectedTier
            );

            // Group filtered skills by tier order
            const tierOrder = ['Use regularly', 'Comfortable', 'Learning'];
            const presentTiers = tierOrder.filter(tierName => 
              filteredSkills.some(s => s.tier === tierName)
            );

            return (
              <div 
                key={category.id} 
                className={`category-card glass-card ${filteredSkills.length === 0 ? 'category-dimmed' : ''}`}
                style={{ animationDelay: `${catIdx * 0.08}s` }}
              >
                {/* Category Header */}
                <div className="category-header">
                  <div className="category-icon-wrap">
                    <IconComponent size={20} className="category-icon" />
                  </div>
                  <div className="category-header-info">
                    <div className="category-title-row">
                      <h3 className="category-title">{category.title}</h3>
                      <span className="category-chip-count">
                        {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'}
                      </span>
                    </div>
                    <p className="category-desc">{category.description}</p>
                  </div>
                </div>

                {/* Skill Chips Grouped by Tier */}
                <div className="category-body">
                  {filteredSkills.length === 0 ? (
                    <div className="no-skills-notice">
                      <span>No skills matching "{selectedTier}" in this category</span>
                    </div>
                  ) : (
                    presentTiers.map(tierName => {
                      const tierSkills = filteredSkills.filter(s => s.tier === tierName);
                      return (
                        <div key={tierName} className="tier-group">
                          {selectedTier === 'all' && (
                            <div className="tier-group-title">
                              <span className={`tier-indicator-dot ${getTierClass(tierName)}`}></span>
                              <span className="tier-group-name">{tierName}</span>
                            </div>
                          )}
                          <div className="skill-chips-row">
                            {tierSkills.map((skill, sIdx) => (
                              <div 
                                key={skill.name} 
                                className={`skill-chip ${getTierClass(skill.tier)}`}
                                style={{ animationDelay: `${(catIdx * 0.08) + (sIdx * 0.04)}s` }}
                              >
                                <div className="skill-chip-header">
                                  <span className="skill-name">{skill.name}</span>
                                  <span className={`skill-tier-badge ${getTierClass(skill.tier)}`}>
                                    {skill.tier}
                                  </span>
                                </div>
                                {skill.note && (
                                  <span className="skill-note">{skill.note}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub Repository Verification Drawer */}
        <div className="todo-confirmation-wrap glass-card">
          <button 
            className="todo-toggle-btn"
            onClick={() => setIsTodoOpen(!isTodoOpen)}
            aria-expanded={isTodoOpen}
          >
            <div className="todo-toggle-left">
              <GitBranch size={18} className="todo-icon text-glow-accent" />
              <div className="todo-toggle-text">
                <span className="todo-title">GitHub Stack Verification (28 Repositories Analyzed)</span>
                <span className="todo-subtitle">
                  Verified across 8 group collaborations and 20 individual projects on github.com/theekshanathushan
                </span>
              </div>
            </div>
            <div className="todo-toggle-right">
              <span className="todo-badge">{isTodoOpen ? 'Hide Repos' : 'View Source Repos'}</span>
              {isTodoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          {isTodoOpen && (
            <div className="todo-content">
              <p className="todo-explainer">
                Every technical skill in this stack is backed by direct code contributions across group projects, competitive hackathons, and personal repositories.
              </p>
              
              <div className="github-verified-sections">
                {GITHUB_VERIFIED_INSIGHTS.map((group, gIdx) => {
                  const GroupIcon = group.icon;
                  return (
                    <div key={gIdx} className="github-verified-group">
                      <div className="github-group-header">
                        <GroupIcon size={16} className="text-glow-accent" />
                        <h4 className="github-group-title">{group.title}</h4>
                      </div>
                      <div className="todo-grid">
                        {group.items.map((item, idx) => (
                          <div key={idx} className="todo-item-card">
                            <div className="todo-item-head">
                              <span className="todo-item-name">{item.name}</span>
                              <span className="todo-item-source">{item.team}</span>
                            </div>
                            <p className="todo-item-detail">
                              <strong>Stack:</strong> {item.stack}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Embedded Styles for Skills Section */}
      <style>{`
        .skills-section {
          position: relative;
        }

        .skills-lead-text {
          color: var(--text-muted);
          font-size: 15px;
          max-width: 640px;
          text-align: center;
          margin-top: 12px;
          margin-bottom: 0;
          line-height: 1.6;
        }

        /* --- Tier Filter Bar --- */
        .tier-filter-container {
          display: flex;
          justify-content: center;
          margin: 24px 0 32px;
        }

        .tier-filter-pills {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px;
          border-radius: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .tier-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-muted);
          font-family: var(--font-heading);
          font-size: 13px;
          font-weight: 600;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }

        .tier-filter-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.04);
        }

        .tier-filter-btn.active {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
        }

        .tier-filter-btn.tier-regularly.active {
          border-color: rgba(16, 185, 129, 0.4);
          color: #34d399;
          background: rgba(16, 185, 129, 0.12);
        }

        .tier-filter-btn.tier-comfortable.active {
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
        }

        .tier-filter-btn.tier-learning.active {
          border-color: rgba(168, 85, 247, 0.4);
          color: #c084fc;
          background: rgba(168, 85, 247, 0.12);
        }

        .tier-pill-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .tier-regularly .tier-pill-dot {
          background-color: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
        }

        .tier-comfortable .tier-pill-dot {
          background-color: #38bdf8;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.6);
        }

        .tier-learning .tier-pill-dot {
          background-color: #a855f7;
          box-shadow: 0 0 8px rgba(168, 85, 247, 0.6);
        }

        .tier-filter-count {
          font-family: var(--font-mono);
          font-size: 11px;
          background: rgba(255, 255, 255, 0.08);
          padding: 2px 7px;
          border-radius: 999px;
          color: inherit;
        }

        /* --- Category Cards Grid --- */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          margin-bottom: 48px;
        }

        @media (max-width: 900px) {
          .categories-grid {
            grid-template-columns: 1fr;
          }
        }

        .category-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-radius: 18px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
          animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
        }

        .category-card:hover {
          transform: translateY(-4px);
          border-color: rgba(var(--accent-rgb), 0.3);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4), 0 0 20px rgba(var(--accent-rgb), 0.12);
        }

        .category-card.category-dimmed {
          opacity: 0.45;
          transform: none;
        }

        /* --- Category Header --- */
        .category-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .category-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.15) 0%, rgba(var(--accent-rgb), 0.03) 100%);
          border: 1px solid rgba(var(--accent-rgb), 0.3);
          color: var(--accent);
          flex-shrink: 0;
          box-shadow: 0 0 12px rgba(var(--accent-rgb), 0.15);
        }

        .category-header-info {
          flex: 1;
        }

        .category-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .category-title {
          font-size: 19px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .category-chip-count {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
          border: 1px solid rgba(var(--accent-rgb), 0.2);
          padding: 2px 8px;
          border-radius: 6px;
        }

        .category-desc {
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 4px;
          line-height: 1.45;
        }

        /* --- Category Body & Tier Groups --- */
        .category-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tier-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .tier-group-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tier-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .tier-indicator-dot.tier-regularly {
          background-color: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .tier-indicator-dot.tier-comfortable {
          background-color: #38bdf8;
          box-shadow: 0 0 6px #38bdf8;
        }

        .tier-indicator-dot.tier-learning {
          background-color: #a855f7;
          box-shadow: 0 0 6px #a855f7;
        }

        .tier-group-name {
          font-family: var(--font-mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          font-weight: 600;
        }

        /* --- Skill Chips --- */
        .skill-chips-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 10px;
        }

        @media (max-width: 480px) {
          .skill-chips-row {
            grid-template-columns: 1fr;
          }
        }

        .skill-chip {
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          animation: popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards;
          position: relative;
          overflow: hidden;
        }

        .skill-chip::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          opacity: 0.8;
          transition: width 0.25s ease, opacity 0.25s ease;
        }

        .skill-chip.tier-regularly::before {
          background: #10b981;
        }

        .skill-chip.tier-comfortable::before {
          background: #38bdf8;
        }

        .skill-chip.tier-learning::before {
          background: #a855f7;
        }

        .skill-chip:hover {
          transform: translateY(-2px) scale(1.01);
          background: rgba(255, 255, 255, 0.05);
        }

        .skill-chip:hover::before {
          width: 5px;
          opacity: 1;
        }

        .skill-chip.tier-regularly:hover {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 6px 18px rgba(16, 185, 129, 0.15);
        }

        .skill-chip.tier-comfortable:hover {
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 6px 18px rgba(56, 189, 248, 0.15);
        }

        .skill-chip.tier-learning:hover {
          border-color: rgba(168, 85, 247, 0.4);
          box-shadow: 0 6px 18px rgba(168, 85, 247, 0.15);
        }

        .skill-chip-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .skill-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 15px;
          color: var(--text-white);
          letter-spacing: -0.01em;
        }

        .skill-tier-badge {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .skill-tier-badge.tier-regularly {
          color: #34d399;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .skill-tier-badge.tier-comfortable {
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.12);
          border: 1px solid rgba(56, 189, 248, 0.3);
        }

        .skill-tier-badge.tier-learning {
          color: #c084fc;
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.3);
        }

        .skill-note {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
        }

        .no-skills-notice {
          padding: 20px;
          text-align: center;
          color: var(--text-dark);
          font-size: 13px;
          font-style: italic;
          background: rgba(255, 255, 255, 0.015);
          border-radius: 10px;
          border: 1px dashed rgba(255, 255, 255, 0.06);
        }

        /* --- TODO / Confirmation Section --- */
        .todo-confirmation-wrap {
          border-radius: 16px;
          border: 1px solid var(--border-glass);
          overflow: hidden;
          transition: border-color 0.3s;
        }

        .todo-confirmation-wrap:hover {
          border-color: rgba(var(--accent-rgb), 0.25);
        }

        .todo-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          background: transparent;
          border: none;
          color: var(--text-white);
          text-align: left;
          cursor: pointer;
          transition: background 0.2s;
        }

        .todo-toggle-btn:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .todo-toggle-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .todo-toggle-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .todo-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-white);
        }

        .todo-subtitle {
          font-size: 13px;
          color: var(--text-muted);
        }

        .todo-toggle-right {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .todo-badge {
          font-family: var(--font-mono);
          font-size: 12px;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-light);
        }

        .todo-content {
          padding: 0 24px 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          animation: fadeSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .github-verified-sections {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .github-verified-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .github-group-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .github-group-title {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-white);
          margin: 0;
        }

        .todo-explainer {
          font-size: 13px;
          color: var(--text-muted);
          margin: 16px 0 20px;
          line-height: 1.5;
        }

        .todo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 12px;
        }

        .todo-item-card {
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: all 0.2s;
        }

        .todo-item-card:hover {
          border-color: rgba(var(--accent-rgb), 0.4);
          background: rgba(var(--accent-rgb), 0.03);
          transform: translateY(-1px);
        }

        .todo-item-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .todo-item-name {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 14px;
          color: var(--text-light);
        }

        .todo-item-source {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.08);
          padding: 1px 6px;
          border-radius: 4px;
        }

        .todo-item-detail {
          font-size: 12px;
          color: var(--text-muted);
          line-height: 1.4;
          margin: 0;
        }

        /* --- Keyframes Animations --- */
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes popIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
