import { ReactNode } from 'react';

interface TechIcon {
  name: string;
  color: string;
  svg: ReactNode;
}

export default function TechSlider() {
  const techs: TechIcon[] = [
    {
      name: "JavaScript",
      color: "hover:border-[#F7DF1E] hover:shadow-[#F7DF1E]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/javascript"
          alt="JavaScript"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "TypeScript",
      color: "hover:border-[#3178C6] hover:shadow-[#3178C6]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/typescript"
          alt="TypeScript"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Java",
      color: "hover:border-[#FA2E2C] hover:shadow-[#FA2E2C]/10",
      svg: (
        <img
          src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"
          alt="Java"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Python",
      color: "hover:border-[#3776AB] hover:shadow-[#3776AB]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/python"
          alt="Python"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "HTML5",
      color: "hover:border-[#E34F26] hover:shadow-[#E34F26]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/html5"
          alt="HTML5"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "CSS3",
      color: "hover:border-[#1572B6] hover:shadow-[#1572B6]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/css"
          alt="CSS3"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "React",
      color: "hover:border-[#61DAFB] hover:shadow-[#61DAFB]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/react"
          alt="React"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Next.js",
      color: "hover:border-zinc-400 hover:shadow-zinc-400/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/nextdotjs"
          alt="Next.js"
          className="w-10 h-10 object-contain dark:invert"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "WordPress",
      color: "hover:border-[#21759B] hover:shadow-[#21759B]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/wordpress"
          alt="WordPress"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Git",
      color: "hover:border-[#F05032] hover:shadow-[#F05032]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/git"
          alt="Git"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "GitHub",
      color: "hover:border-zinc-400 hover:shadow-zinc-400/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/github"
          alt="GitHub"
          className="w-10 h-10 object-contain dark:invert"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Azure DevOps",
      color: "hover:border-[#0078D4] hover:shadow-[#0078D4]/10",
      svg: (
        <svg
          id="f4337506-5d95-4e80-b7ca-68498c6e008e"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          className="w-10 h-10"
        >
          <defs>
            <linearGradient
              id="ba420277-700e-42cc-9de9-5388a5c16e54"
              x1="9"
              y1="16.97"
              x2="9"
              y2="1.03"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#0078d4" />
              <stop offset="0.16" stopColor="#1380da" />
              <stop offset="0.53" stopColor="#3c91e5" />
              <stop offset="0.82" stopColor="#559cec" />
              <stop offset="1" stopColor="#5ea0ef" />
            </linearGradient>
          </defs>
          <title>Icon-devops-261</title>
          <path
            id="a91f0ca4-8fb7-4019-9c09-0a52e2c05754"
            d="M17,4v9.74l-4,3.28-6.2-2.26V17L3.29,12.41l10.23.8V4.44Zm-3.41.49L7.85,1V3.29L2.58,4.84,1,6.87v4.61l2.26,1V6.57Z"
            fill="url(#ba420277-700e-42cc-9de9-5388a5c16e54)"
          />
        </svg>
      )
    },
    {
      name: "Playwright",
      color: "hover:border-[#2EAD33] hover:shadow-[#2EAD33]/10",
      svg: (
        <img
          src="https://raw.githubusercontent.com/microsoft/playwright.dev/main/static/img/playwright-logo.svg"
          alt="Playwright"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Selenium",
      color: "hover:border-[#43B02A] hover:shadow-[#43B02A]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/selenium"
          alt="Selenium"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Cypress",
      color: "hover:border-[#00BF88] hover:shadow-[#00BF88]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/cypress"
          alt="Cypress"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Postman",
      color: "hover:border-[#FF6C37] hover:shadow-[#FF6C37]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/postman"
          alt="Postman"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "TestNG",
      color: "hover:border-[#F30000] hover:shadow-[#F30000]/10",
      svg: (
        <img
          src="https://raw.githubusercontent.com/JetBrains/intellij-community/master/plugins/testng/resources/resources/testNG.svg"
          alt="TestNG"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "JUnit 5",
      color: "hover:border-[#25A25A] hover:shadow-[#25A25A]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/junit5"
          alt="JUnit 5"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Jira",
      color: "hover:border-[#0052CC] hover:shadow-[#0052CC]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/jira"
          alt="Jira"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "ClickUp",
      color: "hover:border-[#7F00FF] hover:shadow-[#7F00FF]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/clickup"
          alt="ClickUp"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "MongoDB",
      color: "hover:border-[#47A248] hover:shadow-[#47A248]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/mongodb"
          alt="MongoDB"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "MySQL",
      color: "hover:border-[#00758F] hover:shadow-[#00758F]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/mysql"
          alt="MySQL"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "Burp Suite",
      color: "hover:border-[#FF6633] hover:shadow-[#FF6633]/10",
      svg: (
        <img
          src="https://cdn.simpleicons.org/burpsuite"
          alt="Burp Suite"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    },
    {
      name: "OWASP ZAP",
      color: "hover:border-[#4F5D75] hover:shadow-[#4F5D75]/10",
      svg: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/31/OWASP_ZAP_logo.svg"
          alt="OWASP ZAP"
          className="w-10 h-10 object-contain"
          referrerPolicy="no-referrer"
        />
      )
    }
  ];

  // Double the list of tech items to ensure a seamless infinite wrapping loop
  const TechTicker = [...techs, ...techs, ...techs];

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950/20 py-10 overflow-hidden relative border-t border-b border-zinc-150/40 dark:border-zinc-800/40 select-none">
      {/* Decorative Gradient Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Slider Title or Label Context */}
      <div className="max-w-7xl mx-auto px-6 mb-5 text-center">
        <p className="text-[10px] font-mono font-bold tracking-widest text-[#00bc7d] uppercase" style={{ color: '#00bc7d' }}>
          Technology Infrastructure & Automation Spectrum
        </p>
      </div>

      {/* Sliding Ticker Frame */}
      <div className="flex w-full overflow-hidden py-4" id="logos-scroller-viewport">
        <div className="animate-infinite-slide flex items-center gap-6">
          {TechTicker.map((tech, idx) => (
            <div
              key={`${tech.name}-${idx}`}
              className={`flex flex-col items-center justify-center w-24 h-24 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 rounded-2xl shrink-0 transition-all duration-300 ${tech.color}`}
              title={tech.name}
            >
              {/* Logo icon */}
              <div className="transition-transform duration-300 group-hover:scale-110">
                {tech.svg}
              </div>
              {/* Tooltip or small text */}
              <span className="text-[9px] font-mono mt-2 text-zinc-500 dark:text-zinc-400 tracking-tight font-medium">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
