import { CaseStudy, ContactFormData, FormValidationErrors, ProjectCategory } from '../types/portfolio';

/**
 * Filter case studies by active category and search query
 */
export function filterProjects(
  projects: CaseStudy[],
  category: ProjectCategory,
  query: string = ''
): CaseStudy[] {
  const normalizedQuery = query.trim().toLowerCase();

  return projects.filter((project) => {
    const matchesCategory =
      category === 'All' || project.category === category;

    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableText = [
      project.title,
      project.industry,
      project.clientOrBrand || '',
      project.objective,
      project.strategy,
      project.category,
      ...project.platformsAndTools,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

/**
 * Pure contact form validation
 */
export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: FormValidationErrors;
} {
  const errors: FormValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (data.phone && data.phone.trim()) {
    const phoneClean = data.phone.replace(/[\s\-\+\(\)]/g, '');
    if (!/^\d{6,15}$/.test(phoneClean)) {
      errors.phone = 'Please provide a valid phone number (digits only).';
    }
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please include a message with at least 10 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Generates mailto link from contact form data
 */
export function buildMailtoUrl(data: ContactFormData, targetEmail: string): string {
  const subject = encodeURIComponent(data.subject || `Inquiry from ${data.fullName}`);
  const body = encodeURIComponent(
    `Name: ${data.fullName}\n` +
      `Email: ${data.email}\n` +
      (data.phone ? `Phone: ${data.phone}\n` : '') +
      (data.company ? `Organization: ${data.company}\n` : '') +
      `\nMessage:\n${data.message}`
  );

  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}
