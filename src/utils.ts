export const downloadResumeMD = () => {
  const content = `# Faisal Kabir
**Software Quality Assurance Engineer**
Mohakhali-1212, Dhaka, Bangladesh
Phone: +88 01304386049
Email: onlyfaisalkabir@gmail.com
LinkedIn: linkedin.com/in/faisal-kabir
Github: github.com/onlyfaisalkabir

## Career Objective
To pursue a challenging career in a competitive world where enthusiasm, trustworthiness, hard work, and energy will encourage me to develop myself and use my insight and mastery to become a proficient Software Quality Assurance Engineer.

## Work Experience

### Jr. Software Quality Assurance Engineer - Siara Solutions Pty Ltd
*1 September 2023 to Present*
- Developed and implemented software test plans and automated, scalable test strategies.
- Executed Functional and Non-functional tests across web and mobile clients.
- Identified, documented, and tracked software defects meticulously; reduced production bugs by 30-35%.
- Worked heavily on regression automated scripts, security scanners (OWASP ZAP, Nmap), and compiled status Digests.
- Contributed directly to a 20% system revenue increment by ensuring higher product stability and user satisfaction.

### Intern Software Quality Assurance Engineer - Siara Solutions Pty Ltd
*1 June 2023 to 31 August 2023*
- Created and executed test cases for web and mobile interfaces to trace errors.
- Conducted systemic verification and acceptance testing, and logged defects meticulously under JIRA.
- Collaborated with cross-functional teams in an Agile environment and analyzed specifications.

## Technical Skills
- **Manual Testing:** Requirement Analysis, Test Planning, Designing, Writing and Reviewing Test Cases, Test Execution, Logcat/Penetration Testing, Vulnerability Scans
- **Automation Testing:** Selenium WebDriver, JUnit, TestNG, Playwright, TestCafe
- **Performance Test:** JMeter
- **API Testing:** Postman, REST Assured
- **App Testing Tool:** Vysor
- **Agile PM:** Jira, Asana, Azure DevOps
- **Languages:** Java, JavaScript, Python, HTML/CSS
- **OS Platforms:** Windows, Ubuntu (Kali-Linux), MacOS
- **Security Tools:** OWASP ZAP, Nmap

## Professional Projects
- **Tashus Car Share (WebApp/Mobile):** Car-sharing verification, flow audits, functional checks.
- **Honest CarSale (WebApp/Mobile):** Australian dealer marketplace verification, damage logs evaluation.
- **TuteAir Network (WebApp/Mobile):** Global tutor search index validation, classroom verification.
- **Dmoney REST API Automation:** Postman & Newman automated collections evaluating transactions.
- **Web JUnit Automation Suite:** Web form entry and data scrap validations in Java.
- **DailyFinance POM Suite:** Page Object Model registration tests in testNG.

## Education
- **BSc in Computer Science and Engineering**
  Gopalganj Science and Technology University | Passing Year: 2022
- **HSC (Higher Secondary Certificate)**
  Cantonment College, Jashore | Passing Year: 2017
- **SSC (Secondary School Certificate)**
  Nandina M.H.K. Govt. Pilot High School | Passing Year: 2015

## Certifications & Training
- Full Stack SQA (Road to SDET) - 3 Months
- Skill Development For Mobile Game & Application Project (ICT Division)
- Agile Project Management + Scrum Step by Step (Udemy)

## References
- **Salman Rahman** | Sr. Software Engineer (QA), Cefalo Bangladesh | salman.rahman@cefalo.com
- **Maruf Hossain** | Lead Software Engineer, Siara Solutions | maruf.mhb@gmail.com
`;

  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Faisal_Kabir_Resume.md');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
