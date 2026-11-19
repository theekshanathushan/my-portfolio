import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { content } from '../src/data/content.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape PDF string literal
function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
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
    y -= 12;
    addText(title, left, y, '/F2', 9, 0.05, 0.1, 0.2);
    y -= 3;
    drawLine(left, y, right, y, 0.75, 0.75);
    y -= 8.5;
  }

  // --- 1. HEADER (Single Column, Clean ATS Structure) ---
  addText(content.personal.name.toUpperCase(), left, y, '/F2', 15.5, 0, 0, 0);
  y -= 13;
  addText(content.personal.tagline, left, y, '/F1', 9, 0.25, 0.3, 0.4);
  y -= 11;
  
  // Contact row (Clean text links for ATS parsers)
  const email = content.personal.email;
  const linkedin = content.personal.linkedinUrl.replace('https://www.', '').replace('https://', '');
  const github = content.personal.githubUrl.replace('https://', '');
  const portfolio = content.personal.portfolioUrl.replace('https://', '');
  const contactText = `${email}   |   ${linkedin}   |   ${github}   |   ${portfolio}`;
  addText(contactText, left, y, '/F1', 8, 0.2, 0.35, 0.55);
  y -= 4;
  drawLine(left, y, right, y, 0.82, 0.5);
  y -= 2;

  // --- 2. PROFESSIONAL SUMMARY (3 Sharp Action Sentences) ---
  addSectionHeader('PROFESSIONAL SUMMARY');
  content.profile.sentences.forEach((sentence) => {
    const lines = wrapText(sentence, 114);
    lines.forEach((line) => {
      addText(line, left, y, '/F1', 7.9, 0.15, 0.15, 0.15);
      y -= 9.2;
    });
  });

  // --- 3. TECHNICAL SKILLS (Categorized, Wrapped, Keyword-Dense) ---
  addSectionHeader('TECHNICAL SKILLS');
  content.skills.forEach((s) => {
    const catLabel = s.category + ':';
    addText(catLabel, left, y, '/F2', 7.9, 0.1, 0.1, 0.1);
    
    // Indent skills list past longest category label
    const startX = left + 108;
    const maxChars = 94;
    const skillLines = wrapText(s.skills.join(', '), maxChars);
    skillLines.forEach((line, lineIdx) => {
      if (lineIdx === 0) {
        addText(line, startX, y, '/F1', 7.9, 0.2, 0.2, 0.2);
      } else {
        y -= 9;
        addText(line, startX, y, '/F1', 7.9, 0.2, 0.2, 0.2);
      }
    });
    y -= 9.2;
  });

  // --- 4. KEY PROJECTS (Flagship Projects with Quantified Impact) ---
  addSectionHeader('KEY PROJECTS');
  // Flagship projects selected for maximum ATS coverage across stack:
  const projectsToInclude = [
    content.projects.find(p => p.id === 'talentai'),
    content.projects.find(p => p.id === 'careconnect'),
    content.projects.find(p => p.id === 'novaexplorer'),
    content.projects.find(p => p.id === 'agriai')
  ].filter(Boolean);

  projectsToInclude.forEach((proj, pIdx) => {
    // Project title & year
    addText(`${proj.title} — ${proj.subtitle}`, left, y, '/F2', 8.4, 0.05, 0.1, 0.2);
    addText(proj.year || proj.period, right - 25, y, '/F2', 8, 0.35, 0.4, 0.45);
    y -= 9;

    // Tech line
    addText('Tech Stack: ' + proj.techStack.join(', '), left, y, '/F3', 7.4, 0.3, 0.35, 0.45);
    y -= 8.5;

    // Bullets (action verb + metrics)
    const bulletsToRender = proj.bullets || proj.achievements;
    bulletsToRender.slice(0, 2).forEach((bullet) => {
      addText('*', left + 3, y, '/F2', 7.5, 0.2, 0.4, 0.7);
      const lines = wrapText(bullet.replace(/\[.*?\]/g, '').trim(), 110);
      lines.forEach((l) => {
        addText(l, left + 12, y, '/F1', 7.5, 0.2, 0.2, 0.2);
        y -= 8.4;
      });
    });

    if (pIdx < projectsToInclude.length - 1) {
      y -= 2;
    }
  });

  // --- 5. HACKATHONS & COMPETITIONS ---
  if (content.hackathons && content.hackathons.length > 0) {
    addSectionHeader('HACKATHONS & COMPETITIONS');
    const topHacks = content.hackathons.slice(0, 2);
    topHacks.forEach((hack) => {
      addText(`${hack.name} — ${hack.result}`, left, y, '/F2', 8.2, 0.05, 0.1, 0.2);
      addText(hack.date, right - 35, y, '/F2', 7.8, 0.35, 0.4, 0.45);
      y -= 8.6;
      addText(`Organizer: ${hack.organizer}   |   Role: ${hack.myRole} (${hack.teamName})`, left, y, '/F3', 7.3, 0.3, 0.35, 0.45);
      y -= 8.4;
      const hackSummary = wrapText(hack.summary, 110)[0];
      if (hackSummary) {
        addText(hackSummary, left + 6, y, '/F1', 7.3, 0.22, 0.22, 0.22);
        y -= 8.4;
      }
    });
  }

  // --- 6. CERTIFICATIONS & CREDENTIALS ---
  if (content.certifications && content.certifications.length > 0) {
    addSectionHeader('CERTIFICATIONS & CREDENTIALS');
    // Top 5 industry credentials
    const certsToInclude = [
      content.certifications.find(c => c.id === 'cert-skillshare-devforge'),
      content.certifications.find(c => c.id === 'cert-aws-beginner'),
      content.certifications.find(c => c.id === 'cert-python-uom'),
      content.certifications.find(c => c.id === 'cert-meta-frontend'),
      content.certifications.find(c => c.id === 'cert-postman-api')
    ].filter(Boolean);

    certsToInclude.forEach((cert) => {
      addText(`${cert.title} — ${cert.issuer}`, left, y, '/F2', 7.8, 0.05, 0.1, 0.2);
      addText(cert.issueDate, right - 35, y, '/F2', 7.5, 0.35, 0.4, 0.45);
      y -= 8.0;
      addText(`Skills: ${cert.skills.join(', ')}`, left + 8, y, '/F1', 7.2, 0.3, 0.3, 0.3);
      y -= 8.2;
    });
  }

  // --- 7. EDUCATION ---
  addSectionHeader('EDUCATION');
  content.education.forEach((edu) => {
    addText(edu.degree, left, y, '/F2', 8.4, 0.05, 0.1, 0.2);
    addText(edu.period, right - 55, y, '/F2', 8, 0.35, 0.4, 0.45);
    y -= 8.8;
    addText(edu.institution, left, y, '/F1', 7.8, 0.25, 0.3, 0.35);
    y -= 8.2;
    if (edu.keyModules) {
      const courseLines = wrapText('Relevant Coursework: ' + edu.keyModules.join(', '), 110);
      courseLines.forEach((cl) => {
        addText(cl, left, y, '/F3', 7.3, 0.35, 0.35, 0.4);
        y -= 8.2;
      });
    }
  });

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
