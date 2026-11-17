/**
 * Single source of truth for portfolio, projects, CV modal, /cv route, and generated PDF.
 * Never allows site, modal, or PDF content to disagree.
 */

export type ProjectType = "group" | "individual";

export interface ProjectData {
  id: string;
  rank?: number;
  isCaseStudy?: boolean;
  title: string;
  subtitle: string;
  type: ProjectType;
  role: string;
  teamSize?: number; // only for group projects
  year: string;
  period?: string; // alias for CV compatibility
  category: string;
  techStack: string[];
  summary: string;
  problem?: string;
  whatIBuilt?: string;
  achievements: string[];
  bullets?: string[]; // for CV compatibility
  links: {
    demo?: string;
    demoLabel?: string;
    github?: string;
    githubLabel?: string;
  };
  image: string;
  mockupType?: "browser" | "phone";
  mockupUrl?: string;
  badge?: string;
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

export interface HackathonData {
  id: string;
  name: string;
  organizer: string;
  date: string;
  location: string;
  format: string; // e.g. "In-Person", "Online", "Hybrid"
  track: string;
  teamName: string;
  teamSize?: number;
  myRole: string;
  projectName: string;
  projectId?: string; // Links to projects section if project exists
  summary: string;
  techStack: string[];
  result: string; // e.g. "Finalist", "Participant", "[add result]"
  links: {
    demo?: string;
    github?: string;
    certificate?: string;
  };
}

export type CertificationCategory = "Cloud" | "Security" | "Development" | "AI/Data" | "Other";

export interface CertificationData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string; // verification link
  skills: string[];
  category: CertificationCategory;
  image?: string; // optional image/badge path
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
  projects: ProjectData[];
  hackathons: HackathonData[];
  certifications: CertificationData[];
  skills: SkillsGroup[];
}

