/**
 * Google Maps Lead Scraper — Content Script v3 (Speed Optimized)
 * 
 * Strategy:
 *   FAST PASS  — extract all visible data from list cards without clicking
 *   DETAIL PASS — optionally click cards to get phone + website
 */

(function () {
  'use strict';

  if (window.__leadScraperRunning) {
    console.log('[LeadScraper] Already running');
    return;
  }

  let isRunning = false;
  let isPaused  = false;
  let scrapedHrefs = new Set();

  // ─── Timing (ms) ──────────────────────────────────────────
  const T = {
    afterClick:    900,   // wait after clicking a card
    afterPanel:    600,   // wait for panel to render
    betweenItems:   80,   // pause between items
    scrollWait:    700,   // wait after scrolling
  };

  // ─── Helpers ──────────────────────────────────────────────
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function qs(sel) {
    try { return document.querySelector(sel); } catch { return null; }
  }
  function qsa(sel) {
    try { return Array.from(document.querySelectorAll(sel)); } catch { return []; }
  }
  function txt(sel) {
    const el = qs(sel);
    return el ? (el.innerText || el.textContent || '').trim() : '';
  }
  function ariaVal(sel, prefix) {
    const el = qs(sel);
    if (!el) return '';
    const raw = el.getAttribute('aria-label') || '';
    return prefix ? raw.replace(new RegExp('^' + prefix + ':?\\s*', 'i'), '').trim() : raw.trim();
  }

  function sendToPopup(type, payload) {
    try { chrome.runtime.sendMessage({ type, ...payload }); } catch {}
  }

  // ─── Extract data from a list card (no click needed) ──────
  function extractFromCard(cardEl) {
    // Name from aria-label on the <a> tag
    const name = (cardEl.getAttribute('aria-label') || '').trim();

    // href contains the place URL
    const href = cardEl.getAttribute('href') || '';
    const mapsUrl = href.startsWith('http') ? href : 'https://www.google.com' + href;

    // Card inner content — try various child span selectors
    // Google uses obfuscated class names but consistent structure
    const cardText = (cardEl.innerText || '').split('\n').map(s => s.trim()).filter(Boolean);

    // Rating is usually a number like "4.5"
    let rating = '';
    let reviews = '';
    let category = '';
    let address = '';

    for (let i = 0; i < cardText.length; i++) {
      const line = cardText[i];

      // Rating: looks like "4.5" or "4,5"
      if (!rating && /^[1-5][.,]\d$/.test(line)) {
        rating = line.replace(',', '.');
        continue;
      }
      // Reviews: "(1,234)" or "1,234"
      if (!reviews && /^\([\d,]+\)$/.test(line)) {
        reviews = line.replace(/[()]/g, '').replace(/,/g, '');
        continue;
      }
      // Skip the name line
      if (line === name) continue;
    }

    // Category: typically the second non-name, non-rating line
    // We grab spans inside the card with specific patterns
    const spans = Array.from(cardEl.querySelectorAll('span, div'));
    for (const span of spans) {
      const t = (span.innerText || '').trim();
      if (!t || t === name || /^[1-5][.,]\d$/.test(t) || /^\([\d,]+\)$/.test(t)) continue;
      // Category is usually short and doesn't look like an address
      if (!category && t.length < 40 && !/\d/.test(t) && !/,/.test(t)) {
        category = t;
      }
      // Address often has numbers or commas
      if (!address && ((/\d/.test(t) && t.length > 8) || /,.+,.+/.test(t))) {
        address = t;
      }
      if (category && address) break;
    }

    return { name, category, address, rating, reviews, phone: '', website: '', hours: '', plusCode: '', mapsUrl };
  }

  // ─── Extract extra details from opened detail panel ────────
  async function extractDetailPanel(baseData) {
    // Phone
    const phoneEl = qs('button[aria-label*="Phone:"], [data-item-id*="phone:tel"] .Io6YTe, a[href^="tel:"]');
    if (phoneEl) {
      const ariaLabel = phoneEl.getAttribute('aria-label') || '';
      baseData.phone = ariaLabel.replace(/^Phone:\s*/i, '').trim()
        || phoneEl.getAttribute('href')?.replace('tel:', '').trim()
        || phoneEl.innerText.trim();
    }

    // Website
    const webEl = qs('a[aria-label*="Website:"], a[data-item-id*="authority"], [data-item-id*="authority"] a');
    if (webEl) {
      baseData.website = webEl.href || ariaVal('a[aria-label*="Website:"]', 'Website');
    }

    // Address (more accurate from panel)
    const addrEl = qs('button[aria-label*="Address:"], [data-item-id*="address"] .Io6YTe');
    if (addrEl) {
      const ariaLabel = addrEl.getAttribute('aria-label') || '';
      const panelAddr = ariaLabel.replace(/^Address:\s*/i, '').trim() || addrEl.innerText.trim();
      if (panelAddr) baseData.address = panelAddr;
    }

    // Category (more accurate from panel)
    const catEl = qs('.DkEaL, [jsaction*="category"] .fontBodyMedium');
    if (catEl) {
      const panelCat = catEl.innerText.trim();
      if (panelCat) baseData.category = panelCat;
    }

    // Rating from panel
    if (!baseData.rating) {
      const ratingEl = qs('span[aria-label*="stars"]');
      if (ratingEl) {
        const ratingMatch = (ratingEl.getAttribute('aria-label') || '').match(/[\d.]+/);
        baseData.rating = ratingMatch?.[0] || '';
      }
    }

    // Reviews from panel
    if (!baseData.reviews) {
      const reviewsEl = qs('button[aria-label*="review"]');
      if (reviewsEl) {
        const reviewMatch = (reviewsEl.getAttribute('aria-label') || '').match(/[\d,]+/);
        baseData.reviews = reviewMatch?.[0]?.replace(/,/g, '') || '';
      }
    }

    // Hours
    const hoursEl = qs('button[aria-label*="Hours"]');
    if (hoursEl) {
      baseData.hours = (hoursEl.getAttribute('aria-label') || '')
        .replace(/^Hours[^:]*:\s*/i, '').trim() || hoursEl.innerText.trim();
    }

    // Plus Code
    const plusEl = qs('[data-item-id*="oloc"] .Io6YTe, button[aria-label*="Plus code"]');
    if (plusEl) {
      baseData.plusCode = (plusEl.getAttribute('aria-label') || '')
        .replace(/^Plus code:\s*/i, '').trim() || plusEl.innerText.trim();
    }

    return baseData;
  }

  // ─── Scroll list to load more ──────────────────────────────
  async function scrollList(listEl, times = 4) {
    for (let i = 0; i < times; i++) {
      if (!isRunning || isPaused) break;
      listEl.scrollBy(0, 2500);
      await sleep(T.scrollWait);
    }
  }

  // ─── MAIN SCRAPING LOOP ────────────────────────────────────
  async function startScraping(options = {}) {
    const { maxResults = 100, fields = [] } = options;
    const needsDetail = fields.some(f => ['phone', 'website', 'hours', 'plusCode'].includes(f));

    isRunning = true;
    isPaused  = false;
    scrapedHrefs.clear();
    window.__leadScraperRunning = true;

    sendToPopup('SCRAPE_STATUS', { status: 'running', message: 'Locating results list...' });

    const listEl = qs('div[role="feed"]');
    if (!listEl) {
      sendToPopup('SCRAPE_STATUS', {
        status: 'error',
        message: '❌ No results list found. Search for businesses on Google Maps first.',
      });
      isRunning = false;
      window.__leadScraperRunning = false;
      return;
    }

    let scraped = 0;
    let prevCount = 0;
    let noNewRounds = 0;

    sendToPopup('SCRAPE_STATUS', { status: 'running', message: 'Scraping started...' });

    while (isRunning && scraped < maxResults) {
      // Pause check
      while (isPaused && isRunning) await sleep(300);
      if (!isRunning) break;

      const cards = qsa('a.hfpxzc');

      if (cards.length === 0) {
        sendToPopup('SCRAPE_STATUS', {
          status: 'error',
          message: '❌ No result cards found. Make sure you have search results visible.',
        });
        break;
      }

      let foundNew = false;

      for (const card of cards) {
        if (!isRunning) break;
        while (isPaused && isRunning) await sleep(300);

        const href = card.getAttribute('href') || '';
        if (!href || scrapedHrefs.has(href)) continue;

        const name = (card.getAttribute('aria-label') || '').trim();
        if (!name) continue;

        scrapedHrefs.add(href);
        foundNew = true;
        scraped++;

        // ── FAST PASS: extract from card DOM immediately ──
        let data = extractFromCard(card);

        // ── DETAIL PASS: click card to get phone/website ──
        if (needsDetail || !data.address) {
          card.click();
          await sleep(T.afterClick);
          await sleep(T.afterPanel);
          data = await extractDetailPanel(data);
        }

        sendToPopup('SCRAPE_RESULT', { lead: data, count: scraped });
        sendToPopup('SCRAPE_STATUS', {
          status: 'running',
          message: `Scraped ${scraped}/${maxResults}: ${data.name}`,
        });

        if (scraped >= maxResults) break;
        await sleep(T.betweenItems);
      }

      // If we got no new cards this round, scroll to load more
      if (!foundNew || cards.length === prevCount) {
        noNewRounds++;
        if (noNewRounds >= 3) break; // No more results available
        await scrollList(listEl, 3);
        prevCount = cards.length;
      } else {
        noNewRounds = 0;
        prevCount = cards.length;
        // Scroll a bit each batch too
        await scrollList(listEl, 2);
      }
    }

    if (isRunning) {
      sendToPopup('SCRAPE_STATUS', {
        status: 'done',
        message: `✅ Done! ${scraped} leads scraped.`,
        count: scraped,
      });
    }

    isRunning = false;
    window.__leadScraperRunning = false;
  }

  // ─── Message listener ──────────────────────────────────────
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'START_SCRAPE') {
      if (!isRunning) startScraping(message.options);
      sendResponse({ ok: true });
      return true;
    }
    if (message.type === 'PAUSE_SCRAPE') {
      isPaused = !isPaused;
      sendResponse({ paused: isPaused });
      return true;
    }
    if (message.type === 'STOP_SCRAPE') {
      isRunning = false;
      isPaused  = false;
      window.__leadScraperRunning = false;
      sendResponse({ ok: true });
      return true;
    }
    if (message.type === 'PING') {
      sendResponse({ alive: true });
      return true;
    }
  });

  sendToPopup('CONTENT_READY', { url: window.location.href });
  console.log('[LeadScraper v3] Ready — speed optimized');
})();
