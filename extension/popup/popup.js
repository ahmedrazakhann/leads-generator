/**
 * Google Maps Lead Scraper — Popup Controller
 * Handles scraping lifecycle, live table updates, CSV/Excel export
 */

'use strict';

// ─────────────────────────────────────────────────────────
//  State
// ─────────────────────────────────────────────────────────
let leads = [];
let isRunning = false;
let isPaused = false;
let activeTabId = null;
let maxResults = 100;

const FIELD_MAP = {
  'f-name':     { key: 'name',     label: 'Name' },
  'f-category': { key: 'category', label: 'Category' },
  'f-address':  { key: 'address',  label: 'Address' },
  'f-phone':    { key: 'phone',    label: 'Phone' },
  'f-website':  { key: 'website',  label: 'Website' },
  'f-rating':   { key: 'rating',   label: 'Rating' },
  'f-reviews':  { key: 'reviews',  label: 'Reviews' },
  'f-hours':    { key: 'hours',    label: 'Hours' },
};

// ─────────────────────────────────────────────────────────
//  DOM refs
// ─────────────────────────────────────────────────────────
const $  = (id) => document.getElementById(id);
const leadCount   = $('leadCount');
const leadBadge   = $('leadBadge');
const statusDot   = $('statusDot');
const statusText  = $('statusText');
const progressWrap  = $('progressWrap');
const progressFill  = $('progressFill');
const progressLabel = $('progressLabel');
const btnStart    = $('btnStart');
const btnPause    = $('btnPause');
const btnStop     = $('btnStop');
const btnExport   = $('btnExport');
const btnClear    = $('btnClear');
const maxResultsEl  = $('maxResults');
const exportFmtEl   = $('exportFormat');
const leadsHead   = $('leadsHead');
const leadsBody   = $('leadsBody');
const resultsSection = $('resultsSection');
const toastEl     = $('toast');
const heroSection   = $('heroSection');
const activeScoping = $('activeScoping');

// ─────────────────────────────────────────────────────────
//  Toast
// ─────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, type = 'info') {
  toastEl.textContent = msg;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}

// ─────────────────────────────────────────────────────────
//  Status helpers
// ─────────────────────────────────────────────────────────
function setStatus(type, message) {
  statusDot.className = `status-dot ${type}`;
  statusText.textContent = message;
}

function updateBadge() {
  const count = leads.length;
  leadCount.textContent = count;
}

function updateProgress(current, max) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = `${current} / ${max}`;
}

// ─────────────────────────────────────────────────────────
//  UI Transitions
// ─────────────────────────────────────────────────────────
function showScrapingUI() {
  heroSection.style.display = 'none';
  activeScoping.style.display = 'block';
  progressWrap.style.display = 'block';
}

function showInitialUI() {
  if (leads.length === 0) {
    heroSection.style.display = 'block';
    activeScoping.style.display = 'none';
  } else {
    heroSection.style.display = 'none';
    activeScoping.style.display = 'block';
  }
}

// ─────────────────────────────────────────────────────────
//  Field helpers
// ─────────────────────────────────────────────────────────
function getActiveFields() {
  return Object.entries(FIELD_MAP)
    .filter(([id]) => document.getElementById(id)?.checked)
    .map(([, f]) => f);
}

// ─────────────────────────────────────────────────────────
//  Table rendering
// ─────────────────────────────────────────────────────────
function buildTableHeader() {
  const fields = getActiveFields();
  leadsHead.innerHTML = `<tr>${fields.map(f => `<th>${f.label}</th>`).join('')}</tr>`;
}

