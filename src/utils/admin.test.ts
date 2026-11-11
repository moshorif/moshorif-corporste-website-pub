import test from 'node:test';
import assert from 'node:assert/strict';
import { filterInquiries, calculateDashboardStats, validateImportPayload, InquiryRecord } from './admin';
import { CaseStudy, ExperienceItem } from '../types/portfolio';

const mockInquiries: InquiryRecord[] = [
  {
    id: 'inq-1',
    fullName: 'David Miller',
    email: 'david@enterprise.com',
    company: 'Enterprise Corp',
    subject: 'Senior Performance Marketer Role',
    message: 'We are hiring a performance marketer.',
    createdAt: '2026-11-10T10:00:00Z',
    isRead: false,
    status: 'new',
  },
  {
    id: 'inq-2',
    fullName: 'Sarah Connor',
    email: 'sarah@skyretail.com',
    company: 'Sky Retail',
    subject: 'Lead Gen Consultant',
    message: 'Need help with Meta CBO campaigns.',
    createdAt: '2026-11-09T14:30:00Z',
    isRead: true,
    status: 'reviewed',
  },
];

const mockCaseStudies: CaseStudy[] = [
  {
    id: 'cs-1',
    title: 'Campaign 1',
    category: 'Meta Ads',
    industry: 'Retail',
    objective: 'Growth',
    challenge: 'Cost',
    strategy: 'Funnel',
    platformsAndTools: ['Meta'],
    execution: 'Setup',
    results: [{ label: 'ROAS', value: '4.5x' }],
    visuals: [
      { url: '/img1.png', caption: 'Proof 1', type: 'dashboard' },
      { url: '/img2.png', caption: 'Proof 2', type: 'creative' },
    ],
  },
];

const mockExperiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Marketing Lead',
    company: 'Tech Corp',
    location: 'Dhaka',
    period: '2025 - 2026',
    bullets: ['Managed ads'],
  },
];

test('filterInquiries returns all when status is all and query is empty', () => {
  const result = filterInquiries(mockInquiries, 'all', '');
  assert.equal(result.length, 2);
});

test('filterInquiries filters by status accurately', () => {
  const newInquiries = filterInquiries(mockInquiries, 'new');
  assert.equal(newInquiries.length, 1);
  assert.equal(newInquiries[0].fullName, 'David Miller');
});

test('filterInquiries filters by search query across multiple fields', () => {
  const searchByCompany = filterInquiries(mockInquiries, 'all', 'sky retail');
  assert.equal(searchByCompany.length, 1);
  assert.equal(searchByCompany[0].fullName, 'Sarah Connor');

  const searchBySubject = filterInquiries(mockInquiries, 'all', 'Senior Performance');
  assert.equal(searchBySubject.length, 1);
  assert.equal(searchBySubject[0].fullName, 'David Miller');
});

test('calculateDashboardStats computes correct aggregate counts', () => {
  const stats = calculateDashboardStats(mockCaseStudies, mockExperiences, mockInquiries);
  assert.equal(stats.totalCampaigns, 1);
  assert.equal(stats.totalVisualProofAssets, 2);
  assert.equal(stats.totalExperiences, 1);
  assert.equal(stats.unreadInquiries, 1);
});

test('validateImportPayload validates objects correctly', () => {
  assert.equal(validateImportPayload(null).isValid, false);
  assert.equal(validateImportPayload({ invalid: true }).isValid, false);
  assert.equal(validateImportPayload({ personalInfo: {}, caseStudies: [] }).isValid, true);
});
