import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProjects, validateContactForm, buildMailtoUrl } from './portfolio';
import { CaseStudy } from '../types/portfolio';

const mockProjects: CaseStudy[] = [
  {
    id: 'p1',
    title: 'LensCart Bangladesh - Green Shades Campaign',
    category: 'Meta Ads',
    industry: 'E-commerce Retail',
    clientOrBrand: 'LensCart Bangladesh',
    objective: 'Drive brand engagement and sales',
    challenge: 'High competition in optical fashion market',
    strategy: 'Segmented audience targeting and retargeting',
    platformsAndTools: ['Meta Ads Manager', 'Instagram', 'Facebook'],
    execution: 'Video creatives and influencer collaboration',
    results: [{ label: 'Sales Growth', value: '35%' }],
    visuals: [],
  },
  {
    id: 'p2',
    title: 'Automotive Product Launch Lead Acquisition',
    category: 'Lead Generation',
    industry: 'Automotive',
    clientOrBrand: 'Niloy Motors Ltd.',
    objective: 'Generate qualified consumer test-ride inquiries',
    challenge: 'High cost per lead across metro regions',
    strategy: 'Geo-targeted lead gen forms with instant CRM sync',
    platformsAndTools: ['Meta Ads Manager', 'Instant Forms'],
    execution: 'Targeted demographic segmentation',
    results: [{ label: 'Leads Generated', value: '1,197' }],
    visuals: [],
  },
  {
    id: 'p3',
    title: 'Google Ads High-Intent Search Optimization',
    category: 'Google Ads',
    industry: 'Travel & Tourism',
    clientOrBrand: 'Unity Tourism BD',
    objective: 'Capture high-intent holiday package searches',
    challenge: 'Seasonal travel demand fluctuations',
    strategy: 'Exact & phrase match keyword optimization with negative lists',
    platformsAndTools: ['Google Ads', 'GA4'],
    execution: 'Automated bidding strategy with conversion tracking',
    results: [{ label: 'CTR', value: '5.95%' }],
    visuals: [],
  },
];

test('filterProjects returns all projects when category is All', () => {
  const result = filterProjects(mockProjects, 'All', '');
  assert.equal(result.length, 3);
});

test('filterProjects filters by category accurately', () => {
  const metaResults = filterProjects(mockProjects, 'Meta Ads', '');
  assert.equal(metaResults.length, 1);
  assert.equal(metaResults[0].id, 'p1');

  const leadResults = filterProjects(mockProjects, 'Lead Generation', '');
  assert.equal(leadResults.length, 1);
  assert.equal(leadResults[0].id, 'p2');
});

test('filterProjects filters by search query across multiple fields', () => {
  const queryResult = filterProjects(mockProjects, 'All', 'niloy');
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].id, 'p2');

  const toolQueryResult = filterProjects(mockProjects, 'All', 'ga4');
  assert.equal(toolQueryResult.length, 1);
  assert.equal(toolQueryResult[0].id, 'p3');
});

test('validateContactForm rejects empty inputs', () => {
  const validation = validateContactForm({});
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors.fullName);
  assert.ok(validation.errors.email);
  assert.ok(validation.errors.message);
});

test('validateContactForm rejects invalid emails', () => {
  const validation = validateContactForm({
    fullName: 'Jane Doe',
    email: 'not-an-email',
    message: 'Hello, looking forward to discussing a performance marketing role.',
  });
  assert.equal(validation.isValid, false);
  assert.ok(validation.errors.email);
});

test('validateContactForm accepts valid form submission', () => {
  const validation = validateContactForm({
    fullName: 'Corporate Recruiter',
    email: 'recruiter@enterprise.com',
    phone: '+8801700000000',
    company: 'Leading Enterprise Ltd',
    subject: 'Marketing Manager Opportunity',
    message: 'We would love to discuss a corporate role in performance marketing.',
  });
  assert.equal(validation.isValid, true);
  assert.equal(Object.keys(validation.errors).length, 0);
});

test('buildMailtoUrl encodes parameters properly', () => {
  const url = buildMailtoUrl(
    {
      fullName: 'John Smith',
      email: 'john@example.com',
      subject: 'Interview Invitation',
      message: 'Let us connect on Thursday.',
    },
    'contact@mohammadshorifulislam.com'
  );

  assert.ok(url.startsWith('mailto:contact@mohammadshorifulislam.com?subject='));
  assert.ok(url.includes('John%20Smith'));
});
