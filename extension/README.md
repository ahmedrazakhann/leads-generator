# 🗺️ Google Maps Lead Scraper — Chrome Extension

A powerful Chrome extension that automatically scrapes business leads from Google Maps search results and exports them to **CSV** or **Excel (XLSX)**.

---

## 📦 Installation (Load Unpacked)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer Mode** (toggle top-right)
3. Click **Load unpacked**
4. Select the `extension/` folder in this repo
5. The extension icon will appear in your toolbar

---

## 🚀 How to Use

1. Go to **[Google Maps](https://www.google.com/maps)**
2. Search for any business category + location  
   Example: `"restaurants in New York"` or `"dentists in London"`
3. Click the **LeadScraper** extension icon
4. Choose your settings:
   - **Max Results** (1–500)
   - **Export Format** (CSV or Excel)
   - **Fields** to include (Name, Phone, Address, etc.)
5. Click **▶ Start Scraping**
6. Watch leads appear in real-time in the table
7. Click **Export** to download the file

---

## 📋 Scraped Fields

| Field | Description |
|-------|-------------|
| Name | Business name |
| Category | Business type/category |
| Address | Full street address |
| Phone | Phone number |
| Website | Business website URL |
| Rating | Star rating (e.g. 4.5) |
| Reviews | Number of reviews |
| Hours | Operating hours |
| Plus Code | Google Plus Code |
| Maps URL | Direct Google Maps link |

---

## 📁 File Structure

```
extension/
├── manifest.json           # Chrome MV3 manifest
├── background/
│   └── service_worker.js   # Background service worker
├── content/
│   └── scraper.js          # Injected into Google Maps
├── popup/
│   ├── popup.html          # Extension UI
│   ├── popup.css           # Dark premium styles
│   └── popup.js            # UI controller + export logic
├── icons/                  # Extension icons (16/32/48/128px)
└── lib/
    └── xlsx.full.min.js    # SheetJS for Excel export
```

---

## ⚠️ Notes

- Google Maps DOM selectors may change over time. If scraping stops working, the selectors in `content/scraper.js` may need updating.
- This extension is for **personal/research use only**. Always respect Google's Terms of Service.
- Scraping speed is intentionally throttled to avoid triggering rate limits.

---

## 🛠️ Tips

- For best results, **zoom out** on the map so more results are visible
- The scraper auto-scrolls the results list to load more businesses
- Use **Pause** to temporarily stop without losing collected data
- **Append** multiple searches in one session — data accumulates until you click Clear

---

Built with ❤️ using Chrome Extensions MV3 + SheetJS
