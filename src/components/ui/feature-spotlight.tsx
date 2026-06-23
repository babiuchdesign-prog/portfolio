"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

export function FeaturedSpotlight() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative flex cursor-pointer flex-col items-center gap-8 md:flex-row md:items-start md:gap-12 lg:gap-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Left: Text Block */}
      <div className="relative z-10 flex w-full max-w-[400px] shrink-0 flex-col items-center text-center md:w-[300px] md:items-start md:text-left lg:w-[400px] lg:pt-4">
        {/* Label with animated line */}
        <div className="mb-6 flex items-center gap-3 md:mb-8 md:gap-4">
          <div
            className="h-px bg-white transition-all duration-700"
            style={{
              width: isHovered ? 48 : 32,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="text-xs font-black uppercase tracking-widest text-white transition-all duration-700 md:text-sm"
            style={{
              letterSpacing: isHovered ? "0.15em" : "0.1em",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            GRAPHIC DESIGNER <br /> & AI CREATOR
          </span>
        </div>

        {/* Title - responsive text sizes */}
        <h2 className="relative">
          <span
            className="block text-4xl font-normal tracking-tight text-white transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Babiuch
          </span>
          <span
            className="block text-4xl font-normal tracking-tight text-white transition-all duration-700 sm:text-5xl md:text-5xl lg:text-6xl"
            style={{
              transform: isHovered ? "translateX(12px)" : "translateX(0)",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            Rafał
          </span>
        </h2>

        {/* Description - responsive spacing */}
        <p
          className="mt-6 text-xs leading-relaxed transition-all duration-700 md:mt-8 md:text-sm lg:mt-10 lg:text-sm"
          style={{
            color: isHovered ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          Projektuję komercyjną grafikę reklamową, materiały promocyjne oraz dedykowane ilustracje i assety do aplikacji. W pracy łączę klasyczny warsztat graficzny z zaawansowanymi technologiami AI. Co to oznacza dla klienta? Nie ograniczają mnie bazy stockowe – potrafię wygenerować i dopracować dowolny, spójny koncept wizualny, skracając czas realizacji do minimum. Od pomysłu, przez AI, po precyzyjny retusz i finalny plik produkcyjny.
        </p>

        {/* Skill Icons */}
        <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 transition-all duration-700"
          style={{
            opacity: isHovered ? 1 : 0.7,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {[
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
          ].map((icon) => (
            <div key={icon} className="group relative flex items-center justify-center h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-white/5 border border-white/10 p-1.5 transition-all hover:bg-white/20 hover:scale-110 hover:-translate-y-1">
              <img
                src={`/portfolio/skills/${icon}`}
                alt={icon.replace('.png', '')}
                className="h-full w-full object-contain opacity-80 transition-opacity group-hover:opacity-100"
                title={icon.replace('.png', '')}
              />
            </div>
          ))}
        </div>


      </div>

      {/* Right: Image Block */}
      <div
        className="relative transition-all duration-700 flex md:flex-col justify-center h-full"
        style={{
          transform: isHovered ? "translateX(4px) translateY(-4px)" : "translateX(0) translateY(0)",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Frame outline */}
        <div
          className="absolute -inset-3 border transition-all duration-700 md:-inset-4"
          style={{
            borderColor: isHovered ? "rgba(255,255,255,0.15)" : "transparent",
            transform: isHovered ? "scale(1.01)" : "scale(1)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Image container - responsive sizing */}
        <div className="relative h-[280px] w-[260px] overflow-hidden sm:h-[320px] sm:w-[300px] md:h-full md:min-h-[400px] md:w-[340px] lg:h-full lg:min-h-[540px] lg:w-[420px]">
          <div
            className="absolute -inset-1 transition-all duration-700"
            style={{
              boxShadow: isHovered ? "0 24px 64px rgba(255,255,255,0.1)" : "0 0 0 transparent",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
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
            style={{
              opacity: isHovered ? 1 : 0,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />

          {/* Corner accents */}
          <div
            className="absolute left-2 top-2 h-5 w-px bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "50ms",
            }}
          />
          <div
            className="absolute left-2 top-2 h-px w-5 bg-white/80 transition-all duration-500 md:left-3 md:top-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "100ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-5 w-px bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:h-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "bottom",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "150ms",
            }}
          />
          <div
            className="absolute bottom-2 right-2 h-px w-5 bg-white/80 transition-all duration-500 md:bottom-3 md:right-3 md:w-6"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "right",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: "200ms",
            }}
          />
        </div>

        {/* Index number */}
        <span
          className="absolute -bottom-6 right-0 font-mono text-xs text-white/40 transition-all duration-700 md:-bottom-8 md:text-sm"
          style={{
            opacity: isHovered ? 1 : 0.4,
            transform: isHovered ? "translateY(12px)" : "translateY(0)",
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          01
        </span>
      </div>
    </div>
  )
}
