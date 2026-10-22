import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const expertiseData = [
  {
    number: "01",
    title: "Software Development",
    text: "Building responsive web apps with Next.js, React, TypeScript, and Tailwind CSS, with a focus on clean design and useful features.",
    tag: "UI / UX & APPLICATION",
    gradient: "from-[#071a26] via-[#0c141a] to-[#0A0A0A]"
  },
  {
    number: "02",
    title: "DevSecOps & Cloud",
    text: "Using Git, Docker, and deployment tools to manage code, package applications, and explore reliable release workflows.",
    tag: "CI/CD & INFRASTRUCTURE",
    gradient: "from-[#071a26] via-[#0c141a] to-[#0A0A0A]"
  },
  {
    number: "03",
    title: "Cybersecurity & Web Security",
    text: "Exploring web security through secure session handling, phishing defense, and security checks in practical projects.",
    tag: "SECURITY & AUDITING",
    gradient: "from-[#071a26] via-[#0c141a] to-[#0A0A0A]"
  },
  {
    number: "04",
    title: "Backend & Databases",
    text: "Working with PostgreSQL, Supabase, and Firebase to manage application data and build backend features and APIs.",
    tag: "DATA & BACKEND",
    gradient: "from-[#071a26] via-[#0c141a] to-[#0A0A0A]"
  }
];

const Expertise = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    if (!cards.length) return;

    cards.forEach((card, index) => {
      if (index === cards.length - 1) return; // Keep the top-most card fully focused

      gsap.to(card, {
        scale: 0.92 - index * 0.025,
        y: -15 - index * 8,
        filter: "blur(6px)",
        opacity: 0.4,
        scrollTrigger: {
          trigger: card,
          start: `top ${90 + index * 20}px`,
          end: "bottom top",
          scrub: true,
        }
      });
    });

    // Magnetic mouse highlight per card
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    cards.forEach((card) => {
      if (!card) return;
      const listener = (e) => handleMouseMove(e, card);
      card.addEventListener('mousemove', listener);
      return () => card.removeEventListener('mousemove', listener);
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] text-white pt-20 pb-12 md:pt-24 md:pb-16 px-6 md:px-12 select-none overflow-hidden"
    >
      {/* Top Ambient Glow - Soft & Kept Deep Down so Top Remains Predominantly Black */}
      <div className="absolute top-[36%] left-1/4 w-[420px] h-[420px] bg-[#007BA7]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      {/* Cinematic Seamless Transition to Skills Section */}
      <div
        className="absolute inset-x-0 bottom-0 h-[750px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 95% 75% at 0% 100%, rgba(0, 123, 167, 0.24) 0%, rgba(3, 22, 38, 0.5) 30%, rgba(2, 14, 25, 0.25) 55%, transparent 75%),
            radial-gradient(ellipse 75% 65% at 100% 100%, rgba(255, 45, 149, 0.08) 0%, rgba(45, 9, 27, 0.2) 35%, rgba(20, 5, 14, 0.08) 55%, transparent 75%),
            linear-gradient(to bottom, transparent 0%, rgba(10, 10, 10, 0) 30%, rgba(3, 16, 27, 0.35) 100%)
          `
        }}
      >
        {/* Soft atmospheric blur overlay for ultra-smooth dispersion */}
        <div className="absolute -bottom-24 -left-20 w-[550px] h-[500px] rounded-full bg-[#007BA7]/12 blur-[150px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-16 w-[450px] h-[450px] rounded-full bg-[#FF2D95]/06 blur-[150px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-12">

        {/* Compact Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-black/80 backdrop-blur-xl border border-[#007BA7]/40 text-[11px] font-mono uppercase tracking-widest text-white shadow-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95] animate-ping"></span>
              <span className="text-[#007BA7] font-bold">EPISODE 02</span>
              <span className="text-white/40">|</span>
              <span>WHAT I CAN DO</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              THE BUILDER'S <br />
              <span className="text-[#007BA7] drop-shadow-[0_0_20px_rgba(0,123,167,0.35)]">TOOLKIT. </span>
              <span className="text-[#FF2D95] drop-shadow-[0_0_20px_rgba(255,45,149,0.35)]">UNLOCKED.</span>
            </h2>
          </div>
          <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed max-w-xs">
            Merging software engineering, DevSecOps pipelines, and cybersecurity principles into production-ready platforms.
          </p>
        </div>

        {/* Compact 1-on-1 Gradient Stacking Container */}
        <div className="relative flex flex-col gap-8 pb-6 md:pb-8">
          {expertiseData.map((item, index) => (
            <div
              key={index}
              ref={addToRefs}
              className={`sticky w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-2xl border border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[230px] md:min-h-[250px] transform-gpu transition-all overflow-hidden group hover:border-[#007BA7]/60`}
              style={{
                zIndex: index + 1,
                top: `${95 + index * 16}px`
              }}
            >
              {/* Dynamic Mouse Spotlight Highlight */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                style={{
                  background: 'radial-gradient(350px circle at var(--mouse-x) var(--mouse-y), rgba(0,123,167,0.18), transparent 70%)'
                }}
              ></div>

              {/* Pink Middle Accent Stripe */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#FF2D95] to-transparent z-10"></div>

              {/* Card Header Top */}
              <div className="flex items-center justify-between w-full mb-4 relative z-10">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#007BA7] px-2.5 py-0.5 rounded bg-[#007BA7]/10 border border-[#007BA7]/30">
                  {item.tag}
                </span>
                <span className="text-2xl md:text-3xl font-mono font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center my-auto relative z-10">
                <div className="lg:col-span-5">
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-snug group-hover:text-[#FF2D95] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Energetic Corner Dot */}
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#FF2D95] group-hover:shadow-[0_0_12px_#FF2D95] z-10 transition-all"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Expertise;