'use strict';
let leads = [];
let isRunning = false;
let isPaused = false;
let activeTabId = null;
let maxResults = 10;
const FIELD_MAP = {
  'f-image':    { key: 'imageUrl', label: 'Photo' },
  'f-name':     { key: 'name',     label: 'Business Name' },
  'f-leadType': { key: 'leadType', label: 'Lead Type' },
  'f-insight':  { key: 'leadInsight', label: 'Lead Insight' },
  'f-sell':     { key: 'whatToSell', label: 'What to Sell' },
  'f-competitor': { key: 'competitor', label: 'Competitor' },
  'f-script':   { key: 'coldCallScript', label: 'Call Script' },
  'f-rating':   { key: 'rating',   label: 'Rating' },
  'f-reviews':  { key: 'reviews',  label: 'Reviews' },
  'f-category': { key: 'category', label: 'Category' },
  'f-address':  { key: 'address',  label: 'Address' },
  'f-city':     { key: 'city',     label: 'City' },
  'f-country':  { key: 'country',  label: 'Country' },
  'f-phone':    { key: 'phone',    label: 'Phone' },
  'f-website':  { key: 'website',  label: 'Website' },
  'f-hours':    { key: 'hours',    label: 'Hours' },
};
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
const scriptModal = $('scriptModal');
const scriptText  = $('scriptText');
const btnCloseModal = $('btnCloseModal');
const btnCopyScript = $('btnCopyScript');
let toastTimer;
function showToast(msg, type = 'info') {
  toastEl.textContent = msg;
  toastEl.className = `toast show ${type}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3000);
}
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
function getActiveFields() {
  return Object.entries(FIELD_MAP)
    .filter(([id]) => document.getElementById(id)?.checked)
    .map(([, f]) => f);
}
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
    if (key === 'imageUrl') {
      td.classList.add('cell-photo');
      const img = document.createElement('img');
      img.src = val || '../icons/icon128.png';
      img.className = 'cell-img';
      img.alt = 'Business';
      td.appendChild(img);
    } else if (key === 'website' && val) {
      const a = document.createElement('a');
      a.href = val.startsWith('http') ? val : `https://${val}`;
      a.target = '_blank';
      a.className = 'cell-link';
      a.textContent = val.replace(/^https?:\/\//, '').replace(/\/$/, '');
      td.appendChild(a);
    } else if (key === 'rating' && val) {
      td.innerHTML = `<span class="cell-rating">⭐ ${val}</span>`;
    } else if (key === 'leadType') {
      const type = val || 'Cold';
      const badgeClass = `badge-${type.toLowerCase()}`;
      td.innerHTML = `<span class="badge-lead ${badgeClass}">${type} Lead</span>`;
    } else if (key === 'coldCallScript') {
      if (val) {
        const btn = document.createElement('button');
        btn.className = 'btn-script';
        btn.textContent = 'View Script';
        btn.onclick = () => {
          scriptText.textContent = val;
          scriptModal.classList.add('show');
        };
        td.appendChild(btn);
      } else {
        td.textContent = '...';
      }
    } else if (key === 'leadInsight' || key === 'whatToSell' || key === 'competitor') {
      td.innerHTML = `<span style="color: #4a9d7e; font-style: italic; font-weight: 600;">${val || 'Analyzing...'}</span>`;
      td.style.maxWidth = '200px';
      td.style.whiteSpace = 'normal';
    } else {
      td.title = val;
      td.textContent = val;
    }
    tr.appendChild(td);
  });
  leadsBody.appendChild(tr);
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
    const response = await fetch('../icons/logo_horizontal.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
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
  const fields = getActiveFields().filter(f => f.key !== 'imageUrl');
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Leads');
  worksheet.mergeCells(1, 1, 1, fields.length);
  const brandRow = worksheet.getRow(1);
  brandRow.height = 90; 
  const brandCell = worksheet.getCell(1, 1);
  brandCell.value = ''; 
  brandCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF0F172A' }
  };
  brandCell.alignment = { vertical: 'middle', horizontal: 'center' };
  const logoBase64 = await getLogoBase64();
  if (logoBase64) {
    const imageId = workbook.addImage({
      base64: logoBase64,
      extension: 'png',
    });
    const centerCol = Math.max(0, (fields.length / 2) - 1);
    worksheet.addImage(imageId, {
      tl: { col: centerCol, row: 0.1 }, 
      ext: { width: 280, height: 70 } 
    });
  }
  const headerRow = worksheet.getRow(2);
  headerRow.height = 30;
  fields.forEach((field, i) => {
    const cell = headerRow.getCell(i + 1);
    cell.value = field.label;
    cell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1E293B' }
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF334155' } },
      left: { style: 'thin', color: { argb: 'FF334155' } },
      bottom: { style: 'thin', color: { argb: 'FF334155' } },
      right: { style: 'thin', color: { argb: 'FF334155' } }
    };
  });
  leads.forEach((lead, index) => {
    const row = worksheet.getRow(index + 3);
    fields.forEach((field, colIndex) => {
      const cell = row.getCell(colIndex + 1);
      let rawVal = lead[field.key];
      let val = (rawVal === 0) ? 0 : (rawVal || '');
      cell.font = { name: 'Arial', size: 10, color: { argb: 'FF1E293B' } };
      if (val === '') {
        cell.value = '-';
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      } else {
        cell.value = val;
        if (field.key === 'leadType' || field.key === 'rating' || field.key === 'reviews') {
          const rawVal = lead[field.key];
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF0F172A' } };
          let bgColor = 'FFF1F5F9';
          if (field.key === 'leadType') {
            if (rawVal === 'Hot') bgColor = 'FFFEE2E2';
            else if (rawVal === 'Warm') bgColor = 'FFFef3c7';
            else bgColor = 'FFF1F5F9';
          } else if (field.key === 'rating') {
            const numVal = parseFloat(rawVal);
            if (numVal >= 4.5) bgColor = 'FFD1FAE5';
            else if (numVal >= 4.0) bgColor = 'FFFef3c7';
            else bgColor = 'FFFEE2E2';
          } else if (field.key === 'reviews') {
            const numVal = parseInt(rawVal);
            if (numVal >= 500) bgColor = 'FFD1FAE5';
            else if (numVal >= 100) bgColor = 'FFFef3c7';
          }
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: bgColor }
          };
        }
        if (field.key === 'website' && val) {
          cell.value = { 
            text: val.toString(), 
            hyperlink: val.toString().startsWith('http') ? val.toString() : `https://${val}` 
          };
          cell.font = { color: { argb: 'FF0EA5E9' }, underline: true };
        } else if (field.key === 'phone' && val) {
          const cleanPhone = val.toString().replace(/[^0-9+]/g, '');
          cell.value = { 
            text: val.toString(), 
            hyperlink: `tel:${cleanPhone}` 
          };
          cell.font = { color: { argb: 'FF0EA5E9' }, underline: true };
        }
        const shouldCenter = ['category', 'phone', 'website', 'leadType', 'rating', 'reviews', 'city', 'country', 'competitor'].includes(field.key);
        cell.alignment = { 
          vertical: 'middle', 
          horizontal: shouldCenter ? 'center' : 'left', 
          wrapText: true, 
          indent: shouldCenter ? 0 : 1 
        };
      }
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        left: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        bottom: { style: 'thin', color: { argb: 'FFD1D5DB' } },
        right: { style: 'thin', color: { argb: 'FFD1D5DB' } }
      };
      if (index % 2 === 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8FAFC' }
        };
      }
    });
  });
  const footerIndex = leads.length + 4;
  worksheet.mergeCells(footerIndex, 1, footerIndex, fields.length);
  const footerCell = worksheet.getCell(footerIndex, 1);
  footerCell.value = `Generated by SaaSquatch Pro — ${new Date().toLocaleDateString()} — Premium Data Extraction`;
  footerCell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF94A3B8' } };
  footerCell.alignment = { vertical: 'middle', horizontal: 'left' };
  fields.forEach((field, i) => {
    let maxLen = field.label.length;
    leads.forEach(lead => {
      const val = String(lead[field.key] || '');
      if (val.length > maxLen) maxLen = val.length;
    });
    let colWidth = Math.min(maxLen + 10, 60); 
    if (field.key === 'name' || field.key === 'address' || field.key === 'aiInsight') colWidth = Math.max(colWidth, 40);
    if (field.key === 'score' || field.key === 'rating' || field.key === 'reviews' || field.key === 'city' || field.key === 'country') colWidth = 15;
    worksheet.getColumn(i + 1).width = colWidth;
  });
  worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 2 }];
  worksheet.autoFilter = {
    from: { row: 2, column: 1 },
    to: { row: leads.length + 2, column: fields.length },
  };
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
  maxResults = parseInt(maxResultsEl.value, 10) || 10;
  const ok = await ensureContentScript(activeTabId);
  if (!ok) {
    setStatus('error', 'Inject failed');
    showToast('❌ Failed to inject scraper', 'error');
    return;
  }
  isRunning = true;
  isPaused = false;
  btnStart.disabled = true;
  btnStart.innerHTML = `<svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Scraping...`;
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
  btnStart.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Launch Scraper`;
  btnPause.disabled = true;
  btnStop.disabled = true;
  btnPause.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  setStatus('idle', `Collected ${leads.length} leads`);
  chrome.tabs.sendMessage(activeTabId, { type: 'STOP_SCRAPE' });
}
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'SCRAPE_RESULT') {
    const lead = message.lead;
    const isDuplicate = leads.some(l => 
      (l.mapsUrl && lead.mapsUrl && l.mapsUrl === lead.mapsUrl) || 
      (l.name === lead.name && l.address === lead.address)
    );
    if (isDuplicate) return;
    leads.push(lead);
    updateBadge();
    updateProgress(leads.length, maxResults);
    if (leads.length === 1) {
      buildTableHeader();
      resultsSection.style.display = 'block';
    }
    appendLeadRow(lead);
  }
  if (message.type === 'SCRAPE_UPDATE') {
    const { mapsUrl, name, address, analysis } = message;
    console.log('[Popup] Received AI update for:', name);
    const index = leads.findIndex(l => 
      (l.mapsUrl && mapsUrl && l.mapsUrl === mapsUrl) || 
      (l.name === name && l.address === address)
    );
    if (index !== -1) {
      console.log('[Popup] Updating lead at index:', index);
      leads[index] = { ...leads[index], ...analysis };
      const rows = leadsBody.querySelectorAll('tr');
      if (rows[index]) {
        const tr = rows[index];
        const fields = getActiveFields();
        const tds = tr.querySelectorAll('td');
        fields.forEach((field, colIndex) => {
          if (['leadInsight', 'whatToSell', 'competitor', 'coldCallScript'].includes(field.key)) {
            const td = tds[colIndex];
            if (td) {
              const val = analysis[field.key];
              if (field.key === 'coldCallScript') {
                if (val) {
                  td.innerHTML = '';
                  const btn = document.createElement('button');
                  btn.className = 'btn-script';
                  btn.textContent = 'View Script';
                  btn.onclick = () => {
                    scriptText.textContent = val;
                    scriptModal.classList.add('show');
                  };
                  td.appendChild(btn);
                } else {
                  td.textContent = '...';
                }
              } else {
                td.innerHTML = `<span style="color: #4a9d7e; font-style: italic; font-weight: 600;">${val || 'Analyzing...'}</span>`;
              }
            }
          }
        });
      }
    }
  }
  if (message.type === 'SCRAPE_STATUS') {
    const { status, message: msg, count } = message;
    setStatus(status, msg);
    if (status === 'done' || status === 'error') {
      isRunning = false;
      btnStart.disabled = false;
      btnStart.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg> Launch Scraper`;
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
btnCloseModal.addEventListener('click', () => {
  scriptModal.classList.remove('show');
});
window.addEventListener('click', (e) => {
  if (e.target === scriptModal) {
    scriptModal.classList.remove('show');
  }
});
btnCopyScript.addEventListener('click', () => {
  const text = scriptText.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btnCopyScript.textContent;
    btnCopyScript.textContent = '✓ Copied!';
    btnCopyScript.style.background = '#10b981';
    btnCopyScript.style.color = '#fff';
    setTimeout(() => {
      btnCopyScript.textContent = originalText;
      btnCopyScript.style.background = '';
      btnCopyScript.style.color = '';
    }, 2000);
  });
});
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
