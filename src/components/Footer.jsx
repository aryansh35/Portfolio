import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] text-white py-16 px-6 md:px-12 border-t border-white/10 select-none relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">

        {/* Top Section: Brand & Quick Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-white/10">
          <div className="space-y-2">
            <div className="text-2xl font-black text-white tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(0,123,167,0.7)]">
              ARYANSH<span className="w-2 h-2 rounded-full bg-[#FF2D95] inline-block shadow-[0_0_10px_#FF2D95]"></span>
            </div>
            <p className="text-xs font-mono text-[#007BA7]/80 tracking-widest uppercase">
              // DEVELOPER PORTFOLIO &bull; EDITION 2026
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap gap-6 md:gap-8 text-xs font-mono uppercase tracking-widest text-white/70">
            <a href="#home" className="hover:text-[#FF2D95] transition-colors">Home</a>
            <a href="#about" className="hover:text-[#FF2D95] transition-colors">About</a>
            <a href="#expertise" className="hover:text-[#FF2D95] transition-colors">Expertise</a>
            <a href="#skills" className="hover:text-[#FF2D95] transition-colors">Skills</a>
            <a href="#projects" className="hover:text-[#FF2D95] transition-colors">Projects</a>
            <a href="#contact" className="hover:text-[#FF2D95] transition-colors">Contact</a>
          </nav>
        </div>

        {/* Middle Section: Socials & External Profiles */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs font-mono text-white/60">
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/aryansh35"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007BA7] transition-colors uppercase tracking-wider"
            >
              GitHub //
            </a>
            <a
              href="https://www.linkedin.com/in/aryansh-gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#007BA7] transition-colors uppercase tracking-wider"
            >
              LinkedIn //
            </a>
            <a
              href="mailto:gupta.aryansh135@gmail.com"
              className="hover:text-[#007BA7] transition-colors uppercase tracking-wider"
            >
              Email //
            </a>
          </div>

          <div className="text-white/40 tracking-widest uppercase">
            <span className="text-white/80">BENGALURU, KARNATAKA, IN • OPEN TO OPPORTUNITIES</span>
          </div>
        </div>

        {/* Bottom Copyright & Energy Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/5 text-[11px] font-mono text-white/40 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Aryansh Gupta. All Rights Reserved.</p>
          <p className="text-[#007BA7] font-semibold"><span className="text-[#FF2D95]">&bull;</span> BUILT WITH CURIOSITY <span className="text-[#FF2D95]">&bull;</span> DRIVEN BY CODE</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;