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
    teamSize: 6,
    year: "2026",
    period: "2026",
    category: "Full-Stack & AI Systems",
    techStack: [
      "ASP.NET Core",
      "Angular",
      "TypeScript",
      "C#",
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
      github: "https://github.com/Lakshan994/AI-Recruitment-Platform",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: TalentAI candidate evaluation & AI match dashboard]",
    mockupType: "browser",
    mockupUrl: "https://talentai.preview/recruiter/screening",
    badge: "Flagship Group Platform"
  },
  {
    id: "agriai",
    rank: 2,
    isCaseStudy: true,
    title: "AgriAI (smart-farming-ai)",
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
      "Python",
      "REST APIs"
    ],
    summary: "Cross-platform mobile farming assistant empowering smallholders with AI leaf disease diagnosis, a native-language conversational agent, weather alerts, and crop market pricing.",
    problem: "Smallholder farmers experience severe crop losses due to delayed plant disease identification, language barriers in existing tech solutions, and lack of real-time market transparency.",
    whatIBuilt: "Designed and developed a cross-platform Flutter application featuring an AI crop health scanner for instant disease diagnosis, an interactive advisory agent supporting native-language voice and text queries (Sinhala & English), localized weather alert triggers, and an agricultural market price aggregation board.",
    achievements: [
      "Contributed 142 commits as solo engineer building offline-first mobile architecture, camera feeds, and edge model inference pipelines.",
      "Integrated Google Gemini Vision API to evaluate crop leaf pathology, returning accurate disease classification and agronomic treatment guidance in under 2 seconds.",
      "Engineered a localized conversational advisory agent fluent in regional agricultural terminology (Sinhala & English) to bridge the accessibility gap for non-technical farmers."
    ],
    bullets: [
      "Developed cross-platform Flutter mobile assistant with 142 commits, delivering on-device plant leaf disease diagnosis and native-language advice.",
      "Integrated Google Gemini Vision API to analyze crop pathology and deliver actionable agronomic treatment recommendations in under 2 seconds.",
      "Aggregated real-time agricultural market commodity pricing and predictive meteorological alerts via external REST APIs."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/smart-farming-ai",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/smart-farming-ai",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: AgriAI leaf disease scanner & native advisory assistant]",
    mockupType: "phone",
    mockupUrl: "agriai://dashboard/scanner",
    badge: "Solo Mobile Project"
  },
  {
    id: "novaexplorer",
    rank: 3,
    isCaseStudy: true,
    title: "NovaExplorer",
    subtitle: "NASA Educational Spacecraft & Mission Explorer",
    type: "group", // NASA Space Apps Hackathon Team
    teamSize: 5,
    role: "Frontend Software Engineer & UI Architect",
    year: "2026",
    period: "2026",
    category: "Interactive Web & Telemetry",
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NASA Open APIs",
      "PostgreSQL",
      "Vite",
      "Vercel"
    ],
    summary: "Interactive NASA educational web application visualizing deep-space missions, interplanetary trajectories, and astronomy archives.",
    problem: "Rich astronomical data and historical spacecraft mission records are scattered across fragmented legacy portals, making them inaccessible and unengaging for students.",
    whatIBuilt: "Developed a high-performance web experience in a 5-person hackathon squad, querying NASA Open APIs to render interactive timelines of historical and active space missions, high-resolution celestial photography, and planetary telemetry explorers.",
    achievements: [
      "Engineered an interactive space exploration web application using React and TypeScript, visualizing deep-space missions, orbital trajectories, and Mars rover telemetry.",
      "Integrated NASA Open APIs with optimized client-side caching and debounced queries to deliver high-resolution imagery and planetary archives with zero perceived lag.",
      "Achieved a 98+ Lighthouse performance and accessibility score through code-splitting, responsive design, and production deployment on Vercel."
    ],
    bullets: [
      "Built interactive space mission explorer in a 5-member NASA Space Apps team using React and TypeScript.",
      "Integrated NASA Open APIs with client-side caching and debounced querying to display high-resolution imagery and Mars rover telemetry.",
      "Achieved 98+ Lighthouse performance rating through modular component architecture, responsive layouts, and optimized asset delivery on Vercel."
    ],
    links: {
      demo: "https://novaexplorer.vercel.app",
      demoLabel: "Live at novaexplorer.vercel.app",
      github: "https://github.com/mchithna/NASASpaceApps",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: NovaExplorer mission visualization & NASA telemetry explorer]",
    mockupType: "browser",
    mockupUrl: "https://novaexplorer.vercel.app",
    badge: "NASA Space Apps Team"
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
  },
  {
    id: "suwadaru",
    isCaseStudy: false,
    title: "Suwadaru",
    subtitle: "Ayurvedic Healthcare & Digital Wellness Platform",
    type: "group",
    teamSize: 4,
    role: "Full-Stack Contributor (16 Commits)",
    year: "2026",
    period: "2026",
    category: "Healthcare & Digital Wellness",
    techStack: [
      "TypeScript",
      "JavaScript",
      "PostgreSQL",
      "CSS",
      "Vercel"
    ],
    summary: "Collaborative healthcare platform providing digital access to Ayurvedic wellness consultations and herbal medicine resources.",
    achievements: [
      "Contributed 16 commits as core full-stack developer focusing on responsive user interfaces and secure data access.",
      "Integrated PostgreSQL backend data models with optimized query performance and seamless Vercel production deployment.",
      "Collaborated in a 4-person development sprint utilizing Git branch management and peer code reviews."
    ],
    bullets: [
      "Collaborated in a 4-person team to build digital Ayurvedic healthcare web platform deployed live on Vercel.",
      "Developed responsive UI modules in TypeScript and structured PostgreSQL data models for consultation bookings.",
      "Maintained active Git pull request workflows and code review standards throughout the sprint."
    ],
    links: {
      demo: "https://suwadaru.vercel.app",
      demoLabel: "Live at suwadaru.vercel.app",
      github: "https://github.com/Y-Udayanga/Suwadaru",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: Suwadaru healthcare platform]",
    badge: "Team Web Platform"
  },
  {
    id: "crisiscopilot",
    isCaseStudy: true,
    rank: 5,
    title: "Crisis Copilot",
    subtitle: "Multimodal AI Emergency Response & Automated Triage Platform",
    type: "group",
    teamSize: 4,
    role: "Full-Stack & Gemini AI Integration Engineer (Team HalfByte)",
    year: "2026",
    period: "2026",
    category: "Crisis Coordination & Emergency AI",
    techStack: [
      "Google Gemini API",
      "TypeScript",
      "React",
      "PostgreSQL",
      "Tailwind CSS",
      "Vercel"
    ],
    summary: "Multimodal AI emergency response system securing 3rd Place in the Gemini Track (120 teams) at Buildathon 2026, delivering instant visual scene triage, 50+ language translation, and zero-minute first aid guidance.",
    problem: "Emergency dispatch centers face extreme chaos during disasters with delayed caller explanations, linguistic barriers, and dispatch latency that cost critical lives.",
    whatIBuilt: "Built Crisis Copilot in a 24-hour sprint with Team HalfByte: one-tap 'Panic Snap' photo/audio capture, Google Gemini multimodal visual scene triage, real-time 50+ language translation, and automated Level 4/5 unit dispatch.",
    achievements: [
      "Awarded 🥉 3rd Place in the Google Gemini Track and 16th Overall out of 120 competitive teams at Buildathon 2026 (Cursor & TechTalk360).",
      "Integrated Google Gemini Multimodal Vision API to assess visual threat levels at emergency scenes in real-time, triaging high-priority incidents for dispatchers.",
      "Engineered automated Zero-Minute First Aid recommendations delivering instant safety workflows to victims while emergency responders are en route.",
      "Implemented real-time live translation supporting 50+ languages to eliminate critical communication barriers for emergency callers."
    ],
    bullets: [
      "Won 🥉 3rd Place (Gemini Track) & 16th Overall out of 120 teams at Buildathon 2026 with Crisis Copilot.",
      "Integrated Google Gemini Multimodal API for real-time visual threat assessment, automated triage, and 50+ language translation.",
      "Engineered Zero-Minute First Aid protocols and automated Level 4/5 emergency service dispatch workflows."
    ],
    links: {
      demo: "https://crisiscopilot.vercel.app",
      demoLabel: "Live at crisiscopilot.vercel.app",
      github: "https://github.com/Y-Udayanga/CrisisCopilot",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: CrisisCopilot incident dashboard]",
    badge: "🥉 3rd Place Gemini Track (120 Teams)"
  },
  {
    id: "pharmacy-stock",
    isCaseStudy: false,
    title: "PharmaCare Stock System",
    subtitle: "Enterprise Pharmacy Inventory & Stock Management",
    type: "group",
    teamSize: 4,
    role: "Full-Stack Contributor (36 Commits)",
    year: "2025",
    period: "2025",
    category: "Enterprise Systems & Inventory",
    techStack: [
      "Java",
      "JavaScript",
      "HTML5",
      "CSS3",
      "MySQL"
    ],
    summary: "Enterprise pharmaceutical inventory system managing medication batches, expiry alerts, supplier orders, and real-time stock levels.",
    achievements: [
      "Contributed 36 commits to full-stack Java and JavaScript stock management system, ranking #2 project contributor.",
      "Engineered inventory tracking modules with automated low-stock warnings and batch expiration notifications.",
      "Architected MySQL relational schemas maintaining transactional consistency for high-volume medicine supplies."
    ],
    bullets: [
      "Contributed 36 commits to full-stack Java/JavaScript pharmacy inventory system in a 4-person team.",
      "Implemented real-time stock level monitoring, batch expiry alerts, and supplier re-order pipelines.",
      "Architected normalized MySQL database schemas ensuring transactional integrity across high-volume sales."
    ],
    links: {
      demo: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
      demoLabel: "View Repository",
      github: "https://github.com/Thiva123-ab/Pharmacy-stock-system",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: PharmaCare inventory dashboard]",
    badge: "Enterprise Java"
  },
  {
    id: "dea-spring-boot",
    isCaseStudy: false,
    title: "DEA Enterprise Spring Boot Project",
    subtitle: "Distributed Enterprise Architecture & RESTful Backend",
    type: "group",
    teamSize: 2,
    role: "Backend Architect & Co-Developer (11 Commits)",
    year: "2025",
    period: "2025",
    category: "Enterprise Backend & Architecture",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Data JPA",
      "Hibernate",
      "MySQL",
      "REST APIs"
    ],
    summary: "Enterprise-grade distributed architecture backend implementing modular microservice design, JPA entity lifecycle management, and relational transaction safety.",
    achievements: [
      "Engineered decoupled service layers and repository abstractions with Spring Boot and Spring Data JPA.",
      "Designed and optimized MySQL relational database schemas with foreign key constraints and transactional integrity.",
      "Built and documented RESTful API endpoints validated through comprehensive Postman integration suites."
    ],
    bullets: [
      "Architected enterprise distributed backend in a 2-person engineering team using Spring Boot and Hibernate.",
      "Structured normalized MySQL data models and JPA repositories ensuring complete ACID compliance.",
      "Developed robust REST API endpoints with status code handling and error interceptors."
    ],
    links: {
      demo: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
      demoLabel: "View Repository",
      github: "https://github.com/Thiva123-ab/DEA-Spring-Boot-Project",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: DEA Spring Boot backend API architecture]",
    badge: "Spring Boot Enterprise"
  },
  {
    id: "hack-to-night",
    isCaseStudy: false,
    title: "Hack-To-Night Platform",
    subtitle: "Hackathon Event Management & Live Submission Platform",
    type: "group",
    teamSize: 4,
    role: "Full-Stack Engineer (Team HalfByte)",
    year: "2026",
    period: "2026",
    category: "Interactive Web & Event Tech",
    techStack: [
      "TypeScript",
      "React",
      "Docker",
      "Tailwind CSS",
      "Vercel"
    ],
    summary: "Collaborative event platform engineered in a 12-hour intensive sprint by Team HalfByte, securing 6th Place among Top 10 teams at HackToNight 3.0.",
    achievements: [
      "Secured 🏆 6th Place (Top 10 Finalist) at HackToNight 3.0, an intensive 12-hour hackathon organized by the NSBM FOSS Community.",
      "Engineered high-velocity event registration, team matchmaking, and live submission judging pipelines under tight deadlines.",
      "Integrated modern responsive UI with Tailwind CSS and deployed live to production on Vercel with automated CI/CD.",
      "Containerized platform services with Docker ensuring consistent multi-developer execution environments."
    ],
    bullets: [
      "Won 🏆 6th Place (Top 10 Finalist) at HackToNight 3.0 intensive 12-hour hackathon by NSBM FOSS Community.",
      "Engineered team matchmaking and project submission modules for hackathon participants under strict time constraints.",
      "Deployed responsive web application to production on Vercel with automated CI/CD checks."
    ],
    links: {
      demo: "https://hack-to-night.vercel.app",
      demoLabel: "Live at hack-to-night.vercel.app",
      github: "https://github.com/mchithna/hack-to-night",
      githubLabel: "GitHub Repo"
    },
    image: "/certificates/hacktonight-3-top10.jpg",
    badge: "🏆 6th Place (Top 10) - HackToNight 3.0"
  },
  {
    id: "debugliya",
    isCaseStudy: false,
    title: "Debugliya Community Platform",
    subtitle: "Developer Collaboration & Tech Knowledge Hub",
    type: "group",
    teamSize: 4,
    role: "Frontend Contributor",
    year: "2026",
    period: "2026",
    category: "Community & Developer Ecosystem",
    techStack: [
      "TypeScript",
      "CSS3",
      "HTML5",
      "Vercel"
    ],
    summary: "Tech community knowledge hub and engineering discussion board deployed live to foster developer collaboration.",
    achievements: [
      "Developed accessible community hub interface with fast loading metrics and responsive layouts.",
      "Deployed to production on Vercel with high uptime and optimized asset bundling.",
      "Maintained Git collaboration standards in a multi-developer team."
    ],
    bullets: [
      "Built responsive community knowledge hub interfaces using TypeScript and modern CSS.",
      "Configured automated Vercel deployment pipeline for real-time production updates."
    ],
    links: {
      demo: "https://debugliya.vercel.app",
      demoLabel: "Live at debugliya.vercel.app",
      github: "https://github.com/Y-Udayanga/Debugliya",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: Debugliya platform]",
    badge: "Community Web"
  },
  {
    id: "vendorflow",
    isCaseStudy: false,
    title: "VendorFlow Commerce",
    subtitle: "Cross-Platform Mobile Inventory & Merchant Commerce",
    type: "individual",
    role: "Mobile Software Engineer",
    year: "2026",
    period: "2026",
    category: "Mobile & Retail Systems",
    techStack: [
      "Flutter",
      "Dart",
      "Java",
      "C++",
      "SQLite"
    ],
    summary: "Cross-platform mobile application enabling micro-vendors and retailers to manage real-time inventory, generate digital invoices, and record daily transactions.",
    achievements: [
      "Architected responsive cross-platform mobile views using Flutter and Dart for high-speed offline operations.",
      "Integrated local SQLite persistent storage for offline product catalogs and transaction logs.",
      "Engineered native bridge interfaces with Java and C++ for hardware receipt printing and barcode scanning."
    ],
    bullets: [
      "Developed offline-capable mobile commerce application using Flutter and Dart.",
      "Implemented SQLite local storage for instant catalog indexing and offline order logging.",
      "Designed clean modular state management architecture for rapid mobile checkout."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/VendorFlow",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/VendorFlow",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: VendorFlow checkout UI]",
    badge: "Mobile Commerce"
  },
  {
    id: "cricket-app",
    isCaseStudy: false,
    title: "Cricket-App Engine",
    subtitle: "High-Performance C++ Cricket Scoring & Tournament Engine",
    type: "individual",
    role: "Systems & Algorithm Developer",
    year: "2025",
    period: "2025",
    category: "Algorithms & Systems Engineering",
    techStack: [
      "C++",
      "OOP",
      "Data Structures",
      "Algorithms",
      "File I/O"
    ],
    summary: "Object-oriented software engine for cricket match simulation, detailed statistical analysis, and tournament bracket tracking.",
    achievements: [
      "Engineered comprehensive object-oriented system modeling players, innings, dismissals, and strike rates.",
      "Implemented efficient custom algorithms for run-rate calculation, player ranking, and tournament standings.",
      "Designed robust file persistence mechanisms for match history and player career data."
    ],
    bullets: [
      "Developed object-oriented C++ software engine for real-time match scoring and tournament bracket tracking.",
      "Implemented algorithmic statistics computing run rates, Duckworth-Lewis projections, and player rankings.",
      "Built persistent file-storage layer for career match logs and performance records."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/Cricket-App",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/Cricket-App",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: Cricket-App console interface]",
    badge: "C++ Systems"
  },
  {
    id: "crud-app",
    isCaseStudy: false,
    title: "CRUD Mobile Architect",
    subtitle: "Cross-Platform State & Persistent Storage Engine",
    type: "individual",
    role: "Mobile Developer",
    year: "2026",
    period: "2026",
    category: "Mobile Architecture & Data Persistence",
    techStack: [
      "Flutter",
      "Dart",
      "C++",
      "CMake",
      "SQLite"
    ],
    summary: "Mobile data management platform showcasing reactive state architectures, structured SQLite schema migrations, and clean UI components.",
    achievements: [
      "Engineered reactive data binding between Dart UI widgets and local SQLite storage engines.",
      "Implemented schema migration utilities and parameterized queries preventing data corruption.",
      "Configured multi-platform build scripts using CMake and C++ native integrations."
    ],
    bullets: [
      "Implemented reactive cross-platform CRUD mobile engine with Flutter and Dart.",
      "Integrated SQLite database layer with migration scripts and parameterized transactions.",
      "Configured cross-platform native builds across Android, Windows, and Linux."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/crud_app",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/crud_app",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: CRUD app UI]",
    badge: "Mobile Architecture"
  },
  {
    id: "beacon-app",
    isCaseStudy: false,
    title: "Beacon Proximity System",
    subtitle: "BLE Proximity Detection & Spatial Hardware Telemetry",
    type: "group",
    teamSize: 2,
    role: "Mobile & Hardware Integration Engineer",
    year: "2026",
    period: "2026",
    category: "IoT & Mobile Hardware",
    techStack: [
      "Kotlin",
      "TypeScript",
      "BLE",
      "Android SDK",
      "Proximity Sensors"
    ],
    summary: "Bluetooth Low Energy proximity scanning mobile app that detects and interacts with BLE beacons for spatial triggering and telemetry.",
    achievements: [
      "Built background BLE scanning service in Kotlin with minimal battery consumption and fast beacon discovery.",
      "Integrated RSSI signal filtering and distance estimation algorithms for contextual indoor location triggers.",
      "Collaborated on companion TypeScript interfaces for remote beacon configuration and telemetry logging."
    ],
    bullets: [
      "Developed background Bluetooth Low Energy (BLE) scanning service in Kotlin with battery-efficient intervals.",
      "Implemented RSSI filtering algorithms for accurate proximity estimation and notification triggers.",
      "Collaborated on TypeScript telemetry dashboard for fleet beacon monitoring."
    ],
    links: {
      demo: "https://github.com/theekshanathushan/Beacon_App",
      demoLabel: "View Repository",
      github: "https://github.com/theekshanathushan/Beacon_App",
      githubLabel: "GitHub Repo"
    },
    image: "[screenshot needed: Beacon proximity scanner]",
    badge: "BLE & Mobile IoT"
  }
];

