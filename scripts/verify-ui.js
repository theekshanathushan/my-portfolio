// scripts/verify-ui.js
// Automated headless browser verification using Chrome DevTools Protocol (CDP)
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const CHROME_PATH = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const TARGET_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\4debe7fa-beba-4e6a-ab82-e1d7583a359d';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Simple CDP client over built-in WebSocket
class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    return new Promise((resolve, reject) => {
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.callbacks.has(msg.id)) {
          const { resolve, reject } = this.callbacks.get(msg.id);
          this.callbacks.delete(msg.id);
          if (msg.error) reject(msg.error);
          else resolve(msg.result);
        }
      };
    });
  }

  async send(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

async function run() {
  console.log('🚀 Launching Chrome Headless for UI Verification...');
  const tmpProfile = path.join(process.env.TEMP || 'C:\\temp', `chrome-test-${Date.now()}`);

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${tmpProfile}`,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--mute-audio'
  ]);

  try {
    // Wait for Chrome remote debugging to respond
    let versionData = null;
    for (let i = 0; i < 30; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
        if (res.ok) {
          versionData = await res.json();
          break;
        }
      } catch {
        await sleep(250);
      }
    }

    if (!versionData) {
      throw new Error('Chrome failed to start remote debugging within timeout');
    }

    console.log('✅ Connected to Chrome CDP:', versionData['Browser']);

    // Create a new target / page
    const newTargetRes = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' });
    const targetInfo = await newTargetRes.json();
    const wsUrl = targetInfo.webSocketDebuggerUrl;

    const cdp = new CDPClient(wsUrl);
    await cdp.connect();
    console.log('✅ WebSocket connected to target page');

    await cdp.send('Page.enable');
    await cdp.send('DOM.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');

    const consoleLogs = [];
    cdp.ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description || '').join(' ');
        if (msg.params.type === 'error') {
          consoleLogs.push({ type: msg.params.type, text });
        }
        console.log(`  [BROWSER CONSOLE ${msg.params.type}]:`, text);
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleLogs.push({ type: 'exception', text: JSON.stringify(msg.params.exceptionDetails) });
        console.error('  [BROWSER EXCEPTION]:', msg.params.exceptionDetails);
      }
    });

    // 1. DESKTOP VIEWPORT (1440x900)
    console.log('\n🖥️ Testing Desktop View (1440x900)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false
    });

    console.log('  Navigating to', TARGET_URL, '...');
    await cdp.send('Page.navigate', { url: TARGET_URL });
    await sleep(3000);
    
    // Wait for React application to mount
    console.log('  Waiting for React to mount...');
    await cdp.send('Runtime.evaluate', {
      expression: `new Promise((resolve) => {
        if (document.querySelector('main')) return resolve(true);
        const observer = new MutationObserver(() => {
          if (document.querySelector('main')) {
            observer.disconnect();
            resolve(true);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => resolve(false), 15000);
      })`,
      awaitPromise: true
    });

    await sleep(1000);

    // Scroll to #activity to trigger near-viewport intersection observer
    await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('activity');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      })()`
    });
    await sleep(3500); // Allow lazy chunk & fetch to resolve

    const pageState = await cdp.send('Runtime.evaluate', {
      expression: `({
        url: window.location.href,
        title: document.title,
        hasActivity: !!document.getElementById('activity'),
        bodyLength: document.body.innerHTML.length,
        headings: Array.from(document.querySelectorAll('h2')).map(h => h.textContent)
      })`,
      returnByValue: true
    });
    console.log('  Page State:', pageState.result.value);

    // Verify DOM elements in #activity
    const desktopEvaluation = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const section = document.getElementById('activity');
        if (!section) return { error: 'Section #activity not found' };

        const title = section.querySelector('.section-title')?.textContent?.trim();
        const subtitle = section.querySelector('.section-subtitle')?.textContent?.trim();
        const leadText = section.querySelector('.activity-lead-text')?.textContent?.trim();

        const statCards = Array.from(section.querySelectorAll('.activity-stat-card')).map(card => ({
          label: card.querySelector('.stat-card-label')?.textContent?.trim(),
          number: card.querySelector('.stat-card-number')?.textContent?.trim(),
          unit: card.querySelector('.stat-card-unit')?.textContent?.trim(),
        }));

        const heatmapCells = section.querySelectorAll('.heatmap-cell');
        const monthLabels = Array.from(section.querySelectorAll('.month-label')).map(m => m.textContent?.trim());
        const dayLabels = Array.from(section.querySelectorAll('.day-label')).map(d => d.textContent?.trim());
        const legendCells = section.querySelectorAll('.legend-cell');

        const weeklyTitle = section.querySelector('.chart-title')?.textContent?.trim();
        const weeklySvg = !!section.querySelector('.weekly-svg');

        const langTitle = section.querySelector('.languages-title')?.textContent?.trim();
        const fallbackBadge = section.querySelector('.fallback-badge')?.textContent?.trim();
        const metaStatus = section.querySelector('.meta-status-text')?.textContent?.trim();

        return {
          title,
          subtitle,
          leadText,
          statCards,
          heatmapCellCount: heatmapCells.length,
          monthLabelsCount: monthLabels.length,
          dayLabels,
          legendCellCount: legendCells.length,
          weeklyTitle,
          weeklySvg,
          langTitle,
          fallbackBadge,
          metaStatus
        };
      })()`,
      returnByValue: true
    });

    const deskData = desktopEvaluation.result.value;
    console.log('  Eyebrow:', deskData.subtitle);
    console.log('  Title:', deskData.title);
    console.log('  Lead:', deskData.leadText);
    console.log('  Stat Cards Count:', deskData.statCards?.length);
    deskData.statCards?.forEach((s) => console.log(`    - ${s.label}: ${s.number} (${s.unit})`));
    console.log('  Heatmap Cell Count:', deskData.heatmapCellCount, '(expected 371)');
    console.log('  Month Labels:', deskData.monthLabelsCount, 'months detected');
    console.log('  Day Labels:', deskData.dayLabels?.join(', '));
    console.log('  Weekly Chart:', deskData.weeklyTitle, deskData.weeklySvg ? '✅ SVG Active' : '❌ SVG Missing');
    console.log('  Telemetry Badge:', deskData.fallbackBadge || 'Live Data');

    // Hover / Focus tooltip test using CDP real mouse movement
    console.log('\n🔍 Testing Heatmap Cell Tooltip Hover & Focus...');
    const cellCoord = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const cell = document.querySelector('.heatmap-cell');
        if (!cell) return null;
        const rect = cell.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()`,
      returnByValue: true
    });

    if (cellCoord.result.value) {
      await cdp.send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: Math.round(cellCoord.result.value.x),
        y: Math.round(cellCoord.result.value.y)
      });
      await sleep(300);
    }

    const hoverResult = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const tooltip = document.querySelector('.heatmap-floating-tooltip');
        return {
          hoverDetected: !!tooltip,
          tooltipDate: tooltip?.querySelector('.tooltip-date')?.textContent,
          tooltipCount: tooltip?.querySelector('.tooltip-count')?.textContent
        };
      })()`,
      returnByValue: true
    });
    console.log('  Tooltip on hover:', hoverResult.result.value);

    // Capture Desktop Screenshot of #activity
    console.log('\n📸 Capturing Desktop Screenshot of Coding Activity Section...');
    const boxEval = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('activity');
        const rect = el.getBoundingClientRect();
        return { x: rect.left, y: rect.top + window.scrollY, width: rect.width, height: rect.height };
      })()`,
      returnByValue: true
    });

    const box = boxEval.result.value;
    const desktopScreenshot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, box.x),
        y: Math.max(0, box.y - 40),
        width: 1440,
        height: Math.min(box.height + 80, 1600),
        scale: 1
      }
    });

    const desktopImgPath = path.join(ARTIFACT_DIR, 'coding-activity-desktop.png');
    fs.writeFileSync(desktopImgPath, Buffer.from(desktopScreenshot.data, 'base64'));
    console.log(`  ✅ Desktop screenshot saved: ${desktopImgPath} (${fs.statSync(desktopImgPath).size} bytes)`);

    // 2. MOBILE VIEWPORT (375x812)
    console.log('\n📱 Testing Mobile View (375x812 iPhone / Compact)...');
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 375,
      height: 812,
      deviceScaleFactor: 2,
      mobile: true
    });

    await sleep(1500);

    const mobileEvaluation = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        const scrollContainer = document.querySelector('.heatmap-scroll-container');
        const pageOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;
        const containerScrollable = scrollContainer ? scrollContainer.scrollWidth > scrollContainer.clientWidth : false;
        const isScrolledToEnd = scrollContainer ? (scrollContainer.scrollLeft > 0) : false;

        const el = document.getElementById('activity');
        const rect = el.getBoundingClientRect();

        return {
          pageOverflow,
          containerScrollable,
          isScrolledToEnd,
          containerScrollLeft: scrollContainer?.scrollLeft,
          containerScrollWidth: scrollContainer?.scrollWidth,
          box: { x: rect.left, y: rect.top + window.scrollY, width: rect.width, height: rect.height }
        };
      })()`,
      returnByValue: true
    });

    const mobData = mobileEvaluation.result.value;
    console.log('  Page horizontal overflow:', mobData.pageOverflow ? '❌ OVERFLOW' : '✅ NO OVERFLOW (Perfect)');
    console.log('  Heatmap container scrollable horizontally:', mobData.containerScrollable ? '✅ YES' : '❌ NO');
    console.log('  Heatmap initial scroll position:', mobData.containerScrollLeft, '/', mobData.containerScrollWidth, mobData.isScrolledToEnd ? '✅ Scrolled to latest weeks' : '❌ Scrolled to start');

    // Capture Mobile Screenshot
    const mobileScreenshot = await cdp.send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: 0,
        y: Math.max(0, mobData.box.y - 20),
        width: 375,
        height: Math.min(mobData.box.height + 40, 2400),
        scale: 1
      }
    });

    const mobileImgPath = path.join(ARTIFACT_DIR, 'coding-activity-mobile.png');
    fs.writeFileSync(mobileImgPath, Buffer.from(mobileScreenshot.data, 'base64'));
    console.log(`  ✅ Mobile screenshot saved: ${mobileImgPath} (${fs.statSync(mobileImgPath).size} bytes)`);

    // 3. CONSOLE & HYDRATION CHECK
    console.log('\n🛡️ Checking Console & Hydration Warnings...');
    if (consoleLogs.length === 0) {
      console.log('  ✅ 0 console errors detected!');
    } else {
      console.log('  ⚠️ Console errors found:');
      consoleLogs.forEach((l) => console.log(`    - [${l.type}] ${l.text}`));
    }

    cdp.close();
    console.log('\n🎉 UI and visual verification completed successfully!');
  } finally {
    try {
      chromeProc.kill('SIGKILL');
    } catch {
      // ignore
    }
    // Clean up temporary profile
    try {
      fs.rmSync(tmpProfile, { recursive: true, force: true });
    } catch {
      // ignore
    }
  }
}

run().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
