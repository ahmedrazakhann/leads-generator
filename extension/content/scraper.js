(function () {
  'use strict';
  if (window.__leadScraperRunning) {
    console.log('[LeadScraper] Already running');
    return;
  }
  let isRunning = false;
  let isPaused  = false;
  let scrapedHrefs = new Set();
  const T = {
    afterClick:    900,
    afterPanel:    800,
    betweenItems:   80,
    scrollWait:    700,
  };
  let currentGroqKey = '';

  async function getAIAnalysis(data) {
    if (!currentGroqKey) return { leadInsight: '', whatToSell: '', competitor: '', coldCallScript: '' };
    const prompt = `You are an expert sales strategist who follows modern, human-first cold calling principles (non-pushy, conversational, value-driven).

Analyze this business lead:
Name: ${data.name}
Category: ${data.category}
Rating: ${data.rating}
Reviews: ${data.reviews}
Website: ${data.website || 'None'}
Phone: ${data.phone || 'None'}

Please provide:

1. Lead Insight:
A short, sharp observation about what they are missing or where they are weak.

2. What to Sell:
The most relevant service to help them improve (simple and clear).

3. Competitor:
Provide the name of a real, specific competitor in the same area. If you are not 100% sure of a specific name, return "Top-rated nearby competitors".

4. Cold Call Script:
Write a highly specific, data-driven cold call script (approx 150-180 words).

Script MUST follow this data-driven structure:
- Professional Opening (10s): Casual but business-ready.
- Data Reference (15s): Mention their REAL stats (e.g., "I saw you have ${data.reviews} reviews with a ${data.rating} rating").
- Specific Problem (15s): Connect their data to a gap (e.g., "With that many reviews, missing a ${data.website ? 'modern booking system' : 'website'} is likely costing you 20% in direct leads").
- Opportunity & Solution (15s): Explain how your service turns that gap into profit.
- Low-Pressure Close (5s): A simple question to start a chat.

Tone rules:
- No generic templates. Use the specific business category and location context.
- Sound like a researcher who found a genuine opportunity for them.

Return ONLY a JSON object with keys:
leadInsight, whatToSell, competitor, coldCallScript.
Do not include any extra text.`;
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${currentGroqKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 600,
          temperature: 0.6,
          response_format: { type: "json_object" }
        })
      });
      const json = await response.json();
      const content = JSON.parse(json.choices?.[0]?.message?.content || '{}');
      console.log('[LeadScraper] AI Analysis Complete for:', data.name);
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
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  function extractLocation(address) {
    if (!address) return { city: '', country: '' };
    const parts = address.split(',').map(p => p.trim());
    if (parts.length === 1) return { city: '', country: parts[0] };
    let country = parts[parts.length - 1];
    let city = '';
    for (let i = parts.length - 2; i >= 0; i--) {
      let segment = parts[i];
      let clean = segment.replace(/\b\d+[\w\s]*\b/g, '').trim();
      if (clean && clean.length > 2 && !/^\d/.test(segment)) {
        city = clean;
        break;
      }
    }
    if (!city && parts.length >= 2) {
      city = parts[parts.length - 2].split(' ')[0];
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
  function extractFromCard(container) {
    let linkEl = container.tagName === 'A' ? container : container.querySelector('a.hfpxzc');
    if (!linkEl) return null;
    const realContainer = container.tagName === 'A' ? container.closest('.Nv2PK, .Ua6m6c, .jANv9b') || container : container;
    const nameEl = realContainer.querySelector('.qBF1Pd, .fontHeadlineSmall, [aria-label]');
    const name = (nameEl ? (nameEl.innerText || nameEl.getAttribute('aria-label')) : linkEl.getAttribute('aria-label') || '').trim();
    const href = linkEl.getAttribute('href') || '';
    const mapsUrl = href.startsWith('http') ? href : 'https://www.google.com' + href;
    const ratingEl = realContainer.querySelector('.MW4etd, .fontBodyMedium span[aria-label*="stars"]');
    let rating = '';
    if (ratingEl) {
      const ratMatch = ratingEl.innerText.trim().replace(',', '.') || ratingEl.getAttribute('aria-label')?.match(/[\d.]+/)?.[0];
      rating = ratMatch || '';
    }
    const reviewsEl = realContainer.querySelector('.UY7F9, .fontBodyMedium span[aria-label*="review"]');
    let reviews = '';
    if (reviewsEl) {
      const revStr = reviewsEl.innerText || reviewsEl.getAttribute('aria-label') || '';
      const revMatch = revStr.match(/\(([\d,.]+)\)/) || revStr.match(/([\d,.]+)/);
      if (revMatch) {
        reviews = revMatch[1].replace(/[,.]/g, '');
      }
    }
    let category = '';
    let address = '';
    const infoLines = Array.from(realContainer.querySelectorAll('.W44u9b, .AJ79B, .fontBodyMedium span, .lS30S')).map(s => s.innerText.trim()).filter(Boolean);
    for (const t of infoLines) {
      if (!t || t === name || t === rating || t.includes(reviews)) continue;
      if (!category && t.length < 40 && !/\d/.test(t) && !/,/.test(t)) {
        category = t;
      }
      if (!address && ((/\d/.test(t) && t.length > 8) || /,.+,.+/.test(t))) {
        address = t;
      }
    }
    let imageUrl = '';
    const imgEl = realContainer.querySelector('img');
    if (imgEl) imageUrl = imgEl.src || '';
    let website = '';
    const webCardEl = realContainer.querySelector('a[aria-label*="Website"], a[data-value="Website"]');
    if (webCardEl) website = webCardEl.href || '';
    const { city, country } = extractLocation(address);
    return { 
      name, category, address, city, country, rating, reviews, 
      phone: '', website, hours: '', plusCode: '', mapsUrl, imageUrl, 
      leadInsight: '', whatToSell: '', competitor: '', coldCallScript: '', leadType: '' 
    };
  }
  async function extractDetailPanel(baseData) {
    const phoneEl = qs('button[aria-label*="Phone:"], [data-item-id*="phone:tel"] .Io6YTe, a[href^="tel:"]');
    if (phoneEl) {
      const ariaLabel = phoneEl.getAttribute('aria-label') || '';
      baseData.phone = ariaLabel.replace(/^Phone:\s*/i, '').trim()
        || phoneEl.getAttribute('href')?.replace('tel:', '').trim()
        || phoneEl.innerText.trim();
    }
    const addrEl = qs('button[aria-label*="Address:"], [data-item-id*="address"] .Io6YTe');
    if (addrEl) {
      const ariaLabel = addrEl.getAttribute('aria-label') || '';
      const panelAddr = ariaLabel.replace(/^Address:\s*/i, '').trim() || addrEl.innerText.trim();
      if (panelAddr) baseData.address = panelAddr;
    }
    const catEl = qs('.DkEaL, [jsaction*="category"] .fontBodyMedium');
    if (catEl) {
      const panelCat = catEl.innerText.trim();
      if (panelCat) baseData.category = panelCat;
    }
    const webEl = qs('a[data-item-id="authority"], a[aria-label*="Website:"], [data-item-id="authority"] a, a[jsaction*="website"], a[data-value="Website"]');
    if (webEl && webEl.href) {
      if (webEl.href.includes('google.com/url')) {
        try {
          const url = new URL(webEl.href);
          baseData.website = url.searchParams.get('q') || url.searchParams.get('url') || webEl.href;
        } catch { baseData.website = webEl.href; }
      } else if (!webEl.href.includes('google.com/search')) {
        baseData.website = webEl.href;
      }
    } else {
      const allLinks = qsa('.m67Hec a, .R61m6b a, .CsS9M a, [role="main"] a');
      for (const a of allLinks) {
        const h = a.href || '';
        if (h && !h.includes('google.com') && !h.includes('gstatic.com') && !h.startsWith('tel:')) {
          if (a.querySelector('img[src*="public/images/quill/listing/web"]') || a.innerText.toLowerCase().includes('website') || a.getAttribute('aria-label')?.toLowerCase().includes('website')) {
            baseData.website = h;
            break;
          }
        }
      }
    }
    if (!baseData.website) {
      const webBtn = qs('button[aria-label*="Website"]');
      if (webBtn) {
        const aria = webBtn.getAttribute('aria-label') || '';
        const match = aria.match(/https?:\/\/[^\s]+/);
        if (match) baseData.website = match[0];
      }
    }
    if (!baseData.rating) {
      const ratingEl = qs('span[aria-label*="stars"]');
      if (ratingEl) {
        const ratingMatch = (ratingEl.getAttribute('aria-label') || '').match(/[\d.]+/);
        baseData.rating = ratingMatch?.[0] || '';
      }
    }
    if (!baseData.reviews) {
      const reviewsEl = qs('button[aria-label*="review"]');
      if (reviewsEl) {
        const reviewMatch = (reviewsEl.getAttribute('aria-label') || '').match(/[\d,]+/);
        baseData.reviews = reviewMatch?.[0]?.replace(/,/g, '') || '';
      }
    }
    const hoursEl = qs('button[aria-label*="Hours"]');
    if (hoursEl) {
      baseData.hours = (hoursEl.getAttribute('aria-label') || '')
        .replace(/^Hours[^:]*:\s*/i, '').trim() || hoursEl.innerText.trim();
    }
    const plusEl = qs('[data-item-id*="oloc"] .Io6YTe, button[aria-label*="Plus code"]');
    if (plusEl) {
      baseData.plusCode = (plusEl.getAttribute('aria-label') || '')
        .replace(/^Plus code:\s*/i, '').trim() || plusEl.innerText.trim();
    }
    const { city, country } = extractLocation(baseData.address);
    baseData.city = city;
    baseData.country = country;
    return baseData;
  }
  async function scrollList(listEl, times = 4) {
    for (let i = 0; i < times; i++) {
      if (!isRunning || isPaused) break;
      listEl.scrollBy(0, 2500);
      await sleep(T.scrollWait);
    }
  }
  async function startScraping(options = {}) {
    const { maxResults = 10, fields = [] } = options;
    const needsDetail = fields.some(f => ['phone', 'website', 'hours', 'plusCode', 'leadType'].includes(f));
    isRunning = true;
    isPaused  = false;
    scrapedHrefs.clear();
    window.__leadScraperRunning = true;
    sendToPopup('SCRAPE_STATUS', { status: 'running', message: 'Locating results list...' });
    let listEl = qs('div[role="feed"]') || qs('div.m67Hec') || qs('div[role="main"] div[jsaction*="scroll"]');
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
      while (isPaused && isRunning) await sleep(300);
      if (!isRunning) break;
      let cards = qsa('.Nv2PK, .Ua6m6c, .jANv9b, .THL2l, a.hfpxzc');
      if (cards.length === 0) {
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
        const urlIdMatch = href.match(/!1s(0x[a-f0-9]+:0x[a-f0-9]+)/i);
        const normalizedId = urlIdMatch ? urlIdMatch[1] : href.split('?')[0].split('@')[0];
        const name = (card.tagName === 'A') ? card.getAttribute('aria-label') : (card.querySelector('.qBF1Pd, .fontHeadlineSmall')?.innerText || '');
        const rawAddr = (card.querySelector('.W44u9b, .AJ79B, .fontBodyMedium span:last-child')?.innerText || '');
        const dedupeKey = (name + '|' + rawAddr).toLowerCase().replace(/\s+/g, '');
        if (scrapedHrefs.has(normalizedId) || (rawAddr && scrapedHrefs.has(dedupeKey))) continue;
        scrapedHrefs.add(normalizedId);
        if (rawAddr) scrapedHrefs.add(dedupeKey);
        foundNew = true;
        scraped++;
        let data = extractFromCard(card);
        if (!data) continue;
        if (needsDetail || !data.address) {
          if (linkEl) linkEl.click();
          await sleep(T.afterClick);
          await sleep(T.afterPanel);
          data = await extractDetailPanel(data);
        }
        data.rating = data.rating.toString().match(/[\d.]+/)?.[0] || '';
        data.reviews = data.reviews.toString().replace(/\D/g, '');
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
        sendToPopup('SCRAPE_RESULT', { lead: data, count: scraped });
        sendToPopup('SCRAPE_STATUS', {
          status: 'running',
          message: `Scraped ${scraped}/${maxResults}: ${data.name}`,
        });
        if (fields.includes('leadInsight') || fields.includes('whatToSell') || fields.includes('coldCallScript') || fields.includes('competitor')) {
          console.log('[LeadScraper] Triggering AI for:', data.name);
          (async () => {
            const analysis = await getAIAnalysis(data);
            console.log('[LeadScraper] Sending AI update to popup for:', data.name);
            sendToPopup('SCRAPE_UPDATE', { 
              mapsUrl: data.mapsUrl, 
              name: data.name,
              address: data.address,
              analysis 
            });
          })();
        }
        if (scraped >= maxResults) break;
        await sleep(T.betweenItems);
      }
      if (!foundNew || cards.length === prevCount) {
        noNewRounds++;
        if (noNewRounds >= 5) break;
        sendToPopup('SCRAPE_STATUS', {
          status: 'running',
          message: `Scrolling to find more leads... (Attempt ${noNewRounds}/5)`,
        });
        await scrollList(listEl, 4);
        prevCount = cards.length;
      } else {
        noNewRounds = 0;
        prevCount = cards.length;
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
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'START_SCRAPE') {
      if (message.options?.groqKey) currentGroqKey = message.options.groqKey;
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