function appendLeadRow(lead) {
  const fields = getActiveFields();
  const tr = document.createElement('tr');
  tr.classList.add('new-row');

  fields.forEach(({ key }) => {
    const td = document.createElement('td');
    const val = lead[key] || '';

    if (key === 'website' && val) {
      const a = document.createElement('a');
      a.href = val.startsWith('http') ? val : `https://${val}`;
      a.target = '_blank';
      a.className = 'cell-link';
      a.textContent = val.replace(/^https?:\/\//, '').replace(/\/$/, '');
      td.appendChild(a);
    } else if (key === 'rating' && val) {
      td.innerHTML = `<span class="cell-rating">⭐ ${val}</span>`;
    } else {
      td.title = val;
      td.textContent = val;
    }

    tr.appendChild(td);
  });

  leadsBody.appendChild(tr);

  // Auto-scroll to latest with a tiny delay to ensure DOM update
  requestAnimationFrame(() => {
    const wrap = leadsBody.closest('.table-wrap');
    if (wrap) {
      wrap.scrollTo({
        top: wrap.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
}

function rebuildTable() {
  buildTableHeader();
  leadsBody.innerHTML = '';
  leads.forEach(appendLeadRow);
}

// ─────────────────────────────────────────────────────────
//  Export
// ─────────────────────────────────────────────────────────
function exportCSV() {
  const fields = getActiveFields();
  const header = fields.map(f => `"${f.label}"`).join(',');
  const rows = leads.map(lead =>
    fields.map(({ key }) => {
      const val = (lead[key] || '').toString().replace(/"/g, '""');
      return `"${val}"`;
    }).join(',')
  );
  const csv = [header, ...rows].join('\r\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `leads_${timestamp()}.csv`);
}

async function getLogoBase64() {
  try {
    const response = await fetch('../icons/logo.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.error('Logo fetch failed', e);
    return null;
  }
}

async function exportXLSX() {
  if (typeof ExcelJS === 'undefined') {
    showToast('Excel library error. Using CSV.', 'error');
    exportCSV();
    return;
  }

  const fields = getActiveFields();
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Leads');

  // 1. Setup Branding Row (Row 1)
  worksheet.mergeCells(1, 1, 1, fields.length);
  const brandRow = worksheet.getRow(1);
  brandRow.height = 60;
  const brandCell = worksheet.getCell(1, 1);
  brandCell.value = '            SAASQUATCH PRO'; // Extra spaces to make room for logo
  brandCell.font = { name: 'Arial Black', size: 18, bold: true, color: { argb: 'FFFFFFFF' } };
  brandCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0F172A' } // Dark Navy
  };
  brandCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // 2. Add Logo (Centered with text)
  const logoBase64 = await getLogoBase64();
  if (logoBase64) {
    const imageId = workbook.addImage({
      base64: logoBase64,
      extension: 'png',
    });
    // Calculate approximate center position for logo
    const totalWidth = fields.length;
    const centerCol = totalWidth / 2;
    worksheet.addImage(imageId, {
      tl: { col: centerCol - 1.2, row: 0.15 }, // Offset to the left of the center text
      ext: { width: 45, height: 45 }
    });
  }

  // 3. Setup Header Row (Row 2 - NO GAP)
  const headerRow = worksheet.getRow(2);
  headerRow.height = 30;
  fields.forEach((field, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = field.label;
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF0F172A' } // Also Dark Navy as requested
    };
    cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF334155' } },
      bottom: { style: 'medium', color: { argb: 'FF14B8A6' } } // Keep teal accent on border
    };
  });

  // 4. Data Rows (Start from Row 3)
  leads.forEach((lead, index) => {
    const row = worksheet.getRow(index + 3);
    fields.forEach((field, colIndex) => {
      const cell = row.getCell(colIndex + 1);
      cell.value = lead[field.key] || '';
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true, indent: 1 };
      
      if (index % 2 === 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8FAFC' }
        };
      }
    });
  });

  // 5. Footer Row
  const footerIndex = leads.length + 4;
  worksheet.mergeCells(footerIndex, 1, footerIndex, fields.length);
  const footerCell = worksheet.getCell(footerIndex, 1);
  footerCell.value = `Generated by SaaSquatch Pro — ${new Date().toLocaleDateString()} — Premium Data Extraction`;
  footerCell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF94A3B8' } };
  footerCell.alignment = { vertical: 'middle', horizontal: 'left' };

  // 6. Layout Adjustments
  fields.forEach((field, i) => {
    let maxLen = field.label.length;
    leads.forEach(lead => {
      const val = String(lead[field.key] || '');
      if (val.length > maxLen) maxLen = val.length;
    });
    worksheet.getColumn(i + 1).width = Math.min(maxLen + 8, 40);
  });

  worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 2 }];
  worksheet.autoFilter = {
    from: { row: 2, column: 1 },
    to: { row: leads.length + 2, column: fields.length },
  };

  // 7. Write and Download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadBlob(blob, `leads_premium_${timestamp()}.xlsx`);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  showToast(`✓ Exported ${leads.length} leads`, 'success');
}

function timestamp() {
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}_${pad(d.getHours())}${pad(d.getMinutes())}`;
}
function pad(n) { return String(n).padStart(2, '0'); }

// ─────────────────────────────────────────────────────────
//  Scraping control
// ─────────────────────────────────────────────────────────
async function getActiveTab() {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => resolve(tabs[0]));
  });
}

async function ensureContentScript(tabId) {
  return new Promise((resolve) => {
    chrome.scripting.executeScript(
      { target: { tabId }, files: ['content/scraper.js'] },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error('[LeadScraper] Inject error:', chrome.runtime.lastError.message);
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
}

async function startScraping() {
  const tab = await getActiveTab();
  if (!tab) {
    setStatus('error', 'No active tab found');
    return;
  }

  const url = tab.url || '';
  if (!url.includes('google.com/maps') && !url.includes('maps.google.com')) {
    setStatus('error', 'Open Google Maps first');
    showToast('⚠️ Navigate to Google Maps first', 'error');
    return;
  }

  activeTabId = tab.id;
  maxResults = parseInt(maxResultsEl.value, 10) || 100;

  const ok = await ensureContentScript(activeTabId);
  if (!ok) {
    setStatus('error', 'Inject failed');
    showToast('❌ Failed to inject scraper', 'error');
    return;
  }

  isRunning = true;
  isPaused = false;

  btnStart.disabled = true;
  btnPause.disabled = false;
  btnStop.disabled = false;

  showScrapingUI();
  updateProgress(0, maxResults);
  setStatus('running', 'Scraping in progress...');

  await sleep(700);

  chrome.tabs.sendMessage(activeTabId, {
    type: 'START_SCRAPE',
    options: {
      maxResults,
      fields: getActiveFields().map(f => f.key),
    },
  }, (resp) => {
    if (chrome.runtime.lastError) {
      setStatus('error', 'Reload Maps tab');
      showToast('❌ Connection lost. Reload Maps.', 'error');
      btnStart.disabled = false;
      btnPause.disabled = true;
      btnStop.disabled = true;
      isRunning = false;
    }
  });
}

function pauseScraping() {
  if (!activeTabId || !isRunning) return;
  isPaused = !isPaused;
  
  btnPause.innerHTML = isPaused
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  setStatus(isPaused ? 'paused' : 'running', isPaused ? 'Paused' : 'Scraping in progress...');
  chrome.tabs.sendMessage(activeTabId, { type: 'PAUSE_SCRAPE' });
}

function stopScraping() {
  if (!activeTabId) return;
  isRunning = false;
  isPaused = false;

  btnStart.disabled = false;
  btnPause.disabled = true;
  btnStop.disabled = true;
  btnPause.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  setStatus('idle', `Collected ${leads.length} leads`);
  chrome.tabs.sendMessage(activeTabId, { type: 'STOP_SCRAPE' });
}

// ─────────────────────────────────────────────────────────
//  Message listener (from content script)
// ─────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SCRAPE_RESULT') {
    const lead = message.lead;
    leads.push(lead);
    updateBadge();
    updateProgress(leads.length, maxResults);

    if (leads.length === 1) {
      buildTableHeader();
      resultsSection.style.display = 'block';
    }
    appendLeadRow(lead);
  }

  if (message.type === 'SCRAPE_STATUS') {
    const { status, message: msg, count } = message;
    setStatus(status, msg);

    if (status === 'done' || status === 'error') {
      isRunning = false;
      btnStart.disabled = false;
      btnPause.disabled = true;
      btnStop.disabled = true;
      if (status === 'done') {
        showToast(`✓ Done! ${count || leads.length} leads collected`, 'success');
        progressFill.style.width = '100%';
      }
    }
  }

  if (message.type === 'CONTENT_READY') {
    setStatus('idle', 'Ready to launch');
  }
});

// ─────────────────────────────────────────────────────────
//  Event bindings
// ─────────────────────────────────────────────────────────
btnStart.addEventListener('click', startScraping);
btnPause.addEventListener('click', pauseScraping);
btnStop.addEventListener('click', stopScraping);

btnExport.addEventListener('click', () => {
  if (!leads.length) {
    showToast('No leads to export', 'error');
    return;
  }
  const fmt = exportFmtEl.value;
  if (fmt === 'xlsx') {
    exportXLSX();
  } else {
    exportCSV();
  }
});

btnClear.addEventListener('click', () => {
  if (!leads.length) return;
  leads = [];
  leadsBody.innerHTML = '';
  leadsHead.innerHTML = '';
  resultsSection.style.display = 'none';
  updateBadge();
  updateProgress(0, maxResults);
  showInitialUI();
  showToast('Leads cleared', 'info');
});

Object.keys(FIELD_MAP).forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', () => { if (leads.length) rebuildTable(); });
});

// ─────────────────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────────────────
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async function init() {
  const tab = await getActiveTab();
  if (!tab) return;
  showInitialUI();
  
  const url = tab.url || '';
  if (url.includes('google.com/maps') || url.includes('maps.google.com')) {
    setStatus('idle', 'Maps detected — ready to launch');
    activeTabId = tab.id;
  } else {
    setStatus('idle', 'Waiting for Google Maps...');
  }
})();
