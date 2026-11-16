import React, { useState } from 'react';
import { 
  Terminal, 
  Server, 
  Layout, 
  Database, 
  Cpu, 
  Wrench, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  CheckCircle2
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
    description: 'Core programming languages for full-stack logic and client architectures',
    skills: [
      { name: 'Java', tier: 'Use regularly', note: 'Core OOP, Collections, Concurrency' },
      { name: 'TypeScript', tier: 'Use regularly', note: 'Strict typing for Angular & React' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    description: 'Enterprise server frameworks, microservices, and secure token authentication',
    skills: [
      { name: 'Spring Boot', tier: 'Use regularly', note: 'REST APIs, Dependency Injection, MVC' },
      { name: 'ASP.NET Core', tier: 'Use regularly', note: 'Controllers, Middleware, Dependency Injection' },
      { name: 'JWT', tier: 'Use regularly', note: 'Stateless role-based auth & claims' }
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Layout,
    description: 'Single-page web applications, component lifecycles, and cross-platform UI',
    skills: [
      { name: 'React', tier: 'Use regularly', note: 'Hooks, reactive state, component trees' },
      { name: 'Angular', tier: 'Use regularly', note: 'Modular architecture, services, routing' },
      { name: 'Flutter', tier: 'Learning', note: 'Cross-platform mobile UI framework' }
    ]
  },
  {
    id: 'databases',
    title: 'Databases',
    icon: Database,
    description: 'Relational data modeling, schema normalization, and ORM persistence',
    skills: [
      { name: 'MySQL', tier: 'Use regularly', note: 'Relational schemas, queries & indexing' },
      { name: 'Entity Framework', tier: 'Comfortable', note: 'Code-First ORM, migrations & LINQ' }
    ]
  },
  {
    id: 'ai-apis',
    title: 'AI/APIs',
    icon: Cpu,
    description: 'Generative AI prompt integration and automated cloud communication services',
    skills: [
      { name: 'Gemini API', tier: 'Comfortable', note: 'LLM reasoning & candidate screening' },
      { name: 'Twilio', tier: 'Comfortable', note: 'Automated SMS & notification dispatches' }
    ]
  },
  {
    id: 'tools-devops',
    title: 'Tools & DevOps',
    icon: Wrench,
    description: 'Source control versioning, branching workflows, and automated deployments',
    skills: [
      { name: 'Git', tier: 'Use regularly', note: 'Branching, multi-repo sync & code reviews' },
      { name: 'Vercel', tier: 'Comfortable', note: 'CI/CD pipeline & automated production hosting' }
    ]
  }
];

// CV and project technologies held in a TODO list for user confirmation before adding
const UNCERTAIN_SKILLS_TODO = [
  { name: 'JavaScript (ES6+)', source: 'CV & Projects', detail: 'CareConnect, Test_API, and Portfolio interactions' },
  { name: 'C#', source: 'TalentAI Project', detail: 'Used with ASP.NET Core & Entity Framework backend' },
  { name: 'HTML5 & CSS3', source: 'CV Technical Skills', detail: 'Standard semantic layouts & responsive interfaces' },
  { name: 'WebSockets', source: 'CV Projects', detail: 'Real-time communication in CareConnect & PharmaCare' },
  { name: 'Leaflet.js', source: 'CareConnect Project', detail: 'Geographic disaster relief mapping & live operations' },
  { name: 'Tailwind CSS', source: 'MoodMirror Project', detail: 'Utility-first frontend styling' },
  { name: 'Framer Motion', source: 'MoodMirror Project', detail: 'Interactive UI animations & wellness workflows' },
  { name: 'Recharts', source: 'MoodMirror Project', detail: 'Analytics dashboards & emotional streak charts' },
  { name: 'MailKit', source: 'TalentAI Project', detail: 'Automated email dispatch service' },
  { name: 'Google OAuth2', source: 'CV Technical Skills', detail: 'Third-party single sign-on authentication' },
  { name: 'Kotlin / BLE', source: 'Beacon App', detail: 'Bluetooth Low Energy proximity scanning' }
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
            Categorized strictly by proficiency tier, verified across full-stack projects and academic coursework.
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

        {/* TODO / Confirmation Drawer for Unverified or Supplemental Skills */}
        <div className="todo-confirmation-wrap glass-card">
          <button 
            className="todo-toggle-btn"
            onClick={() => setIsTodoOpen(!isTodoOpen)}
            aria-expanded={isTodoOpen}
          >
            <div className="todo-toggle-left">
              <HelpCircle size={18} className="todo-icon text-glow-accent" />
              <div className="todo-toggle-text">
                <span className="todo-title">Skills for Confirmation (TODO List)</span>
                <span className="todo-subtitle">
                  {UNCERTAIN_SKILLS_TODO.length} skills found in your CV & projects kept out of the main grid per your strict criteria
                </span>
              </div>
            </div>
            <div className="todo-toggle-right">
              <span className="todo-badge">{isTodoOpen ? 'Hide List' : 'Review List'}</span>
              {isTodoOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          </button>

          {isTodoOpen && (
            <div className="todo-content">
              <p className="todo-explainer">
                These technologies appear in your repository or CV project descriptions. To keep your core skills section 100% focused on your specified list, they are placed here. Confirm if you would like any of these assigned to a category and tier:
              </p>
              <div className="todo-grid">
                {UNCERTAIN_SKILLS_TODO.map((item, idx) => (
                  <div key={idx} className="todo-item-card">
                    <div className="todo-item-head">
                      <span className="todo-item-name">{item.name}</span>
                      <span className="todo-item-source">{item.source}</span>
                    </div>
                    <p className="todo-item-detail">{item.detail}</p>
                  </div>
                ))}
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
          max-width: 620px;
          text-align: center;
          margin-top: -12px;
          line-height: 1.6;
        }

        /* --- Tier Filter Bar --- */
        .tier-filter-container {
          display: flex;
          justify-content: center;
          margin: 36px 0 48px;
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