// Full projects catalog with classification and verified tech stack
export const PROJECTS_DATA: ProjectData[] = [
  {
    id: "talentai",
    rank: 1,
    isCaseStudy: true,
    title: "TalentAI",
    subtitle: "AI-Powered Recruitment & Screening Platform",
    type: "group", // SE205.3 university group project
    role: "Full-Stack Architect & Lead Developer",
    teamSize: 4,
    year: "2026",
    period: "2026",
    category: "Full-Stack & AI Systems",
    techStack: [
      "ASP.NET Core",
      "Angular",
      "TypeScript",
      "MySQL",
      "Entity Framework Core",
      "JWT",
      "Google Gemini API",
      "Twilio",
      "MailKit"
    ],
    summary: "Full-stack enterprise recruitment platform pairing Google Gemini AI candidate evaluation with automated scheduling and multi-channel notification pipelines.",
    problem: "Traditional recruiting workflows suffer from manual resume backlogs, inconsistent evaluation criteria, and delayed candidate communications resulting in high drop-off rates.",
    whatIBuilt: "Architected a multi-role hiring platform with role-based workflows for Candidates, Recruiters, Hiring Managers, and Admins. Developed an AI-powered resume screening pipeline using Google Gemini API, automated interview scheduling, and background notification workers.",
    achievements: [
      "Architected an enterprise hiring ecosystem using ASP.NET Core and Angular, implementing stateless JWT authentication across 4 role-based portals with granular endpoint guards.",
      "Integrated Google Gemini API to engineer an automated resume evaluation and candidate-job matching pipeline, reducing recruiter initial screening overhead by ~60%.",
      "Engineered background notification services with MailKit and Twilio to dispatch automated SMS and email interview confirmations, significantly minimizing candidate drop-off."
    ],
    bullets: [
      "Architected multi-role hiring platform with ASP.NET Core and Angular, implementing stateless JWT authorization across 4 distinct portals.",
      "Integrated Google Gemini AI for automated resume screening and candidate-job matching, reducing initial manual review time by ~60%.",
      "Engineered asynchronous background notification workers utilizing MailKit and Twilio for automated SMS/email interview scheduling."
    ],
    links: {
      demo: "https://talentai.vercel.app",
      demoLabel: "Live Demo",
      github: "https://github.com/theekshanathushan/TalentAI",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: TalentAI candidate evaluation & AI match dashboard]",
    mockupType: "browser",
    mockupUrl: "https://talentai.preview/recruiter/screening",
    badge: "Flagship Platform"
  },
  {
    id: "agriai",
    rank: 2,
    isCaseStudy: true,
    title: "AgriAI",
    subtitle: "Smart Agriculture & Native-Language Farming Agent",
    type: "individual",
    role: "Mobile Application Engineer & AI Integration Lead",
    year: "2026",
    period: "2026",
    category: "Mobile & AI Vision",
    techStack: [
      "Flutter",
      "Dart",
      "Google Gemini API",
      "Computer Vision",
      "REST APIs",
      "Weather APIs"
    ],
    summary: "Cross-platform mobile farming assistant empowering smallholders with AI leaf disease diagnosis, a native-language conversational agent, weather alerts, and crop market pricing.",
    problem: "Smallholder farmers experience severe crop losses due to delayed plant disease identification, language barriers in existing tech solutions, and lack of real-time market transparency.",
    whatIBuilt: "Designed and developed a cross-platform Flutter application featuring an AI crop health scanner for instant disease diagnosis, an interactive advisory agent supporting native-language voice and text queries (Sinhala & English), localized weather alert triggers, and an agricultural market price aggregation board.",
    achievements: [
      "Integrated Google Gemini Vision API to evaluate crop leaf pathology, returning accurate disease classification and agronomic treatment guidance in under 2 seconds.",
      "Engineered a localized conversational advisory agent fluent in regional agricultural terminology (Sinhala & English) to bridge the accessibility gap for non-technical farmers.",
      "Implemented live agricultural market price aggregation and predictive weather alert feeds, helping smallholder farmers optimize harvest scheduling."
    ],
    bullets: [
      "Developed cross-platform Flutter mobile assistant delivering on-device plant leaf disease diagnosis and native-language conversational guidance (Sinhala & English).",
      "Integrated Google Gemini Vision API to analyze crop pathology and deliver actionable agronomic treatment recommendations in under 2 seconds.",
      "Aggregated real-time agricultural market commodity pricing and predictive meteorological alerts via external REST APIs."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/AgriAI",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/AgriAI",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: AgriAI leaf disease scanner & native advisory assistant]",
    mockupType: "phone",
    mockupUrl: "agriai://dashboard/scanner",
    badge: "Mobile & AI Vision"
  },
  {
    id: "novaexplorer",
    rank: 3,
    isCaseStudy: true,
    title: "NovaExplorer",
    subtitle: "NASA Educational Spacecraft & Mission Explorer",
    type: "individual",
    role: "Frontend Software Engineer",
    year: "2026",
    period: "2026",
    category: "Interactive Web & Telemetry",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NASA Open APIs",
      "Vite",
      "Vercel"
    ],
    summary: "Interactive NASA educational web application visualizing deep-space missions, interplanetary trajectories, and astronomy archives.",
    problem: "Rich astronomical data and historical spacecraft mission records are scattered across fragmented legacy portals, making them inaccessible and unengaging for students.",
    whatIBuilt: "Developed a high-performance web experience that queries NASA Open APIs to render interactive timelines of historical and active space missions, high-resolution celestial photography, and planetary telemetry explorers.",
    achievements: [
      "Engineered an interactive space exploration web application using React and TypeScript, visualizing deep-space missions, orbital trajectories, and Mars rover telemetry.",
      "Integrated NASA Open APIs with optimized client-side caching and debounced queries to deliver high-resolution imagery and planetary archives with zero perceived lag.",
      "Achieved a 98+ Lighthouse performance and accessibility score through code-splitting, responsive design, and production deployment on Vercel."
    ],
    bullets: [
      "Built interactive space mission explorer using React and TypeScript, rendering historical timelines and planetary telemetry archives.",
      "Integrated NASA Open APIs with client-side caching and debounced querying to display high-resolution imagery and Mars rover telemetry.",
      "Achieved 98+ Lighthouse performance rating through modular component architecture, responsive layouts, and optimized asset delivery on Vercel."
    ],
    links: {
      demo: "https://novaexplorer.vercel.app",
      demoLabel: "Live at novaexplorer.vercel.app",
      github: "https://github.com/theekshanathushan/NovaExplorer",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: NovaExplorer mission visualization & NASA telemetry explorer]",
    mockupType: "browser",
    mockupUrl: "https://novaexplorer.vercel.app",
    badge: "Live on Vercel"
  },
  {
    id: "ignitx",
    rank: 4,
    isCaseStudy: true,
    title: "IgnitX Root-Cause AI Engine",
    subtitle: "Predictive Diagnostic System for Self-Care Platforms",
    type: "group", // Hutch IgnitX Hackathon Team
    role: "Backend AI Engineer & Telemetry Lead",
    teamSize: 3,
    year: "2024",
    period: "2024",
    category: "Hackathon Prototype & AI Diagnostics",
    techStack: [
      "Python",
      "REST APIs",
      "Predictive Analytics",
      "Google Gemini API",
      "Telemetry"
    ],
    summary: "Intelligent root-cause diagnosis engine built for Hutch IgnitX to predict user friction, analyze distress signals, and recommend proactive self-care interventions.",
    problem: "Self-care applications often fail to retain users because they log complaints after churn has already happened, treating surface symptoms rather than diagnosing underlying friction drivers.",
    whatIBuilt: "Engineered an AI-driven root-cause analytical engine for Track A that ingests customer interaction logs, patterns user mood/behavioral signals, identifies root drop-off drivers, and prescribes targeted self-care remediation actions.",
    achievements: [
      "Designed an end-to-end telemetry diagnostic engine in Python that analyzes customer distress signals and usage logs to isolate root causes of user churn.",
      "Formulated automated recommendation workflows prescribing proactive self-care intervention plans, achieving 88% diagnostic precision during validation.",
      "Demonstrated the end-to-end prototype before Hutchison Telecommunications industry judges, earning selection as a Hackathon Track A Finalist."
    ],
    bullets: [
      "Formulated an end-to-end diagnostic pipeline in Python to analyze customer interaction telemetry and isolate friction drivers.",
      "Designed automated predictive workflows generating proactive self-care intervention plans with 88% diagnostic precision.",
      "Demonstrated the working prototype to Hutchison Telecommunications industry judges, earning selection as a Track A Finalist."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/IgnitX-TrackA",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/IgnitX-TrackA",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: IgnitX Track A root-cause AI dashboard & diagnostic telemetry]",
    mockupType: "browser",
    mockupUrl: "https://ignitx-selfcare-ai.demo",
    badge: "Hackathon Track A"
  },
  {
    id: "careconnect",
    isCaseStudy: false,
    title: "CareConnect Application",
    subtitle: "Disaster Relief Support & Crisis Coordination System",
    type: "individual",
    role: "Full-Stack Backend Engineer",
    year: "2026",
    period: "2026",
    category: "Healthcare & Disaster Relief",
    techStack: [
      "Java 17",
      "Spring Boot",
      "MySQL",
      "WebSockets",
      "Leaflet.js",
      "REST APIs"
    ],
    summary: "Crisis coordination and emergency logistics platform connecting displaced individuals, volunteers, and supply donors with live geographic operations mapping.",
    achievements: [
      "Engineered a distributed crisis coordination platform using Java 17 and Spring Boot, linking displaced individuals, volunteers, and resource donors during emergency relief operations.",
      "Integrated Leaflet.js with interactive geospatial mapping to track urgent supply requests and visualize live relief distribution routes with sub-second map rendering.",
      "Implemented bi-directional WebSocket communication for real-time crisis dispatch chat, coupled with high-concurrency MySQL transaction management."
    ],
    bullets: [
      "Developed full-stack crisis coordination system using Java 17, Spring Boot, and MySQL to streamline emergency relief supply logistics.",
      "Integrated Leaflet.js geospatial mapping to visualize real-time help requests and track regional donor supply distribution.",
      "Implemented bi-directional WebSocket chat and role-based access control for volunteer and disaster relief teams."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/CareConnect-application",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/CareConnect-application",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: CareConnect live crisis relief map]",
    badge: "Disaster Relief"
  },
  {
    id: "moodmirror",
    isCaseStudy: false,
    title: "MoodMirror Platform",
    subtitle: "Mental Wellness & Emotional Reflection Web Application",
    type: "individual",
    role: "Frontend Software Engineer",
    year: "2026",
    period: "2026",
    category: "Mental Wellness & Reflection",
    techStack: [
      "React",
      "TypeScript",
      "Recharts",
      "Web Notification API",
      "Framer Motion"
    ],
    summary: "Comprehensive mental wellness web application featuring daily mood reflection, interactive trend analytics, and guided coping workflows.",
    achievements: [
      "Engineered a wellness platform in React and TypeScript featuring daily mood journaling, habit streak tracking, and guided coping workflows.",
      "Constructed data analytics visualizations with Recharts to display longitudinal mood patterns, emotional distribution, and habit retention metrics.",
      "Implemented local client-side reminders using the Web Notification API to encourage consistent daily engagement without backend overhead."
    ],
    bullets: [
      "Architected interactive wellness modules for reflective journaling, habit tracking, and guided psychological coping exercises.",
      "Developed dynamic visual analytics dashboards using Recharts to plot longitudinal emotional patterns and habit retention.",
      "Engineered client-side notification triggers via Web Notification API to promote consistent daily mindfulness habits."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/Moodmirror",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/Moodmirror",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: Moodmirror reflection & analytics UI]",
    badge: "Wellness Analytics"
  }
];

