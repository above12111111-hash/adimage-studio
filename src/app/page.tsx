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
  CheckCircle2,
  Loader2,
  Copy,
  Plus
} from "lucide-react";

export default function AdImageStudio() {
  // Активна вкладка: "generator" | "prompts" | "history" | "projects"
  const [activeTab, setActiveTab] = useState("generator");

  const [prompt, setPrompt] = useState("");
  const [niche, setNiche] = useState("Краса та б'юті");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [style, setStyle] = useState("Фотореалізм");
  const [mood, setMood] = useState("Тепла");
  const [textSpace, setTextSpace] = useState("Без зарезервованого місця");
  const [variantsCount, setVariantsCount] = useState(2);
  const [quality, setQuality] = useState("Стандарт (Рекомендовано)");

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60"
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Будь ласка, введіть описовий промпт перед генерацією!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          niche,
          aspectRatio,
          style,
          mood,
          textSpace,
          variantsCount,
          quality,
        }),
      });

      const data = await response.json();

      if (data.images && data.images.length > 0) {
        setImages(data.images);
      } else if (data.image) {
        setImages([data.image]);
      } else if (data.error) {
        alert("Помилка генерації: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Сталася помилка при відправці запиту на сервер.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Header з робочими кнопками вкладок */}
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

        {/* Перемикач вкладок */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-sm">
          <button 
            onClick={() => setActiveTab("generator")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "generator" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Sparkles className="w-4 h-4" /> Генератор
          </button>
          <button 
            onClick={() => setActiveTab("prompts")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "prompts" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Bookmark className="w-4 h-4" /> Бібліотека промптів
          </button>
          <button 
            onClick={() => setActiveTab("history")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "history" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <Layers className="w-4 h-4" /> Історія та Обране
          </button>
          <button 
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "projects" 
                ? "bg-indigo-600 text-white shadow-sm" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
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

      {/* Вкладка 1: Основний генератор */}
      {activeTab === "generator" && (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <aside className="w-full lg:w-[420px] border-r border-slate-800/80 bg-[#0d1322] p-5 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-61px)]">
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
                <option value="Ювелірні вироби">Ювелірні вироби & Годинники</option>
                <option value="Ресторани та їжа">Ресторани, Кафе & Доставка їжі</option>
                <option value="Стоматологія та медицина">Стоматологія & Медичні послуги</option>
                <option value="Послуги & Консалтинг">Послуги, Юриспруденція & Консалтинг</option>
                <option value="Фитнес & Здоров'я">Фитнес, Спорт & Здорове харчування</option>
                <option value="Автобізнес">Автосалони, Детейлінг, СТО & Автопрокат</option>
                <option value="Освіта та інфобізнес">Освіта, Онлайн-курси & Інфобізнес</option>
                <option value="Туризм та готелі">Туризм, Готелі & Відпочинок</option>
              </select>
            </div>

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
                <option value="Студійна зйомка">Студійна зйомка (Studio Soft Light)</option>
                <option value="Люксовий глянцевий">Люксовий глянцевий (Commercial / Premium)</option>
                <option value="3D Рендер / Мінімалізм">3D Рендер / Мінімалізм</option>
                <option value="Вектор / Ілюстрація">Вектор / Графічна Ілюстрація</option>
                <option value="Lifestyle">Lifestyle / Кадри з живими людьми</option>
                <option value="Кинематографічний">Кінематографічний (Cinematic Drama)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                Настрій & Палітра
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Тепла", "Холодна", "Пастельна", "Контрастна", "Монохром", "Колір бренду"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setMood(item)}
                    className={`py-2 px-1.5 text-[11px] rounded-xl border text-center transition font-medium ${
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
              </select>
            </div>

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
                  <option value="Висока (4K HD)">Висока (4K HD)</option>
                  <option value="Ультра (8K Studio Render)">Ультра (8K Studio Render)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-slate-300 uppercase">
                РЕФЕРЕНСНЕ ФОТО / ТОБАР (IMAGE-TO-IMAGE)
              </label>
              <div className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-xl p-4 text-center cursor-pointer bg-slate-950/30 transition">
                <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                <p className="text-xs text-slate-400 font-medium">Завантажити референс</p>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition mt-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Генеруємо...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Згенерувати візуали ({variantsCount} кредити)</span>
                </>
              )}
            </button>
          </aside>

          <main className="flex-1 p-6 overflow-y-auto bg-[#0b0f19] flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-indigo-400" /> Згенеровані креативи
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Усього згенеровано: {images.length} результатів</p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded bg-slate-900 border-slate-800 text-indigo-600" />
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Safe Zones (Stories/Reels)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {images.map((imgUrl, index) => (
                <div key={index} className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-700 transition">
                  <div className="relative aspect-square bg-slate-900 flex items-center justify-center overflow-hidden">
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur text-[10px] font-mono px-2 py-1 rounded text-white font-bold">
                      {aspectRatio} • {aspectRatio === "1:1" ? "FEED" : "FORMAT"}
                    </span>
                    <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur text-slate-300 hover:text-white transition">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <img
                      src={imgUrl}
                      alt={`Generated Creative ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                    <p className="text-xs text-slate-400 italic">
                      "{prompt || "Згенероване зображення за вашим запитом"}"
                    </p>
                    <div className="flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <a 
                          href={imgUrl} 
                          target="_blank" 
                          download={`creative-${index + 1}.png`} 
                          className="py-2 px-3 bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition text-center"
                        >
                          <Download className="w-3.5 h-3.5" /> Завантажити
                        </a>
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
              ))}
            </div>
          </main>
        </div>
      )}

      {/* Вкладка 2: Бібліотека промптів */}
      {activeTab === "prompts" && (
        <main className="flex-1 p-6 bg-[#0b0f19] overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-indigo-400" /> Бібліотека готових промптів
                </h2>
                <p className="text-xs text-slate-400 mt-1">Готові високоефективні формулювання для різних ніш</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Стоматологія / Вініри", prompt: "Aesthetic dental clinic advertisement, smiling woman with white teeth, bright soft studio light, luxury interior, highly detailed, 8k --ar 1:1" },
                { title: "Косметика / Сироватка", prompt: "Luxury serum bottle on clean beige stone, tropical palm shadow, water drops, cinematic lighting, editorial aesthetic, 8k" },
                { title: "Нерухомість / ЖК", prompt: "Modern luxury apartment living room, panoramic windows, sunset light, high-end furniture, architectural design photography" },
                { title: "Доставка їжі / Суші", prompt: "Fresh salmon sushi roll set, close up macro shot, dark background, neon bokeh lights, appetizing commercial food photography" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0d1322] border border-slate-800 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm text-indigo-300">{item.title}</h3>
                    <button 
                      onClick={() => {
                        setPrompt(item.prompt);
                        setActiveTab("generator");
                      }}
                      className="text-xs bg-indigo-600/20 hover:bg-indigo-600 text-indigo-200 px-2.5 py-1 rounded-lg border border-indigo-500/30 transition flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" /> Вставити в генератор
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono">{item.prompt}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Вкладка 3: Історія та Обране */}
      {activeTab === "history" && (
        <main className="flex-1 p-6 bg-[#0b0f19] overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" /> Історія генерацій та Обране
                </h2>
                <p className="text-xs text-slate-400 mt-1">Усі згенеровані раніше макети зберігаються тут</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div key={idx} className="bg-[#0d1322] border border-slate-800 rounded-xl overflow-hidden p-2 space-y-2">
                  <img src={img} className="w-full aspect-square object-cover rounded-lg" alt="Saved" />
                  <p className="text-[10px] text-slate-400 truncate">Збережено в історії</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* Вкладка 4: Проєкти & Клієнти */}
      {activeTab === "projects" && (
        <main className="flex-1 p-6 bg-[#0b0f19] overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Folder className="w-5 h-5 text-indigo-400" /> Управління проєктами та клієнтами
                </h2>
                <p className="text-xs text-slate-400 mt-1">Створюйте окремі папки під кожного клієнта</p>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5 transition">
                <Plus className="w-4 h-4" /> Новий проєкт
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Клієнт: Клініка DentArt", count: "14 креативів" },
                { name: "Клієнт: Бренд одягу Urban", count: "8 креативів" },
                { name: "Особистий проєкт: E-com", count: "22 креативи" },
              ].map((proj, i) => (
                <div key={i} className="bg-[#0d1322] border border-slate-800 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Folder className="w-8 h-8 text-indigo-400" />
                    <div>
                      <h4 className="font-semibold text-sm text-white">{proj.name}</h4>
                      <p className="text-xs text-slate-400">{proj.count}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}