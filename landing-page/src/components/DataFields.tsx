'use client';

import React from 'react';
import { 
  Building2, Tag, MapPin, Star, Hash, Phone, Globe, Clock, LayoutGrid, Link2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const FIELDS = [
  { icon: <Building2 size={16}/>, label: 'Business Name',  example: 'Zuma Dubai',              instant: true  },
  { icon: <Tag size={16}/>,       label: 'Category',       example: 'Japanese Restaurant',      instant: true  },
  { icon: <MapPin size={16}/>,    label: 'Address',        example: 'DIFC, Dubai, UAE',         instant: true  },
  { icon: <Star size={16}/>,      label: 'Rating',         example: '4.8',                      instant: true  },
  { icon: <Hash size={16}/>,      label: 'Reviews',        example: '3,241',                    instant: true  },
  { icon: <Phone size={16}/>,     label: 'Phone',          example: '+971 4 425 5660',          instant: false },
  { icon: <Globe size={16}/>,     label: 'Website',        example: 'zumarestaurant.com',       instant: false },
  { icon: <Clock size={16}/>,     label: 'Hours',          example: 'Open until 11 PM',         instant: false },
  { icon: <LayoutGrid size={16}/>,label: 'Plus Code',      example: '8H4W+M9 Dubai',            instant: false },
  { icon: <Link2 size={16}/>,     label: 'Maps URL',       example: 'google.com/maps/place/…',  instant: true  },
];

export default function DataFields() {
  return (
    <section className="py-24 bg-[#020617]">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
            What you get
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            Every Detail is <span className="text-gradient">Collected</span>
          </h2>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-[40px] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800">
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Data Field</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest">Example Value</th>
                  <th className="px-8 py-5 text-xs font-black text-slate-500 uppercase tracking-widest text-right">Extraction Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {FIELDS.map((field, idx) => (
                  <motion.tr 
                    key={field.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group hover:bg-slate-900/40 transition-colors"
                  >
                    <td className="px-8 py-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-all">
                        {field.icon}
                      </div>
                      <span className="font-bold text-slate-200">{field.label}</span>
                    </td>
                    <td className="px-8 py-5 font-medium text-slate-400 text-sm italic">{field.example}</td>
                    <td className="px-8 py-5 text-right">
                      {field.instant ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
                          Instant
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                          Detailed
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
