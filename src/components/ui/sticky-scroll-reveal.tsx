"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = ["#0f172a", "#09090b", "#0c0a09"];

  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative w-full"
      ref={ref}
    >
      {/* Każda sekcja zajmuje 100vh – dzięki temu scroll "zatrzymuje się" na każdej */}
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        {content.map((item, index) => (
          <div
            key={item.title + index}
            className="relative flex flex-col lg:flex-row items-center gap-16 min-h-screen py-32"
          >
            {/* Tekst po lewej */}
            <div className="flex-1 max-w-lg">
              <motion.h2
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-3xl font-bold text-white mb-6"
              >
                {item.title}
              </motion.h2>
              <motion.p
                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                className="text-slate-300 text-lg leading-relaxed"
              >
                {item.description}
              </motion.p>
            </div>

            {/* Obrazek/kontent po prawej – sticky na desktopu */}
            <div
              className={cn(
                "flex-1 lg:sticky lg:top-[20vh] h-[280px] lg:h-[50vh] w-full rounded-2xl overflow-hidden shadow-2xl",
                contentClassName
              )}
              style={{ background: backgroundGradient }}
            >
              {item.content ?? null}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
