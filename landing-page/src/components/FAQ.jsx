import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './FAQ.css';

const FAQS = [
  { q: 'Is MapLeads Pro really free?', a: 'Yes. You can use the core tool for free forever. You can scrape up to 100 leads at a time and export them to a CSV file without paying anything.' },
  { q: 'Does it work in every country?', a: 'Yes. It works on any Google Maps search anywhere in the world. Just search for what you need and start the tool.' },
  { q: 'Do I need to make an account?', a: 'No. You just install the extension and start using it. We do not ask for your email or any other personal info.' },
  { q: 'How fast is it?', a: 'It is very fast. It can find basic info like names and ratings in seconds. If you need phone numbers and websites, it takes a little longer because it has to look at each listing carefully.' },
  { q: 'Is my data safe?', a: 'Yes. All the data you find stays on your own computer. We never see your leads and we do not save them on our servers.' },
  { q: 'Can I use the data in Excel?', a: 'Yes. You can export everything to a CSV file which opens perfectly in Excel, Google Sheets, or any CRM tool.' },
  { q: 'What happens if Google Maps changes?', a: 'We keep a close eye on Google Maps. If they change how their website works, we update our tool quickly so it keeps working for you.' },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <button className="faq__q" onClick={() => setOpen(o => !o)}>
        <span>{q}</span>
        <ChevronDown size={18} className="faq__chevron" />
      </button>
      <div className="faq__a"><p>{a}</p></div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="faq" id="faq">
      <div className="container faq__wrap">
        <div className="section-header">
          <div className="section-tag">FAQ</div>
          <h2>Common <span className="grad-text">Questions</span></h2>
        </div>
        <div className="faq__list">
          {FAQS.map(f => <FAQItem key={f.q} {...f} />)}
        </div>
      </div>
    </section>
  );
}
