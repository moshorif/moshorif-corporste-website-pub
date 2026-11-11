import {
  CaseStudy,
  CareerMetric,
  ExperienceItem,
  SkillGroup,
  Certification,
} from '../types/portfolio';

export const PERSONAL_INFO = {
  name: 'Mohammad Shoriful Islam',
  role: 'Digital Marketing & Performance Marketing Professional',
  headline: 'Digital Marketing That Drives Measurable Business Growth.',
  supportingHeadline:
    'Driving Business Growth Through Performance Strategy, Digital Campaigns & Data-Driven Marketing.',
  introduction: `I'm Mohammad Shoriful Islam, a digital marketing and sales marketing professional with 6+ years of experience across e-commerce retail, automotive, and travel and tourism.

I specialize in performance advertising, campaign execution, audience segmentation, retargeting, brand promotion, and marketing analytics. I combine strategic thinking, creative execution, and data-driven optimization to help businesses reach the right audiences, improve customer acquisition, and achieve measurable marketing outcomes.

My experience includes managing digital campaigns, coordinating promotional activities, collaborating with creative and sales teams, and monitoring campaign performance across Meta and Google advertising platforms.`,
  aboutSummary: `I am a digital marketing and sales-marketing professional with experience spanning campaign management, paid advertising, customer acquisition, brand promotion, and marketing performance analysis.

Throughout my career, I have worked with teams in e-commerce, automotive, and travel and tourism. My approach combines audience understanding, creative communication, campaign optimization, and performance measurement.

I am particularly interested in contributing to a corporate marketing team where I can support business growth through effective digital strategy, performance campaigns, and continuous improvement.`,
  careerObjective: {
    heading: "Let's Create Measurable Marketing Impact.",
    text: `I am interested in contributing to a forward-thinking organization where performance marketing, strategic campaign execution, and data-driven decision-making play an important role in business growth.

I welcome opportunities in digital marketing, performance marketing, campaign management, and related corporate marketing functions where I can bring practical experience, analytical thinking, and a collaborative approach.`,
  },
  contact: {
    phone: '+880 1953-805280',
    phoneRaw: '+8801953805280',
    email: 'contact@mohammadshorifulislam.com',
    location: 'Dhaka, Bangladesh',
    linkedIn: 'https://linkedin.com/in/iamtonmoymahmud',
    linkedInDisplay: 'linkedin.com/in/iamtonmoymahmud',
    portfolioDrive:
      'https://drive.google.com/drive/folders/103EoiBcdPOwKDAZpHskiAzdixoF8cGmI?usp=drive_link',
    cvUrl:
      '/assets/aistudio/Mohammad_Shoriful_Islam_Performance_Marketing_f8c66ec7.pdf',
    googleAdsPdfUrl:
      '/assets/aistudio/Mohammad_Shoriful_Islam_GAds_portfolio_6546348f.pdf',
  },
  images: {
    heroPortrait:
      '/assets/aistudio/file_000000002fec720680c18a03c24a997c_dea7d345.png',
    formalPortrait: '/assets/aistudio/KRP02851_DP_1d53c1b8.jpg',
  },
};

