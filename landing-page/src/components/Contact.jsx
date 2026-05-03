import React, { useState } from 'react';
import { Mail, ExternalLink, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); e.target.reset(); }, 4000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact__inner">
        <div className="contact__info">
          <div className="section-tag">Contact</div>
          <h2>Get in <span className="grad-text">Touch</span></h2>
          <p>Have a question or need help? Send us a message and we will get back to you soon.</p>

          <div className="contact__items">
            <div className="contact__item">
              <div className="contact__item-icon"><Mail size={18}/></div>
              <div>
                <b>Email Us</b>
                <a href="mailto:support@saasquatchleads.com">support@saasquatchleads.com</a>
              </div>
            </div>
            <div className="contact__item">
              <div className="contact__item-icon"><ExternalLink size={18}/></div>
              <div>
                <b>Visit our LinkedIn</b>
                <a href="https://www.linkedin.com/company/saasquatchleads/" target="_blank" rel="noreferrer">
                  linkedin.com/company/saasquatchleads
                </a>
              </div>
            </div>
            <div className="contact__item">
              <div className="contact__item-icon"><MapPin size={18}/></div>
              <div>
                <b>Our Office</b>
                <span>Glendale, California</span>
              </div>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-row">
            <div className="contact__form-group">
              <label>First Name</label>
              <input type="text" placeholder="Your name" required/>
            </div>
            <div className="contact__form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Your last name" required/>
            </div>
          </div>
          <div className="contact__form-group">
            <label>Email Address</label>
            <input type="email" placeholder="email@company.com" required/>
          </div>
          <div className="contact__form-group">
            <label>Company Name</label>
            <input type="text" placeholder="Your business name"/>
          </div>
          <div className="contact__form-group">
            <label>How can we help?</label>
            <textarea rows="4" placeholder="Write your message here..." required/>
          </div>
          <button type="submit" className={`btn btn-full ${sent ? 'btn-sent' : 'btn-primary'}`} disabled={sent}>
            {sent ? (
              <><span className="contact__sent-check">✓</span> Message Sent!</>
            ) : (
              <><Send size={15}/> Send Message</>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
