export interface Profile {
  name: string
  title: string
  bio: string
  email: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  website?: string
  resumeUrl?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string | null
  responsibilities: string[]
  achievements: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  organization?: string
  startDate?: string
  endDate?: string | null
  techStack: string[]
  features: string[]
  outcome: string
  githubUrl?: string
  liveUrl?: string
  caseStudyUrl?: string
}

export interface Skill {
  category: 'core' | 'technical' | 'professional'
  name: string
  level?: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string
  coursework?: string[]
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url?: string
}

export interface ContactForm {
  name: string
  message: string
}