export const CAREER_HIGHLIGHTS: CareerMetric[] = [
  {
    value: '50%',
    label: 'Monthly Revenue Growth',
    context:
      'Contributed through audience segmentation, retargeting, and promotional strategy at LensCart Bangladesh.',
  },
  {
    value: '35%',
    label: 'Sales Growth in 2 Weeks',
    context:
      'Achieved during the Green Shades campaign launch, driving immediate commercial velocity.',
  },
  {
    value: '20,000+',
    label: 'Campaign Engagements',
    context:
      'Generated across Meta ad placements through targeted hooks and creative optimization.',
  },
  {
    value: '70%',
    label: 'Organic Profile Visits Growth',
    context:
      'Expanded brand visibility through influencer partnerships and collaborative content execution.',
  },
  {
    value: '6+ Years',
    label: 'Marketing Experience',
    context:
      'Proven track record across e-commerce retail, automotive mobility, and travel & hospitality.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-lenscart',
    role: 'Manager, Sales & Marketing',
    company: 'LensCart Bangladesh',
    location: 'Dhaka, Bangladesh',
    period: 'August 2025 – September 2026',
    bullets: [
      'Planned and executed digital marketing activities, including social media content, paid campaigns, promotional communication, and customer acquisition initiatives.',
      'Applied audience segmentation, retargeting, and promotional strategies that contributed to 50% monthly revenue growth.',
      'Supported the Green Shades campaign, which generated 20,000+ engagements and 35% sales growth within two weeks.',
      'Monitored campaign KPIs and evaluated marketing performance across Meta ad accounts.',
      'Coordinated creative briefs and content production with photography and video teams.',
      'Contributed to 70% growth in organic profile visits through influencer partnerships and content collaboration.',
    ],
    highlights: [
      '50% monthly revenue growth contribution',
      'Green Shades campaign leadership',
      'Influencer partnership execution',
    ],
  },
  {
    id: 'exp-niloy',
    role: 'Supervisor, Sales & Marketing',
    company: 'Niloy Motors Ltd.',
    location: 'Dhaka, Bangladesh',
    period: 'February 2024 – August 2025',
    bullets: [
      'Coordinated branding, promotional activities, and customer engagement across digital and offline channels.',
      'Supported product launches and integrated marketing initiatives for automotive vehicles.',
      'Coordinated campaign execution across cross-functional marketing, sales, and dealership teams.',
      'Participated in corporate promotional events, exhibitions, and customer-facing activities.',
      'Aligned marketing communication with quarterly sales quotas and product availability.',
    ],
    highlights: [
      'Integrated automotive product launches',
      'Omnichannel digital & offline coordination',
      'Dealership sales-marketing alignment',
    ],
  },
  {
    id: 'exp-unity',
    role: 'Digital Marketing Specialist',
    company: 'Unity Tourism BD',
    location: 'Dhaka, Bangladesh',
    period: 'November 2019 – January 2024',
    bullets: [
      'Managed social media promotions and digital marketing activities across hospitality and travel offerings.',
      'Executed Meta and Google advertising campaigns focused on customer acquisition, inquiries, and conversions.',
      'Planned and coordinated digital content schedules to ensure consistent brand engagement.',
      'Monitored campaign performance and audience response, using reporting insights to refine targeting and execution.',
      'Contributed to customer acquisition initiatives and booking generation for holiday and travel packages.',
    ],
    highlights: [
      'Meta & Google Ads media management',
      '4+ years continuous performance marketing',
      'Conversion-focused travel inquiry funnels',
    ],
  },
  {
    id: 'exp-genex',
    role: 'Customer Service Representative',
    company: 'Genex Infosys Ltd.',
    location: 'Dhaka, Bangladesh',
    period: 'January 2019 – April 2020',
    bullets: [
      'Delivered customer support and maintained service quality standards.',
      'Developed professional communication, active listening, and relationship-management skills.',
      'Addressed customer concerns efficiently and supported cross-department problem resolution.',
    ],
    highlights: [
      'Enterprise customer communication',
      'Problem-solving & service-quality discipline',
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'meta-lenscart-green-shades',
    title: 'Green Shades Campaign & E-Commerce Revenue Scaling',
    category: 'Meta Ads',
    industry: 'E-commerce Retail (Eyewear & Fashion)',
    clientOrBrand: 'LensCart Bangladesh',
    objective:
      'Drive customer acquisition, social engagement, and direct retail sales for the Green Shades eyewear collection.',
    challenge:
      'Combating rising CPMs and creative fatigue in the eyewear category while targeting both prescription and non-prescription fashion buyers in Bangladesh.',
    strategy:
      'Deployed a full-funnel Meta Ads structure: top-of-funnel influencer video reels for high-impact reach, middle-of-funnel retargeting of video viewers, and bottom-of-funnel Advantage Campaign Budget (CBO) ad sets focused on direct conversions.',
    platformsAndTools: [
      'Meta Ads Manager',
      'Instagram',
      'Facebook',
      'Advantage Campaign Budget',
      'Meta Pixel',
    ],
    execution:
      'Coordinated creative production with influencers presenting lifestyle video reviews and special promotional offers ("Buy 2 Lenses, Get 1 Free"). Configured structured ad sets with automated budget balancing and conversion tracking.',
    results: [
      {
        label: 'Sales Growth',
        value: '+35%',
        context: 'Within two weeks of campaign launch',
      },
      {
        label: 'Revenue Impact',
        value: '50%',
        context: 'Contribution to monthly brand revenue growth',
      },
      {
        label: 'Campaign Engagement',
        value: '20,000+',
        context: 'Targeted interactions and comments on video creative',
      },
      {
        label: 'Organic Profile Visits',
        value: '+70%',
        context: 'Boosted through collaborative creator publishing',
      },
    ],
    visuals: [
      {
        url: '/assets/aistudio/Meta-ads-moshorif__83__b9420c98.png',
        caption:
          'LensCart Bangladesh Ad Manager: Multi-advertiser video creative setup and placement preview.',
        type: 'meta-ad',
        metricsHighlight: 'Video creative with dynamic offer placement',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__74__2498a5a6.png',
        caption:
          'Advantage Campaign Budget configuration with highest volume bidding strategy.',
        type: 'dashboard',
        metricsHighlight: 'Advantage CBO setup at $3.00/day pacing',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__88__6524a1a5.png',
        caption:
          'Performance overview: 235,180 total reach achieved at $0.03 cost per result.',
        type: 'report',
        metricsHighlight: '235,180 reach at $0.03 cost per result',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__86__cdffe875.png',
        caption:
          'Audience scale and community acquisition: 23,423 follows/likes at $0.001 per result.',
        type: 'report',
        metricsHighlight: '23,423 follows at $0.001 per follow',
      },
    ],
    featured: true,
  },
  {
    id: 'google-ads-high-intent-search',
    title: 'Google Ads Search Keyword Optimization & Bidding Architecture',
    category: 'Google Ads',
    industry: 'Travel & Tourism / Consumer Services',
    clientOrBrand: 'Unity Tourism BD & Account Portfolios',
    objective:
      'Capture high-intent search traffic, lower customer acquisition costs, and maximize conversion yield across Google Search.',
    challenge:
      'Balancing competitive search keyword bids against seasonal market spikes without exhausting daily campaign budget limits.',
    strategy:
      'Restructured search campaigns into targeted ad groups with exact and phrase match keywords, implemented rigorous negative keyword lists to eliminate junk queries, and paired Maximize Conversions automated bidding with GA4 conversion events.',
    platformsAndTools: [
      'Google Ads',
      'Google Analytics 4 (GA4)',
      'Google Tag Manager',
      'Conversion Tracking',
      'Smart Bidding',
    ],
    execution:
      'Configured responsive search ads with dynamic keyword insertion, calibrated campaign budget simulators ($50–$90/day models), and monitored auction insights to maintain top-of-page impression share.',
    results: [
      {
        label: 'Click-Through Rate',
        value: '5.95%',
        context: 'High-intent CTR achieved on search ad groups',
      },
      {
        label: 'Tracked Conversions',
        value: '3,480',
        context: 'Verified conversion events during campaign evaluation flight',
      },
      {
        label: 'Search Clicks',
        value: '11,500',
        context: 'High-intent qualified visitor clicks generated',
      },
      {
        label: 'Cost Per Conversion',
        value: '$9.53',
        context: '11% improvement over original benchmark CPA',
      },
    ],
    visuals: [
      {
        url: '/assets/aistudio/Mohammad_Shoriful_Islam_GAds_portfolio_78ba7eca.jpeg',
        caption:
          'Google Ads campaign performance: 11.5K clicks, 3.48K conversions at $9.53 cost per conversion.',
        type: 'google-ad',
        metricsHighlight: '11.5K Clicks · 3.48K Conversions · $9.53 CPA',
      },
      {
        url: '/assets/aistudio/Mohammad_Shoriful_Islam_GAds_portfolio_4893cc0c.jpeg',
        caption:
          'Search campaign overview and keyword CTR tracking in Google Ads interface.',
        type: 'report',
        metricsHighlight: 'Search keyword volume & click trend analytics',
      },
      {
        url: '/assets/aistudio/Mohammad_Shoriful_Islam_GAds_portfolio_acc3cafb.jpeg',
        caption:
          'Campaign budget simulator: modeling daily spend vs. expected conversion volume.',
        type: 'dashboard',
        metricsHighlight: 'Data-driven budget simulation',
      },
      {
        url: '/assets/aistudio/Mohammad_Shoriful_Islam_GAds_portfolio_907a2b71.jpeg',
        caption:
          'Smart Bidding implementation: Maximize Conversions bidding strategy configuration.',
        type: 'dashboard',
        metricsHighlight: 'Maximize Conversions strategy configuration',
      },
    ],
    featured: true,
  },
  {
    id: 'lead-generation-funnel-scaling',
    title: 'High-Volume Lead Generation & Customer Inquiry Funnels',
    category: 'Lead Generation',
    industry: 'Professional Services, Real Estate & Travel Hospitality',
    clientOrBrand: 'Multi-Industry Client Campaigns',
    objective:
      'Acquire qualified customer inquiries and verified leads at ultra-low cost per result using native Meta Instant Forms and messaging destinations.',
    challenge:
      'High drop-off rates on external web forms and inconsistent lead qualification across high-volume campaigns.',
    strategy:
      'Shifted focus to native mobile lead funnels: custom Instant Lead Forms with screening questions, paired with Click-to-WhatsApp and Click-to-Messenger campaigns for immediate customer qualification.',
    platformsAndTools: [
      'Meta Ads Manager',
      'Meta Instant Forms',
      'WhatsApp Business API',
      'Meta Pixel',
      'CRM Integration',
    ],
    execution:
      'Designed frictionless 3-step lead forms and conversational ad copy tailored to specific target audiences (corporate PGD-PMP leads, executive CFO tracks, language learners, and hospitality booking inquiries).',
    results: [
      {
        label: 'Subscription Leads',
        value: '1,748',
        context: 'Acquired at $0.79 per verified lead ($1,388 spend)',
      },
      {
        label: 'Secondary Cohort Leads',
        value: '1,197',
        context: 'Achieved at $0.84 per lead ($1,000 spend)',
      },
      {
        label: 'Specialized Leads',
        value: '430',
        context: 'PGD-PMP professional certification leads at $0.50 each',
      },
      {
        label: 'Executive CFO Leads',
        value: '85',
        context: 'High-value executive leads captured at $0.56 each',
      },
    ],
    visuals: [
      {
        url: '/assets/aistudio/LEAD2_6f158cd5.png',
        caption:
          'Lead generation overview: 1,748 subscription leads generated at $0.79 cost per result.',
        type: 'dashboard',
        metricsHighlight: '1,748 Leads at $0.79 per lead',
      },
      {
        url: '/assets/aistudio/LEAD1_c8e402f3.png',
        caption:
          'Lead campaign flight: 1,197 leads captured at $0.84 per lead.',
        type: 'report',
        metricsHighlight: '1,197 Leads at $0.84 per lead',
      },
      {
        url: '/assets/aistudio/LEAD7_ff607f68.png',
        caption:
          'Professional PGD-PMP leads: 430 qualified leads at $0.50 cost per lead.',
        type: 'report',
        metricsHighlight: '430 PGD-PMP leads at $0.50 per lead',
      },
      {
        url: '/assets/aistudio/LEAD5_a18c608d.png',
        caption:
          'Executive CFO lead acquisition: 85 qualified senior leads at $0.56 per lead.',
        type: 'report',
        metricsHighlight: '85 Executive leads at $0.56 per lead',
      },
      {
        url: '/assets/aistudio/LEAD_d5f26952.png',
        caption:
          'Verified inquiry tracking log: guest booking confirmations from lead inquiry funnels.',
        type: 'report',
        metricsHighlight: 'Confirmed customer booking management log',
      },
    ],
    featured: true,
  },
  {
    id: 'landing-page-view-traffic-scaling',
    title: 'High-Volume Traffic Acquisition & Landing Page View Optimization',
    category: 'Landing Page Campaigns',
    industry: 'E-commerce & Digital Retail',
    clientOrBrand: 'Lifestyle & Retail Campaigns',
    objective:
      'Drive massive qualified traffic to web landing pages while maintaining verified page load fidelity and ultra-low cost per link click.',
    challenge:
      'Preventing click abandonment between ad link click and actual browser landing page view rendering.',
    strategy:
      'Optimized delivery specifically for Landing Page Views (LPV) over raw link clicks, configured Meta Pixel PageView triggers, and utilized Advantage+ audience expansion for relevant demographics.',
    platformsAndTools: [
      'Meta Ads Manager',
      'Meta Pixel',
      'Landing Page Views Optimization',
      'Google Tag Manager',
    ],
    execution:
      'Deployed lightweight ad creatives focused on high-CTR product propositions, targeting demographic bands (women 20-35) with mobile-responsive landing experiences.',
    results: [
      {
        label: 'Link Clicks',
        value: '8,020',
        context: 'Generated at $0.002 per link click ($17.29 total budget)',
      },
      {
        label: 'Secondary Flight Clicks',
        value: '6,900',
        context: 'Delivered at $0.004 per link click ($29.93 total spend)',
      },
      {
        label: 'Verified LPVs',
        value: '782',
        context: 'Landing page views delivered at $0.03 per verified view',
      },
      {
        label: 'Cost Efficiency',
        value: '< $0.005',
        context: 'Maintained sub-cent click acquisition cost across campaign flight',
      },
    ],
    visuals: [
      {
        url: '/assets/aistudio/LPV1_d17e3992.png',
        caption:
          'Meta Ads link click performance: 8,020 link clicks delivered at $0.002 per click.',
        type: 'dashboard',
        metricsHighlight: '8,020 Clicks at $0.002 per click',
      },
      {
        url: '/assets/aistudio/LPV4_b2190af8.png',
        caption:
          'Secondary traffic flight: 6,900 link clicks delivered at $0.004 per click.',
        type: 'report',
        metricsHighlight: '6,900 Clicks at $0.004 per click',
      },
      {
        url: '/assets/aistudio/LPV3_39c8e4f1.png',
        caption:
          'Landing page view verification: 782 verified views at $0.03 per result.',
        type: 'report',
        metricsHighlight: '782 Verified LPVs at $0.03',
      },
      {
        url: '/assets/aistudio/LPV5_1d67aa1a.png',
        caption:
          'Advantage+ audience segmentation: demographic criteria and interest matching.',
        type: 'dashboard',
        metricsHighlight: 'Advantage+ targeting setup',
      },
    ],
  },
  {
    id: 'brand-campaign-awareness-growth',
    title: 'Integrated Brand Awareness & Customer Conversation Campaigns',
    category: 'Brand Campaigns',
    industry: 'Automotive & Consumer Brands',
    clientOrBrand: 'Niloy Motors Ltd., Neoteric BD, Divine.Co',
    objective:
      'Elevate consumer brand visibility and trigger direct conversational sales inquiries across social channels.',
    challenge:
      'Translating brand awareness impressions into direct, traceable customer conversations and dealership footfall.',
    strategy:
      'Implemented an integrated campaign framework combining high-reach video awareness ads with Click-to-Messenger and Click-to-WhatsApp call-to-actions, supported by rapid customer service follow-ups.',
    platformsAndTools: [
      'Meta Ads Manager',
      'Facebook Feed & Stories',
      'Instagram Ads',
      'Meta Business Suite',
      'Messaging Conversations',
    ],
    execution:
      'Produced engaging product video ads with tight first-3-second hooks, highlighting key product aesthetics and pairing them with streamlined conversation starters.',
    results: [
      {
        label: 'Campaign Reach',
        value: '476,500',
        context: 'Top-tier reach achieved at $0.04 cost per result',
      },
      {
        label: 'Messaging Inquiries',
        value: '1,177',
        context: 'Conversations started at $0.25 each ($293.26 spend)',
      },
      {
        label: 'Shoe Campaign Inquiries',
        value: '868',
        context: 'Started at $0.05 per conversation for Divine.Co',
      },
      {
        label: 'Video Plays',
        value: '33,361',
        context: 'High-retention product video views logged in Ads Manager',
      },
    ],
    visuals: [
      {
        url: '/assets/aistudio/Meta-ads-moshorif__98__0a1cafd2.png',
        caption:
          'High-impact reach flight: 287,088 targeted reach achieved at $0.03 cost per result.',
        type: 'report',
        metricsHighlight: '287,088 Reach at $0.03',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__95__c5ed6b50.png',
        caption:
          'Awareness scaling: 436,757 reach at $0.04 per result ($16.14 total spend).',
        type: 'report',
        metricsHighlight: '436,757 Reach at $0.04',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__103__8c285a14.png',
        caption:
          'Conversational marketing: 1,177 messaging conversations started at $0.25 per inquiry.',
        type: 'dashboard',
        metricsHighlight: '1,177 Messaging inquiries at $0.25',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__105__4b92bc68.png',
        caption:
          'Divine.Co footwear messaging campaign: 868 conversations at $0.05 per conversation.',
        type: 'dashboard',
        metricsHighlight: '868 Conversations at $0.05',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__71__d5aa8295.png',
        caption:
          'Neoteric BD: Product video creative preview and ad copy optimization.',
        type: 'creative',
        metricsHighlight: 'Ad creative and multi-format preview',
      },
      {
        url: '/assets/aistudio/Meta-ads-moshorif__40__633f1baa.png',
        caption:
          'Video view performance: 33,361 video plays tracked with milestone watch times.',
        type: 'report',
        metricsHighlight: '33,361 Video plays logged',
      },
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'Performance Marketing',
    description:
      'Full-funnel paid advertising, audience architecture, and continuous ROAS optimization.',
    skills: [
      'Performance marketing',
      'Meta Ads Manager',
      'Facebook and Instagram advertising',
      'Google Ads',
      'Campaign execution and optimization',
      'Audience segmentation',
      'Retargeting',
      'Lead generation',
      'Customer acquisition',
    ],
  },
  {
    title: 'Marketing Strategy & Execution',
    description:
      'Omnichannel campaign planning, creative direction, and sales alignment.',
    skills: [
      'Brand and promotional campaigns',
      'E-commerce marketing',
      'Social media marketing',
      'Content planning',
      'Product launches',
      'Creative brief development',
      'Cross-functional coordination',
      'Sales and marketing collaboration',
    ],
  },
  {
    title: 'Analytics & Tracking',
    description:
      'Rigorous measurement, data-layer implementation, and attribution analysis.',
    skills: [
      'Google Analytics 4 (GA4)',
      'Meta Insights',
      'KPI tracking and reporting',
      'Reach and engagement analysis',
      'Conversion analysis',
      'Google Tag Manager',
      'Meta Pixel',
      'Conversion API (CAPI)',
    ],
  },
  {
    title: 'Creative & Technical Skills',
    description:
      'Multimedia storytelling, video editing, and engineering-grounded technical capability.',
    skills: [
      'Motion graphics',
      'Video editing',
      'Creative content production',
      'HTML & CSS',
      'Data Structures & Algorithms',
      'Server-Side Tracking Concepts',
      'API-based Marketing Integrations',
    ],
  },
];

export const EDUCATION = {
  degree: 'Bachelor of Science in Computer Science & Engineering',
  institution: 'Sonargaon University, Bangladesh',
  status: 'Expected graduation: 2027',
  focus:
    'Combines strong engineering foundations, algorithms, and web technologies with advanced data-driven marketing analytics and automation.',
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Meta Certified Advertiser',
    issuer: 'Meta',
    description:
      'Professional credential validating proficiency in campaign planning, audience targeting, advertising solutions, measurement, and campaign optimization across Meta technologies.',
  },
  {
    title: 'Digital Marketing Certification',
    issuer: 'SR Dream IT',
    description:
      'Comprehensive training in digital marketing strategy, social media marketing, paid advertising, content marketing, SEO, and online customer acquisition.',
  },
  {
    title: 'Motion Graphics & Video Editing',
    issuer: 'Olpo Shikhi Dot Com',
    description:
      'Professional training in motion graphics, video editing, visual storytelling, and digital content production for high-converting marketing campaigns.',
  },
  {
    title: 'Successful Freelancer Award (2026)',
    issuer: 'SR Dream IT',
    description:
      'Recognized for exceptional client campaign delivery, performance scaling, and contributions to digital marketing projects.',
    year: '2026',
  },
  {
    title: 'Aspire Leaders Program – Leadership: Foundational Principles',
    issuer: 'Harvard University / Aspire Institute',
    description:
      'Leadership development focused on foundational leadership principles, communication, self-awareness, decision-making, and professional growth.',
  },
  {
    title: 'Server-Side Tracking Specialist',
    issuer: 'Skill Upper',
    description:
      'Specialized training in modern marketing measurement, server-side tracking, conversion tracking, data flow, and privacy-conscious analytics implementation.',
  },
  {
    title: 'Gemini Certified Education Program',
    issuer: 'Google Garage',
    description:
      'Training focused on applying Google Gemini AI capabilities and generative AI concepts to productivity, analytics, and digital marketing workflows.',
  },
];

export const projectCategories: ('All' | 'Meta Ads' | 'Google Ads' | 'Lead Generation' | 'Landing Page Campaigns' | 'Brand Campaigns')[] = [
  'All',
  'Meta Ads',
  'Google Ads',
  'Lead Generation',
  'Landing Page Campaigns',
  'Brand Campaigns',
];

export const personalInfo = PERSONAL_INFO;
export const careerHighlights = CAREER_HIGHLIGHTS;
export const experienceData = EXPERIENCES;
export const caseStudies = CASE_STUDIES;
export const skillGroups = SKILL_GROUPS;
export const educationData = EDUCATION;
export const certificationsData = CERTIFICATIONS;

