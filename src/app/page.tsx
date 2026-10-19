'use client';

import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Download, RefreshCw, Wand2, ShieldAlert, Layers } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [niche, setNiche] = useState('краса і бʼюті');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleEnhancePrompt = async () => {
    if (!prompt) return;
    setIsEnhancing(true);
    setError('');
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, niche }),
      });
      const data = await res.json();
      if (data.enhancedPrompt) {
        setPrompt(data.enhancedPrompt.trim());
      } else {
        setError(data.error || 'Не вдалося покращити промт');
      }
    } catch (err: any) {
      setError(err.message || 'Помилка мережі');
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, aspectRatio }),
      });
      const data = await res.json();
      if (data.result) {
        const urls = Array.isArray(data.result) ? data.result : [data.result];
        setGeneratedImages(urls);
      } else {
        setError(data.error || 'Помилка генерації зображення');
      }
    } catch (err: any) {
      setError(err.message || 'Помилка сервера');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Шапка */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            AdImage Studio
          </h1>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          Pro Targetologist Suite
        </span>
      </header>

      {/* Основний контент */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Ліва панель налаштувань */}
        <div className="w-full lg:w-96 border-r border-slate-800 bg-slate-900/30 p-6 flex flex-col gap-6 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Ніша / Тема
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500"
            >
              <option value="краса і бʼюті">Краса і бʼюті</option>
              <option value="медицина">Медицина</option>
              <option value="нерухомість">Нерухомість</option>
              <option value="їжа і ресторани">Їжа і ресторани</option>
              <option value="фітнес">Фітнес</option>
              <option value="освіта і курси">Освіта і курси</option>
              <option value="e-commerce / товари">E-commerce / Товари</option>
              <option value="автомобілі">Автомобілі</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-slate-300">
                Опис креативу (Промт)
              </label>
              <button
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !prompt}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 disabled:opacity-50"
              >
                <Wand2 className="w-3 h-3" />
                {isEnhancing ? 'Покращую...' : 'Покращити промт'}
              </button>
            </div>
            <textarea
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Наприклад: Реклама стоматології, усміхнена дівчина, світлий сучасний інтер'єр..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Формат / Співвідношення сторін
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Feed (1:1)', val: '1:1' },
                { label: 'Portrait (4:5)', val: '4:5' },
                { label: 'Stories/Reels (9:16)', val: '9:16' },
                { label: 'Banner (16:9)', val: '16:9' },
              ].map((fmt) => (
                <button
                  key={fmt.val}
                  onClick={() => setAspectRatio(fmt.val)}
                  className={`py-2 px-3 text-xs rounded-lg border transition ${
                    aspectRatio === fmt.val
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                      : 'border-slate-800 bg-slate-900 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {fmt.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Генерую візуал...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Згенерувати рекламний візуал
              </>
            )}
          </button>
        </div>

        {/* Права частина: Результати */}
        <div className="flex-1 p-6 bg-slate-950 flex flex-col items-center justify-center overflow-y-auto">
          {generatedImages.length === 0 ? (
            <div className="text-center max-w-sm text-slate-500 flex flex-col items-center gap-3">
              <div className="p-4 bg-slate-900 rounded-full border border-slate-800">
                <ImageIcon className="w-8 h-8 text-slate-600" />
              </div>
              <p className="text-sm">
                Введіть опис і натисніть «Згенерувати», щоб отримати ваш перший рекламний візуал.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-2xl flex flex-col gap-4 items-center">
              {generatedImages.map((imgUrl, idx) => (
                <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                  <img src={imgUrl} alt="Ad Visual" className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <a
                      href={imgUrl}
                      target="_blank"
                      download={`ad-creative-${idx}.webp`}
                      className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white transition"
                      title="Завантажити"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}