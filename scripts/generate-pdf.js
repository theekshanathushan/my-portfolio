import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { content } from '../src/data/content.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to escape PDF string literal
function esc(str) {
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[^\x20-\x7E]/g, '?'); // strip non-ASCII safely
}

// Word wrap helper
function wrapText(text, maxChars = 90) {
  const words = String(text).split(' ');
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
  // ── Page dimensions (A4) ────────────────────────────────────────────────────
  const PW = 595.28;   // page width  pt
  const PH = 841.89;   // page height pt

  // ── Layout constants ────────────────────────────────────────────────────────
  const SIDEBAR_W   = 178;        // left sidebar width
  const SIDE_X      = 14;         // sidebar inner left margin
  const SIDE_RX     = SIDEBAR_W - 10; // sidebar inner right edge
  const MAIN_X      = SIDEBAR_W + 18; // main column left
  const MAIN_RX     = PW - 16;   // main column right edge
  const MAIN_MW     = MAIN_RX - MAIN_X; // main column width

  // ── Sidebar accent color (dark navy) ────────────────────────────────────────
  const SB_R = 0.08, SB_G = 0.12, SB_B = 0.22;   // #141E38
  // ── Accent teal (section headers on sidebar) ───────────────────────────────
  const AC_R = 0.07, AC_G = 0.65, AC_B = 0.68;   // #12A6AD
  // ── Main area header underline color ──────────────────────────────────────
  const UL_R = 0.07, UL_G = 0.65, UL_B = 0.68;

  const ops = [];

  // ── Primitives ──────────────────────────────────────────────────────────────
  function rect(x, y, w, h, r, g, b) {
    ops.push(`${r} ${g} ${b} rg ${x} ${y} ${w} ${h} re f 0 0 0 rg`);
  }
  function line(x1, y1, x2, y2, r = 0.8, g = 0.8, b = 0.8, lw = 0.4) {
    ops.push(`${lw} w ${r} ${g} ${b} RG ${x1} ${y1} m ${x2} ${y2} l S 0 0 0 RG`);
  }
  function text(str, x, y, font = '/F1', size = 8, r = 0, g = 0, b = 0) {
    if (!str) return;
    ops.push(`BT ${font} ${size} Tf ${r} ${g} ${b} rg 1 0 0 1 ${x} ${y} Tm (${esc(str)}) Tj ET`);
  }

  // ── Draw sidebar background ─────────────────────────────────────────────────
  rect(0, 0, SIDEBAR_W, PH, SB_R, SB_G, SB_B);

  // ── HEADER BLOCK (top strip across full width) ──────────────────────────────
  const HDR_H = 95;
  rect(0, PH - HDR_H, PW, HDR_H, 0.09, 0.14, 0.26);  // slightly lighter than sidebar

  // Name
  text(content.personal.name.toUpperCase(), SIDE_X + 2, PH - 32, '/F2', 17, 1, 1, 1);
  // Tagline
  const taglineParts = content.personal.tagline.split(' | ');
  text(taglineParts[0], SIDE_X + 2, PH - 46, '/F3', 8.2, AC_R, AC_G, AC_B);
  if (taglineParts[1]) {
    text(taglineParts[1], SIDE_X + 2, PH - 56.5, '/F3', 8.2, 0.75, 0.82, 0.90);
  }

  // Contact icons area (right side of header)
  const cx = MAIN_X + 10;
  let cy = PH - 28;
  const contItems = [
    content.personal.email,
    content.personal.linkedinUrl.replace('https://www.linkedin.com/in/', 'linkedin.com/in/'),
    content.personal.githubUrl.replace('https://github.com/', 'github.com/'),
    content.personal.portfolioUrl.replace('https://', ''),
  ];
  contItems.forEach(item => {
    text(item, cx, cy, '/F1', 7.5, 0.80, 0.88, 0.95);
    cy -= 11;
  });

  // ── SIDEBAR CONTENT ─────────────────────────────────────────────────────────
  let sy = PH - HDR_H - 18;  // sidebar cursor

  function sidebarSectionHeader(title) {
    sy -= 4;
    text(title.toUpperCase(), SIDE_X, sy, '/F2', 7.2, AC_R, AC_G, AC_B);
    sy -= 3;
    // underline
    ops.push(`0.4 w ${AC_R} ${AC_G} ${AC_B} RG ${SIDE_X} ${sy} m ${SIDE_RX} ${sy} l S 0 0 0 RG`);
    sy -= 8;
  }

  // ── EDUCATION (sidebar) ────────────────────────────────────────────────────
  sidebarSectionHeader('Education');
  content.education.forEach(edu => {
    const degLines = wrapText(edu.degree, 24);
    degLines.forEach(dl => {
      text(dl, SIDE_X, sy, '/F2', 7, 1, 1, 1);
      sy -= 8.5;
    });
    text(edu.period, SIDE_X, sy, '/F3', 6.8, 0.65, 0.78, 0.88);
    sy -= 7.5;
    const instLines = wrapText(edu.institution, 26);
    instLines.forEach(il => {
      text(il, SIDE_X, sy, '/F1', 6.6, 0.70, 0.80, 0.90);
      sy -= 7.5;
    });
    if (edu.degree.includes('BSc')) {
      text('GPA: 3.80 / 4.00', SIDE_X, sy, '/F2', 6.8, AC_R, AC_G, AC_B);
      sy -= 8;
    }
    sy -= 3;
  });

  // ── SKILLS (sidebar) ──────────────────────────────────────────────────────
  sidebarSectionHeader('Technical Skills');
  content.skills.forEach(sg => {
    text(sg.category, SIDE_X, sy, '/F2', 6.8, 0.78, 0.88, 0.96);
    sy -= 7.5;
    const skillLines = wrapText(sg.skills.join(', '), 27);
    skillLines.forEach(sl => {
      text(sl, SIDE_X + 2, sy, '/F1', 6.3, 0.72, 0.82, 0.90);
      sy -= 7;
    });
    sy -= 2;
  });

  // ── HACKATHONS SHORT (sidebar) ─────────────────────────────────────────────
  sidebarSectionHeader('Competitions');
  const topHacksShort = (content.hackathons || []).slice(0, 3);
  topHacksShort.forEach(h => {
    const nameLines = wrapText(h.name.replace(' (24-Hour Competitive Sprint)', ''), 25);
    nameLines.forEach(nl => {
      text(nl, SIDE_X, sy, '/F2', 6.5, 1, 1, 1);
      sy -= 7.5;
    });
    text(h.result, SIDE_X + 2, sy, '/F3', 6.3, AC_R, AC_G, AC_B);
    sy -= 7;
    text(h.date, SIDE_X + 2, sy, '/F1', 6, 0.60, 0.72, 0.82);
    sy -= 9;
  });

  // ── CERTIFICATIONS SHORT (sidebar) ────────────────────────────────────────
  sidebarSectionHeader('Certifications');
  const certsSide = [
    content.certifications.find(c => c.id === 'cert-meta-frontend'),
    content.certifications.find(c => c.id === 'cert-postman-api'),
    content.certifications.find(c => c.id === 'cert-aws-beginner'),
    content.certifications.find(c => c.id === 'cert-python-uom'),
  ].filter(Boolean);
  certsSide.forEach(cert => {
    const ctLines = wrapText(cert.title, 26);
    ctLines.forEach((cl, i) => {
      text(cl, SIDE_X, sy, i === 0 ? '/F2' : '/F1', 6.3, 0.9, 0.93, 0.97);
      sy -= 7.2;
    });
    text(cert.issuer, SIDE_X + 2, sy, '/F3', 6, 0.60, 0.72, 0.82);
    sy -= 8.5;
  });

  // ── MAIN CONTENT ────────────────────────────────────────────────────────────
  let my = PH - HDR_H - 16;

  function mainSection(title) {
    my -= 6;
    text(title.toUpperCase(), MAIN_X, my, '/F2', 8.5, 0.09, 0.14, 0.26);
    my -= 3;
    line(MAIN_X, my, MAIN_RX, my, UL_R, UL_G, UL_B, 1.0);
    my -= 9;
  }

  // ── PROFESSIONAL SUMMARY ───────────────────────────────────────────────────
  mainSection('Professional Summary');
  content.profile.sentences.forEach(sentence => {
    const lines = wrapText(sentence, 72);
    lines.forEach(l => {
      text(l, MAIN_X, my, '/F1', 7.6, 0.12, 0.14, 0.18);
      my -= 8.8;
    });
  });

  // ── KEY PROJECTS ───────────────────────────────────────────────────────────
  mainSection('Key Projects');
  const projectsToInclude = [
    content.projects.find(p => p.id === 'talentai'),
    content.projects.find(p => p.id === 'crisiscopilot'),
    content.projects.find(p => p.id === 'agriai'),
    content.projects.find(p => p.id === 'careconnect'),
  ].filter(Boolean);

  projectsToInclude.forEach((proj, pIdx) => {
    // Title row
    const titleStr = `${proj.title}  —  ${proj.subtitle}`;
    const titleLines = wrapText(titleStr, 60);
    text(titleLines[0], MAIN_X, my, '/F2', 8, 0.08, 0.13, 0.25);
    text(proj.year || proj.period, MAIN_RX - 22, my, '/F2', 7.3, 0.35, 0.40, 0.45);
    my -= 8.5;
    // Role tag
    if (proj.role) {
      text(proj.role + (proj.teamSize ? `  |  Team: ${proj.teamSize}` : ''), MAIN_X, my, '/F3', 7, 0.30, 0.40, 0.55);
      my -= 7.5;
    }
    // Tech stack
    text('Stack: ' + proj.techStack.slice(0, 6).join(', '), MAIN_X, my, '/F3', 6.8, UL_R, UL_G, UL_B);
    my -= 8;
    // Bullets
    const bullets = (proj.bullets || proj.achievements || []).slice(0, 2);
    bullets.forEach(b => {
      ops.push(`BT /F2 7.5 Tf ${AC_R} ${AC_G} ${AC_B} rg 1 0 0 1 ${MAIN_X + 2} ${my} Tm (>) Tj ET`);
      const lines = wrapText(b.replace(/\[.*?\]/g, '').trim(), 68);
      lines.forEach((l, li) => {
        text(l, MAIN_X + 11, my, '/F1', 7.3, 0.14, 0.16, 0.20);
        my -= 8;
      });
    });
    if (pIdx < projectsToInclude.length - 1) my -= 3;
  });

  // ── HACKATHONS & ACHIEVEMENTS ──────────────────────────────────────────────
  mainSection('Hackathons & Achievements');
  const topHacks = (content.hackathons || []).slice(0, 2);
  topHacks.forEach((hack, hIdx) => {
    text(`${hack.name.replace(' (24-Hour Competitive Sprint)', '')}`, MAIN_X, my, '/F2', 7.9, 0.08, 0.13, 0.25);
    text(hack.date, MAIN_RX - 30, my, '/F2', 7.3, 0.35, 0.40, 0.45);
    my -= 8.5;
    text(hack.result, MAIN_X, my, '/F3', 7.2, UL_R, UL_G, UL_B);
    text(`Team: ${hack.teamName}  |  ${hack.organizer}`, MAIN_X + 95, my, '/F1', 6.8, 0.30, 0.38, 0.50);
    my -= 7.5;
    const sumLine = wrapText(hack.summary, 72)[0];
    if (sumLine) {
      text(sumLine, MAIN_X + 6, my, '/F1', 7, 0.18, 0.20, 0.25);
      my -= 8.5;
    }
    if (hIdx < topHacks.length - 1) my -= 2;
  });

  // ── CERTIFICATIONS ─────────────────────────────────────────────────────────
  mainSection('Certifications & Credentials');
  const mainCerts = [
    content.certifications.find(c => c.id === 'cert-skillshare-devforge'),
    content.certifications.find(c => c.id === 'cert-hacktonight-achievement'),
    content.certifications.find(c => c.id === 'cert-ieee-day-volunteer'),
  ].filter(Boolean);

  mainCerts.forEach(cert => {
    text(cert.title, MAIN_X, my, '/F2', 7.6, 0.08, 0.13, 0.25);
    text(cert.issueDate, MAIN_RX - 50, my, '/F2', 7, 0.35, 0.40, 0.45);
    my -= 7.8;
    text(`${cert.issuer}  |  Skills: ${cert.skills.slice(0, 3).join(', ')}`, MAIN_X + 6, my, '/F1', 6.8, 0.30, 0.38, 0.50);
    my -= 9;
  });

  // ── Assemble PDF 1.4 ────────────────────────────────────────────────────────
  const streamContent = ops.join('\n');
  const streamLength = Buffer.byteLength(streamContent, 'utf8');

  const objects = [];
  function addObj(str) { objects.push(str); return objects.length; }

  addObj('<< /Type /Catalog /Pages 2 0 R >>');
  addObj('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  addObj(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>`);
  addObj(`<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream`);
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  addObj('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
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
  console.log(`Modern two-column CV PDF created: ${outputPath} (${pdf.length} bytes, Main Y: ${my.toFixed(1)}, Sidebar Y: ${sy.toFixed(1)})`);
}

generateCVpdf();