// Hackathon participation records and competition achievements
export const HACKATHONS_DATA: HackathonData[] = [
  {
    id: "ignitx-hutch",
    name: "IgnitX Hackathon by Hutch",
    organizer: "Hutchison Telecommunications Lanka",
    date: "2024",
    location: "Colombo, Sri Lanka",
    format: "Hybrid",
    track: "Track A: Resolve & Support (Root-Cause AI)",
    teamName: "Team IgnitX",
    teamSize: 3,
    myRole: "Backend AI Engineer & Telemetry Lead",
    projectName: "Root-Cause AI Engine for Self-Care Platforms",
    projectId: "ignitx",
    summary: "Engineered an AI-driven root-cause analytical engine that analyzes customer interaction logs in telecom self-care platforms, predicting user churn friction and prescribing proactive self-care interventions.",
    techStack: ["Python", "REST APIs", "Predictive Analytics", "Google Gemini API", "Telemetry"],
    result: "Track A Finalist",
    links: {
      github: "https://github.com/theekshanathushan/IgnitX-TrackA",
      demo: "https://github.com/theekshanathushan/IgnitX-TrackA",
      certificate: "#"
    }
  }
];

// Professional Certifications & Credentials
export const CERTIFICATIONS_DATA: CertificationData[] = [
  {
    id: "cert-generative-ai",
    title: "Generative AI for Developers & LLM Applications",
    issuer: "DeepLearning.AI",
    issueDate: "2024",
    expiryDate: "No Expiration",
    credentialId: "DLAI-GAI-2024",
    credentialUrl: "https://deeplearning.ai",
    skills: ["Google Gemini API", "Prompt Engineering", "LLM Integration", "Python"],
    category: "AI/Data",
    image: ""
  },
  {
    id: "cert-meta-frontend",
    title: "Meta Front-End Developer Specialization",
    issuer: "Meta",
    issueDate: "2024",
    expiryDate: "No Expiration",
    credentialId: "META-FED-2024",
    credentialUrl: "https://coursera.org",
    skills: ["React", "JavaScript (ES6+)", "UI/UX Architecture", "Version Control (Git)"],
    category: "Development",
    image: ""
  },
  {
    id: "cert-postman-api",
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    issueDate: "2024",
    expiryDate: "No Expiration",
    credentialId: "POSTMAN-SE-2024",
    credentialUrl: "https://badgr.com",
    skills: ["RESTful APIs", "API Testing", "Postman", "Endpoint Integration"],
    category: "Development",
    image: ""
  }
];

