import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape PDF string literal
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Approximate text width calculation for Helvetica (proportional widths)
function getTextWidth(text, fontSize, isBold = false) {
  const avgCharWidth = isBold ? 0.56 : 0.52;
  return text.length * fontSize * avgCharWidth;
}

// Word wrap helper
function wrapText(text, maxChars = 110) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export function generateCVpdf() {
  const pageWidth = 595.28;  // A4 width in pt
  const pageHeight = 841.89; // A4 height in pt
  const left = 38;
  const right = 557;
  const contentWidth = right - left;

  let y = 808; // Start near top margin
  const ops = [];

  // Helper primitives
  function drawLine(x1, y1, x2, y2, gray = 0.8, lineWidth = 0.5) {
    ops.push(`${lineWidth} w ${gray} ${gray} ${gray} RG ${x1} ${y1} m ${x2} ${y2} l S 0 0 0 RG`);
  }

  function addText(text, x, curY, font = '/F1', size = 9, r = 0.1, g = 0.1, b = 0.1) {
    ops.push(`BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x} ${curY} Tm (${esc(text)}) Tj ET`);
  }

  function addSectionHeader(title) {
    y -= 14;
    addText(title, left, y, '/F2', 9.5, 0.05, 0.1, 0.2);
    y -= 3;
    drawLine(left, y, right, y, 0.75, 0.75);
    y -= 10;
  }

  // --- 1. HEADER (Single Column, Clean ATS Structure, No Phone/Address/DOB) ---
  addText('THEEKSHANA THUSHAN', left, y, '/F2', 17, 0, 0, 0);
  y -= 13;
  addText('Software Engineering Undergraduate | Full-Stack & AI Systems', left, y, '/F1', 9.5, 0.25, 0.3, 0.4);
  y -= 11;
  
  // Contact row (Links only)
  const contactText = 'theekshanathushan89@gmail.com   |   linkedin.com/in/theekshana-thushan-57b866328   |   github.com/theekshanathushan   |   theekshanathushan.dev';
  addText(contactText, left, y, '/F1', 8, 0.2, 0.35, 0.55);
  y -= 4;
  drawLine(left, y, right, y, 0.82, 0.5);
  y -= 2;

  // --- 2. PROFESSIONAL PROFILE (3 Sharp, Outcome-Focused Sentences) ---
  addSectionHeader('PROFESSIONAL PROFILE');
  const profileSentences = [
    "Software engineering undergraduate specializing in AI-integrated full-stack web platforms engineered with ASP.NET Core, Angular, Spring Boot, React, and MySQL.",
    "Architected and deployed production-ready applications featuring automated Gemini AI screening pipelines, stateless JWT authorization, and real-time WebSocket communication.",
    "Delivers reliable software with clean layered architecture and test-driven workflows, targeting high-impact software engineering internship and graduate roles."
  ];

  profileSentences.forEach((sentence) => {
    const lines = wrapText(sentence, 112);
    lines.forEach((line) => {
      addText(line, left, y, '/F1', 8.2, 0.15, 0.15, 0.15);
      y -= 10;
    });
  });

  // --- 3. TECHNICAL SKILLS (Categorized Single-Column) ---
  addSectionHeader('TECHNICAL SKILLS');
  const skillsData = [
    { label: 'Languages', value: 'Java (17/21), TypeScript, JavaScript (ES6+), C#, Dart, HTML5, CSS3' },
    { label: 'Backend & Systems', value: 'Spring Boot, ASP.NET Core, Entity Framework Core, JWT Authentication, RESTful APIs, WebSockets' },
    { label: 'Frontend & Mobile', value: 'Angular, React, Flutter, Tailwind CSS, Recharts, Framer Motion' },
    { label: 'Databases & Tools', value: 'MySQL (Relational Schema Design), Git, GitHub, Vercel, Vite, Linux CLI' },
    { label: 'AI & Integrations', value: 'Google Gemini API, Twilio SMS API, MailKit, Leaflet.js, NASA Open APIs' }
  ];

  skillsData.forEach((s) => {
    addText(s.label + ':', left, y, '/F2', 8.2, 0.1, 0.1, 0.1);
    addText(s.value, left + 105, y, '/F1', 8.2, 0.2, 0.2, 0.2);
    y -= 10.5;
  });

  // --- 4. KEY PROJECTS ---
  addSectionHeader('KEY PROJECTS');

  const projects = [
    {
      title: 'TalentAI - AI-Powered Recruitment & Screening Platform',
      period: '2026',
      tech: 'ASP.NET Core, Angular, TypeScript, MySQL, Entity Framework Core, JWT, Gemini API, Twilio, MailKit',
      bullets: [
        'Architected multi-role portals for Candidates, Recruiters, Hiring Managers, and Admins with stateless JWT authorization guards.',
        'Integrated Google Gemini AI for automated candidate screening and qualification matching against job requisitions.',
        'Engineered background notification worker utilizing MailKit and Twilio to dispatch automated SMS and email interview reminders.'
      ]
    },
    {
      title: 'AgriAI - Smart Agriculture & Native-Language Farming Agent',
      period: '2026',
      tech: 'Flutter, Dart, Gemini API, Mobile AI Vision, REST APIs, Weather APIs',
      bullets: [
        'Developed mobile plant leaf scanner utilizing vision models to provide instant crop disease identification and treatment guidance.',
        'Built interactive conversational advisory agent supporting natural language queries in native languages (Sinhala & English).',
        'Integrated real-time crop market pricing feeds and localized weather forecast alerts to optimize harvest planning.'
      ]
    },
    {
      title: 'NovaExplorer - NASA Educational Spacecraft & Mission Explorer',
      period: '2026',
      tech: 'React, TypeScript, Tailwind CSS, Vite, NASA Open APIs, Vercel (Live at novaexplorer.vercel.app)',
      bullets: [
        'Deployed to production at novaexplorer.vercel.app with optimized client caching and high Lighthouse performance ratings.',
        'Integrated NASA Open APIs to fetch and curate real-time mission telemetry, Mars rover photography, and astronomical archives.',
        'Engineered responsive interactive timelines and orbital mission visualization modules for seamless cross-device exploration.'
      ]
    },
    {
      title: 'CareConnect - Disaster Relief Support & Crisis Coordination System',
      period: '2026',
      tech: 'Java 17, Spring Boot, MySQL, WebSockets, JavaScript, Leaflet.js',
      bullets: [
        'Developed full-stack crisis coordination platform linking relief volunteers, displaced individuals, and supply donors.',
        'Integrated Leaflet.js to create a live geographic operations map tracking help requests and relief inventory distribution.',
        'Implemented real-time WebSocket chat and a centralized resource allocation dashboard with role-based access.'
      ]
    }
  ];

  projects.forEach((proj, pIdx) => {
    // Project title & period
    addText(proj.title, left, y, '/F2', 8.7, 0.05, 0.1, 0.2);
    addText(proj.period, right - 25, y, '/F2', 8.2, 0.35, 0.4, 0.45);
    y -= 10;

    // Tech line
    addText('Tech Stack: ' + proj.tech, left, y, '/F3', 7.5, 0.3, 0.35, 0.45);
    y -= 9.5;

    // Bullets
    proj.bullets.forEach((bullet) => {
      addText('*', left + 3, y, '/F2', 7.5, 0.2, 0.4, 0.7);
      const lines = wrapText(bullet, 110);
      lines.forEach((l, lIdx) => {
        addText(l, left + 12, y, '/F1', 7.8, 0.2, 0.2, 0.2);
        y -= 9;
      });
    });

    if (pIdx < projects.length - 1) {
      y -= 2.5; // subtle gap between projects
    }
  });

  // --- 5. EDUCATION ---
  addSectionHeader('EDUCATION');

  // Degree
  addText('BSc (Hons) in Software Engineering', left, y, '/F2', 8.8, 0.05, 0.1, 0.2);
  addText('2023 - Present', right - 55, y, '/F2', 8.2, 0.35, 0.4, 0.45);
  y -= 9.5;
  addText('Plymouth University (via NSBM Green University)', left, y, '/F1', 8.2, 0.25, 0.3, 0.35);
  y -= 9;
  addText('Relevant Coursework: Data Structures & Algorithms, Object-Oriented Development (Java/C#), Database Systems (MySQL), Software Engineering Principles', left, y, '/F3', 7.5, 0.35, 0.35, 0.4);
  y -= 10;

  // A/Levels
  addText('G.C.E. Advanced Level - Physical Science Stream', left, y, '/F2', 8.5, 0.05, 0.1, 0.2);
  addText('2022', right - 22, y, '/F2', 8.2, 0.35, 0.4, 0.45);
  y -= 9;
  addText('Subjects: Combined Mathematics, Physics, and Information & Communication Technology (ICT)', left, y, '/F1', 8, 0.3, 0.3, 0.3);

  // Assemble valid PDF 1.4 objects
  const streamContent = ops.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const objects = [];
  function addObj(str) {
    objects.push(str);
    return objects.length;
  }

  // 1: Catalog
  addObj('<< /Type /Catalog /Pages 2 0 R >>');
  // 2: Pages
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  // 3: Page (A4)
  addObj(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>`);
  // 4: Content stream
  addObj(`<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`);
  // 5: Font F1 (Helvetica Regular)
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  // 6: Font F2 (Helvetica Bold)
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  // 7: Font F3 (Helvetica Oblique)
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>');

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((obj, idx) => {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${idx + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  for (let i = 1; i <= objects.length; i++) {
    pdf += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  const outputPath = path.resolve(__dirname, '../public/Theekshana_Thushan_CV.pdf');
  fs.writeFileSync(outputPath, pdf, 'utf8');
  console.log(`Searchable ATS-friendly PDF created successfully at: ${outputPath} (${pdf.length} bytes, Final Y: ${y.toFixed(1)})`);
}

generateCVpdf();
