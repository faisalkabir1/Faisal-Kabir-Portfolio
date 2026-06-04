/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import TechSlider from './components/TechSlider';
import Skills from './components/Skills';
import Experience from './components/Experience';
import WhyChooseMe from './components/WhyChooseMe';
import Contact from './components/Contact';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import AdminPanel from './components/AdminPanel';
import { PortfolioDataProvider } from './PortfolioDataContext';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved === 'dark';
    return true;
  });

  const [activeSection, setActiveSection] = useState<string>('about');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return window.location.pathname === '/admin';
  });

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminMode(window.location.pathname === '/admin');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setIsAdminMode(false);
  };

  // Sync dark/light theme to document root
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (isAdminMode) return;
    const sections = ['about', 'portfolio', 'skills', 'experience', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isAdminMode]);

  return (
    // PortfolioDataProvider wraps everything — fetches KV data once on load,
    // falls back to static data.ts if KV is unavailable or empty.
    <PortfolioDataProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-emerald-500 selection:text-white dark:selection:bg-emerald-400 dark:selection:text-zinc-950 transition-colors duration-350">
        <CustomCursor />

        {isAdminMode ? (
          <AdminPanel onBack={navigateToHome} />
        ) : (
          <>
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />

            <main className="relative flex flex-col">
              <Hero />
              <Skills />
              <Experience />
              <TechSlider />
              <Gallery />
              <WhyChooseMe />
              <Contact />
              <Recommendations />
            </main>

            <Footer />
          </>
        )}
      </div>
    </PortfolioDataProvider>
  );
}
