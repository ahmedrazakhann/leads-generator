import React from 'react';
import { MapPin, ExternalLink, Mail } from 'lucide-react';
import './Footer.css';

const LINKS = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Download', href: '#download' },
  ],
  Resources: [
    { label: 'How to use', href: '#' },
    { label: 'What is new', href: '#' },
    { label: 'API for developers', href: '#' },
  ],
  Company: [
    { label: 'Main Website', href: 'https://www.saasquatchleads.com/', external: true },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Use', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <MapPin size={20} strokeWidth={2.5} style={{ color: 'var(--teal)' }} />
              <span>Map<span className="grad-text">Leads</span> Pro</span>
            </div>
            <p>The easiest way to get business leads from Google Maps. Built for sales teams and small business owners.</p>
            <div className="footer__social">
              <a href="https://www.linkedin.com/company/saasquatchleads/" target="_blank" rel="noreferrer" className="footer__social-btn" aria-label="LinkedIn">
                <ExternalLink size={16}/>
              </a>
              <a href="mailto:support@saasquatchleads.com" className="footer__social-btn" aria-label="Email">
                <Mail size={16}/>
              </a>
            </div>
          </div>

          <div className="footer__links">
            {Object.entries(LINKS).map(([col, items]) => (
              <div className="footer__col" key={col}>
                <b>{col}</b>
                {items.map(item => (
                  <a key={item.label} href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noreferrer' : undefined}>
                    {item.label}
                    {item.external && <ExternalLink size={11} style={{ marginLeft: 4, verticalAlign: 'middle' }}/>}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 MapLeads Pro. All rights reserved.</span>
          <span>Helping you find more customers.</span>
        </div>
      </div>
    </footer>
  );
}
