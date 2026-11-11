export type ProjectCategory =
  | 'All'
  | 'Meta Ads'
  | 'Google Ads'
  | 'Lead Generation'
  | 'Landing Page Campaigns'
  | 'Brand Campaigns';

export interface CampaignVisual {
  url: string;
  caption: string;
  type: 'meta-ad' | 'google-ad' | 'dashboard' | 'report' | 'creative';
  metricsHighlight?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  clientOrBrand?: string;
  objective: string;
  challenge: string;
  strategy: string;
  platformsAndTools: string[];
  execution: string;
  results: {
    label: string;
    value: string;
    context?: string;
  }[];
  visuals: CampaignVisual[];
  featured?: boolean;
  timeline?: string;
  driveLink?: string;
  tags?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  highlights?: string[];
}

export interface CareerMetric {
  value: string;
  label: string;
  context: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  description?: string;
  year?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export interface FormValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}
