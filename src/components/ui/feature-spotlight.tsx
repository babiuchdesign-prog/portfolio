"use client"

import { useState } from "react"

const icons = [
  "Photoshop.png",
  "Illustrator.png",
  "InDesign.png",
  "Lightroom.png",
  "Figma.png",
  "Claude.png",
  "Gemmini.png",
  "comfyui.png",
  "antigravity.png",
  "Flutter.png",
  "VSCode.png",
  "Mac OS.png",
  "Windows 11.png",
]

export function FeaturedSpotlight() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-start md:gap-16 lg:gap-24"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ===== LEFT / MOBILE TOP: Text Block ===== */}
      <div className="relative z-10 flex w-full px-6 md:px-0 max-w-full md:max-w-[520px] shrink-0 flex-col items-center text-center md:items-start md:text-left lg:w-[520px] lg:pt-4">

        {/* Label */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-white transition-all duration-700"
            style={{
              width: isHovered ? 48 : 32,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-xs font-black uppercase tracking-widest text-white transition-all duration-700 md:text-base lg:text-lg"
            style={{
              letterSpacing: isHovered ? "0.15em" : "0.1em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            GRAPHIC DESIGNER <br /> &amp; AI CREATOR
          </span>
        </div>

        {/* Name */}
        <h2 className="relative">
          <span
            className="block text-4xl font-normal tracking-tight text-white transition-all duration-700 sm:text-5xl md:text-6xl lg:text-[5.5rem] lg:leading-[1.1]"
            style={{
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Babiuch
          </span>
          <span
            className="block text-4xl font-normal tracking-tight text-white transition-all duration-700 sm:text-5xl md:text-6xl lg:text-[5.5rem] lg:leading-[1.1]"
            style={{
              transform: isHovered ? "translateX(12px)" : "translateX(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Rafał
          </span>
        </h2>

        {/* ── MOBILE ONLY: Photo after name ── */}
        <div className="block md:hidden mt-6 w-full rounded-2xl overflow-hidden">
          <img
            src="/portfolio/rafal.jpg"
            alt="Rafał Babiuch"
            className="w-full h-[320px] object-cover"
            style={{ objectPosition: "center 15%" }}
          />
        </div>

        {/* Description */}
        <p
          className="mt-6 text-xs leading-relaxed transition-all duration-700 md:mt-8 md:text-base lg:text-lg lg:mt-12"
          style={{
            color: isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Projektuję komercyjną grafikę reklamową, materiały promocyjne oraz
          dedykowane ilustracje i assety do aplikacji. W pracy łączę klasyczny
          warsztat graficzny z zaawansowanymi technologiami AI. Co to oznacza dla
          klienta? Nie ograniczają mnie bazy stockowe – potrafię wygenerować i
          dopracować dowolny, spójny koncept wizualny, skracając czas realizacji
          do minimum. Od pomysłu, przez AI, po precyzyjny retusz i finalny plik
          produkcyjny.
        </p>

        {/* Icons – 5-column grid on mobile, flex wrap on desktop */}
        <div
          className="mt-8 grid grid-cols-5 gap-3 md:flex md:flex-wrap md:gap-4 w-full transition-all duration-700"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {icons.map((icon) => (
            <div
              key={icon}
              className="group/icon relative flex items-center justify-center h-12 w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-xl bg-white/5 border border-white/10 p-2 transition-all hover:bg-white/20 hover:scale-110 hover:-translate-y-1"
            >
              <img
                src={`/portfolio/skills/${icon}`}
                alt={icon.replace(".png", "")}
                className="h-full w-full object-contain opacity-80 transition-opacity group-hover/icon:opacity-100"
                title={icon.replace(".png", "")}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ===== RIGHT: Desktop-only photo ===== */}
      <div
        className="hidden md:flex relative transition-all duration-700 flex-col justify-center h-full"
        style={{
          transform: isHovered
            ? "translateX(4px) translateY(-4px)"
            : "translateX(0) translateY(0)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Frame outline */}
        <div
          className="absolute -inset-4 border transition-all duration-700"
          style={{
            borderColor: isHovered ? "rgba(255,255,255,0.15)" : "transparent",
            transform: isHovered ? "scale(1.01)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Image */}
        <div className="relative overflow-hidden md:h-full md:min-h-[520px] md:w-[440px] lg:min-h-[700px] lg:w-[550px]">
          <img
            src="/portfolio/rafal.jpg"
            alt="Rafał Babiuch"
            className="h-full w-full object-cover transition-all duration-1000"
            style={{
              transform: isHovered ? "scale(1.03)" : "scale(1)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent transition-opacity duration-700"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        <span
          className="absolute -bottom-8 right-0 font-mono text-sm text-white/40 transition-all duration-700"
          style={{
            opacity: isHovered ? 1 : 0.4,
            transform: isHovered ? "translateY(12px)" : "translateY(0)",
          }}
        >
          01
        </span>
      </div>
    </div>
  )
}
