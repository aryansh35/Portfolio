import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.jpg';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'FEATURE FILM // SOFTWARE DEVELOPER',
    'ORIGINAL SERIES // WEB DEVELOPMENT',
    'MISSION: SECURE // CYBERSECURITY',
    'FROM CODE TO CLOUD // DEVSECOPS'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
        "-=0.7"
      )
      .fromTo(
        card,
        { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
        { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
        "-=0.9"
      );

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });

    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = glareRef.current ? gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" }) : null;
    const glareY = glareRef.current ? gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" }) : null;

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      if (glareX) glareX((x - cardRect.left) - cardRect.width / 2);
      if (glareY) glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Subtle Watermark */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.03]">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-white mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Clean & Soft Ambient Glow) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[100px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(0,123,167,0.14) 0%, rgba(255,45,149,0.06) 45%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">
        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">

          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.98]">
              ARYANSH <br />
              <span className="text-[#007BA7]">SOFTWARE </span> <br />
              <span className="text-[#007BA7]">DEVELOPER</span><span className="text-[#FF2D95]">.</span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2.5 text-xs text-white/70 font-mono">
              <span className="px-2.5 py-1 bg-[#007BA7]/10 border border-[#007BA7]/30 rounded-md text-[#007BA7] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95] animate-ping inline-block"></span>
                OPEN TO INTERNSHIPS
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">Next.js • TypeScript</span>
              <span className="text-white/30">•</span>
              <span className="text-white/80">Docker & DevSecOps</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/70 font-light leading-relaxed max-w-md">
              B.Tech CSE (DevSecOps) student at SRM IST, Chennai. I build modern web applications and explore how to make them faster, safer, and more reliable
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-[#007BA7] hover:text-white transition-all duration-300 shadow-[0_10px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,123,167,0.4)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                EXPLORE PROJECTS
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-white/[0.04] text-white border border-white/15 font-semibold text-xs uppercase tracking-widest rounded-lg hover:border-[#FF2D95] hover:bg-[#FF2D95]/10 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                LET'S CONNECT
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Subtle Refined Ambient Back Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#007BA7]/40 via-transparent to-[#FF2D95]/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700"></div>

              {/* Poster Card */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#0A0A0A]/95 rounded-2xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden group-hover:border-[#FF2D95]/50 transition-colors duration-500">

                {/* Professional Glassmorphic Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1.5 bg-[#0A0A0A]/80 backdrop-blur-md border border-white/15 text-white font-mono text-[10px] font-bold tracking-widest rounded-md shadow-xl flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95] shadow-[0_0_8px_#FF2D95] animate-pulse"></span>
                  THE BUILDER
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl max-w-xs hover:border-[#FF2D95]/40 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2 lg:justify-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95]"></span>
                <h3 className="text-[11px] font-mono uppercase tracking-widest text-[#007BA7] font-semibold">THE BUILDER'S CREDITS</h3>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Deloitte Australia Tech & Data Analytics Certified &bull; B.Tech CSE (DevSecOps) at SRM IST, Chennai.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-[#FF2D95] rounded-full shadow-[0_0_15px_#FF2D95]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-[#007BA7]/60 rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(0,123,167,0.3)]"
      ></div>

      {/* --- DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 inset-x-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
          ARYANSH<span className="w-1.5 h-1.5 rounded-full bg-[#FF2D95] inline-block shadow-[0_0_8px_#FF2D95]"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/70 absolute left-1/2 -translate-x-1/2">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#expertise" className="hover:text-white transition-colors">Expertise</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
        </nav>
        <a
          href="#contact"
          className="px-5 py-2 rounded-lg bg-[#FF2D95] hover:bg-[#FF2D95] text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(0,123,167,0.35)] hover:scale-105 active:scale-95"
        >
          Contact
        </a>
      </header>
    </section>
  );
};

export default Hero;
