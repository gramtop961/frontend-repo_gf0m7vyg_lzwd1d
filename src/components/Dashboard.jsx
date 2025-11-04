import React, { useMemo, useState } from 'react';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

export default function Dashboard({ t, reports }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    let list = [...reports];
    if (category !== 'all') {
      list = list.filter((r) => r.category.toLowerCase() === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((r) => r.title.toLowerCase().includes(q));
    }
    list.sort((a, b) =>
      sort === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );
    return list;
  }, [reports, query, category, sort]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={t('searchByTitle')}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">{t('allCategories')}</option>
            {['flood', 'pollution', 'deforestation', 'waste', 'wildlife', 'other'].map((c) => (
              <option key={c} value={c}>{t(c)}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">{t('newest')}</option>
            <option value="oldest">{t('oldest')}</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-4 py-2">{t('title')}</th>
              <th className="px-4 py-2">{t('category')}</th>
              <th className="px-4 py-2">{t('location')}</th>
              <th className="px-4 py-2">{t('date')}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-slate-50">
                <td className="px-4 py-2 font-medium text-slate-900">{r.title}</td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {t(r.category.toLowerCase())}
                  </span>
                </td>
                <td className="px-4 py-2 text-slate-700">{r.location}</td>
                <td className="px-4 py-2 text-slate-700">{new Date(r.date).toLocaleString()}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center text-slate-500">
                  {t('noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
