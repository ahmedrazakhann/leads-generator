'use strict';

// ── Sticky Nav ─────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Smooth active link highlight ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id ? 'var(--teal)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// ── FAQ accordion ──────────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item[open]').forEach(other => {
        if (other !== item) other.removeAttribute('open');
      });
    }
  });
});

// ── Download modal ─────────────────────────────────────────
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('a[href="#download"]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    overlay.classList.add('active');
  });
});
modalClose.addEventListener('click', () => overlay.classList.remove('active'));
overlay.addEventListener('click', e => {
  if (e.target === overlay) overlay.classList.remove('active');
});

// ── Contact form ───────────────────────────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Message sent!';
    btn.style.background = 'linear-gradient(135deg,#22c55e,#14b8a6)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

// ── Scroll-reveal animation ────────────────────────────────
const revealEls = document.querySelectorAll(
  '.feature-card, .step-card, .price-card, .testi-card, .faq-item, .fields-table-wrap'
);
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (entry.target.dataset.delay || 0) * 1);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.dataset.delay = (i % 4) * 100;
  revealObs.observe(el);
});

// ── Mobile menu ────────────────────────────────────────────
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? '' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '64px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(2,6,23,0.98)';
    navLinks.style.padding = '20px 24px';
    navLinks.style.borderBottom = '1px solid var(--border)';
    navLinks.style.backdropFilter = 'blur(20px)';
    if (isOpen) navLinks.style.display = 'none';
  });
}
