import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PERSONAL_INFO,
  CAREER_HIGHLIGHTS,
  EXPERIENCES,
  CASE_STUDIES,
  SKILL_GROUPS,
  EDUCATION,
  CERTIFICATIONS,
} from '../data/portfolioData';
import {
  CaseStudy,
  CareerMetric,
  ExperienceItem,
  SkillGroup,
  Certification,
  ContactFormData,
} from '../types/portfolio';
import { InquiryRecord, validateImportPayload } from '../utils/admin';

export interface PortfolioDataState {
  personalInfo: typeof PERSONAL_INFO;
  careerHighlights: CareerMetric[];
  experiences: ExperienceItem[];
  caseStudies: CaseStudy[];
  skillGroups: SkillGroup[];
  education: typeof EDUCATION;
  certifications: Certification[];
}

interface PortfolioContextType {
  data: PortfolioDataState;
  inquiries: InquiryRecord[];
  updatePersonalInfo: (partial: Partial<typeof PERSONAL_INFO>) => void;
  updateCareerHighlights: (metrics: CareerMetric[]) => void;
  updateExperiences: (experiences: ExperienceItem[]) => void;
  addExperience: (exp: ExperienceItem) => void;
  updateExperience: (id: string, exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;
  updateCaseStudies: (studies: CaseStudy[]) => void;
  addCaseStudy: (study: CaseStudy) => void;
  updateCaseStudy: (id: string, study: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;
  updateSkillGroups: (groups: SkillGroup[]) => void;
  updateEducation: (edu: typeof EDUCATION) => void;
  updateCertifications: (certs: Certification[]) => void;
  addInquiry: (form: ContactFormData) => void;
  markInquiryRead: (id: string, isRead?: boolean) => void;
  setInquiryStatus: (id: string, status: 'new' | 'reviewed' | 'archived') => void;
  deleteInquiry: (id: string) => void;
  resetToDefault: () => void;
  exportBackup: () => string;
  importBackup: (jsonStr: string) => { success: boolean; error?: string };
}

const STORAGE_KEY = 'msi_portfolio_cms_v2';
const INQUIRIES_KEY = 'msi_inquiries_cms_v2';

const DEFAULT_INQUIRIES: InquiryRecord[] = [
  {
    id: 'inq-initial-1',
    fullName: 'Alexander Vance',
    email: 'alexander@apexenterprises.com',
    company: 'Apex Enterprises',
    subject: 'Senior Performance Marketing Role',
    message:
      'Hello Mohammad, we were impressed by your LensCart and Niloy Motors campaign results and would like to invite you for an interview for our upcoming Q1 marketing expansion.',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    isRead: false,
    status: 'new',
  },
  {
    id: 'inq-initial-2',
    fullName: 'Tasnim Rahman',
    email: 'tasnim@dhakaretaillabs.com',
    company: 'Dhaka Retail Labs',
    subject: 'Full-time E-commerce Performance Lead',
    message:
      'Hi Shoriful, our executive team reviewed your Meta and Google Ads case studies. Are you available for a preliminary discussion next week?',
    createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
    isRead: true,
    status: 'reviewed',
  },
];

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioDataState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.personalInfo && parsed.caseStudies) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return {
      personalInfo: PERSONAL_INFO,
      careerHighlights: CAREER_HIGHLIGHTS,
      experiences: EXPERIENCES,
      caseStudies: CASE_STUDIES,
      skillGroups: SKILL_GROUPS,
      education: EDUCATION,
      certifications: CERTIFICATIONS,
    };
  });

  const [inquiries, setInquiries] = useState<InquiryRecord[]>(() => {
    try {
      const saved = localStorage.getItem(INQUIRIES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_INQUIRIES;
  });

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist portfolio state to localStorage', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Failed to persist inquiries to localStorage', e);
    }
  }, [inquiries]);

  const updatePersonalInfo = (partial: Partial<typeof PERSONAL_INFO>) => {
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...partial,
        contact: {
          ...prev.personalInfo.contact,
          ...(partial.contact || {}),
        },
        images: {
          ...prev.personalInfo.images,
          ...(partial.images || {}),
        },
        careerObjective: {
          ...prev.personalInfo.careerObjective,
          ...(partial.careerObjective || {}),
        },
      },
    }));
  };

  const updateCareerHighlights = (careerHighlights: CareerMetric[]) => {
    setData((prev) => ({ ...prev, careerHighlights }));
  };

  const updateExperiences = (experiences: ExperienceItem[]) => {
    setData((prev) => ({ ...prev, experiences }));
  };

  const addExperience = (exp: ExperienceItem) => {
    setData((prev) => ({ ...prev, experiences: [exp, ...prev.experiences] }));
  };

  const updateExperience = (id: string, updated: ExperienceItem) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((item) => (item.id === id ? updated : item)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  const updateCaseStudies = (caseStudies: CaseStudy[]) => {
    setData((prev) => ({ ...prev, caseStudies }));
  };

  const addCaseStudy = (study: CaseStudy) => {
    setData((prev) => ({ ...prev, caseStudies: [study, ...prev.caseStudies] }));
  };

  const updateCaseStudy = (id: string, study: Partial<CaseStudy>) => {
    setData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.map((item) =>
        item.id === id ? { ...item, ...study } : item
      ),
    }));
  };

  const deleteCaseStudy = (id: string) => {
    setData((prev) => ({
      ...prev,
      caseStudies: prev.caseStudies.filter((item) => item.id !== id),
    }));
  };

  const updateSkillGroups = (skillGroups: SkillGroup[]) => {
    setData((prev) => ({ ...prev, skillGroups }));
  };

  const updateEducation = (education: typeof EDUCATION) => {
    setData((prev) => ({ ...prev, education }));
  };

  const updateCertifications = (certifications: Certification[]) => {
    setData((prev) => ({ ...prev, certifications }));
  };

  const addInquiry = (form: ContactFormData) => {
    const newRecord: InquiryRecord = {
      ...form,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
      status: 'new',
    };
    setInquiries((prev) => [newRecord, ...prev]);
  };

  const markInquiryRead = (id: string, isRead = true) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead } : item))
    );
  };

  const setInquiryStatus = (id: string, status: 'new' | 'reviewed' | 'archived') => {
    setInquiries((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status, isRead: status !== 'new' ? true : item.isRead }
          : item
      )
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
  };

  const resetToDefault = () => {
    const defaultState: PortfolioDataState = {
      personalInfo: PERSONAL_INFO,
      careerHighlights: CAREER_HIGHLIGHTS,
      experiences: EXPERIENCES,
      caseStudies: CASE_STUDIES,
      skillGroups: SKILL_GROUPS,
      education: EDUCATION,
      certifications: CERTIFICATIONS,
    };
    setData(defaultState);
    setInquiries(DEFAULT_INQUIRIES);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(INQUIRIES_KEY);
  };

  const exportBackup = (): string => {
    return JSON.stringify({ data, inquiries, exportedAt: new Date().toISOString() }, null, 2);
  };

  const importBackup = (jsonStr: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonStr);
      const targetPayload = parsed.data || parsed;
      const validation = validateImportPayload(targetPayload);
      if (!validation.isValid) {
        return { success: false, error: validation.error || 'Invalid backup structure.' };
      }
      setData(targetPayload);
      if (Array.isArray(parsed.inquiries)) {
        setInquiries(parsed.inquiries);
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Malformed JSON payload.' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        inquiries,
        updatePersonalInfo,
        updateCareerHighlights,
        updateExperiences,
        addExperience,
        updateExperience,
        deleteExperience,
        updateCaseStudies,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        updateSkillGroups,
        updateEducation,
        updateCertifications,
        addInquiry,
        markInquiryRead,
        setInquiryStatus,
        deleteInquiry,
        resetToDefault,
        exportBackup,
        importBackup,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
