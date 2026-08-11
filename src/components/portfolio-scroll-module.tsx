"use client";
import React, { useEffect, useRef } from "react";

export function PortfolioScrollModule() {
  const stageRef = useRef<HTMLElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const trioRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const capEyebrowRef = useRef<HTMLParagraphElement>(null);
  const capTitleRef = useRef<HTMLHeadingElement>(null);
  const tabletContentRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const laptop = laptopRef.current;
    const tablet = tabletRef.current;
    const trio = trioRef.current;
    const caption = captionRef.current;
    const capEyebrow = capEyebrowRef.current;
    const capTitle = capTitleRef.current;
    const tabletContent = tabletContentRef.current;
    const dots = dotsRef.current;

    if (!stage || !laptop || !tablet || !trio || !caption || !capEyebrow || !capTitle) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const captions = [
      { eyebrow: "01 — PRECYZJA", title: "Nowoczesny design,<br>który hipnotyzuje." },
      { eyebrow: "02 — ELASTYCZNOŚĆ", title: "Idealne proporcje<br>na każdym urządzeniu." },
      { eyebrow: "03 — MOC DETALU I AI", title: "Niesamowita precyzja obrazu.<br>Podbijanie detali za pomocą sztucznej inteligencji." },
    ];

    function setCaption(i: number, opacity: number) {
      if (!capEyebrow || !capTitle || !caption) return;
      capEyebrow.textContent = captions[i].eyebrow;
      capTitle.innerHTML = captions[i].title;
      caption.style.opacity = opacity.toString();
      caption.style.transform = `translateY(${lerp(16, 0, opacity)}px)`;
    }

    function render() {
      if (reduce) return;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = stage.offsetHeight - vh;
      const scrolled = clamp(-rect.top, 0, total);
      const p = total > 0 ? scrolled / total : 0;

      const phaseLen = 1 / 3;
      const rawPhase = p / phaseLen;
      const phase = clamp(Math.floor(rawPhase), 0, 2);
      const local = ease(clamp(rawPhase - phase, 0, 1));

      dots.forEach((d, i) => {
        if (d) d.classList.toggle("active", i === phase);
      });

      // FAZA 0
      const inX = lerp(70, 0, clamp(local * 2.2, 0, 1));
      const inRot = lerp(22, 0, clamp(local * 2.2, 0, 1));
      const inOp = clamp(local * 3, 0, 1);

      let laptopOp, laptopX, laptopRot, laptopScale;
      if (phase === 0) {
        laptopOp = inOp;
        laptopX = inX;
        laptopRot = inRot;
        laptopScale = 1;
      } else if (phase === 1) {
        const out = clamp(local * 2.5, 0, 1);
        laptopOp = 1 - out;
        laptopX = -out * 10;
        laptopRot = -out * 8;
        laptopScale = 1 - out * 0.05;
      } else {
        laptopOp = 0;
        laptopX = -10;
        laptopRot = -8;
        laptopScale = 0.95;
      }
      if (laptop) {
        laptop.style.opacity = laptopOp.toString();
        laptop.style.transform = `translateX(${laptopX}%) rotateY(${laptopRot}deg) scale(${laptopScale})`;
      }

      // FAZA 1
      let tabletOp, tabletY, tabletScale, contentY;
      if (phase === 0) {
        tabletOp = 0;
        tabletY = 30;
        tabletScale = 0.92;
        contentY = 0;
      } else if (phase === 1) {
        const inT = clamp(local * 2.5, 0, 1);
        tabletOp = inT;
        tabletY = lerp(30, 0, inT);
        tabletScale = lerp(0.92, 1, inT);
        const scrollT = clamp((local - 0.35) / 0.65, 0, 1);
        contentY = -scrollT * 46;
      } else {
        const out = clamp(local * 2.5, 0, 1);
        tabletOp = 1 - out;
        tabletY = -out * 20;
        tabletScale = 1 - out * 0.05;
        contentY = -46 - out * 6;
      }
      if (tablet) {
        tablet.style.opacity = tabletOp.toString();
        tablet.style.transform = `translateY(${tabletY}px) scale(${tabletScale})`;
      }
      if (tabletContent) {
        tabletContent.style.transform = `translateY(${contentY}%)`;
      }

      // FAZA 2
      let trioOp, trioY;
      if (trio) {
        const minis = trio.querySelectorAll(".mini") as NodeListOf<HTMLElement>;
        if (phase < 2) {
          trioOp = 0;
          trioY = 60;
          minis.forEach((m) => (m.style.transform = "translateY(0) rotate(0deg)"));
        } else {
          const inTr = clamp(local * 2.2, 0, 1);
          trioOp = inTr;
          trioY = lerp(60, 0, inTr);
          const rots = [-8, 0, 8];
          minis.forEach((m, i) => {
            const delay = clamp((inTr - i * 0.12) / (1 - i * 0.12), 0, 1);
            m.style.transform = `translateY(${lerp(40, 0, delay)}px) rotate(${lerp(0, rots[i], delay)}deg)`;
            m.style.opacity = delay.toString();
          });
        }
        trio.style.opacity = trioOp.toString();
        trio.style.transform = `translateY(${trioY}px)`;
      }

      // CAPTION
      const capOp =
        phase === 0
          ? clamp(local * 2, 0, 1)
          : phase === 1
          ? clamp(Math.min(local * 2, (1 - local) * 4), 0, 1)
          : clamp(local * 2, 0, 1);
      setCaption(phase, capOp);
    }

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          render();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", render);
    // Początkowy render z lekkim opóźnieniem by style zaskoczyły
    setTimeout(render, 100);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", render);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .portfolio-scroll-wrapper {
          --bg-deep: #0a0f14;
          --bg-panel: #111823;
          --chassis: #1b232e;
          --chassis-light: #2a3542;
          --teal: #22c9a8;
          --teal-dim: #17594d;
          --ink: #eef4f2;
          --muted: #7c8b93;
          --screen-a: #0f2e35;
          --screen-b: #123f43;
          background: var(--bg-deep);
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          margin-top: 5rem;
        }

        .portfolio-scroll-wrapper * {
          box-sizing: border-box;
        }

        /* ---------- STAGE ---------- */
        .portfolio-scroll-wrapper .stage {
          position: relative;
          height: 420vh;
        }

        .portfolio-scroll-wrapper .stage-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 30% 20%, rgba(34,201,168,.10), transparent 55%),
            radial-gradient(ellipse at 80% 80%, rgba(23,89,77,.18), transparent 60%),
            var(--bg-deep);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* caption */
        .portfolio-scroll-wrapper .caption {
          position: absolute;
          left: 6%;
          top: 12%;
          max-width: 340px;
          z-index: 20;
          opacity: 0;
          transform: translateY(16px);
          pointer-events: none;
        }
        .portfolio-scroll-wrapper .caption .eyebrow {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--teal);
          margin: 0 0 10px;
        }
        .portfolio-scroll-wrapper .caption h2 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(24px, 3vw, 34px);
          line-height: 1.2;
          margin: 0;
          font-weight: 600;
        }

        /* progress dots */
        .portfolio-scroll-wrapper .dots {
          position: absolute;
          right: 5%;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 14px;
          z-index: 30;
        }
        .portfolio-scroll-wrapper .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--chassis-light);
          transition: background .25s, transform .25s;
        }
        .portfolio-scroll-wrapper .dot.active { background: var(--teal); transform: scale(1.4); }

        /* ---------- DEVICE: LAPTOP ---------- */
        .portfolio-scroll-wrapper .laptop {
          position: absolute;
          width: min(62vw, 860px);
          z-index: 10;
          will-change: transform, opacity;
          filter: drop-shadow(0 50px 60px rgba(0,0,0,.5)) drop-shadow(0 10px 18px rgba(0,0,0,.35));
        }
        .portfolio-scroll-wrapper .laptop-body { transform: perspective(1600px) rotateX(1.5deg); }
        .portfolio-scroll-wrapper .laptop-screen {
          position: relative;
          background:
            linear-gradient(100deg, rgba(255,255,255,.05) 0%, transparent 12%),
            repeating-linear-gradient(95deg, rgba(255,255,255,.02) 0 2px, transparent 2px 4px),
            linear-gradient(155deg, #333d48 0%, #232b34 12%, #191f26 50%, #232b34 88%, #333d48 100%);
          border-radius: 13px 13px 4px 4px;
          padding: 2.1% 2.1% 2.6%;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.15),
            inset 0 0 0 1px rgba(0,0,0,.4),
            0 1px 0 rgba(255,255,255,.06);
        }
        .portfolio-scroll-wrapper .laptop-cam {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          width: 5px; height: 5px; border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #3b4a52, #050708 70%);
          box-shadow: 0 0 0 3px rgba(0,0,0,.25);
          z-index: 2;
        }
        .portfolio-scroll-wrapper .laptop-bezel {
          border-radius: 5px;
          padding: 1.4%;
          background: linear-gradient(155deg,#0c0f12,#020304);
          box-shadow: inset 0 0 8px rgba(0,0,0,.9);
        }
        .portfolio-scroll-wrapper .laptop-viewport {
          border-radius: 2px;
          overflow: hidden;
          aspect-ratio: 16/10;
          position: relative;
          background: linear-gradient(160deg,var(--screen-a),var(--screen-b));
        }
        .portfolio-scroll-wrapper .screen-glare {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(115deg,
            rgba(255,255,255,.10) 0%,
            rgba(255,255,255,.03) 18%,
            transparent 40%,
            transparent 78%,
            rgba(255,255,255,.05) 100%);
          mix-blend-mode: screen;
        }
        .portfolio-scroll-wrapper .laptop-hinge {
          height: 5px;
          margin: 0 3%;
          background: linear-gradient(#05070a,#11151a);
          box-shadow: 0 1px 0 rgba(255,255,255,.06);
        }
        .portfolio-scroll-wrapper .laptop-base {
          height: 22px;
          position: relative;
          border-radius: 0 0 11px 11px;
          background:
            linear-gradient(180deg, #414c58 0%, #2c3540 18%, #232b34 55%, #1a2027 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.12),
            inset 0 -6px 10px -4px rgba(0,0,0,.5);
        }
        .portfolio-scroll-wrapper .keyboard-deck {
          position: absolute; top: 3px; left: 6%; right: 6%; bottom: 4px;
          border-radius: 2px 2px 0 0;
          background:
            repeating-linear-gradient(90deg, rgba(0,0,0,.35) 0 3px, transparent 3px 9px),
            linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.35));
          opacity: .8;
        }
        .portfolio-scroll-wrapper .trackpad {
          position: absolute; left: 50%; bottom: -2px; transform: translateX(-50%);
          width: 16%; height: 60%;
          border-radius: 2px;
          background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(0,0,0,.2));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.05);
        }
        .portfolio-scroll-wrapper .laptop-base::after {
          content: '';
          position: absolute; left: 50%; top: 0; transform: translateX(-50%);
          width: 16%; height: 7px; background: var(--bg-deep);
          border-radius: 0 0 7px 7px;
          box-shadow: inset 0 2px 3px rgba(0,0,0,.6);
        }

        /* ---------- DEVICE: TABLET ---------- */
        .portfolio-scroll-wrapper .tablet {
          position: absolute;
          width: min(60vw, 840px);
          z-index: 11;
          will-change: transform, opacity;
          filter: drop-shadow(0 45px 55px rgba(0,0,0,.5)) drop-shadow(0 8px 14px rgba(0,0,0,.35));
        }
        .portfolio-scroll-wrapper .tablet-frame {
          position: relative;
          background:
            linear-gradient(100deg, rgba(255,255,255,.07) 0%, transparent 10%),
            linear-gradient(165deg, #3d4854 0%, #2a323c 18%, #1e252d 50%, #2a323c 82%, #3d4854 100%);
          border-radius: 18px;
          padding: 2.6%;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.16),
            inset 0 0 0 1px rgba(0,0,0,.35);
        }
        .portfolio-scroll-wrapper .tablet-btn {
          position: absolute;
          border-radius: 2px;
          background: linear-gradient(90deg,#161c22,#3a4552);
        }
        .portfolio-scroll-wrapper .tablet-btn.power { top: -2px; right: 22%; width: 7%; height: 3px; }
        .portfolio-scroll-wrapper .tablet-btn.vol { top: -2px; right: 12%; width: 11%; height: 3px; }
        .portfolio-scroll-wrapper .tablet-viewport {
          aspect-ratio: 1.406/1;
          border-radius: 8px;
          overflow: hidden;
          background: linear-gradient(160deg,var(--screen-a),var(--screen-b));
          position: relative;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.5);
        }

        /* scrolling site content inside a screen */
        .portfolio-scroll-wrapper .site-content {
          position: absolute; top: 0; left: 0; width: 100%;
          padding: 6% 7%;
          will-change: transform;
        }
        .portfolio-scroll-wrapper .site-nav {
          display: flex; gap: 6%; margin-bottom: 10%;
        }
        .portfolio-scroll-wrapper .site-nav span {
          width: 16%; height: 5px; border-radius: 3px;
          background: rgba(238,244,242,.35);
        }
        .portfolio-scroll-wrapper .site-nav span:first-child { background: var(--teal); width: 22%; }
        .portfolio-scroll-wrapper .site-hero {
          height: 26%;
          border-radius: 6px;
          background: linear-gradient(135deg, rgba(34,201,168,.5), rgba(34,201,168,.08));
          margin-bottom: 8%;
        }
        .portfolio-scroll-wrapper .site-lines span {
          display: block; height: 6px; border-radius: 3px;
          background: rgba(238,244,242,.22);
          margin-bottom: 6%;
        }
        .portfolio-scroll-wrapper .site-lines span:nth-child(1) { width: 80%; }
        .portfolio-scroll-wrapper .site-lines span:nth-child(2) { width: 60%; }
        .portfolio-scroll-wrapper .site-cards {
          display: flex; gap: 4%; margin-top: 10%;
        }
        .portfolio-scroll-wrapper .site-cards div {
          flex: 1; aspect-ratio: 1;
          border-radius: 6px;
          background: rgba(238,244,242,.10);
        }
        .portfolio-scroll-wrapper .site-cards div:nth-child(1) { background: rgba(34,201,168,.30); }

        /* ---------- TRIO ---------- */
        .portfolio-scroll-wrapper .trio {
          position: absolute;
          display: flex;
          gap: 40px;
          z-index: 12;
          will-change: transform, opacity;
          margin-left: 12vw;
        }
        .portfolio-scroll-wrapper .mini {
          width: min(22.5vw, 270px);
          will-change: transform;
        }
        .portfolio-scroll-wrapper .mini-frame {
          position: relative;
          background:
            linear-gradient(100deg, rgba(255,255,255,.07) 0%, transparent 10%),
            linear-gradient(165deg, #3d4854 0%, #2a323c 18%, #1e252d 50%, #2a323c 82%, #3d4854 100%);
          border-radius: 15px;
          padding: 3.4%;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.14),
            inset 0 0 0 1px rgba(0,0,0,.35);
          filter: drop-shadow(0 30px 40px rgba(0,0,0,.5));
        }
        .portfolio-scroll-wrapper .mini-viewport {
          aspect-ratio: 1 / 1.8;
          border-radius: 6px;
          overflow: hidden;
          background: linear-gradient(160deg,var(--screen-a),var(--screen-b));
          position: relative;
          padding: 6% 7%;
          box-shadow: inset 0 0 0 1px rgba(0,0,0,.5);
        }
        .portfolio-scroll-wrapper .mini-glare {
          position: absolute; inset: 0; z-index: 3; pointer-events: none;
          background: linear-gradient(115deg, rgba(255,255,255,.09) 0%, transparent 30%, transparent 75%, rgba(255,255,255,.04) 100%);
          mix-blend-mode: screen;
        }
        .portfolio-scroll-wrapper .mini-label {
          position: absolute;
          bottom: -45px; left: -20%; width: 140%;
          text-align: center;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          letter-spacing: .08em;
          color: var(--muted);
        }
        .portfolio-scroll-wrapper .mini-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 8%;
        }
        .portfolio-scroll-wrapper .mini-grid div { aspect-ratio: 1; border-radius: 5px; background: rgba(238,244,242,.14); }
        .portfolio-scroll-wrapper .mini-grid div:nth-child(1) { background: rgba(34,201,168,.35); grid-column: 1/3; aspect-ratio: 2/1; }

        .portfolio-scroll-wrapper .mini-list span {
          display: block; height: 5px; border-radius: 3px;
          background: rgba(238,244,242,.2); margin-bottom: 9%;
        }
        .portfolio-scroll-wrapper .mini-list .row { display: flex; gap: 6%; margin-bottom: 9%; }
        .portfolio-scroll-wrapper .mini-list .row div { flex: 1; aspect-ratio: 1; border-radius: 50%; background: rgba(34,201,168,.4); }

        .portfolio-scroll-wrapper .mini-bars { display: flex; align-items: flex-end; gap: 6%; height: 60%; }
        .portfolio-scroll-wrapper .mini-bars div { flex: 1; background: rgba(238,244,242,.18); border-radius: 3px 3px 0 0; }
        .portfolio-scroll-wrapper .mini-bars div:nth-child(2) { background: rgba(34,201,168,.45); }

        @media (max-width: 768px) {
          .portfolio-scroll-wrapper .stage {
            height: 220vh;
          }
          .portfolio-scroll-wrapper .caption {
            position: relative;
            top: auto;
            left: auto;
            width: 100%;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 20px;
            margin-bottom: 0;
            opacity: 1 !important;
            transform: none !important;
          }
          .portfolio-scroll-wrapper .caption .eyebrow {
            margin-bottom: 6px;
            font-size: 11px;
          }
          .portfolio-scroll-wrapper .caption h2 {
            font-size: 22px;
            line-height: 1.25;
          }
          .portfolio-scroll-wrapper .stage-sticky {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding-top: 50px;
            padding-bottom: 20px;
            gap: 12px;
          }
          .portfolio-scroll-wrapper .laptop {
            position: relative;
            width: 88vw;
            top: auto;
            bottom: auto;
            filter: drop-shadow(0 20px 30px rgba(0,0,0,.4));
          }
          .portfolio-scroll-wrapper .tablet {
            position: relative;
            width: 75vw;
            top: auto;
            bottom: auto;
          }
          .portfolio-scroll-wrapper .trio {
            display: none !important;
          }
          .portfolio-scroll-wrapper .dots {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .portfolio-scroll-wrapper .stage { height: auto; }
          .portfolio-scroll-wrapper .stage-sticky { position: relative; height: auto; padding: 80px 0; flex-direction: column; gap: 60px; }
          .portfolio-scroll-wrapper .laptop, .portfolio-scroll-wrapper .tablet, .portfolio-scroll-wrapper .trio { position: relative; opacity: 1 !important; transform: none !important; }
        }
      `
      }} />

      <div className="portfolio-scroll-wrapper">
        <section className="stage" ref={stageRef}>
          <div className="stage-sticky">
            <div className="dots">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="dot"
                  ref={(el) => {
                    dotsRef.current[i] = el;
                  }}
                ></div>
              ))}
            </div>

            <div className="caption" ref={captionRef}>
              <p className="eyebrow" ref={capEyebrowRef}>01 — Desktop</p>
              <h2 ref={capTitleRef}>Twoja strona,<br />gotowa do pokazania.</h2>
            </div>

            {/* LAPTOP */}
            <div className="laptop" ref={laptopRef}>
              <div className="laptop-body">
                <div className="laptop-screen">
                  <div className="laptop-cam"></div>
                  <div className="laptop-bezel">
                    <div className="laptop-viewport">
                      <div className="screen-glare"></div>
                      <img
                        src="/portfolio/assets/mikea.png"
                        alt="Mikea Preview"
                        className="absolute inset-0 w-full h-full object-cover z-10"
                        style={{ borderRadius: "2px", objectPosition: "top" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="laptop-hinge"></div>
                <div className="laptop-base">
                  <div className="keyboard-deck"></div>
                  <div className="trackpad"></div>
                </div>
              </div>
            </div>

            {/* TABLET */}
            <div className="tablet" ref={tabletRef}>
              <div className="tablet-frame">
                <div className="tablet-btn power"></div>
                <div className="tablet-btn vol"></div>
                <div className="tablet-viewport">
                  <div className="screen-glare"></div>
                  <img
                    src="/portfolio/assets/skankolor.png"
                    alt="Skankolor"
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    style={{ borderRadius: "2px", objectPosition: "top" }}
                  />
                </div>
              </div>
            </div>

            {/* TRIO */}
            <div className="trio" ref={trioRef}>
              <div className="mini">
                <div className="mini-frame">
                  <div className="mini-viewport">
                    <div className="mini-glare"></div>
                    <img src="/portfolio/assets/01@2x-100.jpg" alt="AI Detail 1" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
                  </div>
                  <div className="mini-label">Oryginał</div>
                </div>
              </div>
              <div className="mini">
                <div className="mini-frame">
                  <div className="mini-viewport">
                    <div className="mini-glare"></div>
                    <img src="/portfolio/assets/02@2x-100.jpg" alt="AI Detail 2" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
                  </div>
                  <div className="mini-label">Powiększenie x4 (ComfyUI)</div>
                </div>
              </div>
              <div className="mini">
                <div className="mini-frame">
                  <div className="mini-viewport">
                    <div className="mini-glare"></div>
                    <img src="/portfolio/assets/03@2x-100.jpg" alt="AI Detail 3" className="absolute inset-0 w-full h-full object-cover" style={{ zIndex: 1 }} />
                  </div>
                  <div className="mini-label">Wzbogacanie detalami (Gemini)</div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
