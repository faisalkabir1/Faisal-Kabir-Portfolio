import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Hide mouse cursor on hover elements by CSS if we want, but letting standard cursor show too keeps high accessibility while custom follower adds flare!
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const handleHoverStart = () => setHovering(true);
    const handleHoverEnd = () => setHovering(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const updateHoverListeners = () => {
      const clickables = document.querySelectorAll('a, button, select, input, textarea, [role="button"], .hover-ring');
      clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverStart);
        el.addEventListener('mouseleave', handleHoverEnd);
      });
    };

    updateHoverListeners();

    const observer = new MutationObserver(updateHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      observer.disconnect();
    };
  }, []);

  if (hidden) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <div
        className={`fixed pointer-events-none z-100 rounded-full transition-transform duration-150 ease-out -translate-x-1/2 -translate-y-1/2 hidden md:block border ${
          hovering 
            ? 'w-12 h-12 bg-emerald-500/15 border-emerald-400 dark:border-emerald-500 scale-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]' 
            : 'w-8 h-8 border-neutral-400 dark:border-neutral-500 scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      {/* Central Interactive Dot */}
      <div
        className={`fixed pointer-events-none z-100 rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block transition-all duration-200 ${
          hovering 
            ? 'w-2 h-2 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' 
            : 'w-1.5 h-1.5 bg-neutral-600 dark:bg-neutral-300'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
}
