import React from 'react';
import { Zap, FileText, SlidersHorizontal, Lock, RefreshCw, LayoutList } from 'lucide-react';
import './Features.css';

const FEATURES = [
  {
    icon: <Zap size={24} />, title: 'Save Hours of Manual Work',
    desc: 'Our extension automatically scrolls through Google Maps and picks up every lead. You do not have to click anything yourself. Get 100 leads in less than 2 minutes.',
    bullets: ['Automatic scrolling', 'No duplicate leads', 'Pause and start anytime'],
    wide: true,
  },
  {
    icon: <LayoutList size={24} />, title: 'Get All Important Data',
    desc: 'We collect everything you need. Names, categories, addresses, phone numbers, websites, ratings, and even opening hours.',
  },
  {
    icon: <FileText size={24} />, title: 'Export to Excel or CSV',
    desc: 'Download your list with one click. Use it immediately in Excel, Google Sheets, or any other tool you like.',
  },
  {
    icon: <SlidersHorizontal size={24} />, title: 'Pick Only What You Need',
    desc: 'Choose exactly which data you want to save. This keeps your files clean and saves you time.',
  },
  {
    icon: <Lock size={24} />, title: 'Your Data is Private',
    desc: 'Everything stays on your computer. We do not store your leads on any server. No accounts or signups needed.',
  },
  {
    icon: <RefreshCw size={24} />, title: 'Collect More over Time',
    desc: 'Leads stay in your list as you search for different things. Build a massive database in one session.',
  },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Features</div>
          <h2>Everything You Need to <span className="grad-text">Build Your List</span></h2>
          <p>Stop wasting time copying data by hand. Our tool does the hard work for you so you can focus on selling.</p>
        </div>

        <div className="features__grid">
          {FEATURES.map((f) => (
            <div key={f.title} className={`features__card ${f.wide ? 'features__card--wide' : ''}`}>
              <div className="features__icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              {f.bullets && (
                <ul className="features__bullets">
                  {f.bullets.map(b => (
                    <li key={b}>
                      <span className="features__check">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#14b8a6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
