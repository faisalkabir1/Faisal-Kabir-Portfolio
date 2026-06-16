import React from 'react';
import { ArrowUp, ArrowDownToLine } from 'lucide-react';
import { personalInfo } from '../data';
import { downloadResume } from '../utils';

export default function Footer() {
  const jumpToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-12 select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p id="footer-logo" className="text-base font-bold text-zinc-900 dark:text-white mb-2">
            Faisal Kabir<span className="text-emerald-500">.</span>
          </p>
          <p id="footer-copyright" className="text-xs text-zinc-400 dark:text-zinc-500 font-sans">
            &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved. SQA Portfolio.
          </p>
        </div>

        <div className="flex items-center space-x-6 flex-wrap justify-center gap-y-2" id="footer-social-panel">
          <a
            id="footer-github-lnk"
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition"
          >
            GitHub
          </a>
          <a
            id="footer-linkedin-lnk"
            href={personalInfo.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition"
          >
            LinkedIn
          </a>
          {/* <a
            id="footer-admin-lnk"
            href="/admin"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState({}, '', '/admin');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-xs text-zinc-400 hover:text-emerald-500 dark:text-zinc-500 dark:hover:text-emerald-400 transition font-sans cursor-pointer"
          >
            Admin Portal
          </a> */}
          
          <button
            id="footer-download-resume-btn"
            onClick={() => downloadResume(personalInfo.resume)}
            className="flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white hover:border-emerald-500 transition-all duration-200 cursor-pointer"
          >
            <ArrowDownToLine size={13} />
            <span>Download Resume</span>
          </button>
          
          <button
            id="jump-to-top-btn"
            onClick={jumpToTop}
            className="p-2 border border-zinc-150 dark:border-zinc-800 rounded-lg hover:border-zinc-950 dark:hover:border-white text-zinc-400 hover:text-zinc-950 dark:text-zinc-500 dark:hover:text-white transition cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
