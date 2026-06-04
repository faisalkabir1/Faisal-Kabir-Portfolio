import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Search, X, ShieldAlert, Globe, Play, Apple } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const categories = [
    { value: 'all', label: 'All Works' },
    { value: 'fullstack', label: 'Web & Mobile App' },
    { value: 'testcases', label: 'Test Cases & Strategy' },
    { value: 'automation', label: 'Test Automation' },
    { value: 'api', label: 'API Testing' },
    { value: 'performance', label: 'Performance Testing' }
  ];

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });

    // Order: Garibook first, then other projects, and Test Cases at the absolute end
    return [...filtered].sort((a, b) => {
      const getRank = (p: Project) => {
        const isGaribook = p.id.toLowerCase().includes('garibook') || p.title.toLowerCase().includes('garibook');
        const isTestCase = p.category === 'testcases' || p.title.toLowerCase().includes('test cases');
        if (isGaribook) return 1;
        if (isTestCase) return 3;
        return 2;
      };

      const rankA = getRank(a);
      const rankB = getRank(b);

      if (rankA !== rankB) {
        return rankA - rankB;
      }

      return filtered.indexOf(a) - filtered.indexOf(b);
    });
  }, [selectedCategory, searchQuery]);

  const displayProjects = useMemo(() => {
    return isExpanded ? filteredProjects : filteredProjects.slice(0, 6);
  }, [filteredProjects, isExpanded]);

  return (
    <section id="portfolio" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div id="portfolio-section-header" className="mb-16 text-center md:text-left">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3">
            Dynamic Project Gallery
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Quality Assurance & Automation Portfolio.
          </h2>
        </div>

        {/* Filters and search block */}
        <div id="gallery-controls" className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          {/* Categories list */}
          <div className="flex flex-nowrap overflow-x-auto whitespace-nowrap gap-2 pb-2 lg:pb-0 scrollbar-none max-w-full" id="category-filters-container">
            {categories.map((cat) => (
              <button
                id={`filter-${cat.value}`}
                key={cat.value}
                onClick={() => {
                  setSelectedCategory(cat.value);
                  setIsExpanded(false);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${
                  selectedCategory === cat.value
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative max-w-[280px] w-full shrink-0" id="search-input-wrapper">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
            />
            <input
              id="project-search-input"
              type="text"
              placeholder="Search tools, platforms, or systems..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsExpanded(false);
              }}
              className="w-full bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-hidden transition"
            />
            {searchQuery && (
              <button
                id="clear-search-btn"
                onClick={() => {
                  setSearchQuery('');
                  setIsExpanded(false);
                }}
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                aria-label="Clear Search Input"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Gallery grid of projects */}
        {displayProjects.length > 0 ? (
          <div className="space-y-12" id="gallery-container-wrapper">
            <motion.div
              id="projects-grid"
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {displayProjects.map((project) => (
                  <motion.div
                    id={`project-card-${project.id}`}
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProject(project)}
                    className="bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-850 rounded-2xl overflow-hidden group cursor-pointer hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/2 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-950 flex items-center justify-center">
                      {!failedImages[project.id] && project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          onError={() => setFailedImages(prev => ({ ...prev, [project.id]: true }))}
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-550"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center p-6 h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-950 border border-zinc-800/20">
                          <ShieldAlert size={36} className="text-emerald-400 mb-2 animate-pulse" />
                          <span className="text-sm font-bold text-white tracking-wide uppercase font-sans truncate max-w-full px-2" id={`fallback-title-${project.id}`}>
                            {project.title}
                          </span>
                          <span className="text-[9px] text-zinc-400 font-mono mt-1 uppercase tracking-widest font-bold bg-zinc-800/60 px-2 py-0.5 rounded-md">
                            {project.category || 'QA System File'}
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md text-[10px] font-extrabold tracking-wider uppercase shadow-xs">
                        {project.tag || (project.category === 'fullstack' ? 'Web & Mobile' : project.category)}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-tight mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-2 py-0.5 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="text-[10px] text-zinc-400 bg-transparent px-2 py-0.5">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length > 6 && (
              <div className="flex justify-center pt-4" id="gallery-expand-controls">
                <button
                  id="toggle-expand-btn"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 font-semibold text-xs tracking-wider text-white rounded-xl transition duration-300 shadow-lg shadow-emerald-500/15 flex items-center space-x-2 cursor-pointer"
                >
                  <span>{isExpanded ? 'Show Less' : 'Show All'}</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div id="no-projects-found" className="text-center py-24 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl bg-zinc-50 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm">
              No matching quality assurance specifications found. Try resetting filters.
            </p>
          </div>
        )}

        {/* Detailed Modal view */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              id="project-overlay-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                id="project-modal-container"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Image header */}
                <div className="relative aspect-[21/10] bg-zinc-200 dark:bg-zinc-950 flex items-center justify-center">
                  {!failedImages[selectedProject.id] && selectedProject.image ? (
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages(prev => ({ ...prev, [selectedProject.id]: true }))}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center p-6 h-full w-full bg-gradient-to-br from-zinc-805 to-zinc-950 border border-zinc-800/20">
                      <ShieldAlert size={42} className="text-emerald-400 mb-2 animate-pulse" />
                      <span className="text-sm font-bold text-white tracking-wide uppercase font-sans truncate max-w-full px-4">
                        {selectedProject.title}
                      </span>
                    </div>
                  )}
                  <button
                    id="close-modal-btn"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white dark:bg-zinc-950 text-zinc-500 hover:text-zinc-950 dark:hover:text-white shadow-md border border-zinc-200/40 dark:border-zinc-800/40 transition cursor-pointer"
                    aria-label="Close Project Specification Modal"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Information blocks */}
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-emerald-500 uppercase font-mono">
                        {selectedProject.tag || (selectedProject.category === 'fullstack' ? 'Web & Mobile' : selectedProject.category)}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-tight mt-1">
                        {selectedProject.title}
                      </h4>
                    </div>

                    {/* External linkages */}
                    <div className="flex items-center space-x-3 flex-wrap gap-y-2" id="modal-project-links">
                      {selectedProject.githubUrl && (
                        <a
                          id="modal-project-github-lnk"
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 hover:text-emerald-500 dark:hover:border-emerald-500 rounded-xl text-zinc-500 dark:text-zinc-400 transition flex items-center justify-center cursor-pointer"
                          aria-label="GitHub Repository"
                        >
                          <Github size={16} />
                        </a>
                      )}

                      {selectedProject.githubUrl && selectedProject.demoUrl && (
                        <a
                          id="modal-project-demo-lnk"
                          href={selectedProject.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-semibold text-xs transition flex items-center space-x-1.5 cursor-pointer"
                        >
                          <span>Live Demo</span>
                          <ExternalLink size={12} />
                        </a>
                      )}

                      {!selectedProject.githubUrl && (
                        <>
                          {selectedProject.tag === 'Web' && selectedProject.demoUrl && (
                            <a
                              id="modal-project-website-lnk"
                              href={selectedProject.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 font-semibold text-xs transition flex items-center space-x-2 cursor-pointer shadow-sm shadow-emerald-500/10"
                            >
                              <Globe size={13} />
                              <span>Website Link</span>
                              <ExternalLink size={11} />
                            </a>
                          )}

                          {selectedProject.tag === 'Mobile App' && (
                            <div className="flex flex-wrap items-center gap-2">
                              {selectedProject.playStoreUrl && (
                                <a
                                  id="modal-project-playstore-lnk"
                                  href={selectedProject.playStoreUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl font-semibold text-xs transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
                                >
                                  <Play size={10} fill="currentColor" />
                                  <span>Play Store</span>
                                </a>
                              )}
                              {selectedProject.appStoreUrl && (
                                <a
                                  id="modal-project-appstore-lnk"
                                  href={selectedProject.appStoreUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white border border-zinc-700/30 rounded-xl font-semibold text-xs transition flex items-center space-x-1.5 cursor-pointer shadow-xs"
                                >
                                  <Apple size={11} />
                                  <span>App Store</span>
                                </a>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-zinc-650 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                    {selectedProject.longDescription ? selectedProject.longDescription : selectedProject.description}
                  </p>

                  <div className="border-t border-zinc-150 dark:border-zinc-800/80 pt-5">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white mb-2.5 uppercase font-mono tracking-wider">
                      Technical Suite Verified
                    </p>
                    <div className="flex flex-wrap gap-2" id="modal-project-languages">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/5 px-2.5 py-1 rounded-md border border-emerald-500/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
