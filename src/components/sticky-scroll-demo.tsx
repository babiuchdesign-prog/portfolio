"use client";
import React, { useState, useEffect, useCallback } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

// Slider dla sekcji AI – 4 zdjęcia z kropkami nawigacyjnymi
const aiSliderImages = [
  "/portfolio/assets/972f41a6-3028-4e72-888a-f6b6e7f8ed05_rw_1920.jpg",
  "/portfolio/ai-1.jpg",
  "/portfolio/ai-2.jpg",
  "/portfolio/digital-1.png",
];

function AiImageSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % aiSliderImages.length);
  }, []);

  // Auto-play co 3.5 sekundy
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {/* Zdjęcia */}
      {aiSliderImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`AI artwork ${i + 1}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Kropki nawigacyjne */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        {aiSliderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slajd ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === current ? "24px" : "8px",
              background: i === current ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>

      {/* Strzałki lewo/prawo */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + aiSliderImages.length) % aiSliderImages.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Poprzednie"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Następne"
      >
        ›
      </button>
    </div>
  );
}

const content = [
  {
    title: "Sztuka Wygenerowana przez AI",
    description:
      "Granice wyobraźni przestały istnieć. Prezentowana obok grafika została w 100% stworzona przy użyciu sztucznej inteligencji. Wykorzystuję zaawansowane modele generatywne do tworzenia unikalnych, potężnych wizualnie konceptów, które wymykają się tradycyjnym schematom i nadają projektom zupełnie nowy wymiar.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
        <AiImageSlider />
      </div>
    ),
  },
  {
    title: "Obraz Wprawiony w Ruch",
    description:
      "Statyczny obraz to często dopiero początek. W tym projekcie najpierw wygenerowałem od zera fotorealistyczne, angażujące zdjęcie promujące za pomocą sztucznej inteligencji, a następnie wprawiłem je w ruch. Tego typu dynamiczne formy wideo perfekcyjnie przyciągają wzrok w kampaniach reklamowych i mediach społecznościowych, dodając marce życia.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
        <video
          src="/portfolio/assets/stworz_wideo_jak_dziewczyna_po.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    ),
  },
  {
    title: "Tożsamość Wizualna",
    description:
      "Projektowanie to sztuka budowania silnej i rozpoznawalnej marki poprzez odpowiednią symbolikę. Dobrym przykładem jest projekt logo dla konkursu kulinarnego „Katowice na talerzu”. Znak ten w sprytny, minimalistyczny sposób łączy najważniejszą ikonę miasta – Spodek – z motywem nakrycia, tworząc wyrazistą identyfikację, która idealnie trafia w klimat wydarzenia.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
        <img
          src="/portfolio/assets/katowice_logo.png"
          width={800}
          height={800}
          className="h-full w-full object-cover"
          alt="Katowice na talerzu Logo"
        />
      </div>
    ),
  },
  {
    title: "Kreatywna Zmiana Wizerunku",
    description:
      "Projektowanie to sztuka łagodzenia przekazu i znajdowania nieoczywistych rozwiązań. Potrafię tak pokombinować z koncepcją, by nawet z firmy zajmującej się obróbką mięsa wyciągnąć grafikę w 100% przyjazną dla dzieci – taką, która budzi sympatię zamiast straszyć. Urocze ilustracje ocieplają wizerunek marki i całkowicie zmieniają jej odbiór.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
        <img
          src="/portfolio/assets/podkladka.jpg"
          width={800}
          height={800}
          className="h-full w-full object-cover"
          alt="Podkładka ARAD"
        />
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
