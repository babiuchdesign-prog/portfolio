"use client";

import { motion } from "framer-motion";
import GlowHorizonFM from "@/components/ui/glow-horizon";
import { AnimatedTitleFM } from "../components/ui/glow-horizon-utils/animated-title-fm";
import { Component as GradientBackground4 } from "@/components/ui/gradient-background-4";
import { FeaturedSpotlight } from "@/components/ui/feature-spotlight";
import { SkillsSection } from "@/components/ui/skills-section";
import { CinematicHero } from "@/components/cinematic-landing-hero";
import InteractiveImageBentoGallery from "@/components/ui/bento-gallery";
import { Footer } from "@/components/ui/modem-animated-footer";
import { Mail, NotepadTextDashed } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { StickyScrollRevealDemo } from "./sticky-scroll-demo";
import { PortfolioScrollModule } from "./portfolio-scroll-module";

// Sample data for the image gallery
const imageItems = [
  { id: 1, title: "Katowice na talerzu", desc: "2025 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/2d73efa5-8adc-4c16-9724-e08afd05f57e_rw_1920.png", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "35 lat Gminy", desc: "2025 | Print Works", url: "/portfolio/zdjecia/Print Works/60cbeaff-21c8-4a63-9853-5906e2a6056a_rw_1920.jpg", span: "md:row-span-1" },
  { id: 3, title: "Lunar", desc: "2025 | AI Art", url: "/portfolio/zdjecia/AI/67994529-82f1-40a4-af50-57c6b8a89ce2_rw_1920.jpg", span: "md:row-span-1" },
  { id: 4, title: "Strona mikea", desc: "2026 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/1fbcb55e-9bd4-45dc-8c15-92fe5fd90f53_rw_1920.png", span: "md:row-span-2" },
  { id: 5, title: "Podkładka Arad", desc: "2025 | Print Works", url: "/portfolio/zdjecia/Print Works/d1c05c74-bb9b-4026-94cf-31e8c8daa5b9_rw_1920.jpg", span: "md:row-span-1" },
  { id: 6, title: "Reklama Imprint", desc: "2025 | AI Art", url: "/portfolio/zdjecia/AI/972f41a6-3028-4e72-888a-f6b6e7f8ed05_rw_1920.jpg", span: "md:col-span-2 md:row-span-1" },
  { id: 7, title: "Logo 70 lat ZRE Katowice", desc: "2026 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/0f113e7b-30a1-4fd6-83b7-4f5eb8abe35d_rw_1200.png", span: "md:row-span-1" },
  { id: 8, title: "Informator turystyczny ZPKWŚ", desc: "2024 | Print Works", url: "/portfolio/zdjecia/Print Works/84efe3dc-510b-406a-9c3d-f89071af654d_rw_1200.png", span: "md:col-span-2 md:row-span-2" },
  { id: 9, title: "Logo Tour De Moto", desc: "2020 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/302e94c4-38e3-410e-b637-7868dea6fc2f_rw_1200.png", span: "md:row-span-1" },
  { id: 10, title: "PBSz Kalnedarz 2024", desc: "2024 | Print Works", url: "/portfolio/zdjecia/Print Works/95b6e3e1-bcc6-4032-bd71-5299b15801ca_rw_1920.jpg", span: "md:row-span-2" },
  { id: 11, title: "Logo TOKTIK", desc: "2024 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/52f0a151-104e-4e41-9ee8-017ee484a962_rw_1200.png", span: "md:col-span-2 md:row-span-1" },
  { id: 12, title: "Przewodnik kulinarny KNT 2025", desc: "2025 | Print Works", url: "/portfolio/zdjecia/Print Works/e8418ce9-043c-4891-b989-9bd1c681058f_rw_1200.png", span: "md:row-span-1" },
  { id: 13, title: "Logo", desc: "2026 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/5efc54b5-1d1d-457b-82b9-1983324cf7bc_rw_1200.png", span: "md:row-span-1" },
  { id: 14, title: "Medal Tyski bieg niepodległości", desc: "2025 | Print Works", url: "/portfolio/zdjecia/Print Works/fd9528d4-f89d-48cf-8a6e-d0e783f26611_rw_1920.png", span: "md:col-span-2 md:row-span-2" },
  { id: 15, title: "Grafiki Ai elektrownia", desc: "2026 | AI Art", url: "/portfolio/zdjecia/AI/b0b0f902-778f-466c-9d49-d5e55a2b0653_rw_1200.jpg", span: "md:row-span-1" },
  { id: 16, title: "Wizualizacja domu Ai", desc: "2026 | AI Art", url: "/portfolio/zdjecia/AI/b7633c4e-4656-4168-8722-e7b8ca763d59_rw_1200.jpg", span: "md:row-span-2" },
  { id: 17, title: "Strona Skankolor", desc: "2026 | Digital Flow", url: "/portfolio/zdjecia/Digital Flow/e80b467e-e8c1-4c12-86dd-7e009061c886_rw_1920.jpg", span: "md:col-span-2 md:row-span-1" },
  { id: 18, title: "Paczka grafik postaci", desc: "2026 | AI Art", url: "/portfolio/zdjecia/AI/d71a434d-5468-468f-84d7-875d72ce3204_rw_1200.jpg", span: "md:row-span-1" },
];

