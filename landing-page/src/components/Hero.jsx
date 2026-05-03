import React from 'react';
import { MapPin, Download, ArrowRight, Zap, Star } from 'lucide-react';
import './Hero.css';

const STATS = [
  { value: '500+',      label: 'Leads per search'    },
  { value: '2 min',     label: 'To get 100 leads'    },
  { value: 'CSV + XLSX',label: 'Export formats'       },
  { value: 'Free',      label: 'No credit card'      },
];

export default function Hero() {
  const openModal = (e) => {
    e.preventDefault();
    document.getElementById('download-modal')?.classList.add('active');
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__glow hero__glow--1" />
      <div className="hero__glow hero__glow--2" />

      <div className="container hero__inner">
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          Free Chrome Extension. Works in 60 seconds.
        </div>

        <h1 className="hero__title">
          Get 500 Business Leads<br />
          from Google Maps <span className="grad-text">in 2 Minutes</span>
        </h1>

        <p className="hero__sub">
          Search anything on Google Maps. Hit Start. Watch names, phones, addresses,
          websites, and ratings fill up automatically. Export to Excel. Done.
        </p>

      

      

        {/* Browser Mockup */}
        <div className="mockup">
          <div className="mockup__browser">
            <div className="mockup__bar">
              <span className="mockup__dot mockup__dot--r" />
              <span className="mockup__dot mockup__dot--y" />
              <span className="mockup__dot mockup__dot--g" />
              <div className="mockup__url">google.com/maps/search/restaurants+in+Dubai</div>
            </div>
            <div className="mockup__body">
              <div className="mockup__map">
                <img src="/images/dubai_map.png" alt="Google Maps Dubai Restaurants" className="mockup__map-img" />
                <div className="mockup__pin mockup__pin--1"><MapPin size={18} fill="#14b8a6" color="#14b8a6"/></div>
                <div className="mockup__pin mockup__pin--2"><MapPin size={18} fill="#3b82f6" color="#3b82f6"/></div>
                <div className="mockup__pin mockup__pin--3"><MapPin size={18} fill="#14b8a6" color="#14b8a6"/></div>
                <div className="mockup__pin mockup__pin--4"><MapPin size={18} fill="#8b5cf6" color="#8b5cf6"/></div>
              </div>

              <div className="mockup__popup">
                <div className="mockup__popup-header">
                  <div className="mockup__popup-logo">
                    <MapPin size={13} color="#14b8a6"/>
                    <span>Map<b>Leads</b></span>
                  </div>
                  <span className="mockup__popup-badge">47 leads</span>
                </div>

                <div className="mockup__popup-controls">
                  <div className="mockup__popup-field">
                    <span>Max Results</span><b>100</b>
                  </div>
                  <div className="mockup__popup-field">
                    <span>Export As</span><b>Excel</b>
                  </div>
                </div>

                <button className="mockup__popup-btn">
                  <Zap size={11}/> Start Scraping
                </button>

                <div className="mockup__popup-table">
                  <div className="mockup__popup-th">
                    <span>Name</span><span>Phone</span><span>Rating</span>
                  </div>
                  {[
                    ['Zuma Dubai', '+971 4 425', '4.8'],
                    ['Nobu Dubai', '+971 4 818', '4.7'],
                    ['Nusr-Et',    '+971 4 667', '4.5'],
                  ].map(([name, phone, rating], i) => (
                    <div className="mockup__popup-tr" key={i} style={{ animationDelay: `${0.8 + i * 0.5}s` }}>
                      <span>{name}</span>
                      <span>{phone}</span>
                      <span className="mockup__rating">
                        <Star size={9} fill="#f59e0b" color="#f59e0b"/> {rating}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

          <div className="hero__cta-row" style={{marginTop: "2rem"}}>
          <a href="#download" className="btn btn-primary btn-lg" onClick={openModal}>
            <Download size={18} />
            Add to Chrome. It is Free.
          </a>
          <a href="#how-it-works" className="btn btn-outline btn-lg">
            See How It Works <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
