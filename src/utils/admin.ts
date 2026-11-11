import { CaseStudy, ExperienceItem, ContactFormData } from '../types/portfolio';

export interface InquiryRecord extends ContactFormData {
  id: string;
  createdAt: string;
  isRead: boolean;
  status: 'new' | 'reviewed' | 'archived';
}

/**
 * Filter inquiries by status and search query
 */
export function filterInquiries(
  inquiries: InquiryRecord[],
  statusFilter: 'all' | 'new' | 'reviewed' | 'archived',
  query: string = ''
): InquiryRecord[] {
  const normalized = query.trim().toLowerCase();
  return inquiries.filter((item) => {
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (!normalized) return true;
    return (
      item.fullName.toLowerCase().includes(normalized) ||
      item.email.toLowerCase().includes(normalized) ||
      (item.company && item.company.toLowerCase().includes(normalized)) ||
      item.subject.toLowerCase().includes(normalized) ||
      item.message.toLowerCase().includes(normalized)
    );
  });
}

/**
 * Calculate dashboard summary statistics
 */
export function calculateDashboardStats(
  caseStudies: CaseStudy[],
  experiences: ExperienceItem[],
  inquiries: InquiryRecord[]
) {
  const totalCampaigns = caseStudies.length;
  const totalVisualProofAssets = caseStudies.reduce(
    (acc, cs) => acc + (cs.visuals ? cs.visuals.length : 0),
    0
  );
  const totalExperiences = experiences.length;
  const unreadInquiries = inquiries.filter((inq) => !inq.isRead).length;

  return {
    totalCampaigns,
    totalVisualProofAssets,
    totalExperiences,
    unreadInquiries,
  };
}

/**
 * Safe JSON import validator
 */
export function validateImportPayload(payload: unknown): { isValid: boolean; error?: string } {
  if (!payload || typeof payload !== 'object') {
    return { isValid: false, error: 'Uploaded file is not a valid JSON object.' };
  }
  const obj = payload as Record<string, unknown>;
  if (!obj.personalInfo && !obj.caseStudies) {
    return {
      isValid: false,
      error: 'Invalid backup structure. Missing personalInfo or caseStudies.',
    };
  }
  return { isValid: true };
}
