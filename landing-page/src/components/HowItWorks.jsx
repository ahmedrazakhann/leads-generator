import React from 'react';
import { Search, Play, Download, ArrowRight } from 'lucide-react';
import './HowItWorks.css';

const STEPS = [
  {
    num: '01', icon: <Search size={32} />,
    title: 'Search on Google Maps',
    desc: 'Go to Google Maps. Type what you are looking for and where. For example, plumbers in Chicago.',
  },
  {
    num: '02', icon: <Play size={32} />,
    title: 'Start the Scraper',
    desc: 'Open the extension and click Start. Watch as it finds and saves every business listing for you.',
  },
  {
    num: '03', icon: <Download size={32} />,
    title: 'Download Your File',
    desc: 'When you are done, just click Export. You will get a clean Excel or CSV file with all your new leads.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">How It Works</div>
          <h2>3 Steps to <span className="grad-text">Your Next Customer</span></h2>
        </div>
        <div className="how__steps">
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <div className="how__card">
                <div className="how__num">{s.num}</div>
                <div className="how__icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div className="how__arrow"><ArrowRight size={22} /></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
