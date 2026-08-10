"use client";
import React, { useState, useEffect, useCallback } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

// ─── Reużywalny slider ───────────────────────────────────────────────────────
interface ImageSliderProps {
  images?: string[];
  altPrefix?: string;
  videos?: string[]; // tablica wideo (kazde wideo = jeden slajd)
}

function ImageSlider({ images = [], altPrefix = "Slide", videos = [] }: ImageSliderProps) {
  const totalSlides = videos.length + images.length;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-zinc-900">
      {/* Slajdy wideo */}
      {videos.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      {/* Slajdy obrazy */}
      {images.map((src, i) => {
        const slideIndex = videos.length + i;
        return (
          <img
            key={src}
            src={src}
            alt={`${altPrefix} ${i + 1}`}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: slideIndex === current ? 1 : 0 }}
          />
        );
      })}

      {/* Strzalki */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white text-xl backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Poprzednie"
      >
        &lsaquo;
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white text-xl backdrop-blur-sm transition hover:bg-black/70"
        aria-label="Nastepne"
      >
        &rsaquo;
      </button>

      {/* Kropki */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 z-10">
        {Array.from({ length: totalSlides }).map((_, i) => (
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

const motionVideos = [
  "/portfolio/assets/stworz_wideo_jak_dziewczyna_po.mp4",
  "/portfolio/assets/nic_nie_mowi_mruga_tylko_neutr.mp4",
  "/portfolio/assets/A_woman_with_strawberry_blonde.mp4",
];

const brandImages = [
  "/portfolio/assets/katowice_logo.png",
  "/portfolio/zdjecia/Digital Flow/52f0a151-104e-4e41-9ee8-017ee484a962_rw_1200.png",
  "/portfolio/zdjecia/Digital Flow/302e94c4-38e3-410e-b637-7868dea6fc2f_rw_1200.png",
  "/portfolio/zdjecia/Digital Flow/5efc54b5-1d1d-457b-82b9-1983324cf7bc_rw_1200.png",
];

const printImages = [
  "/portfolio/zdjecia/Print Works/60cbeaff-21c8-4a63-9853-5906e2a6056a_rw_1920.jpg",
  "/portfolio/zdjecia/Print Works/84efe3dc-510b-406a-9c3d-f89071af654d_rw_1200.png",
  "/portfolio/zdjecia/Print Works/fd9528d4-f89d-48cf-8a6e-d0e783f26611_rw_1920.png",
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
      "Statyczny obraz to dopiero poczatek. Przeksztalcam gotowe grafiki i wygenerowane wizualizacje w dynamiczne animacje wideo, ktore zyja wlasnym zyciem. Ruchomy content przyciaga wzrok znacznie skuteczniej niz statyczny kadr - to niezastapione narzedzie w kampaniach social media, reklamach display i prezentacjach produktowych.",
    content: (
      <div className="h-full w-full">
        <ImageSlider videos={motionVideos} altPrefix="Motion project" />
      </div>
    ),
  },
  {
    title: "Tozsamosc Wizualna",
    description:
      "Logo to fundament marki - pierwsza rzecz, ktora zapada w pamiec. Projektuje znaki graficzne, ktore nie sa przypadkowe: kazdy ksztalt, kolor i kret pisma sluzy konkretnemu celowi. Lacze symbolike, forme i emocje w jeden spojny znak, ktory wyroznia sie na rynku i buduje trwale skojarzenia z marka.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={brandImages} altPrefix="Brand logo" />
      </div>
    ),
  },
  {
    title: "Kompleksowe Projektowanie",
    description:
      "Dobre projektowanie graficzne to nie tylko estetyka, ale przede wszystkim użyteczność. Tworzę szeroki wachlarz materiałów – od publikacji drukowanych, przez identyfikację wizualną, aż po grafiki na potrzeby kampanii w sieci. Niezależnie od medium, dbam o każdy detal, by końcowy projekt niósł ze sobą odpowiedni przekaz i wyróżniał się na tle konkurencji.",
    content: (
      <div className="h-full w-full">
        <ImageSlider images={printImages} altPrefix="Graphic design" />
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
