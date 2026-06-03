import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowDownToLine } from 'lucide-react';
import { downloadResumeMD } from '../utils';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({ darkMode, setDarkMode, activeSection, setActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'About Me', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      setActiveSection(targetId);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="header-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-zinc-950/95 shadow-sm backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          id="brand-logo"
          href="#about"
          onClick={(e) => handleNavClick(e, '#about')}
          className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-200"
        >
          Faisal Kabir<span className="text-emerald-500">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const itemId = item.href.replace('#', '');
            const isActive = activeSection === itemId;
            return (
              <a
                id={`nav-${itemId}`}
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-zinc-950 dark:text-emerald-400 font-semibold'
                    : 'text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-emerald-500 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right side controls & Resume Button */}
        <div className="flex items-center space-x-4">
          <button
            id="theme-toggler-btn"
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Desktop Download Resume */}
          <button
            id="header-download-resume-btn"
            onClick={downloadResumeMD}
            className="hidden sm:flex items-center space-x-2 text-xs font-semibold px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:border-emerald-500 transition-all duration-250 cursor-pointer"
          >
            <ArrowDownToLine size={14} />
            <span>Resume</span>
          </button>

          <button
            id="mobile-menu-toggler-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 md:hidden rounded-lg text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900 transition-colors"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div id="mobile-nav-panel" className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 shadow-xl px-6 py-8 flex flex-col space-y-6">
          {navItems.map((item) => {
            const itemId = item.href.replace('#', '');
            const isActive = activeSection === itemId;
            return (
              <a
                id={`mobile-nav-${itemId}`}
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-lg font-medium transition-colors duration-200 ${
                  isActive ? 'text-emerald-500 dark:text-emerald-400' : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {item.name}
              </a>
            );
          })}
          
          {/* Mobile Download Resume */}
          <button
            id="mobile-download-resume-btn"
            onClick={() => {
              setIsMenuOpen(false);
              downloadResumeMD();
            }}
            className="flex items-center justify-center space-x-2 w-full py-3 rounded-xl bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            <ArrowDownToLine size={16} />
            <span>Download Resume</span>
          </button>
        </div>
      )}
    </header>
  );
}
