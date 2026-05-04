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

  async function getAIAnalysis(data) {
    if (!GROQ_API_KEY) return { leadInsight: '', whatToSell: '', coldCallScript: '' };
    
    const prompt = `You are a high-end business consultant and sales strategist. Analyze this business lead:
Name: ${data.name}
Category: ${data.category}
Rating: ${data.rating}
Reviews: ${data.reviews}
Website: ${data.website || 'None'}
Phone: ${data.phone || 'None'}

Please provide:
1. Lead Insight: A short, punchy sentence about what is missing or weak (e.g., "No website, missing online customers").
2. What to Sell: The best service to offer them based on their weakness.
3. Competitor: Identify a likely top competitor in the same area/category.
4. Cold Call Script: A short, professional sales script (under 60 words).
Structure:
Personalized opening
The problem you noticed
The opportunity
Simple pitch
Closing line

Return the result as a JSON object with keys: leadInsight, whatToSell, competitor, coldCallScript. 
Do not include any other text, just the JSON.`;

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
          max_tokens: 300,
          temperature: 0.6,
          response_format: { type: "json_object" }
        })
      });
      const json = await response.json();
      const content = JSON.parse(json.choices?.[0]?.message?.content || '{}');
      return {
        leadInsight: content.leadInsight || '',
        whatToSell: content.whatToSell || '',
        competitor: content.competitor || '',
        coldCallScript: content.coldCallScript || ''
      };
    } catch (e) {
      console.error('[LeadScraper] AI Error:', e);
      return { leadInsight: '', whatToSell: '', competitor: '', coldCallScript: '' };
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
    let linkEl = container.tagName === 'A' ? container : container.querySelector('a.hfpxzc');
    if (!linkEl) return null;

    // If we passed the link, find the container div for better context
    const realContainer = container.tagName === 'A' ? container.closest('.Nv2PK, .Ua6m6c, .jANv9b') || container : container;

    // Name
    const nameEl = realContainer.querySelector('.qBF1Pd, .fontHeadlineSmall, [aria-label]');
    const name = (nameEl ? (nameEl.innerText || nameEl.getAttribute('aria-label')) : linkEl.getAttribute('aria-label') || '').trim();

    // href contains the place URL
    const href = linkEl.getAttribute('href') || '';
    const mapsUrl = href.startsWith('http') ? href : 'https://www.google.com' + href;

    // Rating
    const ratingEl = realContainer.querySelector('.MW4etd, .fontBodyMedium span[aria-label*="stars"]');
    let rating = '';
    if (ratingEl) {
      const ratMatch = ratingEl.innerText.trim().replace(',', '.') || ratingEl.getAttribute('aria-label')?.match(/[\d.]+/)?.[0];
      rating = ratMatch || '';
    }

    // Reviews
    const reviewsEl = realContainer.querySelector('.UY7F9, .fontBodyMedium span[aria-label*="review"]');
    let reviews = '';
    if (reviewsEl) {
      const revStr = reviewsEl.innerText || reviewsEl.getAttribute('aria-label') || '';
      const revMatch = revStr.match(/\(([\d,.]+)\)/) || revStr.match(/([\d,.]+)/);
      if (revMatch) {
        reviews = revMatch[1].replace(/[,.]/g, '');
      }
    }

    // Category & Address
    let category = '';
    let address = '';
    const infoLines = Array.from(realContainer.querySelectorAll('.W44u9b, .AJ79B, .fontBodyMedium span, .lS30S')).map(s => s.innerText.trim()).filter(Boolean);
    
    for (const t of infoLines) {
      if (!t || t === name || t === rating || t.includes(reviews)) continue;
      // Category is usually short and doesn't have numbers
      if (!category && t.length < 40 && !/\d/.test(t) && !/,/.test(t)) {
        category = t;
      }
      // Address usually has a comma or numbers
      if (!address && ((/\d/.test(t) && t.length > 8) || /,.+,.+/.test(t))) {
        address = t;
      }
    }

    // Image URL
    let imageUrl = '';
    const imgEl = realContainer.querySelector('img');
    if (imgEl) {
      imageUrl = imgEl.src || '';
    }

    const { city, country } = extractLocation(address);

    return { 
      name, category, address, city, country, rating, reviews, 
      phone: '', website: '', hours: '', plusCode: '', mapsUrl, imageUrl, 
      leadInsight: '', whatToSell: '', competitor: '', coldCallScript: '', leadType: '' 
    };
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
    const needsDetail = fields.some(f => ['phone', 'website', 'hours', 'plusCode', 'leadType'].includes(f));

    isRunning = true;
    isPaused  = false;
    scrapedHrefs.clear();
    window.__leadScraperRunning = true;

    sendToPopup('SCRAPE_STATUS', { status: 'running', message: 'Locating results list...' });

    let listEl = qs('div[role="feed"]') || qs('div.m67Hec') || qs('div[role="main"] div[jsaction*="scroll"]');
    
    // If still not found, try to find the container of the cards
    if (!listEl) {
      const firstCard = qs('.Nv2PK, .Ua6m6c, a.hfpxzc');
      if (firstCard) {
        listEl = firstCard.parentElement;
        while (listEl && listEl.scrollHeight <= listEl.clientHeight) {
          listEl = listEl.parentElement;
        }
      }
    }

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

      // Broad selector for business cards
      let cards = qsa('.Nv2PK, .Ua6m6c, .jANv9b, .THL2l, a.hfpxzc');

      if (cards.length === 0) {
        // Retry with a scroll if nothing found
        await scrollList(listEl, 1);
        cards = qsa('.Nv2PK, .Ua6m6c, .jANv9b, .THL2l, a.hfpxzc');
        
        if (cards.length === 0) {
          sendToPopup('SCRAPE_STATUS', {
            status: 'error',
            message: '❌ No results found yet. Try scrolling the list manually.',
          });
          await sleep(2000);
          continue; 
        }
      }

      let foundNew = false;

      for (const card of cards) {
        if (!isRunning) break;
        while (isPaused && isRunning) await sleep(300);

        const linkEl = (card.tagName === 'A') ? card : card.querySelector('a.hfpxzc');
        let href = linkEl ? linkEl.getAttribute('href') || '' : '';
        if (!href) continue;

        // Normalize URL to prevent duplicates
        const urlIdMatch = href.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/i);
        const normalizedId = urlIdMatch ? urlIdMatch[1] : href.split('?')[0].split('@')[0];

        if (scrapedHrefs.has(normalizedId)) continue;

        scrapedHrefs.add(normalizedId);
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

        // ── CALCULATE LEAD TYPE ──
        const revNum = parseInt(data.reviews) || 0;
        const ratNum = parseFloat(data.rating) || 0;
        const hasWebsite = !!data.website;
        
        let leadType = 'Cold';
        if (!hasWebsite) {
          if (revNum > 10 || ratNum > 0) leadType = 'Hot';
          else leadType = 'Warm';
        } else if (ratNum > 0 && ratNum < 4.2) {
          leadType = 'Hot';
        } else if (revNum < 20) {
          leadType = 'Warm';
        }
        data.leadType = leadType;

        // ── GENERATE AI ANALYSIS ──
        if (fields.includes('leadInsight') || fields.includes('whatToSell') || fields.includes('coldCallScript') || fields.includes('competitor')) {
          const analysis = await getAIAnalysis(data);
          data.leadInsight = analysis.leadInsight;
          data.whatToSell = analysis.whatToSell;
          data.competitor = analysis.competitor;
          data.coldCallScript = analysis.coldCallScript;
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
        if (noNewRounds >= 5) break; // Increased patience
        
        sendToPopup('SCRAPE_STATUS', {
          status: 'running',
          message: `Scrolling to find more leads... (Attempt ${noNewRounds}/5)`,
        });
        
        await scrollList(listEl, 4); // More aggressive scroll
        prevCount = cards.length;
      } else {
        noNewRounds = 0;
        prevCount = cards.length;
        // Scroll a bit each batch too
        await scrollList(listEl, 1);
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
