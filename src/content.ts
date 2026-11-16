/**
 * Single source of truth for portfolio, CV modal, /cv route, and generated PDF.
 * Never allows site, modal, or PDF content to disagree.
 */

export interface ProjectContent {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  techStack: string[];
  summary: string;
  bullets: string[];
  links?: {
    demo?: string;
    github?: string;
  };
}

export interface EducationContent {
  institution: string;
  degree: string;
  period: string;
  details: string;
  keyModules?: string[];
}

export interface SkillsGroup {
  category: string;
  skills: string[];
}

export interface PortfolioContent {
  personal: {
    name: string;
    tagline: string;
    email: string;
    portfolioUrl: string;
    githubUrl: string;
    linkedinUrl: string;
  };
  profile: {
    headline: string;
    sentences: [string, string, string];
    fullText: string;
  };
  education: EducationContent[];
  projects: ProjectContent[];
  skills: SkillsGroup[];
}

export const content: PortfolioContent = {
  personal: {
    name: "Theekshana Thushan",
    tagline: "Software Engineering Student | Full-Stack & AI Systems",
    email: "theekshanathushan89@gmail.com",
    portfolioUrl: "https://theekshanathushan.dev",
    githubUrl: "https://github.com/theekshanathushan",
    linkedinUrl: "https://www.linkedin.com/in/theekshana-thushan-57b866328"
  },
  profile: {
    headline: "Professional Profile",
    sentences: [
      "Software engineering undergraduate specializing in AI-integrated full-stack web platforms engineered with ASP.NET Core, Angular, Spring Boot, React, and MySQL.",
      "Architected and deployed production-ready applications featuring automated Gemini AI screening pipelines, stateless JWT authorization, and real-time WebSocket communication.",
      "Delivers reliable software with clean layered architecture and test-driven workflows, targeting high-impact software engineering internship and graduate roles."
    ],
    get fullText() {
      return this.sentences.join(" ");
    }
  },
  skills: [
    {
      category: "Languages",
      skills: ["Java (17/21)", "TypeScript", "JavaScript (ES6+)", "C#", "Dart", "HTML5", "CSS3"]
    },
    {
      category: "Backend & Systems",
      skills: ["Spring Boot", "ASP.NET Core", "Entity Framework Core", "JWT Auth", "RESTful APIs", "WebSockets"]
    },
    {
      category: "Frontend & Mobile",
      skills: ["Angular", "React", "Flutter", "Tailwind CSS", "Recharts", "Framer Motion"]
    },
    {
      category: "Databases & Cloud",
      skills: ["MySQL", "Relational Schema Design", "Vercel", "Git / GitHub", "Vite"]
    },
    {
      category: "AI & Integrations",
      skills: ["Google Gemini API", "Twilio SMS", "MailKit", "Leaflet.js", "NASA Open APIs"]
    }
  ],
  education: [
    {
      degree: "BSc (Hons) in Software Engineering",
      institution: "Plymouth University (via NSBM Green University)",
      period: "2023 – Present",
      details: "Focusing on enterprise full-stack development, distributed architectures, algorithms, and secure systems design.",
      keyModules: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (Java/C#)",
        "Database Design & Management (MySQL)",
        "Software Engineering Principles"
      ]
    },
    {
      degree: "G.C.E. Advanced Level (Physical Science)",
      institution: "Secondary Education",
      period: "2022",
      details: "Combined Mathematics, Physics, and Information & Communication Technology (ICT)."
    }
  ],
  projects: [
    {
      id: "talentai",
      title: "TalentAI",
      subtitle: "AI-Powered Recruitment & Screening Platform",
      period: "2026",
      techStack: [
        "ASP.NET Core",
        "Angular",
        "TypeScript",
        "MySQL",
        "Entity Framework Core",
        "JWT",
        "Gemini API",
        "Twilio",
        "MailKit"
      ],
      summary: "Full-stack enterprise recruitment system pairing Google Gemini AI resume screening with multi-role access control and automated notifications.",
      bullets: [
        "Architected multi-role portals for Candidates, Recruiters, Hiring Managers, and Admins with stateless JWT authorization guards.",
        "Integrated Google Gemini AI for automated candidate screening and qualification matching against job requisitions.",
        "Engineered background notification services utilizing MailKit and Twilio to dispatch automated SMS and email interview reminders."
      ],
      links: {
        demo: "https://talentai.vercel.app",
        github: "https://github.com/theekshanathushan/TalentAI"
      }
    },
    {
      id: "agriai",
      title: "AgriAI",
      subtitle: "Smart Agriculture & Native-Language Farming Agent",
      period: "2026",
      techStack: [
        "Flutter",
        "Dart",
        "Gemini API",
        "AI Vision",
        "REST APIs",
        "Weather APIs"
      ],
      summary: "Cross-platform mobile farming platform providing AI crop disease detection, native-language advisory agents, and crop market pricing.",
      bullets: [
        "Developed mobile plant leaf scanner utilizing vision models to provide instant crop disease identification and treatment guidance.",
        "Built interactive conversational advisory agent supporting natural language queries in native languages (Sinhala & English).",
        "Integrated real-time agricultural market pricing and localized weather forecast alerts to optimize harvest planning."
      ],
      links: {
        github: "https://github.com/theekshanathushan/AgriAI"
      }
    },
    {
      id: "novaexplorer",
      title: "NovaExplorer",
      subtitle: "NASA Educational Spacecraft & Mission Explorer",
      period: "2026",
      techStack: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vite",
        "NASA Open APIs",
        "Vercel"
      ],
      summary: "Interactive educational web platform visualizing NASA spacecraft missions, planetary trajectories, and celestial archives.",
      bullets: [
        "Deployed to production at novaexplorer.vercel.app with optimized client caching and high Lighthouse performance ratings.",
        "Integrated NASA Open APIs to fetch and curate real-time mission telemetry, Mars rover photography, and astronomical catalog archives.",
        "Engineered responsive interactive timelines and orbital mission visualization modules for seamless cross-device exploration."
      ],
      links: {
        demo: "https://novaexplorer.vercel.app",
        github: "https://github.com/theekshanathushan/NovaExplorer"
      }
    },
    {
      id: "careconnect",
      title: "CareConnect",
      subtitle: "Disaster Relief Support & Crisis Coordination System",
      period: "2026",
      techStack: [
        "Java 17",
        "Spring Boot",
        "MySQL",
        "WebSockets",
        "JavaScript",
        "Leaflet.js"
      ],
      summary: "Crisis coordination and healthcare platform connecting displaced persons, donors, and government relief teams.",
      bullets: [
        "Developed full-stack crisis coordination system linking relief volunteers, displaced individuals, and supply donors.",
        "Integrated Leaflet.js to create a live geographic operations map tracking help requests and relief inventory distribution.",
        "Implemented real-time WebSocket chat and a centralized resource allocation dashboard with role-based access."
      ],
      links: {
        github: "https://github.com/theekshanathushan/CareConnect-application"
      }
    }
  ]
};
