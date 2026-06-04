export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'automation' | 'performance' | 'manual' | 'api' | 'fullstack' | 'testcases';
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  tag?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export interface Skill {
  name: string;
  category: 'manual' | 'automation' | 'performance' | 'tools' | 'languages';
  level: number; // 1 to 5 (or percentage)
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  company: string;
  reviewText: string;
  image: string;
  rating: number;
}

