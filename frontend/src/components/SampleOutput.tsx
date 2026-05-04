'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Flame, Thermometer, Snowflake, Star, MapPin, Phone, Globe, Target, MessageSquare } from 'lucide-react';

const SAMPLE_DATA = [
  {
    name: 'London School of Barbering',
    type: 'Cold',
    insight: 'London School of Barbering lacks an integrated online booking system to manage their high volume of customers efficiently',
    whatToSell: 'Customized Online Booking and Management Software',
    competitor: 'Top-rated nearby competitors',
    script: "Hi, I'm calling from [Your Company]. I came across London School of Barbering and noticed you have an impressive 2,669 reviews with a 4.8 rating — that's outstanding. With that kind of volume, managing bookings manually is a real challenge. Not having an integrated booking system could be costing you up to 20% in missed leads. Our software is built specifically for high-volume barber education businesses like yours. Would you be open to a quick chat about how we could help streamline your operations?",
    rating: '4.8(2,669)',
    reviews: '2669',
    category: 'Barber shop',
    address: '48 Brushfield St, London E1 6AG, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7247 7662',
    website: 'https://www.londonschoolofbarbering.com'
  },
  {
    name: 'Guillotine | London Bridge Barbers',
    type: 'Cold',
    insight: 'They may be losing potential bookings due to an outdated or inefficient appointment scheduling system.',
    whatToSell: 'Modern online booking and management system tailored for barber shops',
    competitor: 'Top-rated nearby competitors',
    script: "Hi, I'm calling from [Your Company]. I came across Guillotine Barbers near London Bridge — 1,000 reviews and a 4.9 rating is seriously impressive. But I noticed your booking process could be a lot smoother for customers. Without an online booking system, you could be losing around 20% of potential appointments. Our system is designed for busy barber shops exactly like yours — easy to set up, reduces no-shows, and fills gaps in your diary automatically. Would you have 10 minutes this week to see how it works?",
    rating: '4.9(1.000)',
    reviews: '1000',
    category: 'Barber shop',
    address: '14 Stoney St, London SE1 9AD, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7407 0099',
    website: 'https://www.guillotinebarbers.co.uk'
  },
  {
    name: 'The Groomsmith | London Bridge Barbers',
    type: 'Cold',
    insight: "The Groomsmith's high review count and rating suggest a strong reputation, but their website may not be optimized for converting visitors into booked appointments.",
    whatToSell: 'A modern, integrated online booking and customer management system',
    competitor: 'Guillotine Barbers',
    script: "Hi, I'm calling from [Your Company]. I came across The Groomsmith in London Bridge — 698 reviews and a 4.9 rating is fantastic. With that kind of reputation, I'd imagine you're turning away customers because your booking process isn't as smooth as it could be. Our integrated system turns website visitors into confirmed bookings automatically. We've helped similar shops increase direct bookings by up to 30%. Would you be open to a quick demo?",
    rating: '4.9(698)',
    reviews: '698',
    category: 'Barber shop',
    address: '8 Bedale St, London SE1 9AL, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7403 2211',
    website: 'https://www.thegroomsmith.co.uk'
  },
  {
    name: 'The Barber Chop | London Bridge',
    type: 'Cold',
    insight: 'The Barber Chop may be missing out on efficient booking management and potentially losing customers due to manual appointment scheduling.',
    whatToSell: 'A modern, integrated online booking system tailored for barber shops',
    competitor: "Ted's Grooming Room",
    script: "Hi, I'm calling from [Your Company]. I came across The Barber Chop near London Bridge — a 5.0 rating with over 1,014 reviews is incredibly rare. You're clearly doing something right. But with that many customers, manual scheduling must be a headache. Our booking system automates that completely, reduces no-shows, and sends automated reminders to clients. Would you have 10 minutes this week to see how it works?",
    rating: '5.0(1.014)',
    reviews: '1014',
    category: 'Barber shop',
    address: '2 London Bridge Walk, London SE1 2SX, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7378 9944',
    website: 'https://www.thebarberchop.co.uk'
  },
  {
    name: 'The Legends Barbershop Holborn',
    type: 'Cold',
    insight: 'Lack of online booking integration on their website, potentially leading to lost customers',
    whatToSell: 'Customizable online booking system for barbershops',
    competitor: 'Huckle the Barber',
    script: "Hi, I'm calling from [Your Company]. I came across The Legends Barbershop in Holborn — 226 reviews with a 4.5 rating shows you've built a solid local following. I noticed you don't have an online booking system on your website, which could be costing you roughly 20% of potential leads. Our customisable booking platform takes about 30 minutes to set up and starts filling your diary from day one. Would you be open to a quick demo call?",
    rating: '4.5(226)',
    reviews: '226',
    category: 'Barber shop',
    address: '37 High Holborn, London WC1V 6AA, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7404 5566',
    website: 'https://www.thelegendsbarbershop.co.uk'
  },
  {
    name: 'Huckle the Barber - Holborn',
    type: 'Cold',
    insight: 'Huckle lacks an integrated online booking system to manage high demand, potentially frustrating customers.',
     whatToSell: 'Customizable booking and appointment management software',
    competitor: 'The Legends Barbershop',
    script: "Hi, I'm calling from [Your Company]. I came across Huckle the Barber in Holborn — 457 reviews and a perfect 5.0 rating. You've built something really special. With that level of demand, scheduling must get hectic. Our appointment management software handles bookings 24/7, integrates with your existing tools, and reduces no-shows by up to 40%. Would you be open to seeing how it could work for Huckle?",
    rating: '5.0(457)',
    reviews: '457',
    category: 'Barber shop',
    address: '7 Portpool Ln, London EC1N 7UU, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7242 5555',
    website: 'https://www.hucklethebarber.com'
  },
  {
    name: 'Barber Jos East London',
    type: 'Cold',
    insight: 'Lack of online booking integration may be limiting their growth potential, as customers increasingly expect to book digitally.',
    whatToSell: 'Customizable online booking and appointment management system',
    competitor: 'Top-rated nearby competitors',
    script: "Hi, I'm calling from [Your Company]. I found Barber Jos in East London — 289 reviews with a 4.7 rating shows real community trust. I noticed your online booking setup could be stronger, and that gap may be costing you roughly 20% of potential bookings every month. Our system is quick to set up and designed for neighbourhood barbershops. Would you be open to a quick conversation?",
    rating: '4.7(289)',
    reviews: '289',
    category: 'Barber shop',
    address: '92 Bethnal Green Rd, London E2 6DG, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7739 8877',
    website: 'https://www.barberjos.co.uk'
  },
  {
    name: "Ted's Grooming Room | Liverpool Street",
    type: 'Cold',
    insight: "Ted's Grooming Room may be missing out on efficient appointment scheduling, potentially leading to lost bookings.",
    whatToSell: 'A modern, integrated booking system for barbershops',
    competitor: 'London School of Barbering',
    script: "Hi, I'm calling from [Your Company]. I came across Ted's Grooming Room near Liverpool Street — 1,428 reviews with a 4.9 rating is exceptional. You're clearly one of the best in the area. I did notice your online booking experience could be more seamless, which might be costing you bookings during peak periods. Would you be interested in a quick demo?",
    rating: '4.9(1,428)',
    reviews: '1428',
    category: 'Barber shop',
    address: '48 Brushfield St, London E1 6AG, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7377 6644',
    website: 'https://www.tedsgroomingroom.com'
  },
  {
    name: 'The Legend Barbers',
    type: 'Cold',
    insight: 'They might be struggling to manage a high volume of customers efficiently, given their excellent reputation.',
    whatToSell: 'A modern, integrated booking and customer management system',
    competitor: 'Top-rated nearby competitors',
    script: "Hi, I'm calling from [Your Company]. I came across The Legend Barbers and noticed you have 300 reviews with a 4.6 rating — that's a strong local reputation. With that many customers coming through, keeping up with bookings can be a real challenge. Our system is designed for barber shops exactly like yours. Would you be open to a 10-minute chat?",
    rating: '4.6(300)',
    reviews: '300',
    category: 'Barber shop',
    address: '124 Whitechapel Rd, London E1 1JE, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7247 3399',
    website: 'https://www.thelegendbarbers.co.uk'
  },
  {
    name: 'Choppers | London Bridge Barbers',
    type: 'Cold',
    insight: 'Choppers has strong ratings but without a dedicated online booking system they risk losing tech-savvy customers.',
    whatToSell: 'Integrated online booking and customer retention platform',
    competitor: 'Guillotine Barbers',
    script: "Hi, I'm calling from [Your Company]. I came across Choppers Barbers near London Bridge — 1,028 reviews with a 4.9 rating is outstanding. I did notice your booking process could be more streamlined, which may be costing you customers who prefer to book digitally. Would you be open to a quick call to see if it's a fit?",
    rating: '4.9(1.028)',
    reviews: '1028',
    category: 'Barber shop',
    address: '210 Bermondsey St, London SE1 3TQ, United Kingdom',
    city: 'London',
    country: 'UK',
    phone: '+44 20 7403 8666',
    website: 'https://choppersbarbers.co.uk'
  }
];

