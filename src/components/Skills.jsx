import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  { 
    title: 'Programming Languages', 
    desc: 'Strong programming foundations in typed, object-oriented, and compiled languages for robust software engineering.', 
    tag: 'LANGUAGES',
    skills: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C', 'SQL'] 
  },
  { 
    title: 'Frontend & UI Engineering', 
    desc: 'Building responsive, high-performance web applications with component-driven architectures and modern state flows.', 
    tag: 'WEB DEVELOPMENT',
    skills: ['Next.js', 'React.js', 'Tailwind CSS', 'Zustand', 'HTML5', 'CSS3'] 
  },
  { 
    title: 'Backend & Data Layers', 
    desc: 'Architecting scalable serverless backends, relational databases, and real-time cloud data infrastructure.', 
    tag: 'DATA & STORAGE',
    skills: ['PostgreSQL', 'Supabase', 'Firebase', 'SQL', 'REST APIs'] 
  },
  { 
    title: 'DevSecOps & Cloud', 
    desc: 'Containerizing applications with Docker and automating build, test, and deployment workflows with high reliability.', 
    tag: 'INFRASTRUCTURE',
    skills: ['Docker', 'Vercel', 'Git', 'GitHub', 'CI/CD Pipelines'] 
  },
  { 
    title: 'Cybersecurity & Web Security', 
    desc: 'Designing security mechanisms against web threats, encrypted session handling, and Web3 smart contract risk scoring.', 
    tag: 'SECURITY',
    skills: ['Web Security', 'AES-256-GCM', 'Session Security', 'Phishing Defense', 'Risk Scoring'] 
  },
  { 
    title: 'Certifications & Tooling', 
    desc: 'Industry certifications in technology and data analytics, scraping engines, and modern developer productivity tools.', 
    tag: 'CREDENTIALS',
    skills: ['Deloitte Tech', 'Deloitte Data', 'Cheerio', 'PWA', 'VS Code'] 
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;
    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;
    
    let activeIdx = 0;
    let minDiff = Infinity;
    
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - center);
      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, { scale: i === activeIdx ? 1 : 0.9, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) gsap.to(bg, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
    
    textRefs.current.forEach((txt, i) => {
      if (txt) gsap.to(txt, { opacity: i === activeIdx ? 1 : 0, duration: 0.4, overwrite: "auto" });
    });
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const updateCards = (p) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - p;
            
            const radius = 1800; 
            const angleSpread = 18; 
            
            const angle = offset * angleSpread;
            const rad = angle * Math.PI / 180;
            
            const x = Math.sin(rad) * radius;
            const y = radius - (Math.cos(rad) * radius); 
            const z = -Math.abs(offset) * 50; 
            
            const scale = Math.max(0.4, 1 - Math.abs(offset) * 0.15);
            const rotateZ = angle; 
            
            const opacity = Math.max(0.1, 1 - Math.abs(offset) * 0.3);
            const zIndex = Math.round(100 - Math.abs(offset) * 10);

            gsap.set(card, {
              x: x,
              y: y,
              z: z,
              scale: scale,
              rotationZ: rotateZ,
              rotationY: 0, 
              opacity: opacity,
              zIndex: zIndex,
            });
          });

          bgRefs.current.forEach((bg, i) => {
              if (!bg) return;
              const itemOpacity = Math.max(0, 1 - Math.abs(i - p));
              gsap.set(bg, { opacity: itemOpacity });
              
              if (textRefs.current[i]) {
                  gsap.set(textRefs.current[i], { opacity: itemOpacity });
              }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", 
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress * (skillCategories.length - 1);
            updateCards(p);
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        cardsRef.current.forEach((card, i) => {
           if (card) {
             gsap.set(card, { clearProps: "x,y,z,rotation,scale,opacity,position" });
             gsap.set(card, { scale: i === 0 ? 1 : 0.9 });
           }
        });
        
        bgRefs.current.forEach((bg, i) => {
           if (bg) gsap.set(bg, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
        
        textRefs.current.forEach((txt, i) => {
           if (txt) gsap.set(txt, { clearProps: "all", opacity: i === 0 ? 1 : 0 });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills"
      ref={sectionRef} 
      className="relative w-full h-screen bg-[#0A0A0A] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* Seamless Incoming Atmosphere from Expertise */}
      <div 
        className="absolute inset-x-0 top-0 h-[750px] pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 95% 75% at 0% 0%, rgba(0, 123, 167, 0.24) 0%, rgba(3, 22, 38, 0.5) 30%, rgba(2, 14, 25, 0.25) 55%, transparent 75%),
            radial-gradient(ellipse 75% 65% at 100% 0%, rgba(255, 45, 149, 0.08) 0%, rgba(45, 9, 27, 0.2) 35%, rgba(20, 5, 14, 0.08) 55%, transparent 75%),
            linear-gradient(to bottom, rgba(3, 16, 27, 0.35) 0%, rgba(3, 16, 27, 0.18) 40%, transparent 80%)
          `
        }}
      >
        {/* Soft atmospheric blur overlay matching Expertise */}
        <div className="absolute -top-24 -left-20 w-[550px] h-[500px] rounded-full bg-[#007BA7]/12 blur-[150px] pointer-events-none" />
        <div className="absolute -top-24 -right-16 w-[450px] h-[450px] rounded-full bg-[#FF2D95]/06 blur-[150px] pointer-events-none" />
      </div>

      {/* Persistent Ambient Glows across Skills Viewport */}
      <div 
        className="absolute -left-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(0, 123, 167, 0.14) 0%, rgba(3, 20, 36, 0.3) 45%, transparent 75%)'
        }}
      />
      <div 
        className="absolute -right-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 45, 149, 0.05) 0%, rgba(45, 9, 27, 0.12) 40%, transparent 70%)'
        }}
      />

      {/* Dynamic Background Vignettes - centered soft ambiance with zero edge cutoffs */}
      {skillCategories.map((_, i) => (
        <div 
          key={i}
          ref={el => bgRefs.current[i] = el}
          className="absolute inset-0 z-0 pointer-events-none opacity-0"
          style={{
            background: i % 2 === 0
              ? 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(0, 123, 167, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255, 45, 149, 0.05) 0%, transparent 70%)'
          }}
        />
      ))}

      {/* Massive Background Typography (Cerulean & Neon Rose Outlines) */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1 
            key={`text-${i}`}
            ref={el => textRefs.current[i] = el}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{ 
               WebkitTextStroke: `2px ${i % 2 === 0 ? 'rgba(0,123,167,0.35)' : 'rgba(255,45,149,0.25)'}`,
               opacity: 0 
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* Carousel Container */}
      <div 
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div 
            key={i}
            ref={el => cardsRef.current[i] = el}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-[#007BA7]/80 transition-colors duration-500"
          >
            {/* Inner Glossy Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#007BA7]/15 via-[#FF2D95]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
            
            {/* Top Card Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#007BA7] bg-[#007BA7]/10 px-3 py-1 rounded border border-[#007BA7]/25">
                {category.tag}
              </span>
              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Middle Title & Description */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-[#FF2D95] transition-colors duration-300">
                {category.title}
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Bottom Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-[#007BA7]/40 group-hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Glow Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-[#FF2D95] group-hover:shadow-[0_0_15px_#FF2D95] transition-all" />
          </div>
        ))}
      </div>

    </section>
  );
};

export default Skills;