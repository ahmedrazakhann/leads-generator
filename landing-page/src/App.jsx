import React from 'react';
import {
  Phone, Globe, Star, Clock, Hash, Link2, Tag,
  Map, Building2, MapPin, Download, X,
  LayoutGrid, FileSpreadsheet, ShieldCheck
} from 'lucide-react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import DemoSection from './components/DemoSection';
import Stats from './components/Stats';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const INSTALL_STEPS = [
  { text: 'Open chrome://extensions/ in your browser', icon: <Globe size={20}/> },
  { text: 'Turn on Developer Mode at the top right', icon: <ShieldCheck size={20}/> },
  { text: 'Click on Load unpacked', icon: <FileSpreadsheet size={20}/> },
  { text: 'Select the extension folder', icon: <LayoutGrid size={20}/> },
];

function DownloadModal() {
  const close = () => document.getElementById('download-modal')?.classList.remove('active');
  return (
    <div className="modal-overlay" id="download-modal" onClick={e => e.target === e.currentTarget && close()}>
      <div className="modal">
        <button className="modal__close" onClick={close}><X size={16}/></button>
        <div className="modal__icon"><Download size={32} color="var(--teal)"/></div>
        <h3>Install MapLeads Pro</h3>
        <p>Follow these 4 quick steps to start using the extension.</p>
        <ol className="modal__steps">
          {INSTALL_STEPS.map((s, i) => (
            <li key={i}>
              <span className="modal__step-icon">{s.icon}</span>
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
        <button className="btn btn-primary btn-full" onClick={close}>I Understand</button>
      </div>
    </div>
  );
}

const INTEGRATIONS = ['Microsoft Excel', 'Google Sheets', 'HubSpot', 'Mailchimp', 'Salesforce', 'Zapier', 'Airtable'];

const FIELDS = [
  { icon: <Building2 size={15}/>, label: 'Business Name',  example: 'Zuma Dubai',              instant: true  },
  { icon: <Tag size={15}/>,       label: 'Category',       example: 'Japanese Restaurant',      instant: true  },
  { icon: <MapPin size={15}/>,    label: 'Address',        example: 'DIFC, Dubai, UAE',         instant: true  },
  { icon: <Star size={15}/>,      label: 'Rating',         example: '4.8',                      instant: true  },
  { icon: <Hash size={15}/>,      label: 'Reviews',        example: '3,241',                    instant: true  },
  { icon: <Phone size={15}/>,     label: 'Phone',          example: '+971 4 425 5660',          instant: false },
  { icon: <Globe size={15}/>,     label: 'Website',        example: 'zumarestaurant.com',       instant: false },
  { icon: <Clock size={15}/>,     label: 'Hours',          example: 'Open until 11 PM',         instant: false },
  { icon: <LayoutGrid size={15}/>,label: 'Plus Code',      example: '8H4W+M9 Dubai',            instant: false },
  { icon: <Link2 size={15}/>,     label: 'Maps URL',       example: 'google.com/maps/place/…',  instant: true  },
];

const TESTIMONIALS = [
  { initials: 'AK', name: 'Ahmad Khalil',   role: 'Sales Manager', quote: 'I found 400 restaurant leads in Dubai in just 5 minutes. This tool is amazing for my business.' },
  { initials: 'SR', name: 'Sarah Reynolds', role: 'Agency Owner',  quote: 'We used to pay $300 a month for this data. Now we get it for free. The phone numbers are very accurate.' },
  { initials: 'MR', name: 'Marco Ricci',    role: 'SEO Expert',    quote: 'The Excel file is perfect. I just paste it into our system. It saves our team so much time every week.' },
];

export default function App() {
  return (
    <>
      <Nav />
      <Hero />

      <div className="integrations">
        <div className="container">
          <p className="integrations__label">Use your leads with your favorite tools</p>
          <div className="integrations__row">
            {INTEGRATIONS.map(t => (
              <span key={t} className="integrations__pill">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <Features />
      <HowItWorks />
      <DemoSection />

      <section className="fields-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">What you get</div>
            <h2>Every Detail is <span className="grad-text">Collected</span></h2>
          </div>
          <div className="fields-wrap">
            <table className="fields-table">
              <thead>
                <tr><th>Data Field</th><th>Example</th><th>Speed</th></tr>
              </thead>
              <tbody>
                {FIELDS.map(f => (
                  <tr key={f.label}>
                    <td className="fields-table__name">
                      <span className="fields-table__icon">{f.icon}</span>
                      {f.label}
                    </td>
                    <td className="fields-table__example">{f.example}</td>
                    <td>
                      {f.instant
                        ? <span className="badge badge--instant">Very Fast</span>
                        : <span className="badge badge--click">Detailed</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Pricing />
      <Stats />

      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Testimonials</div>
            <h2>Trusted by <span className="grad-text">People Like You</span></h2>
          </div>
          <div className="testimonials__grid">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="testimonials__card">
                <div className="testimonials__stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="var(--yellow)" color="var(--yellow)"/>)}
                </div>
                <p>"{t.quote}"</p>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">{t.initials}</div>
                  <div>
                    <b>{t.name}</b>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />

      <section className="cta-banner">
        <div className="cta-banner__glow" />
        <div className="container cta-banner__inner">
          <h2>Ready to Grow Your Business?</h2>
          <p>Join over 2,000 people who use MapLeads Pro to find new customers every day.</p>
          <div className="cta-banner__row">
            <a
              href="#download"
              className="btn btn-primary btn-lg"
              onClick={e => { e.preventDefault(); document.getElementById('download-modal')?.classList.add('active'); }}
            >
              <Download size={18} /> Add to Chrome for Free
            </a>
            <a href="#contact" className="btn btn-outline btn-lg">Contact Us</a>
          </div>
          <p className="cta-banner__note">No credit card required. No signup needed. Start in 60 seconds.</p>
        </div>
      </section>

      <Contact />
      <Footer />
      <DownloadModal />
    </>
  );
}