const TypeBadge = ({ type }: { type: string }) => {
  const styles = {
    'Hot': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Warm': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    'Cold': 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${styles[type as keyof typeof styles]}`}>
      {type}
    </span>
  );
};

export default function SampleOutput() {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden" id="sample-output">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(123,194,162,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-black uppercase tracking-widest mb-4"
          >
            Raw Sales Intelligence
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Sample <span className="text-gradient">Output</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            This is exactly what the system generates—not just data, but a full sales strategy for every row.
          </motion.p>
        </div>

        {/* Full Table View */}
        <div className="bg-slate-950 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <style dangerouslySetInnerHTML={{ __html: `
              .scrollbar-hide::-webkit-scrollbar { display: none; }
              .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
            <table className="w-full text-left border-collapse min-w-[2800px]">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest sticky left-0 bg-slate-900 z-10">Business Name</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Lead Insight</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">What to Sell</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Competitor</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Call Script</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Rating</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Address</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Phone</th>
                  <th className="px-4 py-5 text-[9px] font-black text-slate-500 uppercase tracking-widest">Website</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {SAMPLE_DATA.map((row, idx) => (
                  <motion.tr 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-slate-900 transition-colors"
                  >
                    <td className="px-4 py-5 sticky left-0 bg-slate-950 group-hover:bg-slate-900 z-10 border-r border-slate-800/50">
                      <span className="font-bold text-slate-200 block truncate max-w-[200px]" title={row.name}>
                        {row.name}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <TypeBadge type={row.type} />
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-slate-400 text-[10px] leading-relaxed max-w-[300px]" title={row.insight}>
                        {row.insight}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-teal-400 text-[10px] font-bold leading-relaxed max-w-[200px]" title={row.whatToSell}>
                        {row.whatToSell}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-slate-500 text-[10px] leading-relaxed italic max-w-[150px]" title={row.competitor}>
                        {row.competitor}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800 max-w-[400px]">
                        <MessageSquare size={10} className="text-teal-500 mt-0.5 shrink-0" />
                        <p className="text-slate-500 text-[10px] leading-relaxed italic line-clamp-2" title={row.script}>
                          "{row.script}"
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <div className="flex items-center gap-1 text-amber-500 font-bold text-[10px]">
                        <Star size={10} fill="currentColor" /> {row.rating}
                      </div>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-slate-500 text-[10px] uppercase tracking-wider">{row.category}</span>
                    </td>
                    <td className="px-4 py-5">
                      <p className="text-slate-500 text-[10px] truncate max-w-[200px]" title={row.address}>
                        {row.address}
                      </p>
                    </td>
                    <td className="px-4 py-5">
                      <span className="text-slate-300 text-[10px] font-mono">{row.phone}</span>
                    </td>
                    <td className="px-4 py-5">
                      <a href={row.website} target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:underline text-[10px] flex items-center gap-1 truncate max-w-[150px]">
                        <Globe size={10} /> {row.website.replace('https://', '')}
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <motion.a 
            href="/files/leads_premium_20260505_0150.xlsx"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-sm uppercase tracking-widest overflow-hidden transition-all hover:bg-teal-500 hover:text-white"
          >
            <Download size={18} className="transition-transform group-hover:-translate-y-1" />
            Download Full Data (.xlsx)
          </motion.a>
        </div>
      </div>
    </section>
  );
}
