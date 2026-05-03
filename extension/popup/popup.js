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

// Field mapping: id → { key, label }
const FIELD_MAP = {
  'f-name':     { key: 'name',     label: 'Name' },
  'f-category': { key: 'category', label: 'Category' },
  'f-address':  { key: 'address',  label: 'Address' },
  'f-phone':    { key: 'phone',    label: 'Phone' },
  'f-website':  { key: 'website',  label: 'Website' },
  'f-rating':   { key: 'rating',   label: 'Rating' },
  'f-reviews':  { key: 'reviews',  label: 'Reviews' },
  'f-hours':    { key: 'hours',    label: 'Hours' },
  'f-plusCode': { key: 'plusCode', label: 'Plus Code' },
  'f-mapsUrl':  { key: 'mapsUrl',  label: 'Maps URL' },
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
  leadCount.textContent = leads.length;
  leadBadge.classList.add('pulse');
  setTimeout(() => leadBadge.classList.remove('pulse'), 400);
}

function updateProgress(current, max) {
  const pct = max > 0 ? Math.min((current / max) * 100, 100) : 0;
  progressFill.style.width = `${pct}%`;
  progressLabel.textContent = `${current} / ${max}`;
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
    } else if (key === 'mapsUrl' && val) {
      const a = document.createElement('a');
      a.href = val;
      a.target = '_blank';
      a.className = 'cell-link';
      a.textContent = 'View →';
      td.appendChild(a);
    } else {
      td.title = val;
      td.textContent = val;
    }

    tr.appendChild(td);
  });

  leadsBody.appendChild(tr);

  // Auto-scroll to latest
  const wrap = leadsBody.closest('.table-wrap');
  if (wrap) wrap.scrollTop = wrap.scrollHeight;
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

function exportXLSX() {
  if (typeof XLSX === 'undefined') {
    showToast('XLSX library not loaded. Using CSV.', 'error');
    exportCSV();
    return;
  }
  const fields = getActiveFields();
  const data = [
    fields.map(f => f.label),
    ...leads.map(lead => fields.map(({ key }) => lead[key] || '')),
  ];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Style header row
  const headerRange = XLSX.utils.decode_range(ws['!ref']);
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
    if (cell) {
      cell.s = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { patternType: 'solid', fgColor: { rgb: '1A2A3A' } },
      };
    }
  }

  // Column widths
  ws['!cols'] = fields.map(() => ({ wch: 22 }));

  XLSX.utils.book_append_sheet(wb, ws, 'Leads');
  const xlsBuf = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([xlsBuf], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  downloadBlob(blob, `leads_${timestamp()}.xlsx`);
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
  showToast(`✓ Exported ${leads.length} leads as ${filename.split('.').pop().toUpperCase()}`, 'success');
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

async function pingContentScript(tabId) {
  return new Promise((resolve) => {
    try {
      chrome.tabs.sendMessage(tabId, { type: 'PING' }, (resp) => {
        if (chrome.runtime.lastError) return resolve(false);
        resolve(resp?.alive === true);
      });
    } catch {
      resolve(false);
    }
  });
}

async function ensureContentScript(tabId) {
  // Always inject fresh — clears any stale cached version
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
    setStatus('error', 'Please open Google Maps first');
    showToast('⚠️ Navigate to Google Maps first', 'error');
    return;
  }

  activeTabId = tab.id;
  maxResults = parseInt(maxResultsEl.value, 10) || 100;

  const ok = await ensureContentScript(activeTabId);
  if (!ok) {
    setStatus('error', 'Could not inject scraper');
    showToast('❌ Failed to inject scraper', 'error');
    return;
  }

  isRunning = true;
  isPaused = false;

  btnStart.disabled = true;
  btnPause.disabled = false;
  btnStop.disabled = false;

  progressWrap.style.display = 'flex';
  updateProgress(0, maxResults);
  setStatus('running', 'Scraping in progress...');

  // Give the injected script time to initialize before sending message
  await sleep(700);

  chrome.tabs.sendMessage(activeTabId, {
    type: 'START_SCRAPE',
    options: {
      maxResults,
      fields: getActiveFields().map(f => f.key),
    },
  }, (resp) => {
    if (chrome.runtime.lastError) {
      setStatus('error', 'Could not reach content script — reload the Maps tab');
      showToast('❌ Could not reach scraper. Reload Maps tab.', 'error');
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
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Resume`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;

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
  btnPause.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> Pause`;

  setStatus('idle', `Stopped — ${leads.length} leads collected`);
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
      resultsSection.style.display = 'flex';
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
        showToast(`✓ Done! ${count || leads.length} leads scraped`, 'success');
        progressFill.style.width = '100%';
      }
    }
  }

  if (message.type === 'CONTENT_READY') {
    setStatus('idle', 'Ready — click Start Scraping');
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
    showToast('No leads to export yet', 'error');
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
  showToast('Leads cleared', 'info');
});

// Field checkboxes — rebuild table header on change
Object.keys(FIELD_MAP).forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', () => { if (leads.length) rebuildTable(); });
});

// ─────────────────────────────────────────────────────────
//  Init
// ─────────────────────────────────────────────────────────
// Simple sleep helper for popup
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async function init() {
  const tab = await getActiveTab();
  if (!tab) return;

  const url = tab.url || '';
  if (url.includes('google.com/maps') || url.includes('maps.google.com')) {
    setStatus('idle', 'Ready — search on Maps and click Start');
    activeTabId = tab.id;
  } else {
    setStatus('idle', 'Open Google Maps and run a search first');
  }
})();
