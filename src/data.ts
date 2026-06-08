import { Project, Skill, Experience, Testimonial } from './types';

export const personalInfo = {
  name: "Faisal Kabir",
  // Public URL to the hosted PDF resume (set this when you upload the PDF to blob storage)
  resume: "",
  title: "Software Quality Assurance Engineer",
  bio: "Specializing in manual and automation testing for web and mobile applications. Experienced in Selenium, Playwright, Appium, Java, TestNG, API testing, and Agile development environments. Passionate about building reliable software through comprehensive testing strategies, effective defect management, and continuous quality improvement. Committed to delivering exceptional user experiences by ensuring products are stable, secure, and production-ready.",
  email: "onlyfaisalkabir@gmail.com",
  phone: "+8801916603009",
  github: "https://github.com/faisalkabir1",
  linkedin: "https://www.linkedin.com/in/faisal-kabir1/",
  location: "Mohakhali-1212, Dhaka, Bangladesh",
  objective: "To pursue a challenging career in a competitive world where enthusiasm, trustworthiness, hard work, and energy will encourage me to develop myself and use my insight and mastery to become a proficient Software Quality Assurance Engineer.",
  avatar: "/images/Faisal_Kabir.jpg"
};

export const projects: Project[] = [
  {
    id: "proj-garibook-web",
    title: "Garibook.com",
    description: "Chauffeur-driven car rental platform offering intercity, hourly, and airport transfers.",
    longDescription: "Garibook.com is Bangladesh's premier tech-enabled car rental platform, providing seamless chauffeured traveler-car matchmaking, real-time live routing, transparent cost calculator integrations, and automatic web checkouts. Handled comprehensive manual verification, automated user regression, payment validation, and cross-browser test suits.",
    category: "fullstack",
    tag: "Web",
    demoUrl: "https://garibook.com",
    technologies: ["Manual Testing", "Selenium", "Web Verification", "Payment Gateway", "Performance Testing"],
    image: "/images/Garibook-City-to-City.png",
    featured: true
  },
  {
    id: "proj-garibook-app",
    title: "Garibook - User App",
    description: "On-demand traveler mobile interface for instant and structured outstation bookings.",
    longDescription: "Main Traveler application facilitating effortless chauffeur-driven vehicle bookings, instant reservation summaries, real-time notifications. Led rigorous and exhaustive end-to-end user handshakes, API synchronization checks, deep push-notification validations, and extreme multi-scenario network performance tests on actual physical Android and iOS devices.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook.user&pli=1",
    appStoreUrl: "https://apps.apple.com/us/app/garibook/id6444159035",
    technologies: ["Appium", "Mobile Testing", "Automation Suite Development", "GPS Tracking", "Push Notifications"],
    image: "/images/gb-user-app.jpeg",
    featured: true
  },
  {
    id: "proj-garibook-driver",
    title: "Garibook Smart Driver App",
    description: "Real-time driver assignment, GPS trip tracking, and handy app for drivers to get ride requests, manage trips, and track earnings.",
    longDescription: "Specialized utility application for registered Garibook captains and chauffeurs. Facilitates bid notifications, Google Maps API routing sync, real-time fare estimations, and digital cashout controls. Analyzed business requirements and prepared test scenarios and test cases, Performed functional, regression, smoke, and exploratory testing on Android and Web platforms.Validated ride booking, fare bidding, return trip matchmaking, payment, and trip management features. Conducted API testing using Postman to ensure data accuracy and system reliability.Identified, documented, tracked, and verified defects.Collaborated closely with developers, product managers, and stakeholders to ensure product quality.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook.partner&pcampaignid=web_share",
    appStoreUrl: "https://apps.apple.com/us/app/garibook-smart-driver/id6448910015",
    technologies: ["Appium", "Manual Testing","Playwright", "Background Services", "GPS Audits", "Performance Testing"],
    image: "/images/smart-driver.jpg",
    featured: true
  },
  {
    id: "proj-garibook-enterprise",
    title: "Garibook Enterprise",
    description: "Corporate travel, fleet and management, and department authorization portal.",
    longDescription: "Garibook Enterprise is a comprehensive fleet and transportation management platform designed for businesses, fleet owners, and corporate clients. It enables users to manage vehicle bookings, bid on trips, monitor operations, and track earnings efficiently through a streamlined and user-friendly system. I performed requirement analysis, test case design, functional and API testing, bug tracking, regression testing, and release validation to ensure the platform's quality, reliability, and seamless user experience.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook_enterprise.garibook_enterprise&hl=en",
    appStoreUrl: "",
    technologies: ["Appium", "Role-Based Access", "SSO Auditing", "Invoice Validation", "Full-Regression"],
    image: "/images/enterprise.png",
    featured: true
  },
  {
    id: "proj-testcases-web",
    title: "Test Cases- Web",
    description: "Detailed system test cases, scenarios, and requirement traceability matrices.",
    longDescription: "A professional test suite outlining hundreds of system test cases, integration scenarios, end-to-end user behaviors, and UI/UX validation checklists.",
    category: "testcases",
    tag: "Web",
    technologies: ["Test Design", "Traceability Matrix", "Defect Logging", "JIRA"],
    image: "/images/Test-Case-Web.jpg",
    githubUrl: "https://github.com/faisalkabir1/Test-Case-Web",
    featured: true
  },
  {
    id: "proj-testcases-mobile",
    title: "Test Cases - Mobile App",
    description: "Rigorous test specifications, mobile gesture plans, and deep device compliance structures.",
    longDescription: "Exhaustive manual and mobile regression test cases covering edge cases, diverse device resolutions, network bandwidth limits, energy consumption patterns, and notifications checks.",
    category: "testcases",
    tag: "Mobile App",
    technologies: ["Mobile Test Plans", "Gesture Audits", "Device Compliance", "Excel Sheets"],
    image: "/images/Test-Case-Mobile.jpg",
    githubUrl: "https://github.com/faisalkabir1/Test-Case-for-App.git",
    featured: true
  },
  {
    id: "proj-tashus",
    title: "Tashus Car Share Platform",
    description: "An innovative car-sharing web and mobile product simplifying vehicle rentals.",
    longDescription: "Tashus connects verified vehicle owners with short-term, medium-term, and extended borrowing renters. Managed end-to-end quality assurance cycles, requirement traceability mapping, and functional flows to secure a seamless rental ecosystem.",
    category: "fullstack",
    demoUrl: "https://tashus.com",
    technologies: ["React-Js", "Vysor", "Manual Testing", "Test Cases", "Web & Mobile"],
    image: "/images/tashus.jpg",
    featured: true
  },
  {
    id: "proj-honest-carsale",
    title: "Honest CarSale Marketplace",
    description: "An Australian online car marketplace simplifying transparent dealer-buyer trades.",
    longDescription: "Ensures trade transparency by enabling sellers to list certified specs, accurate damage analysis, and rich galleries. Audited complete user onboarding processes, listing flows, and search structures across adaptive clients.",
    category: "fullstack",
    technologies: ["React-Js","Unit Testing", "Functional Testing", "Spec Audits", "Acceptance Testing"],
    image: "/images/honest-car-sale.webp",
    featured: true
  },
  {
    id: "proj-tuteair",
    title: "TuteAir Global Platform",
    description: "The global tutoring network that enables real-time tutor-student pairing.",
    longDescription: "TuteAir provides a highly integrated virtual classroom search index where students connect with verified global instructors. Conducted comprehensive acceptance, performance, and validation testing for global user flows.",
    category: "fullstack",
    technologies: ["React-Js", "System Testing", "Responsive Checks", "Agile Sprints"],
    image: "/images/tuteair.png",
    featured: true
  },
  {
    id: "proj-tashumove",
    title: "TashuMove",
    description: "Mobile-first vehicle delevery system and tracker with live updates.",
    longDescription: "TashuMove is a vehicle delivery and transportation platform that connects drivers with vehicle relocation jobs across different cities. The platform enables drivers to pick up and deliver vehicles safely to customers while providing real-time trip management, tracking, and operational support. I analyzed requirements, designed and executed test cases, and performed functional, regression, and API testing. I was responsible for identifying and tracking defects, validating new features, and ensuring a reliable user experience across both web and mobile platforms. I also collaborated closely with developers and stakeholders to maintain product quality throughout the development lifecycle.",
    category: "fullstack",
    tag: "Mobile App",
    technologies: ["Mobile Testing", "Appium", "Location Updates", "Logs Auditing"],
    image: "/images/tashumove.png",
    featured: true
  },
  {
    id: "proj-eatshawarma",
    title: "Eat Shawarma",
    description: "On-demand food delivery and queue management system for gourmet eateries.",
    longDescription: "Express delivery platform facilitating contactless QR-code dining, custom ordering workflows, instant kitchen display notifications, and mobile ledger handshakes. Verified dynamic item selections, state persistence, checkout pipelines, and mobile display compatibility.",
    category: "fullstack",
    tag: "Web",
    demoUrl: "https://eatshawarma.com",
    technologies: ["Manual Testing", "Functional Audits", "Payment Checks", "CSS Checks"],
    image: "/images/eat-shawarma.jpg",
    featured: true
  },
  {
    id: "proj-dmoney-api",
    title: "Dmoney API Automation using Postman & Newman",
    description: "Postman & Newman automated suites evaluating transactional ledgers across roles.",
    longDescription: "Automated complete transactional logic validations between system administrative dashboards, agents, merchants, and users. Includes custom asserts measuring state responses, payloads, and parameter schemas.",
    category: "api",
    technologies: ["Postman", "Newman", "REST Assured", "API Testing", "JSON Schema"],
    image: "/images/postman.webp",
    githubUrl: "https://github.com/faisalkabir1",
    featured: true
  },
  {
    id: "proj-web-junit",
    title: "Web JUnit Automation Suite",
    description: "Web form entry and scrap validation automation configured in Java & Selenium.",
    longDescription: "Designed modular structural elements to perform rapid input validations, state checking, and robust page extraction. Practices clean, reliable selectors and dynamic wait times to bypass interface flickering.",
    category: "automation",
    technologies: ["Selenium", "JUnit", "Java", "Web Forms", "Selectors"],
    image: "/images/JUnit.jpg",
    githubUrl: "https://github.com/faisalkabir1",
    featured: false
  },
  {
    id: "proj-daily-finance",
    title: "DailyFinance Selenium POM Suite",
    description: "Automating core finance ledger flows using Page Object Model design with TestNG.",
    longDescription: "Completely automated registration, session handshakes, balance ledgers, and transaction modules. Includes structured Page Object parameters, data-driven tests, and reports saving results directly inside logs.",
    category: "automation",
    technologies: ["Selenium", "TestNG", "Java", "Page Object Model", "Data-Driven"],
    image: "/images/Web-Automation-selenium.jpg",
    githubUrl: "https://github.com/faisalkabir1",
    featured: false
  },
  {
    id: "proj-jmeter-performance",
    title: "Restful Booker Performance Study",
    description: "JMeter benchmarking and load-testing reports verifying REST transactional thresholds.",
    longDescription: "Executed targeted thread profiling and load simulations across hot booking transaction paths. Formulated real-time report breakdowns charting error ratios, query response distributions, and load latency curves.",
    category: "performance",
    technologies: ["JMeter", "Performance Testing", "Thread Profile", "Latency Auditing"],
    image: "/images/load-testing.jpg",
    githubUrl: "https://github.com/faisalkabir1",
    featured: false
  },
  {
    id: "proj-dailyfinance-playwright",
    title: "DailyFinance End-to-End Automation with Playwright",
    description: "Comprehensive end-to-end regression suite automating multi-role financial ledger operations using Playwright.",
    longDescription: "Extensive test automation suite using Playwright, TypeScript, and modern POM pattern to validate complex accounting cycles, role-based controls, ledger reconciliations, and responsive browser layout behaviors.",
    category: "automation",
    tag: "Web",
    technologies: ["Playwright", "TypeScript", "POM Design", "CI/CD Setup"],
    image: "/images/e2e.jpg",
    featured: true
  },
  {
    id: "proj-api-restassured",
    title: "API Automation using REST Assured & TestNG",
    description: "Robust automated testing of backend microservices, validation of JSON schemas, and security headers.",
    longDescription: "A modular Java automation suite implementing REST Assured and TestNG assertion engines. Assures deep checking of authorization handshakes, rate limits, concurrent load thresholds, custom data schemas, and error codes.",
    category: "api",
    tag: "Automation",
    technologies: ["REST Assured", "TestNG", "Java", "JSON Schema", "Allure Reports"],
    image: "/images/API-Automatin.jpg",
    featured: true
  }
];

