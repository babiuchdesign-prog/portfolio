import React from 'react';
import { IoHomeOutline, IoPersonOutline, IoBriefcaseOutline, IoMailOutline, IoPhonePortraitOutline } from 'react-icons/io5';

const menuItems = [
  { title: 'Home', icon: <IoHomeOutline />, gradientFrom: '#a955ff', gradientTo: '#ea51ff', targetId: 'home' },
  { title: 'O mnie', icon: <IoPersonOutline />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED', targetId: 'about' },
  { title: 'Portfolio', icon: <IoBriefcaseOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62', targetId: 'portfolio' },
  { title: 'Aplikacje', icon: <IoPhonePortraitOutline />, gradientFrom: '#00E676', gradientTo: '#1DE9B6', targetId: 'apps' },
  { title: 'Kontakt', icon: <IoMailOutline />, gradientFrom: '#F2C94C', gradientTo: '#F2994A', targetId: 'contact' },
];

export default function GradientMenu({ className }: { className?: string }) {
  const handleScroll = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className={className}>
      <ul className="flex gap-4 md:gap-6">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo, targetId }, idx) => (
          <li
            key={idx}
            onClick={() => handleScroll(targetId)}
            style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo } as React.CSSProperties}
            className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[150px] md:hover:w-[180px] hover:shadow-none group cursor-pointer"
          >
            {/* Gradient background on hover */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-all duration-500 group-hover:opacity-100"></span>
            {/* Blur glow */}
            <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-all duration-500 group-hover:opacity-50"></span>

            {/* Icon */}
            <span className="relative z-10 transition-all duration-500 group-hover:scale-0 delay-0">
              <span className="text-xl md:text-2xl text-white/80">{icon}</span>
            </span>

            {/* Title */}
            <span className="absolute text-white uppercase tracking-wide text-xs md:text-sm transition-all duration-500 scale-0 group-hover:scale-100 delay-150">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
