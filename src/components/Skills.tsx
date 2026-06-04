import { motion } from 'motion/react';
import { Code2, ShieldAlert, Sparkles, Server, Hammer, Globe, Layers } from 'lucide-react';
import { usePortfolioData } from '../PortfolioDataContext';

export default function Skills() {
  const { skills } = usePortfolioData();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  // Grouping SQA skills cleanly
  const categorizedSkills = {
    languages: {
      title: "Languages",
      icon: <Globe size={18} className="text-emerald-500" />,
      items: skills.filter(s => s.category === 'languages')
    },
    manual: {
      title: "Manual SQA",
      icon: <Layers size={18} className="text-emerald-500" />,
      items: skills.filter(s => s.category === 'manual')
    },
    automation: {
      title: "Test Automation",
      icon: <Code2 size={18} className="text-emerald-500" />,
      items: skills.filter(s => s.category === 'automation')
    },
    performance: {
      title: "Performance & API",
      icon: <Server size={18} className="text-emerald-500" />,
      items: skills.filter(s => s.category === 'performance')
    },
    tools: {
      title: "SQA Tools & Systems",
      icon: <Hammer size={18} className="text-emerald-500" />,
      items: skills.filter(s => s.category === 'tools')
    }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-55/40 dark:bg-zinc-900/40 select-none">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header content */}
        <div id="skills-section-header" className="mb-16 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3">
            Core Competence
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Specialized Tech Stack.
          </h2>
        </div>

        {/* Categories container */}
        <motion.div
          id="skills-categories-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {Object.entries(categorizedSkills).map(([key, cat]) => (
            <motion.div
              id={`skill-category-cat-${key}`}
              key={key}
              variants={itemVariants}
              className="bg-white dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-150/50 dark:border-zinc-800/50 shadow-xs flex flex-col justify-between hover:border-emerald-500/20 transition duration-200"
            >
              <div>
                <div id={`skill-cat-title-wrap-${key}`} className="flex items-center space-x-2.5 mb-5 pb-3.5 border-b border-zinc-100 dark:border-zinc-900">
                  {cat.icon}
                  <h3 className="text-xs sm:text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                    {cat.title}
                  </h3>
                </div>

                <div className="space-y-3.5" id={`skills-list-${key}`}>
                  {cat.items.map((skill) => (
                    <div key={skill.name} className="group flex justify-between items-center" id={`skill-item-${skill.name}`}>
                      <span className="text-zinc-650 dark:text-zinc-400 text-xs font-semibold">
                        {skill.name}
                      </span>
                      <div className="flex items-center space-x-1 shrink-0" id={`skill-level-indicators-${skill.name}`}>
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-1 rounded-full transition-colors duration-300 ${
                              i < skill.level
                                ? 'bg-emerald-500'
                                : 'bg-zinc-100 dark:bg-zinc-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