export const skills: Skill[] = [
  // Languages
  { name: "Java", category: "languages", level: 5 },
  { name: "JavaScript", category: "languages", level: 4 },
  { name: "TypeScript", category: "languages", level: 4 },
  { name: "Python", category: "languages", level: 4 },
  { name: "HTML / CSS", category: "languages", level: 5 },

  // Manual Testing
  { name: "Test Case Design & Planning", category: "manual", level: 5 },
  { name: "Requirement Review & Traceability", category: "manual", level: 5 },
  { name: "Defect Tracking & Logging", category: "manual", level: 5 },
  { name: "Logcat / Penetration Testing", category: "manual", level: 4 },

  // Automation
  { name: "Selenium WebDriver", category: "automation", level: 5 },
  { name: "JUnit & TestNG", category: "automation", level: 5 },
  { name: "Playwright", category: "automation", level: 5 },
  { name: "Appium", category: "automation", level: 4 },
  { name: "TestCafe", category: "automation", level: 4 },

  // Performance & API
  { name: "JMeter Performance Benchmarks", category: "performance", level: 5 },
  { name: "Postman Collection Automations", category: "performance", level: 5 },
  { name: "REST Assured Assertion Frameworks", category: "performance", level: 4 },
  { name: "OWASP ZAP / Burp Suite", category: "performance", level: 4 },

  // Tools
  { name: "Jira / Clickup", category: "tools", level: 5 },
  { name: "Azure DevOps", category: "tools", level: 4 },
  { name: "Vysor Devices Integration", category: "tools", level: 5 },
  { name: "Git & Webhook Pipelines", category: "tools", level: 5 }
];

