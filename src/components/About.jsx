import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // --- Cinematic Stagger Entrance on Scroll ---
    gsap.fromTo(
      cardRefs.current,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // --- Interactive Magnetic Mouse Spotlight per Bento Card ---
    const cards = cardRefs.current;
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

  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0A0A0A] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      {/* Background Cinematic Ambient Glows */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#007BA7]/15 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#FF2D95]/12 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-[#007BA7]/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#FF2D95] animate-ping"></span>
            <span className="text-[#007BA7] font-bold">EPISODE 01</span>
            <span className="text-white/40">|</span>
            <span>THE BUILDER</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            THE MIND <br />
            <span className="text-[#007BA7] drop-shadow-[0_0_25px_rgba(0,123,167,0.4)]">BEHIND</span> <span className="text-white/40">THE</span> <span className="text-[#FF2D95] drop-shadow-[0_0_25px_rgba(255,45,149,0.4)]">CODE.</span>
          </h2>
        </div>

        {/* Bento Grid Layout with Interactive Mouse Light Tracking */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Bio & Academic Core (Span 7) */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#007BA7]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(0,123,167,0.18), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#007BA7] font-bold">Background</h3>
              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I am <span className="text-white font-bold drop-shadow">Aryansh Gupta</span>, a B.Tech CSE (DevSecOps) student at SRM Institute of Science and Technology, Chennai.
              </p>
              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                I enjoy building modern web applications and exploring how to make software more secure, reliable, and useful. I learn by turning ideas into working projects, from user-friendly interfaces to backend systems              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-[#007BA7]/40 hover:text-[#007BA7] transition-colors">DevSecOps</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-[#007BA7]/40 hover:text-[#007BA7] transition-colors">Software Development</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-[#007BA7]/40 hover:text-[#007BA7] transition-colors">Cybersecurity</span>
              <span className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 hover:border-[#007BA7]/40 hover:text-[#007BA7] transition-colors">Web Security</span>
            </div>
          </div>

          {/* Card 2: Fellowships & Achievements (Span 5) */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-[#FF2D95]/60 transition-all duration-500 overflow-hidden"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,45,149,0.15), transparent 70%)'
              }}
            ></div>

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#FF2D95] font-bold">CREDENTIALS & BUILDS</h3>
              <ul className="space-y-3.5 text-sm text-white/80 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF2D95] font-bold">&#8250;</span>
                  <span>Certified in <strong className="text-white">Deloitte Australia — Technology</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF2D95] font-bold">&#8250;</span>
                  <span>Certified in <strong className="text-white">Deloitte Australia — Data Analytics</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#FF2D95] font-bold">&#8250;</span>
                  <span>Hands-on experience engineering <strong className="text-white">PokédeX</strong> & <strong className="text-white">RippleShield</strong> platforms.</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 font-mono text-xs text-[#007BA7]/60 relative z-10">
              // PROOF OF WORK
            </div>
          </div>

          {/* Card 3: Technical Ecosystem (Span 12) */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#0A0A0A]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-[#007BA7]/60 transition-all duration-500 overflow-hidden relative group"
          >
            {/* Real-time mouse hover spotlight highlight */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(0,123,167,0.15), rgba(255,45,149,0.08) 50%, transparent 70%)'
              }}
            ></div>

            <div className="space-y-2 text-left relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#007BA7] font-bold">THE TOOLS OF THE TRADE</h3>
              <p className="text-base md:text-lg font-semibold text-white">Tools and technologies I use to build web applications, work with data, and explore secure software development.</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10">
              {['Next.js', 'React.js', 'TypeScript', 'Java', 'Python', 'PostgreSQL', 'Docker', 'Tailwind CSS', 'Supabase', 'Firebase', 'Zustand', 'Git'].map((tech, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 rounded bg-white/[0.04] border border-white/10 text-xs font-mono uppercase tracking-wider text-white shadow-inner hover:bg-[#007BA7]/20 hover:border-[#007BA7]/40 hover:text-white hover:scale-105 transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;