import React from 'react';
import { Check } from 'lucide-react';
import './Pricing.css';

const PLANS = [
  {
    name: 'Free', price: '$0', period: '/forever',
    desc: 'Great for small projects and trying out the tool.',
    features: ['Up to 100 leads per session','Export to CSV','All basic data fields','No signup needed','Unlimited searches'],
    cta: 'Download Free', ctaClass: 'btn-outline', href: '#download',
  },
  {
    name: 'Pro', price: '$19', period: '/month', popular: true,
    desc: 'For teams who need a lot of leads every day.',
    features: ['Unlimited leads per session','CSV and Excel export','All 10 data fields','Save your progress','Priority support','Fast bulk search'],
    cta: 'Get Pro Now', ctaClass: 'btn-primary', href: '#contact',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'For big agencies with special needs.',
    features: ['Everything in Pro','API access','Connect to your CRM','Personal manager','Custom data mapping'],
    cta: 'Contact Us', ctaClass: 'btn-outline', href: '#contact',
  },
];

export default function Pricing() {
  const openModal = (e) => {
    e.preventDefault();
    document.getElementById('download-modal')?.classList.add('active');
  };

  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Pricing</div>
          <h2>Fair and <span className="grad-text">Simple Pricing</span></h2>
          <p>Start for free. Upgrade only when you need more power.</p>
        </div>
        <div className="pricing__grid">
          {PLANS.map(p => (
            <div key={p.name} className={`pricing__card ${p.popular ? 'pricing__card--popular' : ''}`}>
              {p.popular && <div className="pricing__badge">Most Popular</div>}
              <div className="pricing__name">{p.name}</div>
              <div className="pricing__amount">
                {p.price}<span>{p.period}</span>
              </div>
              <p className="pricing__desc">{p.desc}</p>
              <ul className="pricing__features">
                {p.features.map(f => (
                  <li key={f}>
                    <Check size={14} className="pricing__check" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={p.href}
                className={`btn ${p.ctaClass} btn-full`}
                onClick={p.href === '#download' ? openModal : undefined}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