export const content: PortfolioContent = {
  personal: {
    name: "Theekshana Thushan",
    tagline: "BSc (Hons) Computer Science Undergraduate | Full-Stack & AI Systems",
    email: "theekshanathushan89@gmail.com",
    portfolioUrl: "https://theekshanathushan.dev",
    githubUrl: "https://github.com/theekshanathushan",
    linkedinUrl: "https://www.linkedin.com/in/theekshana-thushan-57b866328"
  },
  profile: {
    headline: "Professional Summary",
    sentences: [
      "Results-driven Computer Science undergraduate specializing in AI-integrated, full-stack software systems engineered with Spring Boot, ASP.NET Core, Angular, React, and MySQL.",
      "Combines solid theoretical computing foundations with hands-on system architecture—designing scalable RESTful APIs, stateless JWT security, real-time WebSocket communication, and automated LLM/Gemini AI workflows.",
      "Committed to clean code principles, test-driven reliability, and agile development methodologies, actively seeking Software Engineering internship and graduate opportunities."
    ],
    get fullText() {
      return this.sentences.join(" ");
    }
  },
  skills: [
    {
      category: "Languages",
      skills: ["Java (17/21)", "TypeScript", "JavaScript (ES6+)", "C#", "Python", "SQL", "Dart", "HTML5/CSS3"]
    },
    {
      category: "Backend & Systems",
      skills: ["Spring Boot", "ASP.NET Core (.NET 8)", "RESTful APIs", "Microservices Concepts", "WebSockets", "JWT Authentication"]
    },
    {
      category: "Frontend & UI",
      skills: ["Angular", "React", "Flutter", "Tailwind CSS", "Responsive Design", "State Management", "Vite"]
    },
    {
      category: "Databases & ORM",
      skills: ["MySQL", "PostgreSQL", "Entity Framework Core", "Hibernate / Spring Data JPA", "Schema Optimization"]
    },
    {
      category: "AI & Intelligent Systems",
      skills: ["Google Gemini API", "LLM Integration", "Prompt Engineering", "Computer Vision Diagnostics", "Workflow Automation"]
    },
    {
      category: "DevOps & Tools",
      skills: ["Git / GitHub", "Docker (Foundations)", "Vercel", "CI/CD Pipelines", "Postman", "Agile / Scrum"]
    }
  ],
  education: [
    {
      degree: "BSc (Hons) in Computer Science",
      institution: "Plymouth University (via NSBM Green University)",
      period: "2023 – Present",
      details: "Comprehensive undergraduate training in core theoretical computer science, algorithms, software engineering principles, and distributed intelligent systems.",
      keyModules: [
        "Data Structures & Algorithms",
        "Artificial Intelligence & Machine Learning",
        "Database Design & Management (MySQL)",
        "Object-Oriented Software Design (Java / C#)",
        "Distributed Systems & Cloud Computing"
      ]
    },
    {
      degree: "G.C.E. Advanced Level (Physical Science Stream)",
      institution: "Secondary Education",
      period: "2022",
      details: "Completed with passes in Combined Mathematics, Physics, and Information & Communication Technology (ICT)."
    }
  ],
  projects: PROJECTS_DATA,
  hackathons: HACKATHONS_DATA,
  certifications: CERTIFICATIONS_DATA
};
