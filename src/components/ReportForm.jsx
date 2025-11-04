import React, { useState } from 'react';
import { Camera, MapPin, Tag, Type, FileText, Send } from 'lucide-react';

const categories = ['Flood', 'Pollution', 'Deforestation', 'Waste', 'Wildlife', 'Other'];

export default function ReportForm({ t, onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [photoName, setPhotoName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !location.trim()) return;

    const newReport = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      category,
      date: new Date().toISOString(),
      // assign a random coordinate for demo map plotting
      coords: {
        lat: -10 + Math.random() * 40, // roughly around SEA region
        lng: 95 + Math.random() * 40,
      },
      photoName,
    };
    onAdd(newReport);

    setTitle('');
    setDescription('');
    setLocation('');
    setCategory(categories[0]);
    setPhotoName('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Type className="w-4 h-4" /> {t('title')}
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={t('titlePlaceholder')}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> {t('location')}
          </span>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={t('locationPlaceholder')}
          />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
          <FileText className="w-4 h-4" /> {t('description')}
        </span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          placeholder={t('descriptionPlaceholder')}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Tag className="w-4 h-4" /> {t('category')}
          </span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {t(c.toLowerCase())}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
            <Camera className="w-4 h-4" /> {t('photoOptional')}
          </span>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoName(e.target.files?.[0]?.name || '')}
              className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
          {photoName && (
            <span className="text-xs text-slate-500">{t('selected')}: {photoName}</span>
          )}
        </label>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <Send className="w-4 h-4" /> {t('submitReport')}
        </button>
      </div>
    </form>
  );
}
