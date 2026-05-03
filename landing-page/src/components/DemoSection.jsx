import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Zap, FileDown, Star } from 'lucide-react';
import './DemoSection.css';

/* Mock lead data for animation */
const LEADS = [
  { name: 'Zuma Dubai',        phone: '+971 4 425 5660', rating: '4.8', category: 'Japanese Restaurant', website: 'zumarestaurant.com' },
  { name: 'Nobu Dubai',        phone: '+971 4 818 1111', rating: '4.7', category: 'Fine Dining',          website: 'noburestaurants.com' },
  { name: 'Nusr-Et Steakhouse',phone: '+971 4 667 5880', rating: '4.5', category: 'Steakhouse',           website: 'nusr-et.com.tr' },
  { name: 'Nammos Dubai',      phone: '+971 4 376 7476', rating: '4.6', category: 'Mediterranean',        website: 'nammosworld.com' },
  { name: 'La Petite Maison',  phone: '+971 4 439 0505', rating: '4.7', category: 'French Restaurant',    website: 'lpmdubai.ae' },
  { name: 'Ossiano',           phone: '+971 4 426 2626', rating: '4.9', category: 'Seafood',              website: 'atlantis.com' },
];

const PINS = [
  { x: '22%', y: '38%', delay: 0,   color: '#14b8a6' },
  { x: '45%', y: '55%', delay: 0.4, color: '#3b82f6' },
  { x: '62%', y: '28%', delay: 0.8, color: '#14b8a6' },
  { x: '35%', y: '68%', delay: 1.2, color: '#8b5cf6' },
  { x: '72%', y: '48%', delay: 1.6, color: '#14b8a6' },
  { x: '55%', y: '72%', delay: 2.0, color: '#3b82f6' },
];

export default function DemoSection() {
  const [visibleRows, setVisibleRows] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const sectionRef = useRef(null);

  const startDemo = () => {
    setVisibleRows(0);
    setProgress(0);
    setScanning(true);
    let count = 0;
    intervalRef.current = setInterval(() => {
      count++;
      setVisibleRows(count);
      setProgress(Math.round((count / LEADS.length) * 100));
      if (count >= LEADS.length) {
        clearInterval(intervalRef.current);
        setScanning(false);
      }
    }, 900);
  };

  // Auto-start when section enters viewport
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) startDemo(); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => { obs.disconnect(); clearInterval(intervalRef.current); };
  }, []);

  return (
    <section className="demo" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">See it in Action</div>
          <h2>Scraping <span className="grad-text">Made Simple</span></h2>
          <p>Watch how it automatically finds data while you sit back and relax.</p>
        </div>

        <div className="demo__stage">

          {/* ── Left: Google Maps SVG ── */}
          <div className="demo__map-wrap">
            <div className="demo__map-header">
              <div className="demo__map-search">
                <MapPin size={13} color="#14b8a6" />
                <span>dentists in London, UK</span>
              </div>
              <div className="demo__map-controls">
                <div className="demo__map-btn" />
                <div className="demo__map-btn" />
              </div>
            </div>
            <div className="demo__map">
              <img src="/images/london_map.png" alt="Google Maps London Dentists" className="demo__map-img" />


              {/* Animated pins */}
              {PINS.map((pin, i) => (
                <div
                  key={i}
                  className={`demo__pin ${i < visibleRows ? 'demo__pin--active' : ''}`}
                  style={{ left: pin.x, top: pin.y, animationDelay: `${pin.delay}s`, '--pin-color': pin.color }}
                >
                  <MapPin size={22} fill={pin.color} color={pin.color} />
                  {i < visibleRows && (
                    <div className="demo__pin-tooltip">{LEADS[i]?.name}</div>
                  )}
                </div>
              ))}

              {/* Scan line animation */}
              {scanning && <div className="demo__scan-line" />}
            </div>
          </div>

          {/* ── Right: Extension popup + results ── */}
          <div className="demo__popup-wrap">
            <div className="demo__popup">
              <div className="demo__popup-top">
                <div className="demo__popup-logo">
                  <MapPin size={14} color="#14b8a6" />
                  <span>Map<b>Leads</b> Pro</span>
                </div>
                <div className="demo__popup-badge">{visibleRows} / {LEADS.length}</div>
              </div>

              <div className="demo__progress">
                <div className="demo__progress-track">
                  <div className="demo__progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span>{progress}%</span>
              </div>

              <div className={`demo__status ${scanning ? 'demo__status--running' : 'demo__status--done'}`}>
                <span className="demo__status-dot" />
                {scanning ? `Searching... ${visibleRows} found` : visibleRows > 0 ? `Finished! ${visibleRows} leads saved` : 'Ready to start'}
              </div>

              <div className="demo__table">
                <div className="demo__table-head">
                  <span>Business</span><span>Rating</span><span>Phone</span>
                </div>
                <div className="demo__table-body">
                  {LEADS.slice(0, visibleRows).map((lead, i) => (
                    <div key={lead.name} className="demo__table-row">
                      <span className="demo__lead-name">{lead.name}</span>
                      <span className="demo__lead-rating">
                        <Star size={10} fill="#f59e0b" color="#f59e0b" /> {lead.rating}
                      </span>
                      <span className="demo__lead-phone">{lead.phone.slice(0, 12)}</span>
                    </div>
                  ))}
                  {visibleRows < LEADS.length && (
                    <div className="demo__table-placeholder">
                      <div className="demo__skeleton" />
                      <div className="demo__skeleton demo__skeleton--sm" />
                    </div>
                  )}
                </div>
              </div>

              {!scanning && visibleRows > 0 && (
                <div className="demo__export-row">
                  <button className="demo__export-btn" onClick={startDemo}>
                    <Zap size={12} /> Try Again
                  </button>
                  <button className="demo__export-btn demo__export-btn--primary">
                    <FileDown size={12} /> Export CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
