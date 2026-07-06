"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Sztuka Wygenerowana przez AI",
    description:
      "Granice wyobraźni przestały istnieć. Prezentowana obok grafika została w 100% stworzona przy użyciu sztucznej inteligencji. Wykorzystuję zaawansowane modele generatywne do tworzenia unikalnych, potężnych wizualnie konceptów, które wymykają się tradycyjnym schematom i nadają projektom zupełnie nowy wymiar.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 text-white">
        <img
          src="/portfolio/assets/972f41a6-3028-4e72-888a-f6b6e7f8ed05_rw_1920.jpg"
          width={800}
          height={800}
          className="h-full w-full object-cover"
          alt="Projekt UI/UX"
        />
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
