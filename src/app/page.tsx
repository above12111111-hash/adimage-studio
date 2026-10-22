"use client";

import React, { useState } from "react";

export default function AdImageStudio() {
  // Основні стани генератора
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("Нерухомість & Ремонт");
  const [selectedFormat, setSelectedFormat] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("Фотореалізм (Photorealism)");
  const [selectedPalette, setSelectedPalette] = useState("Холодна");
  const [selectedTextSpace, setSelectedTextSpace] = useState("Без зарезервованого місця");
  const [variantsCount, setVariantsCount] = useState(1);
  const [selectedQuality, setSelectedQuality] = useState("Стандарт (Рекомендовано)");

  // Стани UI та завантаження
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"generator" | "prompts" | "history" | "projects">("generator");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [savedFavorites, setSavedFavorites] = useState<string[]>([]);

  // Покращення промпту
  const handleEnhancePrompt = () => {
    if (!userPrompt.trim()) return;
    setUserPrompt(
      (prev) =>
        `${prev}, highly detailed, bright soft studio light, professional advertising photograph, award winning design, 8k resolution, cinematic composition`
    );
  };

  // Запит до сервера для генерації
  const handleGenerate = async () => {
    if (!userPrompt.trim()) {
      alert("Будь ласка, введіть опис для рекламного креативу!");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: userPrompt,
          aspectRatio: selectedFormat,
          niche: selectedNiche,
          style: selectedStyle,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Помилка при генерації зображення.");
        setIsLoading(false);
        return;
      }

      if (data.images && data.images.length > 0) {
        setGeneratedImages(data.images);
      }
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Сталася помилка при з'єднанні з сервером.");
    } finally {
      setIsLoading(false);
    }
  };

  // Надійне завантаження через Canvas (обходить CORS блокування браузера)
  const handleDownload = async (imageUrl: string, index: number = 0) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = imageUrl;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `adgenix-creative-${Date.now()}-${index + 1}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      img.onerror = async () => {
        // Резервний варіант якщо crossOrigin заблоковано
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `adgenix-creative-${index + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      };
    } catch (error) {
      console.error("Download error:", error);
      window.open(imageUrl, "_blank");
    }
  };

  const handleToggleFavorite = (url: string) => {
    if (savedFavorites.includes(url)) {
      setSavedFavorites(savedFavorites.filter((item) => item !== url));
    } else {
      setSavedFavorites([...savedFavorites, url]);
    }
  };

  const handleAddProject = () => {
    if (!newProjectName.trim()) return;
    alert(`Проєкт "${newProjectName}" успішно створено!`);
    setNewProjectName("");
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans flex flex-col">
      {/* Шапка сайту */}
      <header className="border-b border-gray-800 bg-[#0f172a]/60 backdrop-blur px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            ✨
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">AdImage Studio</h1>
            <p className="text-xs text-gray-400">
              AI-Генератор рекламних візуалів для FB & IG
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-2 bg-[#1e293b]/80 p-1 rounded-xl text-sm border border-gray-700/50">
          <button
            onClick={() => setActiveTab("generator")}
            className={`px-4 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "generator"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            ⚡ Генератор
          </button>
          <button
            onClick={() => setActiveTab("prompts")}
            className={`px-4 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "prompts"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🔖 Бібліотека промптів
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "history"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📚 Історія та Обране ({savedFavorites.length})
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-1.5 rounded-lg font-medium transition cursor-pointer ${
              activeTab === "projects"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-400 hover:text-white"
            }`}
          >
            📁 Проєкти & Клієнти
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 px-3 py-1.5 rounded-lg font-medium">
            Pro Targetologist Suite
          </span>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-semibold px-3 py-1.5 rounded-lg">
            ⚡ Unlimited Credits
          </div>
        </div>
      </header>

      {/* Головна вкладка: ГЕНЕРАТОР */}
      {activeTab === "generator" && (
        <main className="flex-1 flex overflow-hidden">
          {/* Панель налаштувань */}
          <aside className="w-[440px] border-r border-gray-800/80 bg-[#0f172a]/30 p-5 overflow-y-auto flex flex-col gap-5 text-xs">
            {/* Текстовий промпт */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-semibold text-gray-300 uppercase tracking-wider">
                  Текстовий запит (PROMPT)
                </label>
                <button
                  onClick={handleEnhancePrompt}
                  className="text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  🪄 Покращити промпт
                </button>
              </div>
              <textarea
                rows={4}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Опишіть ваш товар або послугу (наприклад: Будівництво сучасного хай-тек будинку з басейном та вечірньою підсвіткою...)"
                className="w-full bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition resize-none"
              />
            </div>

            {/* МАКСИМАЛЬНИЙ СПИСОК НІШ */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Ніша / Тематика
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option>Нерухомість & Ремонт</option>
                <option>Стоматологія & Медичні послуги</option>
                <option>Салони краси & Косметологія</option>
                <option>E-commerce / Товарний бізнес</option>
                <option>Кав'ярні & Ресторани</option>
                <option>Автосервіси & Детейлінг</option>
                <option>Фитнес, Спорт & Nutri</option>
                <option>Юридичні & Фінансові послуги</option>
                <option>Освіта & Онлайн-курси</option>
                <option>IT & SaaS Продукти</option>
                <option>Туризм & Готелі</option>
                <option>Одяг & Мода (Fashion)</option>
                <option>Дизайн інтер'єру & Архітектура</option>
                <option>Дитячі товари & Іграшки</option>
                <option>Послуги для бізнесу (B2B)</option>
              </select>
            </div>

            {/* Формати */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Формат / Платформа
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "1:1", name: "1:1 Square", sub: "FB/IG Feed" },
                  { id: "4:5", name: "4:5 Portrait", sub: "Instagram Feed" },
                  { id: "9:16", name: "9:16 Vertical", sub: "Stories / Reels / TikTok" },
                  { id: "1.91:1", name: "1.91:1 Landscape", sub: "FB Landscape Banner" },
                ].map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition cursor-pointer ${
                      selectedFormat === fmt.id
                        ? "bg-indigo-600/20 border-indigo-500 text-white"
                        : "bg-[#1e293b]/40 border-gray-800 text-gray-400 hover:border-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-medium text-xs">{fmt.name}</span>
                      <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-400">
                        {fmt.id}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1">{fmt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* МАКСИМАЛЬНИЙ СПИСОК СТИЛІВ */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Візуальний стиль
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option>Фотореалізм (Photorealism)</option>
                <option>Мінімалістичний 3D Render</option>
                <option>Сучасний рекламний макет</option>
                <option>Преміум / Люкс студія</option>
                <option>Кинематографічний (Cinematic Light)</option>
                <option>Неоновий Cyberpunk</option>
                <option>Арт-ілюстрація & Вектор</option>
                <option>Аерографія / Глянцевий журнал</option>
                <option>Вінтаж / Retro Advertising</option>
              </select>
            </div>

            {/* Настрій та палітра */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Настрій & Палітра
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Тепла",
                  "Холодна",
                  "Пастельна",
                  "Контрастна",
                  "Монохром",
                  "Колір бренду",
                  "Темна люкс",
                  "Яскрава / Неонова",
                  "Природна / Нюд",
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedPalette(item)}
                    className={`py-2 px-1 rounded-xl text-[11px] border text-center transition cursor-pointer ${
                      selectedPalette === item
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-medium"
                        : "bg-[#1e293b]/30 border-gray-800 text-gray-400 hover:border-gray-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Місце під текст */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Порожнє місце під текст (Copy Space)
              </label>
              <select
                value={selectedTextSpace}
                onChange={(e) => setSelectedTextSpace(e.target.value)}
                className="w-full bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option>Без зарезервованого місця</option>
                <option>Зліва під заголовок</option>
                <option>Справа під заголовок</option>
                <option>Знизу під плашку ціни</option>
                <option>Зверху під оффер</option>
                <option>Центральна композиція</option>
              </select>
            </div>

            {/* Варіанти & Якість */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                  Кількість варіантів
                </label>
                <div className="flex bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-1 justify-between">
                  {[1, 2, 4, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => setVariantsCount(num)}
                      className={`flex-1 py-1 rounded-lg text-center transition cursor-pointer ${
                        variantsCount === num
                          ? "bg-indigo-600 text-white font-bold"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                  Якість генерації
                </label>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="w-full bg-[#1e293b]/60 border border-gray-700/60 rounded-xl p-2 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 h-[38px] cursor-pointer"
                >
                  <option>Стандарт (Рекомендовано)</option>
                  <option>Максимальна Ultra HD (4K)</option>
                </select>
              </div>
            </div>

            {/* Референс */}
            <div>
              <label className="font-semibold text-gray-300 uppercase tracking-wider block mb-2">
                Референсне фото / Товар (Image-to-Image)
              </label>
              <div className="border-2 border-dashed border-gray-800 rounded-xl p-4 text-center cursor-pointer hover:border-gray-700 transition bg-[#1e293b]/20">
                <span className="text-xl block mb-1">📤</span>
                <p className="text-gray-400 font-medium">Завантажити референс</p>
                <p className="text-[10px] text-gray-600">PNG, JPG, WEBP до 10MB</p>
              </div>
            </div>

            {/* Кнопка Запуску */}
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Генеруємо рекламний візуал...
                </>
              ) : (
                <>⚡ Згенерувати візуали</>
              )}
            </button>
          </aside>

          {/* Область відображення результатів */}
          <section className="flex-1 bg-[#0b0f19] p-6 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold flex items-center gap-2">
                  🖼️ Згенеровані креативи
                </h2>
                <p className="text-xs text-gray-500">
                  Усього згенеровано: {generatedImages.length} результатів
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <input type="checkbox" id="safezones" className="rounded bg-gray-800 border-gray-700" />
                <label htmlFor="safezones">Safe Zones (Stories/Reels)</label>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-800/80 rounded-2xl p-6 bg-[#0f172a]/10">
              {isLoading ? (
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-gray-300 font-medium">Нейромережа Flux створює рекламний макет...</p>
                  <p className="text-xs text-gray-500 mt-1">Зазвичай це займає 5–8 секунд</p>
                </div>
              ) : generatedImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                  {generatedImages.map((imgUrl, index) => (
                    <div
                      key={index}
                      className="group relative bg-[#131b2e] border border-gray-800 rounded-2xl overflow-hidden shadow-xl transition hover:border-gray-700 flex flex-col"
                    >
                      <div className="relative aspect-square w-full bg-black/40 overflow-hidden flex items-center justify-center">
                        <img
                          src={imgUrl}
                          alt={`Generated Creative ${index + 1}`}
                          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                        />

                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wider uppercase border border-white/10">
                          {selectedFormat} • FORMAT
                        </div>

                        <button
                          onClick={() => handleToggleFavorite(imgUrl)}
                          className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md border transition cursor-pointer ${
                            savedFavorites.includes(imgUrl)
                              ? "bg-amber-500 text-white border-amber-400"
                              : "bg-black/50 text-gray-300 border-white/10 hover:text-white"
                          }`}
                        >
                          ★
                        </button>
                      </div>

                      <div className="p-4 flex flex-col gap-3">
                        <p className="text-xs text-gray-400 line-clamp-2 italic">
                          "{userPrompt}"
                        </p>

                        <button
                          onClick={() => handleDownload(imgUrl, index)}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
                        >
                          ⬇️ Завантажити зображення (PNG)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p className="text-base font-medium text-gray-400">Результатів поки немає</p>
                  <p className="text-xs mt-1">Введіть опис і натисніть «Згенерувати візуали»</p>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {/* Вкладка ПРОЄКТИ */}
      {activeTab === "projects" && (
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">📁 Проєкти та Клієнти</h2>
              <p className="text-sm text-gray-400">Організовуйте рекламні креативи по папкам клієнтів</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition cursor-pointer"
            >
              + Новий проєкт
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1e293b]/40 border border-gray-800 p-5 rounded-2xl hover:border-gray-700 transition">
              <h3 className="font-bold text-lg mb-1">ЖК "Комфорт Таун"</h3>
              <p className="text-xs text-gray-400 mb-4">14 рекламних креативів</p>
              <button className="text-xs text-indigo-400 hover:underline font-medium cursor-pointer">
                Переглянути папку ➔
              </button>
            </div>
            <div className="bg-[#1e293b]/40 border border-gray-800 p-5 rounded-2xl hover:border-gray-700 transition">
              <h3 className="font-bold text-lg mb-1">Стоматологія "Smile"</h3>
              <p className="text-xs text-gray-400 mb-4">8 рекламних креативів</p>
              <button className="text-xs text-indigo-400 hover:underline font-medium cursor-pointer">
                Переглянути папку ➔
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Вкладка ПРОМПТИ */}
      {activeTab === "prompts" && (
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">🔖 Готові рекламні шаблони</h2>
          <p className="text-sm text-gray-400 mb-6">Натисніть на будь-який шаблон, щоб вставити його в генератор</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Будівництво & Нерухомість",
                prompt: "Modern luxury high-tech villa with swimming pool, evening warm lighting, architectural photography, 8k resolution",
              },
              {
                title: "Стоматологія & Медицина",
                prompt: "Aesthetic dental clinic advertisement, smiling woman with white teeth, bright soft studio light, luxury interior",
              },
              {
                title: "E-Commerce / Товари",
                prompt: "Commercial product photography of premium cosmetic bottle on water reflection background, studio lighting, highly detailed",
              },
              {
                title: "Кав'ярня & Ресторани",
                prompt: "Fresh cup of cappuccino with latte art, croissant on wooden table, warm cozy morning coffee shop environment",
              },
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setUserPrompt(item.prompt);
                  setActiveTab("generator");
                }}
                className="bg-[#1e293b]/30 border border-gray-800 p-5 rounded-2xl hover:border-indigo-500/50 cursor-pointer transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                    {item.title}
                  </span>
                  <p className="text-sm text-gray-200 italic">"{item.prompt}"</p>
                </div>
                <span className="text-xs text-indigo-400 mt-4 font-medium flex items-center gap-1">
                  Використати у генераторі ➔
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Вкладка ІСТОРІЯ ТА ОБРАНЕ */}
      {activeTab === "history" && (
        <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-2">📚 Обрані та збережені креативи</h2>
          <p className="text-sm text-gray-400 mb-6">Ваші збережені рекламні візуали</p>

          {savedFavorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedFavorites.map((url, idx) => (
                <div key={idx} className="bg-[#131b2e] border border-gray-800 rounded-2xl overflow-hidden p-3 flex flex-col gap-3">
                  <img src={url} alt="Saved" className="w-full aspect-square object-cover rounded-xl" />
                  <button
                    onClick={() => handleDownload(url, idx)}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-xs transition"
                  >
                    ⬇️ Скачати PNG
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Ви поки не додавали матеріали в обране. Натискайте ★ на генераціях!</p>
          )}
        </div>
      )}

      {/* Модальне вікно створення проєкту */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border border-gray-700 p-6 rounded-2xl max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold mb-2">Створити новий проєкт</h3>
            <p className="text-xs text-gray-400 mb-4">Введіть назву компанії або клієнта для групування креативів</p>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Наприклад: ЖК 'Комфорт Таун'"
              className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-3 text-sm text-white mb-5 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded-xl transition cursor-pointer"
              >
                Скасувати
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
              >
                Створити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}