export default function GlowHorizonDemo() {
  const socialLinks = [
    {
      icon: <FaTwitter className="w-6 h-6 opacity-40 cursor-not-allowed" />,
      href: "#",
      label: "Twitter",
    },
    {
      icon: <FaLinkedin className="w-6 h-6 opacity-40 cursor-not-allowed" />,
      href: "#",
      label: "LinkedIn",
    },
    {
      icon: <FaGithub className="w-6 h-6 opacity-40 cursor-not-allowed" />,
      href: "#",
      label: "GitHub",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:graffirafi@gmail.com",
      label: "Email",
    },
  ];

  const navLinks: any[] = [];

  return (
    <div className="w-full relative bg-black">
      <GradientBackground4 />
      
      {/* 1. Sekcja Hero z Animacją */}
      <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <GlowHorizonFM variant="top" />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Logo wrapper with arc glow effect */}
          <div className="relative -mt-32 md:-mt-16">
            <motion.img 
              src="/portfolio/logo.svg" 
              alt="Logo" 
              className="w-[300px] sm:w-[500px] md:w-[800px] max-w-[90vw] object-contain relative z-10" 
              initial={{ y: -100, opacity: 0, filter: "blur(15px)", scale: 1.1 }}
              animate={{ 
                y: 0, 
                opacity: 1, 
                filter: "blur(0px) drop-shadow(0 8px 30px rgba(161,85,255,0.6)) drop-shadow(0 20px 60px rgba(100,30,220,0.4)) drop-shadow(0 0 80px rgba(200,130,255,0.3))", 
                scale: 1 
              }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            />
            {/* Arc glow – masked to logo shape, only on letters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.5, delay: 1.5 }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(161,85,255,0.9) 0%, rgba(180,100,255,0.5) 35%, transparent 65%)",
                maskImage: "url('/portfolio/logo.svg')",
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskImage: "url('/portfolio/logo.svg')",
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
              }}
            />
          </div>
        </div>

        {/* Scroll down button */}
        <motion.button
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 group cursor-pointer"
          aria-label="Przewiń w dół"
        >
          <span className="text-white/40 text-xs uppercase tracking-widest font-medium group-hover:text-white/70 transition-colors duration-300">
            Przewiń
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex items-center justify-center w-12 h-12 rounded-full"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 8px 32px rgba(161, 85, 255, 0.2), inset 0 1px 1px rgba(255,255,255,0.2)",
            }}
          >
            {/* Pulse ring */}
            <motion.span
              animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 rounded-full"
              style={{ border: "1px solid rgba(161, 85, 255, 0.5)" }}
            />
            {/* Arrow */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* 2. Sekcja Spotlight */}
      <div id="about" className="relative w-full flex items-center justify-center text-white py-16 md:py-32 my-6 md:my-12">
        <div className="w-full max-w-5xl px-6 md:px-16">
          <FeaturedSpotlight />
        </div>
      </div>

      {/* 3. Sekcja Umiejętności */}
      <div className="relative w-full flex items-center justify-center">
        <SkillsSection />
      </div>

      {/* 4. Sekcja Cinematic Hero (scrolling telefonu - Projekty aplikacji) */}
      <div id="apps" className="relative w-full overflow-x-hidden">
        <CinematicHero />
      </div>

      {/* 5. Sekcja Nowego Modułu Scroll (zastępuje stary tablet) */}
      <div id="portfolio-new" className="relative w-full bg-black z-20">
        <PortfolioScrollModule />
      </div>

      {/* 6. Sekcja Sticky Scroll (zastępuje wybrane prace) */}
      <div id="portfolio" className="relative w-full overflow-x-hidden bg-black z-20">
        <StickyScrollRevealDemo />
      </div>

      {/* 6. Animowana Stopka */}
      <div id="contact">
        <Footer
          brandName="babiuchdesign"
          brandDescription="Projektuję nowoczesne i funkcjonalne rozwiązania wizualne, od grafik po aplikacje mobilne i strony WWW, łącząc kreatywność z potęgą sztucznej inteligencji."
          socialLinks={socialLinks}
          navLinks={navLinks}
          creatorName="Rafał Babiuch"
          creatorUrl="#"
        />
      </div>
    </div>
  );
}
