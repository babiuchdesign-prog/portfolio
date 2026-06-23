"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillsLeft = [
  { name: "Projektowanie grafik reklamowych", value: 98 },
  { name: "Praca w zespole", value: 95 },
  { name: "Grafika na potrzeby internetu", value: 95 },
  { name: "Zarządzanie czasem", value: 92 },
  { name: "Umiejętność podejmowania decyzji", value: 90 },
  { name: "Znajomość trendów w social media", value: 85 },
  { name: "Fotografia i edycja zdjęć", value: 88 },
];

const skillsRight = [
  { name: "Prawo jazdy kat. B", value: 100 },
  { name: "Praca z klientem", value: 90 },
  { name: "Obsługa Win/iOS", value: 95 },
  { name: "Samodzielność i proaktywność", value: 90 },
  { name: "Nieszablonowe myślenie", value: 85 },
  { name: "Język angielski", value: 80 },
  { name: "Praca w dynamicznym środowisku", value: 95 },
];

const SkillBar = ({ name, value }: { name: string; value: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <div ref={ref} className="flex flex-col gap-2 mb-6">
      <div className="flex justify-between items-center text-sm md:text-base font-medium">
        <span className="text-white">{name}</span>
        <span className="text-[#c17eff]">{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${value}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-[#8a2be2] via-[#b65df0] to-[#e18bfe]"
        />
      </div>
    </div>
  );
};


export function SkillsSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-10 flex flex-col items-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-tight text-center"
      >
        Umiejętności
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-x-12 md:gap-x-24">
        {/* Kolumna Lewa */}
        <div className="flex flex-col">
          {skillsLeft.map((skill, idx) => (
            <SkillBar key={idx} name={skill.name} value={skill.value} />
          ))}
        </div>

        {/* Kolumna Prawa */}
        <div className="flex flex-col">
          {skillsRight.map((skill, idx) => (
            <SkillBar key={idx} name={skill.name} value={skill.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
