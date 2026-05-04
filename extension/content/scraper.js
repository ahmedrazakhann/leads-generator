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

  const GROQ_API_KEY = '';

  async function getAIInsight(data) {
    const prompt = `You are a friendly business growth advisor. Analyze this business:
Name: ${data.name}
Category: ${data.category}
Rating: ${data.rating}
Reviews: ${data.reviews}
Website: ${data.website || 'None'}

In one short, natural, human-sounding sentence, suggest the best way to help them grow.
Speak like a person, not a robot. Use phrases like "I'd suggest offering..." or "They look like a great candidate for...". 
Do not use labels like "Opportunity:" or "Service:". Just give the advice directly.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 60,
          temperature: 0.7
        })
      });
      const json = await response.json();
      return json.choices[0].message.content.trim().replace(/^"/, '').replace(/"$/, '');
    } catch (e) {
      return 'Potential upsell for digital services.';
    }
  }

  // ─── Helpers ──────────────────────────────────────────────
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  function extractLocation(address) {
    if (!address) return { city: '', country: '' };
    const parts = address.split(',').map(p => p.trim());
    if (parts.length === 1) return { city: '', country: parts[0] };
    
    let country = parts[parts.length - 1];
    let city = parts[parts.length - 2];

    // If country looks like a postcode (lots of digits) or is very short, 
    // it might be a partial address, but we'll stick to last 2 parts for now.
    // If there are 3+ parts and the 2nd to last has digits (postcode), take 3rd to last.
    if (/\d/.test(city) && parts.length >= 3) {
      city = parts[parts.length - 3];
    }
    
    return { city, country };
  }

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
  function extractFromCard(container) {
    const linkEl = container.querySelector('a.hfpxzc');
    if (!linkEl) return null;

    // Name
    const nameEl = container.querySelector('.qBF1Pd');
    const name = (nameEl ? nameEl.innerText : linkEl.getAttribute('aria-label') || '').trim();

    // href contains the place URL
    const href = linkEl.getAttribute('href') || '';
    const mapsUrl = href.startsWith('http') ? href : 'https://www.google.com' + href;

    // Rating
    const ratingEl = container.querySelector('.MW4etd');
    let rating = ratingEl ? ratingEl.innerText.trim().replace(',', '.') : '';

    // Reviews
    const reviewsEl = container.querySelector('.UY7F9');
    let reviews = '';
    if (reviewsEl) {
      const revMatch = reviewsEl.innerText.match(/\(([\d,.]+)\)/) || reviewsEl.innerText.match(/([\d,.]+)/);
      if (revMatch) {
        reviews = revMatch[1].replace(/[,.]/g, '');
      }
    }

    // Category & Address
    let category = '';
    let address = '';
    const infoLines = Array.from(container.querySelectorAll('.W44u9b, .AJ79B, .fontBodyMedium span')).map(s => s.innerText.trim()).filter(Boolean);
    
    for (const t of infoLines) {
      if (!t || t === name || t === rating || t.includes(reviews)) continue;
      if (!category && t.length < 40 && !/\d/.test(t) && !/,/.test(t)) {
        category = t;
      }
      if (!address && ((/\d/.test(t) && t.length > 8) || /,.+,.+/.test(t))) {
        address = t;
      }
    }

    // Image URL
    let imageUrl = '';
    const imgEl = container.querySelector('img');
    if (imgEl) {
      imageUrl = imgEl.src || '';
    }

    const { city, country } = extractLocation(address);

    return { name, category, address, city, country, rating, reviews, phone: '', website: '', hours: '', plusCode: '', mapsUrl, imageUrl, aiInsight: '' };
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

    // Re-extract City & Country from updated address
    const { city, country } = extractLocation(baseData.address);
    baseData.city = city;
    baseData.country = country;

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
    const needsDetail = fields.some(f => ['phone', 'website', 'hours', 'plusCode', 'score'].includes(f));

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

      const cards = qsa('div.Nv2PK');

      if (cards.length === 0) {
        // Fallback to older selector if needed
        const fallbackCards = qsa('a.hfpxzc');
        if (fallbackCards.length === 0) {
          sendToPopup('SCRAPE_STATUS', {
            status: 'error',
            message: '❌ No result cards found. Make sure you have search results visible.',
          });
          break;
        }
      }

      let foundNew = false;

      for (const card of cards) {
        if (!isRunning) break;
        while (isPaused && isRunning) await sleep(300);

        const linkEl = card.querySelector('a.hfpxzc');
        const href = linkEl ? linkEl.getAttribute('href') || '' : '';
        if (!href || scrapedHrefs.has(href)) continue;

        scrapedHrefs.add(href);
        foundNew = true;
        scraped++;

        // ── FAST PASS: extract from card DOM immediately ──
        let data = extractFromCard(card);
        if (!data) continue;

        // ── DETAIL PASS: click card to get phone/website ──
        if (needsDetail || !data.address) {
          if (linkEl) linkEl.click();
          await sleep(T.afterClick);
          await sleep(T.afterPanel);
          data = await extractDetailPanel(data);
        }

        // ── CALCULATE SCORE ──
        let score = 0;
        const revNum = parseInt(data.reviews) || 0;
        const ratNum = parseFloat(data.rating) || 0;
        
        if (revNum > 100) score += 2;
        if (ratNum > 0 && ratNum < 4) score += 2;
        if (!data.website) score += 3;
        data.score = score;

        // ── GENERATE AI INSIGHT ──
        data.aiInsight = await getAIInsight(data);

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
