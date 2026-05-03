import React, { useState, useEffect } from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import './Nav.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Features',     href: '#features'      },
    { label: 'How It Works', href: '#how-it-works'  },
    { label: 'Pricing',      href: '#pricing'       },
    { label: 'FAQ',          href: '#faq'           },
    { label: 'Contact',      href: '#contact'       },
  ];

  const openModal = (e) => {
    e.preventDefault();
    document.getElementById('download-modal')?.classList.add('active');
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#hero" className="nav__logo">
          <MapPin size={22} strokeWidth={2.5} className="nav__logo-icon" />
          <span>Map<span className="grad-text">Leads</span> Pro</span>
        </a>

        <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#download" className="btn btn-primary nav__cta" onClick={openModal}>
          Get Extension Free
        </a>

        <button className="nav__toggle" onClick={() => setMenuOpen(m => !m)} aria-label="Toggle menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </nav>
  );
}
