(function () {
  'use strict';
  if (window.__leadScraperRunning) {
    console.log('[LeadScraper] Already running');
    return;
  }
  let isRunning = false;
  let isPaused  = false;
  let scrapedHrefs = new Set();