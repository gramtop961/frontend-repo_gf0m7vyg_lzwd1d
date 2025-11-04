import React from 'react';
import { MapPin } from 'lucide-react';

// Very lightweight pseudo-map: a styled container with positioned pins based on lat/lng normalization
export default function MapView({ t, reports }) {
  // Normalize coords to container positions (assumes lat -10..30, lng 95..135 as seeded in demo)
  const latMin = -10, latMax = 30, lngMin = 95, lngMax = 135;

  const toPos = (lat, lng) => {
    const x = ((lng - lngMin) / (lngMax - lngMin)) * 100; // percent
    const y = (1 - (lat - latMin) / (latMax - latMin)) * 100; // invert for top-down
    return { left: `${Math.min(96, Math.max(4, x))}%`, top: `${Math.min(92, Math.max(8, y))}%` };
  };

  return (
    <div className="w-full h-80 md:h-96 rounded-xl relative overflow-hidden bg-gradient-to-br from-sky-100 via-emerald-50 to-amber-50 border border-slate-200">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.6),rgba(255,255,255,0))]"></div>
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-40">
        {Array.from({ length: 96 }).map((_, i) => (
          <div key={i} className="border border-white/40"></div>
        ))}
      </div>

      {reports.map((r) => {
        const pos = toPos(r.coords.lat, r.coords.lng);
        return (
          <div
            key={r.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={pos}
            title={`${r.title} • ${r.category}`}
          >
            <div className="flex flex-col items-center">
              <MapPin className="w-6 h-6 text-emerald-600 drop-shadow" />
              <span className="bg-white/90 text-xs px-2 py-0.5 rounded shadow">
                {r.title}
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute left-4 top-4 bg-white/80 backdrop-blur rounded-lg px-3 py-1.5 text-sm text-slate-700 shadow">
        {t('mapHint')}
      </div>
    </div>
  );
}
