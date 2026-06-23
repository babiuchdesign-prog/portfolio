"use client";

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

const menuItems = [
  { title: 'Home', icon: <IoHomeOutline />, gradientFrom: '#a955ff', gradientTo: '#ea51ff', targetId: 'home' },
  { title: 'O mnie', icon: <IoPersonOutline />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED', targetId: 'about' },
  { title: 'Aplikacje', icon: <IoPhonePortraitOutline />, gradientFrom: '#00E676', gradientTo: '#1DE9B6', targetId: 'apps' },
  { title: 'Portfolio', icon: <IoBriefcaseOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62', targetId: 'portfolio' },
  { title: 'Kontakt', icon: <IoMailOutline />, gradientFrom: '#F2C94C', gradientTo: '#F2994A', targetId: 'contact' },
];

export default function GradientMenu({ className }: { className?: string }) {
  const [activeId, setActiveId] = useState('home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Scroll spy – observe all sections
    const sectionIds = menuItems.map((item) => item.targetId).filter((id) => id !== 'home');

    const observers: IntersectionObserver[] = [];

    // Handle scroll position for "home" – highlight when near top
    const handleScrollTop = () => {
      if (window.scrollY < 100) {
        setActiveId('home');
      }
    };
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id);
            }
          });
        },
        {
          root: null,
          // Section is considered "active" when 30% of it is visible
          threshold: 0.3,
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollTop);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleScroll = (id: string) => {
    setActiveId(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };


  const menu = (
    <div
      style={{
        position: 'fixed',
        top: '2rem',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <ul
        style={{
          display: 'flex',
          gap: '12px',
          pointerEvents: 'all',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {menuItems.map(({ title, icon, gradientFrom, gradientTo, targetId }, idx) => {
          const isActive = activeId === targetId;
          return (
            <li
              key={idx}
              onClick={() => handleScroll(targetId)}
              style={{
                '--gradient-from': gradientFrom,
                '--gradient-to': gradientTo,
              } as React.CSSProperties}
              className={`relative h-[45px] w-[45px] md:h-[60px] md:w-[60px] backdrop-blur-md border border-white/20 shadow-lg rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shrink-0 ${
                isActive
                  ? 'shadow-[0_0_15px_var(--gradient-from)]'
                  : 'bg-white/10 hover:shadow-none md:hover:w-[180px] group'
              }`}
            >
              {/* Gradient background on active */}
              <span
                className={`absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] transition-all duration-300 ${
                  isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
                }`}
              />
              {/* Blur glow */}
              <span
                className={`absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] transition-all duration-300 -z-10 ${
                  isActive ? 'opacity-50' : 'opacity-0 md:group-hover:opacity-50'
                }`}
              />
              {/* Icon – always visible */}
              <span
                className={`relative z-10 flex items-center justify-center transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-white/80 md:group-hover:scale-0'
                }`}
              >
                <span className="text-xl md:text-2xl">{icon}</span>
              </span>
              {/* Title – desktop hover only */}
              <span className="hidden md:block absolute text-white uppercase font-bold tracking-wide text-sm transition-all duration-300 scale-0 group-hover:scale-100 delay-150">
                {title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (!mounted) return null;
  return createPortal(menu, document.body);
}
