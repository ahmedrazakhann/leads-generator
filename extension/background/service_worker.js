// Background Service Worker — Google Maps Lead Scraper

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tab: tabs[0] });
    });
    return true; // async
  }

  if (message.type === 'INJECT_SCRAPER') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs[0];
      if (!tab) return sendResponse({ success: false, error: 'No active tab' });

      try {
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content/scraper.js'],
        });
        sendResponse({ success: true });
      } catch (e) {
        sendResponse({ success: false, error: e.message });
      }
    });
    return true;
  }

  if (message.type === 'RELAY_TO_POPUP') {
    // Relay content script messages to the popup
    chrome.runtime.sendMessage(message).catch(() => {});
  }
});
