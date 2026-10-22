import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Authentic Project Data for Aryansh Gupta
const projectsData = [
  {
    title: "PokédeX",
    category: "Web Application / Full-Stack",
    description: "Academic portal web application with a lightweight HTTP scraping engine, secure session handling, attendance and marks tracking, and PWA support.",
    tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Cheerio", "AES-256-GCM"],
    match: "99%",
    episode: "S01 E01",
    link: "https://pokedex.runs-on.dev/"
  },
  {
    title: "RippleShield",
    category: "Web3 / Cybersecurity",
    description: "Web3 transaction security platform designed to detect phishing and malicious smart contracts through transaction simulation, automated risk scoring, and wallet drainer detection.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide React", "Web3 Security"],
    match: "99%",
    episode: "S01 E02",
    link: "https://rippleshield.vercel.app"
  },
  {
    title: "DevSecOps CI/CD Pipeline",
    category: "DevSecOps & Infrastructure",
    description: "Automated security testing and deployment pipeline incorporating container vulnerability scanning, secret detection, and Docker image builds.",
    tags: ["Docker", "GitHub Actions", "CI/CD", "DevSecOps", "Linux"],
    match: "98%",
    episode: "S01 E03",
    link: "https://github.com/aryansh35"
  },
  {
    title: "Encrypted Session & Auth Engine",
    category: "Cybersecurity & Backend",
    description: "Secure session authentication architecture featuring AES-256 cryptographic token encryption and strict credential access control.",
    tags: ["TypeScript", "PostgreSQL", "AES-256-GCM", "Supabase", "REST APIs"],
    match: "97%",
    episode: "S01 E04",
    link: "https://github.com/aryansh35"
  },
  {
    title: "Deloitte Analytics Engine",
    category: "Data Analytics & Insights",
    description: "Data analytics processing pipeline developed following Deloitte industry standards for data validation, cleaning, and structured SQL reporting.",
    tags: ["Python", "SQL", "Data Analytics", "Deloitte Tech"],
    match: "96%",
    episode: "S01 E05",
    link: "https://github.com/aryansh35"
  },
  {
    title: "Cloud Database Architecture",
    category: "Database & Backend",
    description: "Relational database models and real-time syncing pipelines with schema validation and optimized indexing across PostgreSQL and Supabase.",
    tags: ["PostgreSQL", "Supabase", "SQL", "Firebase", "TypeScript"],
    match: "98%",
    episode: "S01 E06",
    link: "https://github.com/aryansh35"
  },
  {
    title: "Cinematic Developer Portfolio",
    category: "UI/UX & Web Development",
    description: "Interactive Netflix-style developer showcase featuring custom GSAP physics, 3D tilt cards, dynamic mouse spotlighting, and responsive design.",
    tags: ["React", "GSAP", "Tailwind CSS", "Next.js", "Framer Motion"],
    match: "100%",
    episode: "S01 E07",
    link: "https://github.com/aryansh35"
  },
  {
    title: "Web Security & Threat Analyzer",
    category: "Cybersecurity",
    description: "Security analysis framework for detecting malicious payloads, tracking unauthorized requests, and hardening client-server endpoints.",
    tags: ["Cybersecurity", "Web Security", "Python", "TypeScript", "Docker"],
    match: "98%",
    episode: "S01 E08",
    link: "https://github.com/aryansh35"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], {
        xPercent: -50,
        yPercent: -50
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });

      const getGridPos = (index) => {
        let row, col;
        if (index < 3) { row = 0; col = index; }
        else if (index === 3) { row = 1; col = 0; }
        else if (index === 4) { row = 1; col = 2; }
        else { row = 2; col = index - 5; }
        return { row, col };
      };

      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%",
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(cardsRef.current, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(cardsRef.current, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards magically spread out into an ultra-clean blockbuster grid layout
          tl.to(cardsRef.current, {
            x: (i) => {
              const w = Math.max(...cardsRef.current.map(c => c?.offsetWidth || 0)) || 360;
              const gap = 40;
              const { col } = getGridPos(i);
              return (col - 1) * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...cardsRef.current.map(c => c?.offsetHeight || 0)) || 240;
              const gap = 40;
              const { row } = getGridPos(i);
              return (row - 1) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const cardW = window.innerWidth * 0.8;
          const gap = 20;

          mobileCardsRef.current.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)),
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(mobileCardsRef.current, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(mobileCardsRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0A0A0A] min-h-[100svh] md:min-h-[170vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-40 select-none">

      {/* Background Netflix Cinematic Title Watermark */}
      <div className="absolute top-10 left-0 w-full flex items-start justify-center pointer-events-none z-0">
        <h1 className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </h1>
      </div>

      {/* Ambient Cerulean & Neon Rose Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-gradient-to-r from-[#007BA7]/20 via-[#FF2D95]/15 to-[#007BA7]/10 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">

        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">

          {/* Folder Back */}
          <div
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#0A0A0A]/95 rounded-[24px] border border-[#007BA7]/40 shadow-[0_20px_50px_rgba(0,123,167,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="relative z-10 text-[#007BA7] font-mono font-black text-2xl tracking-widest uppercase opacity-75">
              ARCHIVE_SLOTS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[380px] aspect-[16/10] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <a
                href={project.link || "https://github.com/aryansh35"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#0A0A0A]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-[#FF2D95] hover:shadow-[0_35px_80px_rgba(255,45,149,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-7 flex flex-col justify-between block no-underline text-white"
              >

                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#007BA7] bg-[#007BA7]/10 px-2.5 py-1 rounded border border-[#007BA7]/25">
                    {project.episode}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#FF2D95] font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-2 my-auto">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#007BA7]/80">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-[#FF2D95] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Tech Tags & Link Hint */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-white/70 bg-white/5 px-2 py-0.5 rounded group-hover:border-[#007BA7]/40 group-hover:text-white transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-[#FF2D95] group-hover:translate-x-1 transition-transform">
                    &rarr;
                  </span>
                </div>

                {/* Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#FF2D95] group-hover:shadow-[0_0_15px_#FF2D95] transition-all" />
              </a>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#121212] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-[#007BA7]/40">
              <div className="w-20 h-1.5 bg-[#007BA7]/40 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[78vw] aspect-[16/11] snap-center will-change-transform relative z-10"
          >
            <a
              href={project.link || "https://github.com/aryansh35"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#0A0A0A] p-6 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)] block no-underline text-white pointer-events-auto"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#007BA7] bg-[#007BA7]/10 px-2 py-0.5 rounded">
                  {project.episode}
                </span>
                <span className="text-xs font-mono text-[#FF2D95] font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-white">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono text-white/60 bg-white/5 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;