export const experiences: Experience[] = [
  {
    id: "exp-0",
    role: "Software QA Engineer",
    company: "Garibook",
    period: "January 2026 - Currently running",
    description: [
      "Leading comprehensive software quality assurance strategies and testing frameworks for Garibook's microservice-based vehicle rental and fleet management ecosystems.",
      "Designing and executing automated regression tests and continuous integration checks to ensure seamless user handshakes and billing executions.",
      "Conducting dynamic performance benchmarks, load tolerance profiling, and REST API validations to verify absolute application uptime and reliability."
    ]
  },
  {
    id: "exp-1",
    role: "Jr. Software Quality Assurance Engineer",
    company: "Siara Solutions Pty Ltd",
    period: "1 September 2023 - 31 December 2025",
    description: [
      "Developed and implemented software test plans and automated, scalable test strategies across core platforms.",
      "Executed Functional and Non-functional test suites across primary production environments for both web and mobile clients.",
      "Identified, documented, and tracked software defects meticulously, reducing cumulative production bugs by 30-35%.",
      "Worked heavily on regression automated scripts, security scanners (OWASP ZAP),Contributed directly to a 20% system revenue increment by elevating absolute application security, performance stability, and client satisfaction metrics."
    ]
  },
  {
    id: "exp-2",
    role: "Intern Software Quality Assurance Engineer",
    company: "Siara Solutions Pty Ltd",
    period: "1 June 2023 - 31 August 2023",
    description: [
      "Created and executed test cases for web and mobile interfaces to map requirements and trace errors early.",
      "Conducted systemic verification and acceptance testing, and logged actionable defects under JIRA frameworks.",
      "Analyzed functional specs, participated in continuous grooming circles, and aligned with developers in rapid Agile sprints."
    ]
  }
];

