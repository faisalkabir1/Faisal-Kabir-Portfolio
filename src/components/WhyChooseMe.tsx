import { motion } from 'motion/react';
import { ShieldCheck, Zap, Layers, BarChart3, Users, Eye } from 'lucide-react';

export default function WhyChooseMe() {
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
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const values = [
    {
      icon: <Zap size={22} className="text-emerald-500" />,
      title: "Bulletproof Automation",
      description: "Developing robust, flakiness-free automation suites using Selenium, TestNG, and Postman/Newman. Writing clean Page Object Model code with strict assertions to save thousands of manual execution hours."
    },
    {
      icon: <Layers size={22} className="text-emerald-500" />,
      title: "Full-Stack Validation",
      description: "Ensuring flawless user journeys across adaptive web apps, mobile solutions (using Vysor & physical devices), and dense back-end transaction architectures."
    },
    {
      icon: <ShieldCheck size={22} className="text-emerald-500" />,
      title: "Security & Load Audits",
      description: "Proactively mitigating risks. Simulating highly concurrent user threads via JMeter to chart latency curves, and evaluating baseline vulnerabilities via OWASP ZAP."
    },
    {
      icon: <Eye size={22} className="text-emerald-500" />,
      title: "Meticulous Bug Logging",
      description: "Drafting crystal-clear, highly reproducible Jira bug journals. Offering developers ready-to-test parameters, logcat extractions, and trace data to guarantee rapid resolution."
    },
    {
      icon: <BarChart3 size={22} className="text-emerald-500" />,
      title: "ROI & Traceability Focus",
      description: "Maintaining strict Requirements Traceability Matrices (RTM). Delivering direct business value by enhancing platform safety, accelerating release cycles, and reducing production failures by up to 35%."
    },
    {
      icon: <Users size={22} className="text-emerald-500" />,
      title: "Agile Collaborative Mindset",
      description: "Active sprint participator. Seamlessly aligning with development leads, product owners, and QA teams to establish high-fidelity deployment readiness."
    }
  ];

  const stats = [
    { value: "35+", label: "Projects Quality Assured" },
    { value: "250+", label: "Automated Scripts Validated" },
    { value: "100%", label: "Requirements Traceability" },
    { value: "24/7", label: "Continuous Integration Stability" }
  ];

  return (
    <section id="why-choose-me" className="py-16 bg-zinc-50 dark:bg-zinc-900/20 shadow-inner select-none">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div id="why-choose-me-header" className="mb-10 text-center">
          <p className="text-xs font-mono font-medium tracking-widest text-emerald-500 uppercase mb-3">
            Why Choose Faisal
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Engineering Value, Driving Quality.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-zinc-550 dark:text-zinc-400">
            A software product is only as elite as its quality thresholds. Here is how I bridge the gap between fast development and pristine execution stability.
          </p>
        </div>

        {/* Dynamic Grid of Value Drivers */}
        <motion.div
          id="why-choose-me-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {values.map((val, idx) => (
            <motion.div
              id={`value-card-${idx}`}
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-zinc-950 p-7 rounded-2xl border border-zinc-150/50 dark:border-zinc-800/50 shadow-xs hover:border-emerald-500/30 hover:shadow-md hover:shadow-emerald-500/1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div id={`value-card-icon-wrap-${idx}`} className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-zinc-850 dark:text-zinc-100 mb-3 font-sans">
                  {val.title}
                </h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-relaxed font-sans">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* High-fidelity numbers block */}
        <div id="why-choose-me-stats" className="mt-12 pt-8 pb-8 border-t border-b border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center" id={`status-metric-${idx}`}>
                <p className="text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-500">
                  {stat.value}
                </p>
                <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-mono">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
