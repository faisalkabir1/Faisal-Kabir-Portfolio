import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ArrowDown, MapPin, Github, Linkedin, AppWindow, Check, User } from 'lucide-react';
import { personalInfo } from '../data';

export default function Hero() {
  const [imgSrc, setImgSrc] = useState(personalInfo.avatar || '');
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    setImgSrc(personalInfo.avatar || '');
    setImgFailed(false);
  }, [personalInfo.avatar]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-radial from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div id="hero-content-container" className="max-w-6xl mx-auto px-6 relative z-10 w-full select-none">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Visual Portrait - Left on mobile/right on desktop (col-span-5) */}
          <motion.div
            id="hero-avatar-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-5 flex justify-center md:justify-end order-1 md:order-2"
          >
            <div className="relative group">
              {/* Soft decorative decorative backdrop glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-3xl blur-md opacity-30 group-hover:opacity-50 transition duration-300" />
              
              {/* Beautiful main image holder */}
              <div className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-80 md:h-80 overflow-hidden rounded-3xl border-2 border-white dark:border-zinc-850 shadow-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                {!imgFailed && imgSrc ? (
                  <img
                    id="hero-formal-portrait"
                    src={imgSrc}
                    alt={`${personalInfo.name} Portrait`}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 h-full w-full bg-gradient-to-br from-zinc-850 to-zinc-900 border border-zinc-800 rounded-3xl">
                    <User size={56} className="text-emerald-400 mb-3 animate-pulse" />
                    <span className="text-xl font-bold text-white tracking-wide uppercase font-sans">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono mt-1.5 uppercase tracking-widest font-bold">SQA ENGINEER</span>
                  </div>
                )}
              </div>
              
              {/* Frame Accents (Bottom badge) */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-zinc-900 px-4 py-2 rounded-2xl shadow-lg border border-zinc-100 dark:border-zinc-800 flex items-center space-x-1.5">
                <Check size={14} className="text-emerald-500 stroke-[3]" />
                <span className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider font-mono">Verified SQA</span>
              </div>
            </div>
          </motion.div>

          {/* Core Introduction Details (col-span-7) */}
          <div className="md:col-span-7 text-left order-2 md:order-1">
            {/* Availability Indicator */}
            <motion.div
              id="hero-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-emerald-50/80 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/60 px-3.5 py-1.5 rounded-full text-xs font-medium text-emerald-700 dark:text-emerald-400 shadow-3xs mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for QA / SDET Opportunities</span>
            </motion.div>

            {/* Name heading */}
            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-950 dark:text-white leading-[1.1] mb-4"
            >
              Hi, I'm <span className="text-emerald-600 dark:text-emerald-400">{personalInfo.name}</span>
            </motion.h1>

            {/* Sub-role heading */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-lg sm:text-2xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6 font-mono"
            >
              {personalInfo.title}
            </motion.div>

            {/* Full descriptive profile bio */}
            <motion.p
              id="hero-bio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base text-zinc-650 dark:text-zinc-350 max-w-2xl leading-relaxed mb-8 font-sans"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Micro Call to Actions */}
            <motion.div
              id="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-10"
            >
              <button
                id="view-work-btn"
                onClick={() => scrollToSection('portfolio')}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-semibold hover:opacity-90 transition-all duration-200 shadow-sm flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>View My Portfolio</span>
                <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform text-emerald-500" />
              </button>
              
              <button
                id="contact-me-btn"
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition flex items-center justify-center cursor-pointer"
              >
                Get In Touch
              </button>
            </motion.div>

            {/* Details Footer line */}
            <motion.div
              id="hero-metadata"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 text-xs text-zinc-400 dark:text-zinc-500 border-t border-zinc-200/50 dark:border-zinc-800/50 pt-6"
            >
              <div className="flex items-center space-x-2" id="hero-geo-location">
                <MapPin size={14} className="text-emerald-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-4" id="hero-social-links">
                <a
                  id="social-github-link"
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="GitHub Page"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  id="social-linkedin-link"
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center select-none opacity-40 hover:opacity-100 transition duration-300">
        <button id="hero-scroll-down-btn" onClick={() => scrollToSection('experience')} aria-label="Scroll Down">
          <ArrowDown size={18} className="animate-bounce text-emerald-505" />
        </button>
      </div>
    </section>
  );
}
