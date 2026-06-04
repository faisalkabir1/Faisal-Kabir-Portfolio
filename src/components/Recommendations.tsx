import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

import { testimonials } from '../data';
import { Testimonial } from '../types';


export default function Recommendations() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    resetTimer();
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    resetTimer();
  };

  // Slide variants for slide right-to-left transition matches direction
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  if (testimonials.length === 0) {
    return (
      <section id="recommendations" className="py-16 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden select-none">
        <div id="recommendations-header" className="mb-10 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3 text-center">
            Recommendations
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white text-center">
            Professional Reviews
          </h2>
          <div className="mt-8 p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl bg-zinc-50 dark:bg-zinc-900/15">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No recommendations listed yet. You can add one via the Admin Portal!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="recommendations" className="py-16 bg-white dark:bg-zinc-950 shadow-sm relative overflow-hidden select-none">
      {/* Decorative gradient glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div id="recommendations-header" className="mb-10 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3 text-center">
            Recommendations
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white text-center">
            Professional Reviews
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-550 dark:text-zinc-400 text-center">
            Here is what engineering partners and product team leaders say about my software quality assurance impact and collaboration.
          </p>
        </div>

        {/* Carousel Slider Panel Wrapper */}
        <div id="reviews-carousel-outer" className="relative min-h-[360px] md:min-h-[320px] flex items-center justify-center p-1">
          
          {/* Main Card Testimonial Display */}
          <div id="reviews-slider-track" className="w-full relative overflow-hidden bg-zinc-50 dark:bg-zinc-900/15 border border-zinc-150/50 dark:border-zinc-800/40 rounded-3xl p-8 md:p-12 shadow-sm">
            
            {/* Absolute quote background icons */}
            <div className="absolute top-6 left-6 text-zinc-200/50 dark:text-zinc-800/15 pointer-events-none">
              <Quote size={56} className="rotate-180" />
            </div>

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col h-full justify-between relative z-10"
                id={`recommendation-slide-${testimonials[currentIndex].id}`}
              >
                {/* Review Text */}
                <div className="mb-8" id={`review-text-wrap-${testimonials[currentIndex].id}`}>
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4" id={`rating-stars-${testimonials[currentIndex].id}`}>
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>

                  <p className="text-sm md:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 italic font-normal tracking-wide">
                    "{testimonials[currentIndex].reviewText}"
                  </p>
                </div>

                {/* Profile Card Section */}
                <div className="flex items-center gap-4 border-t border-zinc-200/50 dark:border-zinc-850/40 pt-6" id={`reviewer-meta-${testimonials[currentIndex].id}`}>
                  <div className="relative" id={`avatar-container-${testimonials[currentIndex].id}`}>
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500/20 dark:border-emerald-500/30 shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-50 dark:border-zinc-900 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-extrabold text-zinc-900 dark:text-white leading-tight">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      {testimonials[currentIndex].designation}
                    </p>
                    <p className="text-[10px] text-emerald-500 dark:text-emerald-400/90 font-mono font-semibold uppercase mt-0.5 tracking-wider">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider Action Arrow Controllers */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-20" id="recommendations-ctrl-prev">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Previous recommendation"
            >
              <ChevronLeft size={20} />
            </button>
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-20" id="recommendations-ctrl-next">
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-650 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 hover:border-emerald-500/30 flex items-center justify-center shadow-md active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Next recommendation"
            >
              <ChevronRight size={20} />
            </button>
          </div>

        </div>

        {/* Bullet Progress Indicators */}
        <div className="flex justify-center items-center gap-2.5 mt-8" id="recommendations-dots-container">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2.5 rounded-full transition-all duration-350 cursor-pointer ${
                index === currentIndex 
                  ? 'w-7 bg-emerald-500' 
                  : 'w-2.5 bg-zinc-250 dark:bg-zinc-800 hover:bg-zinc-400 dark:hover:bg-zinc-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              id={`dot-indicator-${index}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
