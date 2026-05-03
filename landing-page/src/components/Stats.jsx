import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, Users, Clock, Database } from 'lucide-react';
import './Stats.css';

const STATS = [
  { icon: <TrendingUp size={28}/>, end: 500,    suffix: '+',  label: 'Leads per search',        desc: 'Found in just one search' },
  { icon: <Users size={28}/>,      end: 2000,   suffix: '+',  label: 'Users worldwide',         desc: 'Trusted across 40 countries' },
  { icon: <Clock size={28}/>,      end: 10,     suffix: 'x',  label: 'Save time',               desc: 'Faster than doing it by hand' },
  { icon: <Database size={28}/>,   end: 100,    suffix: '%',  label: 'Private and Safe',        desc: 'Your data stays on your PC' },
];

function useCounter(end, start) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (!start) return;
    const duration = 1800;
    const step = end / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(timer);
  }, [start, end]);

  return count;
}

function StatCard({ icon, end, suffix, label, desc, started }) {
  const count = useCounter(end, started);
  return (
    <div className="stats__card">
      <div className="stats__icon">{icon}</div>
      <div className="stats__num">{count}{suffix}</div>
      <div className="stats__label">{label}</div>
      <div className="stats__desc">{desc}</div>
    </div>
  );
}

export default function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref}>
      <div className="stats__glow" />
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Our Growth</div>
          <h2>Trusted by <span className="grad-text">Businesses Everywhere</span></h2>
        </div>
        <div className="stats__grid">
          {STATS.map(s => <StatCard key={s.label} {...s} started={started} />)}
        </div>
      </div>
    </section>
  );
}
