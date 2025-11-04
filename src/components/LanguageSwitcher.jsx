import React from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ lang, setLang }) {
  return (
    <div className="flex items-center gap-2">
      <Globe className="w-5 h-5 text-slate-600" />
      <div className="inline-flex rounded-lg bg-slate-100 p-1">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 text-sm rounded-md transition ${
            lang === 'en' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('id')}
          className={`px-3 py-1 text-sm rounded-md transition ${
            lang === 'id' ? 'bg-white shadow text-slate-900' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ID
        </button>
      </div>
    </div>
  );
}
