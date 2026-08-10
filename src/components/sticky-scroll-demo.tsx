"use client";
import React, { useState, useEffect, useCallback } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

// ─── Reużywalny slider ───────────────────────────────────────────────────────
interface ImageSliderProps {
  images: string[];
  altPrefix?: string;
}

function ImageSlider({ images, altPrefix = "Slide" }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play co 3.5 sekundy
  useEffect(() => {
    const timer = setInterval(next, 3500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {/* Zdjęcia */}
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${altPrefix} ${i + 1}`}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* Strzałki */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white text-xl backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Poprzednie"
      >
        ‹
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white text-xl backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Następne"
      >
        ›
      </button>

      {/* Kropki nawigacyjne */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slajd ${i + 1}`}
            className="h-2 rounded-full transition-all duration-300 focus:outline-none"
            style={{
              width: i === current ? "24px" : "8px",
              background:
                i === current
                  ? "rgba(255,255,255,0.95)"
                  : "rgba(255,255,255,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Zestawy zdjęć dla każdej sekcji (placeholder'y – podmień gdy gotowe) ────
const aiImages = [
  "/portfolio/assets/972f41a6-3028-4e72-888a-f6b6e7f8ed05_rw_1920.jpg",
  "/portfolio/ai-1.jpg",
  "/portfolio/ai-2.jpg",
  "/portfolio/digital-1.png",
];

const motionImages = [
  "/portfolio/ai-1.jpg",       // placeholder 1 – podmień
  "/portfolio/ai-2.jpg",       // placeholder 2 – podmień
  "/portfolio/digital-1.png",  // placeholder 3 – podmień
  "/portfolio/digital-2.png",  // placeholder 4 – podmień
];

const brandImages = [
  "/portfolio/assets/katowice_logo.png",
  "/portfolio/print-1.jpg",    // placeholder – podmień
  "/portfolio/print-2.png",    // placeholder – podmień
  "/portfolio/digital-2.png",  // placeholder – podmień
];

const redesignImages = [
  "/portfolio/assets/podkladka.jpg",
  "/portfolio/print-1.jpg",    // placeholder – podmień
  "/portfolio/ai-1.jpg",       // placeholder – podmień
  "/portfolio/digital-1.png",  // placeholder – podmień
];

// ─── Treść sekcji ────────────────────────────────────────────────────────────
const content = [
  {
    title: "Sztuka Wygenerowana przez AI",
    description:
      "Granice wyobraźni przestały istnieć. Prezentowana obok grafika została w 100% stworzona przy użyciu sztucznej inteligencji. Wykorzystuję zaawansowane modele generatywne do tworzenia unikalnych, potężnych wizualnie konceptów, które wymykają się tradycyjnym schematom i nadają projektom zupełnie nowy wymiar.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={aiImages} altPrefix="AI artwork" />
      </div>
    ),
  },
  {
    title: "Obraz Wprawiony w Ruch",
    description:
      "Statyczny obraz to często dopiero początek. W tym projekcie najpierw wygenerowałem od zera fotorealistyczne, angażujące zdjęcie promujące za pomocą sztucznej inteligencji, a następnie wprawiłem je w ruch. Tego typu dynamiczne formy wideo perfekcyjnie przyciągają wzrok w kampaniach reklamowych i mediach społecznościowych, dodając marce życia.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={motionImages} altPrefix="Motion project" />
      </div>
    ),
  },
  {
    title: "Tożsamość Wizualna",
    description:
      "Projektowanie to sztuka budowania silnej i rozpoznawalnej marki poprzez odpowiednią symbolikę. Dobrym przykładem jest projekt logo dla konkursu kulinarnego „Katowice na talerzu". Znak ten w sprytny, minimalistyczny sposób łączy najważniejszą ikonę miasta – Spodek – z motywem nakrycia, tworząc wyrazistą identyfikację, która idealnie trafia w klimat wydarzenia.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={brandImages} altPrefix="Brand identity" />
      </div>
    ),
  },
  {
    title: "Kreatywna Zmiana Wizerunku",
    description:
      "Projektowanie to sztuka łagodzenia przekazu i znajdowania nieoczywistych rozwiązań. Potrafię tak pokombinować z koncepcją, by nawet z firmy zajmującej się obróbką mięsa wyciągnąć grafikę w 100% przyjazną dla dzieci – taką, która budzi sympatię zamiast straszyć. Urocze ilustracje ocieplają wizerunek marki i całkowicie zmieniają jej odbiór.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={redesignImages} altPrefix="Brand redesign" />
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
