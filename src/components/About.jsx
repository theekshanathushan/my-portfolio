import React, { useState } from 'react';
import { Terminal, Calendar, MapPin, Briefcase, Award } from 'lucide-react';

const BIO_TEXT = `I'm Theekshana, a Full-Stack Developer and UI/UX Designer based in Colombo, Sri Lanka. I thrive at the intersection of aesthetic design and robust systems development, building performant, user-centered web applications. With a solid engineering foundation, I enjoy translating complex business logic into intuitive, visually stunning digital experiences.`;

const TERMINAL_TABS = [
  { id: 'bio', label: 'bio.json' },
  { id: 'skills', label: 'values.json' },
  { id: 'contact', label: 'links.json' },
];

const TIMELINE_DATA = [
  {
    role: "Full-Stack Developer & UI/UX Designer",
    company: "Ceylon Tech Labs",
    period: "2024 - Present",
    desc: "Developing performant React and Node.js applications, building secure backend architectures, and designing intuitive user interfaces in Figma."
  },
  {
    role: "Associate Software Engineer",
    company: "Apex Digital Solutions",
    period: "2022 - 2024",
    desc: "Built scalable RESTful APIs, designed client portal mockups, and coordinated database migration pipelines using MongoDB."
  },
  {
    role: "BSc (Hons) in Software Engineering",
    company: "NSBM Green University",
    period: "2020 - 2024",
    desc: "Studied advanced programming, system design patterns, user-experience design, and graduated with a solid engineering foundation."
  }
];

export default function About() {
  const [activeTab, setActiveTab] = useState('bio');

  const getTerminalContent = () => {
    switch (activeTab) {
      case 'bio':
        return JSON.stringify({
          name: "Theekshana Thushan",
          role: "Full-Stack Developer & UI/UX Designer",
          location: "Colombo, Sri Lanka",
          philosophy: "Bridging the gap between beautiful visuals and high-performance backend systems.",
          passions: ["Clean Code", "API Architecture", "Design Systems", "UI Micro-Interactions"]
        }, null, 2);
      case 'skills':
        return JSON.stringify({
          coreValues: ["User Centricity", "Semantic Standards", "Scalable Patterns"],
          hobbies: ["Photography", "Generative Graphics", "Exploring Tech Trends"],
          coffeeConsumption: "Balanced"
        }, null, 2);
      case 'contact':
        return JSON.stringify({
          email: "theekshanathushan89@gmail.com",
          github: "github.com/G-T-Thushan",
          linkedin: "linkedin.com/in/theekshana-thushan-57b866328",
          status: "Available for freelance projects & full-time roles"
        }, null, 2);
      default:
        return '';
    }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-subtitle">Developer Profile</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          {/* Column 1: Interactive Dev Terminal */}
          <div className="about-column">
            <p className="about-bio-para">{BIO_TEXT}</p>

            <div className="terminal-window glass-card">
              {/* Header Bar */}
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="term-dot close"></span>
                  <span className="term-dot minimize"></span>
                  <span className="term-dot maximize"></span>
                </div>
                <div className="terminal-title">
                  <Terminal size={14} className="term-icon" /> theekshana@creative-shell: ~
                </div>
              </div>

              {/* Tabs */}
              <div className="terminal-tabs">
                {TERMINAL_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    className={`terminal-tab ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Shell Display */}
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="term-prompt">$</span> cat {activeTab}.json
                </div>
                <pre className="terminal-code">
                  <code>{getTerminalContent()}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Column 2: Glassmorphic Experience Timeline */}
          <div className="about-column timeline-column">
            <h3 className="timeline-section-heading">
              <Briefcase size={20} className="timeline-heading-icon" /> Work Experience
            </h3>
            
            <div className="timeline">
              {TIMELINE_DATA.map((item, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker-wrap">
                    <div className="timeline-marker"></div>
                    {idx !== TIMELINE_DATA.length - 1 && <div className="timeline-line-connector"></div>}
                  </div>
                  <div className="timeline-content glass-card">
                    <span className="timeline-period">
                      <Calendar size={12} /> {item.period}
                    </span>
                    <h4 className="timeline-title">{item.role}</h4>
                    <span className="timeline-company">{item.company}</span>
                    <p className="timeline-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
        .about-bio-para {
          font-size: 16px;
          color: var(--text-light);
          margin-bottom: 24px;
          line-height: 1.8;
        }
        
        /* Terminal Window */
        .terminal-window {
          border-radius: 12px;
          overflow: hidden;
          background: rgba(8, 8, 14, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }
        .terminal-header {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          height: 36px;
          display: flex;
          align-items: center;
          padding: 0 16px;
          position: relative;
        }
        .terminal-dots {
          display: flex;
          gap: 6px;
        }
        .term-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .term-dot.close { background-color: #ff5f56; }
        .term-dot.minimize { background-color: #ffbd2e; }
        .term-dot.maximize { background-color: #27c93f; }
        .terminal-title {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .term-icon {
          color: var(--text-dark);
        }
        .terminal-tabs {
          display: flex;
          background: rgba(255, 255, 255, 0.01);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .terminal-tab {
          background: transparent;
          border: none;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text-muted);
          transition: all 0.2s;
        }
        .terminal-tab:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.03);
        }
        .terminal-tab.active {
          color: var(--accent);
          background: rgba(0, 0, 0, 0.4);
          border-bottom: 2px solid var(--accent);
        }
        .terminal-body {
          padding: 20px;
          font-family: var(--font-mono);
          font-size: 13px;
          text-align: left;
          min-height: 200px;
        }
        .terminal-line {
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .term-prompt {
          color: var(--accent);
          margin-right: 8px;
        }
        .terminal-code {
          color: var(--text-light);
          line-height: 1.5;
        }
        .terminal-code code {
          background: transparent;
          padding: 0;
          color: var(--text-light);
          font-size: 13px;
        }

        /* Timeline Styles */
        .timeline-section-heading {
          font-size: 20px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .timeline-heading-icon {
          color: var(--accent);
        }
        .timeline {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .timeline-item {
          display: flex;
          gap: 20px;
        }
        .timeline-marker-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        .timeline-marker {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg-dark);
          border: 2px solid var(--accent);
          box-shadow: 0 0 10px var(--accent);
          z-index: 2;
        }
        .timeline-line-connector {
          width: 2px;
          flex-grow: 1;
          background: linear-gradient(180deg, var(--accent) 0%, rgba(255,255,255,0.05) 100%);
          margin-top: 4px;
          margin-bottom: -16px;
        }
        .timeline-content {
          padding: 20px;
          text-align: left;
          flex-grow: 1;
        }
        .timeline-period {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--accent);
          margin-bottom: 8px;
        }
        .timeline-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 2px;
        }
        .timeline-company {
          font-size: 13px;
          color: var(--text-muted);
          display: block;
          margin-bottom: 12px;
        }
        .timeline-desc {
          font-size: 14px;
          color: var(--text-muted);
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
}
