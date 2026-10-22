import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MinimalPreloader = ({ onComplete }) => {
  const preloaderRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    tl.set(preloaderRef.current, { autoAlpha: 1 })
      .fromTo(
        contentRef.current,
        { scale: 0.95, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .to(contentRef.current, {
        scale: 1.04,
        opacity: 0,
        y: -10,
        duration: 0.45,
        ease: "power2.in",
        delay: 0.7
      })
      .to(preloaderRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut"
      });
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center select-none overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col items-center gap-4">
        {/* Energetic Indicator Dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#007BA7] animate-ping absolute opacity-75"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF2D95] shadow-[0_0_20px_#FF2D95]"></div>
        </div>

        {/* Razor-sharp Typography */}
        <h1 
          className="text-4xl md:text-5xl font-black uppercase tracking-[0.3em] text-white drop-shadow-[0_4px_30px_rgba(255,45,149,0.45)]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ARYANSH
        </h1>
      </div>
    </div>
  );
};

export default MinimalPreloader;