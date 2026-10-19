"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  Download, 
  Type, 
  FileText, 
  Bookmark, 
  Layers, 
  Folder, 
  Zap,
  CheckCircle2
} from "lucide-react";

export default function AdImageStudio() {
  const [prompt, setPrompt] = useState("");
  const [niche, setNiche] = useState("Краса та б'юті");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [style, setStyle] = useState("Фотореалізм");
  const [mood, setMood] = useState("Тепла");
  const [textSpace, setTextSpace] = useState("Без зарезервованого місця");
  const [variantsCount, setVariantsCount] = useState(2);
  const [quality, setQuality] = useState("Стандарт (Рекомендовано)");

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-[#0d1322]/80 backdrop-blur px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-wide text-white">AdImage Studio</h1>
            <p className="text-xs text-slate-400 mt-1">AI-Генератор рекламних візуалів для FB & IG</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-sm">
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-medium shadow-sm">
            <Sparkles className="w-4 h-4" /> Генератор
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition">
            <Bookmark className="w-4 h-4" /> Бібліотека промптів
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition">
            <Layers className="w-4 h-4" /> Історія та Обране
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition">
            <Folder className="w-4 h-4" /> Проєкти & Клієнти
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block text-xs bg-indigo-950/80 text-indigo-300 border border-indigo-800/50 px-3 py-1.5 rounded-full font-medium">
            Pro Targetologist Suite
          </span>
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-400">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span>42 Кредити</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar Controls */}
        <aside className="w-full lg:w-[420px] border-r border-slate-800/80 bg-[#0d1322] p-5 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-61px)]">
          
          {/* Prompt Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                Текстовий запит (PROMPT)
              </label>
              <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-medium transition">
                <Sparkles className="w-3 h-3" /> Покращити промпт
              </button>
            </div>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Опишіть бажаний рекламний візуал, наприклад: Реклама стоматології, усміхнена дівчина, світлий сучасний інтер'єр, люксовий стиль..."
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
            />
          </div>

          {/* Niche Selection - Розширений список */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Ніша / Тематика
            </label>
            <select
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="Краса та б'юті">Краса та б'юті (Косметика, Догляд, Салони)</option>
              <option value="Нерухомість">Нерухомість & Дизайн інтер'єру</option>
              <option value="E-commerce / Товарка">E-commerce / Товарний бізнес</option>
              <option value="Одяг та мода">Одяг, Взуття та Аксесуари</option>
              <option value="Ресторани та їжа">Ресторани, Кафе та Доставка їжі</option>
              <option value="Стоматологія та медицина">Стоматологія & Медичні послуги</option>
              <option value="Послуги & Консалтинг">Послуги, Юриспруденція & Консалтинг</option>
              <option value="Фитнес & Здоров'я">Фитнес, Спорт & Здорове харчування</option>
              <option value="Автобізнес">Автосалони, Детейлінг & СТО</option>
              <option value="Освіта та інфобізнес">Освіта, Курси & Інфобізнес</option>
              <option value="Туризм та готелі">Туризм, Готелі & Відпочинок</option>
              <option value="IT & Стартапи">IT, Софт & Цифрові продукти</option>
            </select>
          </div>

          {/* Aspect Ratio */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Формат / Платформа
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "1:1", label: "1:1 Square", sub: "FB/IG Feed" },
                { id: "4:5", label: "4:5 Portrait", sub: "Instagram Feed" },
                { id: "9:16", label: "9:16 Vertical", sub: "Stories / Reels" },
                { id: "1.91:1", label: "1.91:1 Landscape", sub: "FB Landscape Banner" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setAspectRatio(item.id)}
                  className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                    aspectRatio === item.id
                      ? "bg-indigo-600/15 border-indigo-500 text-white"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-semibold">{item.label}</span>
                    <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">{item.id}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">{item.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Style - Розширений список */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Візуальний стиль
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="Фотореалізм">Фотореалізм (Photorealistic)</option>
              <option value="Студійна зйомка">Студійна зйомка (Studio Lighting)</option>
              <option value="Люксовий глянцевий">Люксовий глянцевий (Commercial / High-End)</option>
              <option value="3D Рендер / Мінімалізм">3D Рендер / Мінімалізм</option>
              <option value="Вектор / Ілюстрація">Вектор / Графічна Ілюстрація</option>
              <option value="Lifestyle">Lifestyle / Живі кадри з людьми</option>
              <option value="Кинематографічний">Кінематографічний (Cinematic Mood)</option>
              <option value="Неон & Хайтек">Неон & Хайтек (Cyberpunk / Modern Tech)</option>
              <option value="Flat Lay">Flat Lay / Розкладка зверху</option>
              <option value="Макро / Деталізація">Макрозйомка / Текстури та деталі</option>
            </select>
          </div>

          {/* Mood & Palette */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Настрій & Палітра
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Тепла", "Холодна", "Пастельна", "Контрастна", "Монохром", "Колір бренду"].map((item) => (
                <button
                  key={item}
                  onClick={() => setMood(item)}
                  className={`py-2 px-2 text-xs rounded-xl border text-center transition font-medium ${
                    mood === item
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                      : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Text Space */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Порожнє місце під текст
            </label>
            <select
              value={textSpace}
              onChange={(e) => setTextSpace(e.target.value)}
              className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition"
            >
              <option value="Без зарезервованого місця">Без зарезервованого місця</option>
              <option value="Зверху">Зверху (для заголовка / плашки)</option>
              <option value="Знизу">Знизу (для оферу / кнопки)</option>
              <option value="Зліва">Зліва (для текстового блоку)</option>
              <option value="Справа">Справа (для текстового блоку)</option>
              <option value="Центральний об'єкт з розмитим фоном">Центральний об'єкт з розмитим фоном</option>
            </select>
          </div>

          {/* Variants Count & Quality - Розширені варіанти якості */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                Кількість варіантів
              </label>
              <div className="flex bg-slate-950/60 border border-slate-800 rounded-xl p-1 gap-1">
                {[1, 2, 4, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => setVariantsCount(num)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition ${
                      variantsCount === num
                        ? "bg-indigo-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                Якість генерації
              </label>
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Стандарт (Рекомендовано)">Стандарт (Рекомендовано)</option>
                <option value="Висока (4K)">Висока (4K)</option>
                <option value="Ультра (8K)">Ультра (8K / Studio Render)</option>
                <option value="Максимальна (8K RAW & Fine Detail)">Максимальна (8K RAW / Fine Detail)</option>
              </select>
            </div>
          </div>

          {/* Reference Image */}
          <div className="space-y-2">
            <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              РЕФЕРЕНСНЕ ФОТО / ТОБАР (IMAGE-TO-IMAGE)
            </label>
            <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 text-center cursor-pointer bg-slate-950/30 transition">
              <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
              <p className="text-xs text-slate-400 font-medium">Завантажити референс</p>
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition mt-2">
            <Zap className="w-4 h-4 fill-white" />
            <span>Згенерувати візуали ({variantsCount} кредити)</span>
          </button>
        </aside>

        {/* Right Gallery / Output Area */}
        <main className="flex-1 p-6 overflow-y-auto bg-[#0b0f19] flex flex-col">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-indigo-400" /> Згенеровані креативи
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Усього згенеровано: 2 результатів</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-900 border-slate-800 text-indigo-600" />
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Safe Zones (Stories/Reels)</span>
              </label>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition">
              <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-[10px] font-mono px-2 py-1 rounded text-white font-bold">
                  1:1 • FEED
                </span>
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur text-slate-300 hover:text-white transition">
                  <Bookmark className="w-4 h-4" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=60"
                  alt="Example Creative"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                <p className="text-xs text-slate-400 italic">
                  "Skincare serum on aesthetic stone with tropical palm leaves shadow"
                </p>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                      <Download className="w-3.5 h-3.5" /> Завантажити
                    </button>
                    <button className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                      <Type className="w-3.5 h-3.5" /> Додати Текст/Лого
                    </button>
                  </div>
                  <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                    <FileText className="w-3.5 h-3.5" /> Рекламний текст
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition">
              <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-[10px] font-mono px-2 py-1 rounded text-white font-bold">
                  4:5 • PORTRAIT
                </span>
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-red-500/80 backdrop-blur text-white transition">
                  <Bookmark className="w-4 h-4 fill-white" />
                </button>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60"
                  alt="Example Creative"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                <p className="text-xs text-slate-400 italic">
                  "Modern architectural interior living room, bright warm light"
                </p>
                <div className="flex flex-col gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                      <Download className="w-3.5 h-3.5" /> Завантажити
                    </button>
                    <button className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                      <Type className="w-3.5 h-3.5" /> Додати Текст/Лого
                    </button>
                  </div>
                  <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition">
                    <FileText className="w-3.5 h-3.5" /> Рекламний текст
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}