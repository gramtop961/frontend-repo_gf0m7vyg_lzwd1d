import React, { useMemo, useState } from 'react';
import ReportForm from './components/ReportForm.jsx';
import MapView from './components/MapView.jsx';
import Dashboard from './components/Dashboard.jsx';
import LanguageSwitcher from './components/LanguageSwitcher.jsx';
import { Leaf, LayoutGrid, Map, PlusSquare } from 'lucide-react';

const translations = {
  en: {
    appTitle: 'EnviroWatch',
    tagline: 'Report and explore environmental issues in your area',
    reportIssue: 'Report Issue',
    mapView: 'Map View',
    dashboard: 'Dashboard',
    title: 'Title',
    titlePlaceholder: 'e.g., Plastic waste near the river',
    description: 'Description',
    descriptionPlaceholder: 'Describe what happened and why it matters…',
    location: 'Location',
    locationPlaceholder: 'City/District, Street or Landmark',
    category: 'Category',
    photoOptional: 'Photo (optional, UI only)',
    selected: 'Selected',
    submitReport: 'Submit Report',
    mapHint: 'Demo map with sample pins (no GPS).',
    searchByTitle: 'Search by title…',
    allCategories: 'All categories',
    newest: 'Newest',
    oldest: 'Oldest',
    date: 'Date',
    noResults: 'No results found',
    flood: 'Flood',
    pollution: 'Pollution',
    deforestation: 'Deforestation',
    waste: 'Waste',
    wildlife: 'Wildlife',
    other: 'Other',
    submittedToast: 'Report added locally (demo only).',
  },
  id: {
    appTitle: 'EnviroWatch',
    tagline: 'Laporkan dan jelajahi isu lingkungan di sekitar Anda',
    reportIssue: 'Buat Laporan',
    mapView: 'Peta',
    dashboard: 'Dasbor',
    title: 'Judul',
    titlePlaceholder: 'mis: Sampah plastik di dekat sungai',
    description: 'Deskripsi',
    descriptionPlaceholder: 'Jelaskan apa yang terjadi dan dampaknya…',
    location: 'Lokasi',
    locationPlaceholder: 'Kota/Kabupaten, Jalan atau Penanda',
    category: 'Kategori',
    photoOptional: 'Foto (opsional, UI saja)',
    selected: 'Terpilih',
    submitReport: 'Kirim Laporan',
    mapHint: 'Peta demo dengan pin contoh (tanpa GPS).',
    searchByTitle: 'Cari berdasarkan judul…',
    allCategories: 'Semua kategori',
    newest: 'Terbaru',
    oldest: 'Terlama',
    date: 'Tanggal',
    noResults: 'Tidak ada hasil',
    flood: 'Banjir',
    pollution: 'Polusi',
    deforestation: 'Deforestasi',
    waste: 'Sampah',
    wildlife: 'Satwa',
    other: 'Lainnya',
    submittedToast: 'Laporan ditambahkan secara lokal (demo).',
  },
};

const seedReports = [
  {
    id: 'r1',
    title: 'Plastic waste near river',
    description: 'Accumulation of plastic bottles along the riverbank after heavy rain.',
    location: 'South Jakarta, Cilandak',
    category: 'Waste',
    date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    coords: { lat: -6.26, lng: 106.80 },
  },
  {
    id: 'r2',
    title: 'Thick smoke from factory',
    description: 'Dark smoke seen around industrial area in the afternoon.',
    location: 'Surabaya, Rungkut',
    category: 'Pollution',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    coords: { lat: -7.32, lng: 112.78 },
  },
  {
    id: 'r3',
    title: 'Illegal logging activity',
    description: 'Cut trees spotted near protected forest edge.',
    location: 'Kalimantan Barat',
    category: 'Deforestation',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    coords: { lat: 0.12, lng: 110.40 },
  },
  {
    id: 'r4',
    title: 'Street flooded after storm',
    description: 'Water up to knee height blocking road access.',
    location: 'Bandung, Antapani',
    category: 'Flood',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    coords: { lat: -6.92, lng: 107.63 },
  },
];

function App() {
  const [lang, setLang] = useState('en');
  const t = (key) => translations[lang][key] ?? key;

  const [tab, setTab] = useState('report');
  const [reports, setReports] = useState(seedReports);
  const addReport = (r) => {
    setReports((prev) => [r, ...prev]);
    // Lightweight toast
    const el = document.createElement('div');
    el.textContent = t('submittedToast');
    el.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow z-50';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
  };

  const tabs = useMemo(() => (
    [
      { id: 'report', label: t('reportIssue'), icon: PlusSquare },
      { id: 'map', label: t('mapView'), icon: Map },
      { id: 'dashboard', label: t('dashboard'), icon: LayoutGrid },
    ]
  ), [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center"><Leaf className="w-5 h-5" /></div>
            <div>
              <h1 className="text-lg font-semibold text-slate-900">{t('appTitle')}</h1>
              <p className="text-xs text-slate-600">{t('tagline')}</p>
            </div>
          </div>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <nav className="flex gap-2 mb-6">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
                tab === id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </nav>

        {tab === 'report' && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('reportIssue')}</h2>
              <ReportForm t={t} onAdd={addReport} />
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('mapView')}</h2>
              <MapView t={t} reports={reports} />
            </div>
          </section>
        )}

        {tab === 'map' && (
          <section className="space-y-4">
            <MapView t={t} reports={reports} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reports.slice(0, 6).map((r) => (
                <div key={r.id} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-900">{r.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{r.description}</p>
                    </div>
                    <span className="ml-3 inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t(r.category.toLowerCase())}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">{r.location} • {new Date(r.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'dashboard' && (
          <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('dashboard')}</h2>
            <Dashboard t={t} reports={reports} />
          </section>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EnviroWatch — UI demo only
      </footer>
    </div>
  );
}

export default App;
