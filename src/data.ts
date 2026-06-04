import { Project, Skill, Experience, Testimonial } from './types';

export const personalInfo = {
  name: "Faisal Kabir",
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
    longDescription: "Main Traveler application facilitating effortless chauffeur-driven vehicle bookings, instant reservation summaries, real-time vehicle GPS tracking, and notifications. Led rigorous and exhaustive end-to-end user handshakes, API synchronization checks, deep push-notification validations, and extreme multi-scenario network performance tests on actual physical Android and iOS devices.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook.customer",
    appStoreUrl: "https://apps.apple.com/us/app/garibook/id1590483832",
    technologies: ["Appium", "Mobile Testing", "Vysor", "GPS Tracking", "Push Notifications"],
    image: "/images/gb-user-app.jpeg",
    featured: true
  },
  {
    id: "proj-garibook-driver",
    title: "Garibook Smart Driver App",
    description: "Real-time driver assignment, GPS trip tracking, and payout ledger mobile client.",
    longDescription: "Specialized utility application for registered Garibook captains and chauffeurs. Facilitates bid notifications, route logs, Google Maps API routing sync, real-time fare estimations, and digital cashout controls. Managed detailed high-frequency location ping stability reviews, background sleep behavior tracking, and offline sync verification mechanisms.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook.driver",
    appStoreUrl: "https://apps.apple.com/us/app/garibook-driver/id1590483864",
    technologies: ["Appium", "Coordinates Spoofing", "Background Services", "GPS Audits", "Offline Sync"],
    image: "/images/smart-driver.jpg",
    featured: true
  },
  {
    id: "proj-garibook-enterprise",
    title: "Garibook Enterprise",
    description: "Corporate travel, fleet logistics management, and department authorization portal.",
    longDescription: "Corporate workforce mobility portal allowing multi-department bookings, direct manager approvals, automatic billing profiles, and comprehensive ledger accounts. Rigorously verified role-based access control, hierarchical permission flows, batch invoice generation, and secure SSO login procedures.",
    category: "fullstack",
    tag: "Mobile App",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.garibook.enterprise",
    appStoreUrl: "https://apps.apple.com/us/app/garibook-enterprise/id1590483899",
    technologies: ["Appium", "Role-Based Access", "SSO Auditing", "Invoice Validation", "Full-Regression"],
    image: "/images/enterprise.png",
    featured: true
  },
  {
    id: "proj-testcases-web",
    title: "Test Cases- Web",
    description: "Detailed system test cases, scenarios, and requirement traceability matrices.",
    longDescription: "A professional test suite outlining hundreds of system test cases, integration scenarios, end-to-end user behaviors, and UI/UX validation checklists. Handled test design using JIRA and Excel folders for high-complexity web application portals.",
    category: "testcases",
    tag: "Web",
    technologies: ["Test Design", "Traceability Matrix", "Defect Logging", "JIRA"],
    image: "/images/Test-Case-Web.jpg",
    featured: true
  },
  {
    id: "proj-testcases-mobile",
    title: "Test Cases - Mobile App",
    description: "Rigorous test specifications, mobile gesture plans, and deep device compliance structures.",
    longDescription: "Exhaustive manual and mobile regression test cases covering multi-touch gestures, diverse device resolutions, network bandwidth limits, energy consumption patterns, and notifications checks.",
    category: "testcases",
    tag: "Mobile App",
    technologies: ["Mobile Test Plans", "Gesture Audits", "Device Compliance", "Excel Sheets"],
    image: "/images/Test-Case-Mobile.jpg",
    featured: true
  },
  {
    id: "proj-tashus",
    title: "Tashus Car Share Platform",
    description: "An innovative car-sharing web and mobile product simplifying vehicle rentals.",
    longDescription: "Tashus connects verified vehicle owners with short-term, medium-term, and extended borrowing renters. Managed end-to-end quality assurance cycles, requirement traceability mapping, and functional flows to secure a seamless rental ecosystem.",
    category: "fullstack",
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
    technologies: ["React-Js", "Functional Testing", "Spec Audits", "Acceptance Testing"],
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
    description: "Mobile-first vehicle sharing and logistics tracker with live vehicle map updates.",
    longDescription: "A specialized companion mobile application matching localized commuters with regional rideshare drivers. Audited complete device lifecycle behaviors, location updates, multi-touch custom panels, and push-notifications across virtual and hardware test suites.",
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
    title: "Dmoney REST API Automation",
    description: "Postman & Newman automated suites evaluating transactional ledgers across roles.",
    longDescription: "Automated complete transactional logic validations between system administrative dashboards, agents, custom merchants, and users. Includes custom asserts measuring state responses, payloads, and parameter schemas.",
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
  { name: "OWASP ZAP / Nmap Auditions", category: "performance", level: 4 },

  // Tools
  { name: "Jira / Asana", category: "tools", level: 5 },
  { name: "Azure DevOps Channels", category: "tools", level: 4 },
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
      "Worked heavily on regression automated scripts, security scanners (OWASP ZAP, Nmap), and compiled clean status digests.",
      "Contributed directly to a 20% system revenue increment by elevating absolute application security, performance stability, and client satisfaction metrics."
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
    details: "Focus on Algorithms, Software Design Architectures, Object Oriented Programming, and Database Management."
  },
  {
    degree: "HSC (Higher Secondary Certificate)",
    school: "Cantonment College, Jashore",
    passingYear: "2017",
    details: "Science Group with strong mathematical and systemic problem solving fundamentals."
  },
  {
    degree: "SSC (Secondary School Certificate)",
    school: "Nandina M.H.K. Govt. Pilot High School",
    passingYear: "2015",
    details: "Science Group. Excelled in analytical logic representation and teamwork certifications."
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
    reviewText: "Faisal is an exceptional SQA Engineer who bridges the gap between development speed and code stability. His regression automation suites with Playwright and REST Assured saved us dozens of execution hours every week, catching critical race conditions long before our code reached production. His diagnostic accuracy is unparalleled.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    id: "rec-2",
    name: "Salman Rahman",
    designation: "Sr. Software Engineer (QA)",
    company: "Cefalo Bangladesh Ltd.",
    reviewText: "Having collaborated with Faisal on complex test matrices, I was consistently impressed by his meticulous defect documenting and requirement mapping. He doesn't just log bugs; he provides full trace patterns, visual logs, and reproducible CLI inputs that make resolving issues a breeze for the dev team. Faisal understands quality at a deep level.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    id: "rec-3",
    name: "Tasnim Ahmed",
    designation: "Product Owner",
    company: "Tashus Car Share Platform",
    reviewText: "Faisal's mobile testing strategies on physical devices were instrumental in making Tashus incredibly stable. He executed rigorous gesture audits, network bandwidth latency mocks, and push-notifications checks that significantly boosted our App Store and Google Play launch scores. He is dedicated, analytical, and highly proactive in Agile environments.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  },
  {
    id: "rec-4",
    name: "Anik Sen",
    designation: "Co-Founder & CTO",
    company: "Garibook.com",
    reviewText: "At Garibook, Faisal took full ownership of our traveler and fleet captain application reliability. He engineered bulletproof validation workflows for real-time location streaming and complex payment handshakes. Thanks to his relentless performance test designs on JMeter, our high-frequency log pipelines remained super resilient under concurrent peak traffic.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    rating: 5
  }
];

