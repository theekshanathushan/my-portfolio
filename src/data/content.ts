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
    teamSize: 4, // TODO: confirm team size for SE205.3 group project
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
      "Gemini API",
      "Twilio",
      "MailKit"
    ],
    summary: "Full-stack enterprise hiring ecosystem pairing Google Gemini AI candidate screening with automated scheduling and notification pipelines.",
    problem: "Traditional recruiting suffers from manual resume backlogs, inconsistent evaluation criteria across hiring managers, and fragmented communication channels leading to candidate drop-off.",
    whatIBuilt: "Architected and built a multi-portal recruitment platform with role-based workflows for Candidates, Recruiters, Hiring Managers, and Admins. Developed an automated resume-to-job matching pipeline powered by Google Gemini AI, integrated calendar-based interview scheduling, and engineered background services for automated SMS and email notifications.",
    achievements: [
      "Implemented role-based JWT authentication and authorization covering 4 distinct user roles with strict API endpoint permission guards.",
      "Integrated Google Gemini AI for automated candidate screening and qualification matching against job requisitions, reducing initial resume review overhead [add measurable result].",
      "Engineered an automated background notification worker using MailKit and Twilio to dispatch interview reminders, improving candidate attendance rate by [add measurable result]."
    ],
    bullets: [
      "Architected multi-role portals for Candidates, Recruiters, Hiring Managers, and Admins with stateless JWT authorization guards.",
      "Integrated Google Gemini AI for automated candidate screening and qualification matching against job requisitions.",
      "Engineered background notification services utilizing MailKit and Twilio to dispatch automated SMS and email interview reminders."
    ],
    links: {
      demo: "https://talentai.vercel.app",
      demoLabel: "Demo Link [add live demo URL]",
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
    type: "individual", // TODO: confirm if individual or hackathon team
    role: "Mobile Application Engineer & AI Integration Lead",
    year: "2026",
    period: "2026",
    category: "Mobile & AI Vision",
    techStack: [
      "Flutter",
      "Dart",
      "Gemini API",
      "AI Vision",
      "REST APIs",
      "Weather APIs"
    ],
    summary: "Cross-platform mobile farming assistant empowering smallholders with AI leaf disease diagnosis, a native-language conversational agent, weather alerts, and crop market pricing.",
    problem: "Smallholder and regional farmers suffer severe crop yield losses due to delayed disease identification, linguistic barriers in existing digital agtech solutions, and volatile marketplace pricing.",
    whatIBuilt: "Designed and developed a cross-platform Flutter application featuring an AI crop health scanner for instant disease diagnosis, an interactive advisory agent supporting native-language voice and text queries (Sinhala & English), localized weather alert triggers, and an agricultural market price aggregation board.",
    achievements: [
      "Integrated an on-device/cloud vision pipeline to analyze plant leaf imagery and deliver instant disease diagnostics with treatment guidelines [add measurable result].",
      "Built a localized conversational advisory agent fluent in local agricultural terminology and native languages to make agtech guidance accessible to non-technical farmers.",
      "Implemented real-time market price aggregation and predictive weather alert feeds, helping farmers optimize harvest and sales timing by [add measurable result]."
    ],
    bullets: [
      "Developed mobile plant leaf scanner utilizing vision models to provide instant crop disease identification and treatment guidance.",
      "Built interactive conversational advisory agent supporting natural language queries in native languages (Sinhala & English).",
      "Integrated real-time agricultural market pricing and localized weather forecast alerts to optimize harvest planning."
    ],
    links: {
      demo: "#",
      demoLabel: "Demo Link [add APK / demo URL]",
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
    type: "individual", // TODO: confirm if individual
    role: "Frontend Engineer & Interface Designer",
    year: "2026",
    period: "2026",
    category: "Interactive Web & Telemetry",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "NASA Open APIs",
      "Vercel"
    ],
    summary: "Interactive NASA educational web application visualizing deep-space missions, interplanetary trajectories, and telemetry archives.",
    problem: "Rich astronomical datasets and historical spacecraft mission records are scattered across fragmented legacy portals, making them inaccessible and unengaging for students and space enthusiasts.",
    whatIBuilt: "Developed a high-performance web experience that queries NASA Open APIs to render interactive timelines of historical and active space missions, high-resolution celestial photography, and planetary telemetry explorers.",
    achievements: [
      "Successfully deployed to production at novaexplorer.vercel.app, achieving [add measurable result] Lighthouse performance rating on desktop.",
      "Integrated NASA Open APIs to curate and cache real-time mission telemetry, Mars rover photography, and astronomical catalog archives.",
      "Engineered responsive interactive timelines and orbital mission exploration modules, increasing average user session engagement to [add measurable result]."
    ],
    bullets: [
      "Deployed to production at novaexplorer.vercel.app with optimized client caching and high Lighthouse performance ratings.",
      "Integrated NASA Open APIs to fetch and curate real-time mission telemetry, Mars rover photography, and astronomical catalog archives.",
      "Engineered responsive interactive timelines and orbital mission visualization modules for seamless cross-device exploration."
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
    title: "IgnitX by Hutch Hackathon: Track A",
    subtitle: "Root-Cause AI Engine for Self-Care Platforms",
    type: "group", // Hutch IgnitX Hackathon Team
    role: "Backend AI Engineer & Telemetry Lead",
    teamSize: 3, // TODO: confirm team size for Hutch IgnitX Hackathon Track A
    year: "2026",
    period: "2026",
    category: "Hackathon Prototype & AI Diagnostics",
    techStack: [
      "Python",
      "REST APIs",
      "Predictive Analytics",
      "AI / LLM Engine",
      "Telemetry Processing"
    ],
    summary: "Intelligent root-cause diagnosis engine built for Hutch IgnitX to predict user friction, analyze distress signals, and recommend proactive self-care interventions.",
    problem: "Self-care applications often fail to retain users because they log complaints after churn has already happened, treating surface symptoms rather than diagnosing underlying friction drivers.",
    whatIBuilt: "Engineered an AI-driven root-cause analytical engine for Track A that ingests customer interaction logs, patterns user mood/behavioral signals, identifies root drop-off drivers, and prescribes targeted self-care remediation actions.",
    achievements: [
      "Formulated an end-to-end diagnostic pipeline during the hackathon sprint to isolate root causes behind user self-care drop-offs with [add measurable result] precision.",
      "Designed automated recommendation heuristic workflows delivering tailored intervention plans and habit recovery paths.",
      "Pitched and demonstrated the live proof-of-concept prototype to the Hutch industry judging panel, ranking among [add measurable result]."
    ],
    bullets: [
      "Formulated an end-to-end diagnostic pipeline to isolate root causes behind user self-care friction.",
      "Designed automated recommendation heuristic workflows delivering tailored intervention plans and habit recovery paths.",
      "Pitched and demonstrated the live proof-of-concept prototype to the Hutch industry judging panel."
    ],
    links: {
      demo: "#",
      demoLabel: "Demo Link [add prototype URL]",
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
    type: "individual", // TODO: confirm if individual or academic group project
    role: "Full-Stack Developer",
    year: "2026",
    period: "2026",
    category: "Healthcare & Disaster Relief",
    techStack: [
      "Java 17",
      "Spring Boot",
      "MySQL",
      "WebSockets",
      "JavaScript",
      "Leaflet.js"
    ],
    summary: "Crisis coordination and medical consulting system connecting displaced individuals, donors, and relief teams with live geographic operations mapping.",
    achievements: [
      "Built a crisis coordination platform connecting displaced persons, donors, and government relief officials.",
      "Integrated Leaflet.js to create a live, geographic operations map tracking help requests and active supply donors.",
      "Developed real-time chat functionality, donation processing, and a centralized resource allocation dashboard."
    ],
    bullets: [
      "Developed full-stack crisis coordination system linking relief volunteers, displaced individuals, and supply donors.",
      "Integrated Leaflet.js to create a live geographic operations map tracking help requests and relief inventory distribution.",
      "Implemented real-time WebSocket chat and a centralized resource allocation dashboard with role-based access."
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
    subtitle: "Mental Wellness & Reflection",
    type: "individual", // TODO: confirm if individual
    role: "Frontend Architect",
    year: "2026",
    period: "2026",
    category: "Mental Wellness & Reflection",
    techStack: [
      "React",
      "TypeScript",
      "Recharts",
      "Web Notification API",
      "RLS",
      "Framer Motion"
    ],
    summary: "Comprehensive mental health web application featuring daily mood reflection, interactive trend analytics, and guided coping workflows.",
    achievements: [
      "Architected interactive wellness modules for journaling, habit tracking, and guided coping exercises (e.g., box breathing).",
      "Developed an analytics dashboard using Recharts to visualize long-term mood patterns, emotion distribution, and habit streaks.",
      "Engineered client-side push reminders via Web Notification API to foster consistent daily reflection habits without backend overhead."
    ],
    bullets: [
      "Architected interactive wellness modules for journaling, habit tracking, and guided coping exercises.",
      "Developed an analytics dashboard using Recharts to visualize long-term mood patterns, emotion distribution, and habit streaks.",
      "Engineered client-side push reminders via Web Notification API to foster consistent daily reflection habits."
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
    name: "IgnitX by Hutch",
    organizer: "Hutchison Telecommunications Lanka",
    date: "[add date, e.g. Oct 2024]",
    location: "Colombo, Sri Lanka",
    format: "Hybrid",
    track: "Track A: Resolve & Support (Root-Cause AI)",
    teamName: "[add team name]",
    teamSize: 3, // TODO: confirm team size
    myRole: "Backend AI Engineer & Telemetry Lead",
    projectName: "Root-Cause AI Engine for Self-Care Platforms",
    projectId: "ignitx",
    summary: "Engineered an AI-driven root-cause analytical engine that patterns customer distress signals in Hutch self-care apps to isolate friction drivers and prescribe proactive coping interventions.",
    techStack: ["Python", "REST APIs", "Predictive Analytics", "AI / LLM Engine", "Telemetry Processing"],
    result: "[add result, e.g. Finalist / Participant]",
    links: {
      github: "https://github.com/theekshanathushan/IgnitX-TrackA",
      demo: "#",
      certificate: "#"
    }
  },
  // TODO: Fill in your second hackathon details below
  {
    id: "hackathon-placeholder-2",
    name: "[add hackathon name]",
    organizer: "[add organizer, e.g. IEEE / University / Tech Company]",
    date: "[add date]",
    location: "[add location]",
    format: "[add format, e.g. In-Person / Online]",
    track: "[add track or problem statement]",
    teamName: "[add team name]",
    teamSize: 4, // TODO: confirm team size
    myRole: "[add your role, e.g. Full-Stack Developer]",
    projectName: "[add project / solution name]",
    summary: "[add 2-line summary of the problem addressed, solution architected, and core technical impact achieved during the hackathon sprint].",
    techStack: ["[tech 1]", "[tech 2]", "[tech 3]"],
    result: "[add result, e.g. Winner / Top 5 / Finalist / Participant]",
    links: {
      demo: "#",
      github: "#",
      certificate: "#"
    }
  },
  // TODO: Fill in your third hackathon details below
  {
    id: "hackathon-placeholder-3",
    name: "[add hackathon name]",
    organizer: "[add organizer]",
    date: "[add date]",
    location: "[add location]",
    format: "[add format, e.g. In-Person / Online]",
    track: "[add track or problem statement]",
    teamName: "[add team name]",
    teamSize: 3, // TODO: confirm team size
    myRole: "[add your role]",
    projectName: "[add project / solution name]",
    summary: "[add 2-line summary of the problem addressed, solution architected, and core technical impact achieved during the hackathon sprint].",
    techStack: ["[tech 1]", "[tech 2]", "[tech 3]"],
    result: "[add result, e.g. Participant]",
    links: {
      demo: "#",
      github: "#",
      certificate: "#"
    }
  }
];

// Professional Certifications & Credentials
export const CERTIFICATIONS_DATA: CertificationData[] = [
  // TODO: replace with my real certificates
  {
    id: "cert-placeholder-1",
    title: "[add certificate title, e.g. AWS Certified Developer - Associate]",
    issuer: "[add issuer, e.g. Amazon Web Services (AWS)]",
    issueDate: "[add issue date, e.g. Jan 2025]",
    expiryDate: "[add expiry date or 'No Expiration']",
    credentialId: "[add credential ID]",
    credentialUrl: "https://example.com/verify-credential",
    skills: ["Cloud Architecture", "Serverless", "Security", "DevOps"],
    category: "Cloud",
    image: "" // Optional certificate image/badge preview path (e.g. '/certificates/aws-cert.png')
  },
  // TODO: replace with my real certificates
  {
    id: "cert-placeholder-2",
    title: "[add certificate title, e.g. Meta Front-End Developer Professional]",
    issuer: "[add issuer, e.g. Meta / Coursera]",
    issueDate: "[add issue date, e.g. 2024]",
    expiryDate: "No Expiration",
    credentialId: "[add credential ID]",
    credentialUrl: "https://example.com/verify-credential",
    skills: ["React", "JavaScript (ES6+)", "UI/UX", "Version Control"],
    category: "Development",
    image: ""
  },
  // TODO: replace with my real certificates
  {
    id: "cert-placeholder-3",
    title: "[add certificate title, e.g. DeepLearning.AI Generative AI for Developers]",
    issuer: "[add issuer, e.g. DeepLearning.AI]",
    issueDate: "[add issue date, e.g. 2024]",
    expiryDate: "No Expiration",
    credentialId: "[add credential ID]",
    credentialUrl: "https://example.com/verify-credential",
    skills: ["Prompt Engineering", "LLM APIs", "Python", "Vector Databases"],
    category: "AI/Data",
    image: ""
  }
];

export const content: PortfolioContent = {
  personal: {
    name: "Theekshana Thushan",
    tagline: "Computer Science Undergraduate | Full-Stack & AI Systems",
    email: "theekshanathushan89@gmail.com",
    portfolioUrl: "https://theekshanathushan.dev",
    githubUrl: "https://github.com/theekshanathushan",
    linkedinUrl: "https://www.linkedin.com/in/theekshana-thushan-57b866328"
  },
  profile: {
    headline: "Professional Profile",
    sentences: [
      "Computer Science undergraduate specializing in AI-integrated full-stack web platforms engineered with ASP.NET Core, Angular, Spring Boot, React, and MySQL.",
      "Bridges theoretical computing principles with scalable system design—architecting production-ready applications featuring automated Gemini AI screening pipelines, stateless JWT authorization, and real-time WebSocket communication.",
      "Delivers high-performance software with clean layered architecture and data-driven algorithmic optimization, targeting software engineering internship and graduate roles."
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
      degree: "BSc (Hons) in Computer Science",
      institution: "Plymouth University (via NSBM Green University)",
      period: "2023 – Present",
      details: "Rigorous academic training in core computer science theory, algorithms, distributed systems, and intelligent computing.",
      keyModules: [
        "Data Structures & Algorithms",
        "Artificial Intelligence & Machine Learning",
        "Database Design & Management (MySQL)",
        "Object-Oriented Software Design (Java/C#)",
        "Distributed Systems & Cloud Architecture"
      ]
    },
    {
      degree: "G.C.E. Advanced Level (Physical Science)",
      institution: "Secondary Education",
      period: "2022",
      details: "Combined Mathematics, Physics, and Information & Communication Technology (ICT)."
    }
  ],
  projects: PROJECTS_DATA,
  hackathons: HACKATHONS_DATA,
  certifications: CERTIFICATIONS_DATA
};
