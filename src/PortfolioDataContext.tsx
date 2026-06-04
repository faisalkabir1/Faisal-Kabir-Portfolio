import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  personalInfo as staticPersonalInfo,
  projects as staticProjects,
  skills as staticSkills,
  experiences as staticExperiences,
  education as staticEducation,
  trainings as staticTrainings,
  references as staticReferences,
  testimonials as staticTestimonials
} from './data';
import { Project, Skill, Experience, Testimonial } from './types';

interface PortfolioData {
  personalInfo: typeof staticPersonalInfo;
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
  education: typeof staticEducation;
  trainings: typeof staticTrainings;
  references: typeof staticReferences;
  testimonials: Testimonial[];
  isLoading: boolean;
}

const PortfolioDataContext = createContext<PortfolioData>({
  personalInfo: staticPersonalInfo,
  projects: staticProjects,
  skills: staticSkills,
  experiences: staticExperiences,
  education: staticEducation,
  trainings: staticTrainings,
  references: staticReferences,
  testimonials: staticTestimonials,
  isLoading: false
});

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>({
    personalInfo: staticPersonalInfo,
    projects: staticProjects,
    skills: staticSkills,
    experiences: staticExperiences,
    education: staticEducation,
    trainings: staticTrainings,
    references: staticReferences,
    testimonials: staticTestimonials,
    isLoading: true
  });

  useEffect(() => {
    fetch('/api/portfolio-data')
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(({ data: kvData }) => {
        if (kvData) {
          // KV data exists — override static defaults
          setData({
            personalInfo: kvData.personalInfo ?? staticPersonalInfo,
            projects: kvData.projects ?? staticProjects,
            skills: kvData.skills ?? staticSkills,
            experiences: kvData.experiences ?? staticExperiences,
            education: kvData.education ?? staticEducation,
            trainings: kvData.trainings ?? staticTrainings,
            references: kvData.references ?? staticReferences,
            testimonials: kvData.testimonials ?? staticTestimonials,
            isLoading: false
          });
        } else {
          // No KV data yet — use static data.ts as-is
          setData(prev => ({ ...prev, isLoading: false }));
        }
      })
      .catch(() => {
        // KV unreachable — silently fall back to static data
        setData(prev => ({ ...prev, isLoading: false }));
      });
  }, []);

  return (
    <PortfolioDataContext.Provider value={data}>
      {children}
    </PortfolioDataContext.Provider>
  );
}

export function usePortfolioData() {
  return useContext(PortfolioDataContext);
}
