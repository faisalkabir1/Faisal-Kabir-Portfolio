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

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Default to dark mode as requested
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved === 'dark';
    return true; // default dark mode
  });

  const [activeSection, setActiveSection] = useState<string>('about');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return window.location.pathname === '/admin';
  });

  // Listen for navigation state transitions (retains full SPA speed)
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

  // Sync theme to document element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light'); // Ensure light theme styles also trigger correctly if any override
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [darkMode]);

  // Observer to track sections scrolling
  useEffect(() => {
    if (isAdminMode) return;
    const sections = ['about', 'portfolio', 'skills', 'experience', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isAdminMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-emerald-500 selection:text-white dark:selection:bg-emerald-400 dark:selection:text-zinc-950 transition-colors duration-350">
      {/* Custom Mouse Follower Pointer Ring */}
      <CustomCursor />

      {isAdminMode ? (
        <AdminPanel onBack={navigateToHome} />
      ) : (
        <>
          {/* Floating/Fixed Navigation header */}
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />

          {/* Main body content section stack */}
          <main className="relative flex flex-col">
            {/* Hero Banner Section */}
            <Hero />

            {/* Skill Matrix */}
            <Skills />

            {/* Timeline representation */}
            <Experience />

            {/* Interactive Logo Slider of Tech Stack */}
            <TechSlider />

            {/* Dynamic Interactive Portfolio Gallery */}
            <Gallery />

            {/* Why Choose Faisal Quality Assurance Values */}
            <WhyChooseMe />

            {/* Contact form and developer sandbox db logs */}
            <Contact />

            {/* Review & Recommendations automated testimonial carousel */}
            <Recommendations />
          </main>

          {/* Aesthetic pairing footer */}
          <Footer />
        </>
      )}
    </div>
  );
}
