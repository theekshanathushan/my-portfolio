import React, { useState } from 'react';
import { Layout, Database, Wrench, PenTool } from 'lucide-react';

const SKILLS_DATA = {
  frontend: {
    icon: <Layout size={20} />,
    title: "Frontend Development",
    skills: [
      { name: "React / React Native", level: 90 },
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "HTML5 / CSS3 / SCSS", level: 92 },
      { name: "Next.js / Vite", level: 85 },
      { name: "TailwindCSS", level: 88 },
      { name: "WebGL / Canvas / Three.js", level: 75 }
    ]
  },
  backend: {
    icon: <Database size={20} />,
    title: "Backend & Systems",
    skills: [
      { name: "Node.js / Express", level: 85 },
      { name: "RESTful APIs / GraphQL", level: 88 },
      { name: "PostgreSQL / MongoDB", level: 82 },
      { name: "Firebase / Supabase", level: 80 },
      { name: "Python / Django", level: 70 },
      { name: "Redis", level: 65 }
    ]
  },
  tools: {
    icon: <Wrench size={20} />,
    title: "Tools & DevOps",
    skills: [
      { name: "Git / GitHub Actions", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS (S3 / EC2 / Lambda)", level: 78 },
      { name: "Linux / Shell Scripting", level: 80 },
      { name: "Vercel / Netlify", level: 88 },
      { name: "Jest / Cypress", level: 75 }
    ]
  },
  creative: {
    icon: <PenTool size={20} />,
    title: "Creative & Design",
    skills: [
      { name: "Figma (UI/UX)", level: 85 },
      { name: "Wireframing / Prototyping", level: 88 },
      { name: "Responsive Layout Architecture", level: 95 },
      { name: "Design Systems Construction", level: 82 },
      { name: "Adobe Illustrator / Photoshop", level: 70 },
      { name: "Motion Design", level: 78 }
    ]
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = Object.keys(SKILLS_DATA).map(key => ({
    key,
    title: SKILLS_DATA[key].title,
    icon: SKILLS_DATA[key].icon
  }));

  return (
    <section id="skills" className="section">
      <div className="container">
        
        <div className="section-title-wrap">
          <span className="section-subtitle">Tech Stack</span>
          <h2 className="section-title">My Skills</h2>
        </div>

        {/* Tab Buttons */}
        <div className="skills-tabs-container">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`skills-tab-btn glass-card ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.icon}
              <span>{cat.title}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {SKILLS_DATA[activeCategory].skills.map((skill, idx) => (
            <div key={idx} className="skill-card glass-card">
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-progress-bar-bg">
                <div 
                  className="skill-progress-bar-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .skills-tabs-container {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .skills-tab-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 24px;
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 600;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .skills-tab-btn:hover {
          color: var(--text-white);
          border-color: rgba(var(--accent-rgb), 0.3);
          transform: translateY(-2px);
        }
        .skills-tab-btn.active {
          color: var(--accent);
          background: rgba(var(--accent-rgb), 0.06);
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(var(--accent-rgb), 0.15);
        }
        .skills-tab-btn.active svg {
          color: var(--accent);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .skills-tab-btn {
            padding: 10px 16px;
            font-size: 13px;
            border-radius: 8px;
            width: 100%;
            justify-content: center;
          }
          .skills-tabs-container {
            gap: 10px;
          }
        }
        .skill-card {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-align: left;
        }
        .skill-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .skill-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-white);
        }
        .skill-percentage {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
          font-weight: 600;
        }
        .skill-progress-bar-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          overflow: hidden;
          width: 100%;
        }
        .skill-progress-bar-fill {
          height: 100%;
          background: var(--gradient-accent);
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(var(--accent-rgb), 0.5);
          transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
}
