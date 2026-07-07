"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

const stats = [
  { value: 10, label: "Lat doświadczenia", suffix: "+" },
  { value: 500, label: "Zrealizowanych projektów", suffix: "+" },
  { value: 40, label: "Skrócony czas dzięki AI", suffix: "%" },
  { value: 2000, label: "Wygenerowanych obrazów AI", suffix: "+" },
];

const Counter = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: "easeOut",
        onUpdate(val) {
          if (ref.current) {
            // Dodajemy spacje jako separator tysięcy dla ładniejszego wyglądu (np. 2 000)
            ref.current.textContent = Math.floor(val).toLocaleString("pl-PL").replace(",", " ");
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value]);

  return <span ref={ref}>0</span>;
};

export function SkillsSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 pt-20 pb-0 flex flex-col items-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center"
      >
        Liczby, które mówią same za siebie
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-[#c17eff]/50 transition-colors duration-500 relative overflow-hidden group"
          >
            {/* Delikatna poświata w tle karty po najechaniu */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#c17eff]/0 to-[#c17eff]/0 group-hover:to-[#c17eff]/10 transition-all duration-500" />
            
            <div className="flex items-baseline gap-1 text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#8a2be2] via-[#b65df0] to-[#e18bfe] mb-4">
              <Counter value={stat.value} />
              <span className="text-4xl md:text-5xl">{stat.suffix}</span>
            </div>
            
            <p className="text-gray-400 text-center font-medium uppercase tracking-wider text-sm md:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
