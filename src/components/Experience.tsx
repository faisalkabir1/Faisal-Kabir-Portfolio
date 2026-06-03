import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, CheckCircle } from 'lucide-react';
import { experiences, education, trainings } from '../data';

export default function Experience() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="experience" className="py-24 bg-white dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Information */}
        <div id="experience-section-header" className="mb-20 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3">
            Career Timeline
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Professional Experience & Certifications.
          </h2>
        </div>

        <div className="space-y-16">
          
          {/* Work History timeline on Top (Alone) */}
          <div className="w-full">
            <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-8 flex items-center space-x-2.5">
              <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5">
                <Briefcase size={18} />
              </span>
              <span>Work Experience</span>
            </h3>

            <motion.div
              id="experience-timeline"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="relative border-l border-zinc-150 dark:border-zinc-800 ml-3"
            >
              {experiences.map((exp) => (
                <motion.div
                  id={`experience-timeline-node-${exp.id}`}
                  key={exp.id}
                  variants={itemVariants}
                  className="mb-12 relative pl-7"
                >
                  {/* Icon Dot Marker */}
                  <div
                    id={`exp-marker-${exp.id}`}
                    className="absolute -left-[14px] top-1 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-1 rounded-full text-emerald-500 shadow-sm flex items-center justify-center"
                  >
                    <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                  </div>

                  {/* Details Card */}
                  <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-850/60 rounded-2xl p-6 hover:shadow-xs transition duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-3">
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          {exp.company}
                        </p>
                      </div>
                      <div>
                        <span className="inline-block bg-zinc-200/50 dark:bg-zinc-800 px-2.5 py-1 rounded-md text-[10px] font-mono font-medium text-zinc-500 dark:text-zinc-400">
                          {exp.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {exp.description.map((desc, dIdx) => (
                        <li
                          key={dIdx}
                          className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed flex items-start"
                        >
                          <span className="mr-2 text-emerald-500 dark:text-emerald-600 font-mono mt-0.5">•</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Education & Certifications Side-by-Side (Left & Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
            
            {/* Education Sub-section (Left) */}
            <div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-8 flex items-center space-x-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5">
                  <GraduationCap size={18} />
                </span>
                <span>Education Background</span>
              </h3>

              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-zinc-105 dark:border-zinc-850 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-emerald-500/30 transition duration-250"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                        {edu.degree}
                      </h4>
                      <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold p-1 bg-zinc-200/40 dark:bg-zinc-800 rounded">
                        {edu.passingYear}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-650 dark:text-zinc-400 font-medium mb-2">
                      {edu.school}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-500 leading-relaxed font-sans">
                      {edu.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & training Sub-section (Right) */}
            <div>
              <h3 className="text-xl font-bold text-zinc-800 dark:text-zinc-100 mb-8 flex items-center space-x-2.5">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5">
                  <Award size={18} />
                </span>
                <span>Trainings & Certifications</span>
              </h3>

              <div className="space-y-3.5">
                {trainings.map((train, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-4 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 hover:bg-emerald-500/5 transition duration-200"
                  >
                    <CheckCircle size={15} className="mt-0.5 text-emerald-500 shrink-0" />
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white font-sans leading-tight">
                        {train.title}
                      </h4>
                      <p className="text-xs text-zinc-540 dark:text-zinc-500">
                        {train.provider}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