// Hackathon participation records and competition achievements
export const HACKATHONS_DATA: HackathonData[] = [
  {
    id: "buildathon-2026",
    name: "Buildathon 2026 (24-Hour Competitive Sprint)",
    organizer: "Cursor & TechTalk360",
    date: "2026",
    location: "Colombo, Sri Lanka",
    format: "24-Hour In-Person Sprint",
    track: "Google Gemini Multimodal AI Track",
    teamName: "Team HalfByte",
    teamSize: 4,
    myRole: "Full-Stack & Gemini AI Integration Engineer",
    projectName: "Crisis Copilot",
    projectId: "crisiscopilot",
    summary: "Competed against 120 teams to architect Crisis Copilot, an emergency co-pilot integrating Google Gemini API for real-time visual scene triage, 50+ language translation, and automated Level 4/5 dispatch.",
    techStack: ["Google Gemini API", "TypeScript", "React", "PostgreSQL", "Tailwind CSS", "Vercel"],
    result: "🥉 3rd Place (Gemini Track) & 16th Overall (120 Teams)",
    links: {
      github: "https://github.com/Y-Udayanga/CrisisCopilot",
      demo: "https://crisiscopilot.vercel.app"
    }
  },
  {
    id: "hacktonight-3",
    name: "HackToNight 3.0",
    organizer: "NSBM FOSS Community & Faculty of Computing",
    date: "June 19, 2026",
    location: "NSBM Green University",
    format: "12-Hour Intensive Hackathon (In-Person)",
    track: "Open Innovation & FOSS Engineering",
    teamName: "Team HalfByte",
    teamSize: 4,
    myRole: "Full-Stack Engineer (Team HalfByte)",
    projectName: "Hack-To-Night Platform",
    projectId: "hack-to-night",
    summary: "Engineered high-velocity event coordination and submission system under intensive 12-hour constraints, securing 6th Place and ranking among the Top 10 teams out of all competitors.",
    techStack: ["TypeScript", "React", "Docker", "Tailwind CSS", "Vercel"],
    result: "🏆 6th Place (Top 10 Finalist)",
    links: {
      github: "https://github.com/mchithna/hack-to-night",
      demo: "https://hack-to-night.vercel.app",
      certificate: "/certificates/hacktonight-3-top10.jpg"
    }
  },
  {
    id: "nasa-space-apps-2026",
    name: "NASA International Space Apps Challenge",
    organizer: "NASA",
    date: "2026",
    location: "Global Virtual / Regional",
    format: "48-Hour Global Hackathon",
    track: "Space Exploration & Celestial Telemetry",
    teamName: "NovaSquad",
    teamSize: 5,
    myRole: "Frontend UI Architect & Telemetry Lead",
    projectName: "NovaExplorer",
    projectId: "novaexplorer",
    summary: "Visualized deep-space missions, interplanetary trajectories, and Mars rover telemetry querying NASA Open APIs in an interactive React application.",
    techStack: ["React", "TypeScript", "NASA Open APIs", "Tailwind CSS", "Vite"],
    result: "Global Participant & Regional Finalist",
    links: {
      github: "https://github.com/mchithna/NASASpaceApps",
      demo: "https://novaexplorer.vercel.app"
    }
  },
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
    id: "cert-skillshare-devforge",
    title: "Modern Full Stack Development Workshop – SkillShare DevForge",
    issuer: "IEEE Student Branch of NSBM Green University",
    issueDate: "June 04, 2026",
    expiryDate: "No Expiration",
    credentialId: "f1qp86Bqczmx+ssT4oEFJc4ySre4tUyjlJBpeVfVvw=",
    credentialUrl: "#",
    skills: ["Full-Stack Development", "AI-Assisted Development", "DevOps & CI/CD", "Industry Engineering Workflows"],
    category: "Development",
    image: "/certificates/skillshare-devforge.jpg"
  },
  {
    id: "cert-aws-beginner",
    title: "AWS For Beginners with Hands-On Labs",
    issuer: "KodeKloud",
    issueDate: "2026",
    expiryDate: "No Expiration",
    credentialId: "KK-AWS-BEGINNER",
    credentialUrl: "https://kodekloud.com",
    skills: ["AWS Core Services", "Cloud Computing", "EC2 & S3", "IAM & Cloud Security", "Hands-On Labs"],
    category: "Cloud",
    image: ""
  },
  {
    id: "cert-python-uom",
    title: "Python Programming Course",
    issuer: "University of Moratuwa (Open Learning Platform)",
    issueDate: "2026",
    expiryDate: "No Expiration",
    credentialId: "UOM-CODL-PYTHON",
    credentialUrl: "https://open.uom.lk",
    skills: ["Python Programming", "OOP in Python", "Data Structures", "Algorithmic Problem Solving"],
    category: "Development",
    image: ""
  },
  {
    id: "cert-hacktonight-achievement",
    title: "Certificate of Achievement – Top 10 (6th Place) at HackToNight 3.0",
    issuer: "NSBM FOSS Community & Faculty of Computing",
    issueDate: "June 19, 2026",
    expiryDate: "No Expiration",
    credentialId: "FOSS-HTN3-TOP10",
    credentialUrl: "#",
    skills: ["Rapid Prototyping", "Full-Stack Development", "Competitive Team Programming", "System Architecture"],
    category: "Development",
    image: "/certificates/hacktonight-3-top10.jpg"
  },
  {
    id: "cert-ieee-day-volunteer",
    title: "Certificate of Appreciation – Volunteer at IEEE Day 2026",
    issuer: "IEEE Student Branch of NSBM Green University",
    issueDate: "October 14, 2026",
    expiryDate: "No Expiration",
    credentialId: "IEEE-DAY-2026-VOLUNTEER",
    credentialUrl: "#",
    skills: ["Event Coordination", "Technical Community Leadership", "Teamwork & Communication", "Tech for Humanity"],
    category: "Other",
    image: "/certificates/ieee-day-2026.jpg"
  },
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
