'use client';

const INTEGRATIONS = ['Microsoft Excel', 'Google Sheets', 'HubSpot', 'Mailchimp', 'Salesforce', 'Zapier', 'Airtable'];

export default function Integrations() {
  return (
    <div className="py-12 bg-[#020617] border-y border-slate-900/50 overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">
          Sync your closed deals with your favorite tools
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 opacity-40 grayscale">
          {INTEGRATIONS.map(item => (
            <span key={item} className="text-sm md:text-lg font-bold text-slate-400 cursor-default">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