export const education = [
  {
    degree: "BSc in Computer Science and Engineering",
    school: "Gopalganj Science and Technology University",
    passingYear: "2022",
    details: "Focused on Algorithms, Software Design Architectures, Object Oriented Programming, Machine Learning, and Database Management."
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    school: "Cantonment College, Jashore",
    passingYear: "2017",
    details: "Completed Higher Secondary Certificate (HSC) in the Science Group, building a strong foundation in Mathematics, Physics, Chemistry, and analytical problem-solving skills."
  },
  {
    degree: "SSC (Secondary School Certificate)",
    school: "Nandina M.H.K. Govt. Pilot High School",
    passingYear: "2015",
    details: "Focused on Mathematics and General Science."
  }
];


export const trainings = [
  {
    title: "Full Stack SQA (Road to SDET)",
    provider: "3-Month Intensive Certification",
    link: "#"
  },
  {
    title: "Skill Development For Mobile Game & Application Project",
    provider: "ICT Division",
    link: "#"
  },
  {
    title: "Agile Project Management + Scrum Step by Step",
    provider: "Udemy Certification",
    link: "#"
  }
];

export const references = [
  {
    name: "Salman Rahman",
    role: "Sr. Software Engineer (QA)",
    company: "Cefalo Bangladesh Ltd.",
    email: "salman.rahman@cefalo.com"
  },
  {
    name: "Maruf Hossain",
    role: "Lead Software Engineer (Software Development)",
    company: "Siara Solutions Pty Ltd",
    email: "maruf.mhb@gmail.com"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "rec-1",
    name: "Maruf Hossain",
    designation: "Lead Software Engineer",
    company: "Siara Solutions Pty Ltd",
    reviewText: "Faisal is an exceptional SQA Engineer who bridges the gap between development speed and code stability. His regression automation suites with Playwright and Mobile App Automation with Selenium-Appium saved us dozens of execution hours every week, catching critical race conditions long before our code reached production. His diagnostic accuracy is unparalleled.",
    image: "/images/maruf.jpeg",
    rating: 5
  },
  {
    id: "rec-2",
    name: "Salman Rahman",
    designation: "Sr. Software Engineer (QA)",
    company: "Cefalo Bangladesh Ltd.",
    reviewText: "I had the pleasure of teaching and working closely with Faisal, and I have consistently been impressed by his dedication, professionalism, and passion for learning. He possesses strong analytical and problem-solving skills, which have helped him excel in Software Quality Assurance and testing practices. Faisal is a quick learner who takes initiative, pays attention to detail, and approaches challenges with a positive mindset. His ability to understand requirements, identify critical issues, and communicate effectively with team members makes him a valuable asset to any organization.",
    image: "/images/salman.jpeg",
    rating: 5
  },
  {
    id: "rec-3",
    name: "Rakibul Islam Shahar",
    designation: "Automation Engineer(SQA)",
    company: "RootNext Solutions",
    reviewText: "Working closely with Faisal Kabir, I've consistently observed his exemplary teamwork and collaborative spirit. Faisal actively engages in discussions, offering valuable insights and suggestions that contribute significantly to our project's success. His positive attitude and willingness to go the extra mile to support team members make him a pleasure to work with. Additionally, Faisal's strong problem-solving skills and ability to adapt to evolving project requirements have consistently impressed me. Overall, Faisal's combination of technical expertise, teamwork, and adaptability make him an exceptional colleague and an invaluable asset to any team.",
    image: "/images/rakibul.jpg",
    rating: 5
  },
  {
    id: "rec-4",
    name: "Md Mynuddin",
    designation: "Software QA Engineer",
    company: "Programming Hero",
    reviewText: "I had the opportunity to study and work with Faisal Kabir, and he stands out as a skilled and dependable SQA Engineer. He approaches testing with a sharp analytical mindset and pays close attention to detail, ensuring high-quality outcomes. Faisal is proactive, quick to adapt, and consistently brings a structured approach to problem-solving. He is also a great team player with clear communication, making collaboration smooth and effective. I highly recommend Faisal Kabir.",
    image: "/images/mynuddin.jpeg",
    rating: 5
  }
];

