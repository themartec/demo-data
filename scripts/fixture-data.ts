// Shared source data for every generated fixture. All company/competitor
// names are fictional — see README.md for why (avoids brand/trademark risk
// from permanently hosting "hiring strategy"-shaped documents under a real
// company's name). Each is modelled on a real-world industry without naming
// any real company.

export interface RoleRow {
  role: string;
  description: string;
  department: string;
  region: string;
}

export interface Field {
  key: string;
  label: string;
  company: string;
  industry: string;
  competitors: string[];
  roles: RoleRow[];
  strategyTitle: string;
  strategyParagraphs: string[];
  marketResearchParagraphs: string[];
  jobAdvert: {
    title: string;
    department: string;
    region: string;
    body: string[];
  };
  jobDescriptionText: string;
}

export const FIELDS: Field[] = [
  {
    key: 'sales',
    label: 'Sales / Commercial',
    company: 'Fenwick Retail Group',
    industry: 'grocery and general retail',
    competitors: ['Alderton Foods', 'Bramwell Grocers', 'Continental Mart'],
    roles: [
      {
        role: 'Regional Sales Manager',
        description:
          'Owns commercial performance across a cluster of stores, coaching store-level sales teams and running weekly trading reviews.',
        department: 'Commercial',
        region: 'North West, UK',
      },
      {
        role: 'Key Account Executive',
        description:
          'Manages supplier and wholesale account relationships, negotiating annual trading terms and promotional calendars.',
        department: 'Commercial',
        region: 'London, UK',
      },
      {
        role: 'Store Sales Associate',
        description:
          'Front-of-store customer service and till operations, with a focus on basket-building and loyalty sign-ups.',
        department: 'Retail Operations',
        region: 'Manchester, UK',
      },
      {
        role: 'Trade Marketing Executive',
        description:
          'Builds in-store promotional campaigns and point-of-sale materials in partnership with category buyers.',
        department: 'Marketing',
        region: 'Leeds, UK',
      },
      {
        role: 'E-commerce Sales Analyst',
        description:
          'Analyses online basket and conversion data to recommend pricing and merchandising changes for the online store.',
        department: 'E-commerce',
        region: 'Remote, UK',
      },
      {
        role: 'Wholesale Sales Coordinator',
        description:
          'Coordinates order processing and delivery scheduling for bulk and wholesale customer accounts.',
        department: 'Commercial',
        region: 'Birmingham, UK',
      },
    ],
    strategyTitle: 'FY2027 Commercial Hiring Strategy',
    strategyParagraphs: [
      'Fenwick Retail Group plans to grow its commercial and store-operations headcount by 12% in FY2027, concentrated in the North West and London regions where new store openings are planned.',
      'Priority is being given to Key Account and Trade Marketing roles, reflecting a strategic push into supplier co-funded promotional campaigns following strong FY2026 like-for-like sales growth.',
      'The talent pool for retail commercial roles is highly mobile between Fenwick, Alderton Foods and Bramwell Grocers; retention initiatives this year focus on faster progression paths from Store Sales Associate into Commercial track roles.',
      'E-commerce Sales Analyst is a newly created role for FY2027, reflecting the continued shift of basket volume toward the online store relative to Continental Mart’s slower digital rollout.',
    ],
    marketResearchParagraphs: [
      'Industry-wide, retail sales talent increasingly rates flexible scheduling and a clear path from store-floor roles into commercial/head-office positions above pure salary competitiveness.',
      'Alderton Foods has publicly emphasised its graduate commercial scheme as a differentiator, while Bramwell Grocers leans on store-manager profit-share bonuses to retain regional sales leadership.',
      'Continental Mart has been slower to invest in e-commerce commercial roles, which candidates in exit interviews cite as a reason for preferring Fenwick Retail Group or Alderton Foods for digitally-oriented sales careers.',
      'Across the sector, "career progression clarity" and "manager quality" rank above compensation in candidate surveys for retail commercial roles, ahead of pure base salary.',
    ],
    jobAdvert: {
      title: 'Regional Sales Manager',
      department: 'Commercial',
      region: 'North West, UK',
      body: [
        'Fenwick Retail Group is hiring a Regional Sales Manager to own commercial performance across a cluster of stores in the North West.',
        'You will coach store-level sales teams, run weekly trading reviews, and work closely with Trade Marketing on regional promotional execution.',
        'We are looking for someone with 5+ years of multi-site retail commercial experience and a track record of hitting like-for-like sales targets.',
        'This role reports into the Head of Commercial and is based from our Manchester regional office, with regular travel to stores across the North West.',
      ],
    },
    jobDescriptionText:
      'Job Title: Key Account Executive\n' +
      'Department: Commercial\n' +
      'Region: London, UK\n\n' +
      'Fenwick Retail Group is looking for a Key Account Executive to manage supplier and wholesale account relationships. ' +
      'Responsibilities include negotiating annual trading terms, planning promotional calendars, and being the day-to-day point of contact for a portfolio of national suppliers.\n\n' +
      'The ideal candidate has 3+ years of experience in a retail or FMCG account management role, strong Excel skills, and confidence negotiating with senior supplier stakeholders.',
  },
  {
    key: 'software-engineering',
    label: 'Software Engineering',
    company: 'Cascadia Cloud Systems',
    industry: 'cloud infrastructure and enterprise software',
    competitors: ['Vantage Cloud', 'Northfield Systems', 'Ionix Data'],
    roles: [
      {
        role: 'Senior Backend Engineer',
        description:
          'Designs and builds services powering the order-fulfilment platform, focusing on reliability and horizontal scale.',
        department: 'Platform Engineering',
        region: 'Austin, US',
      },
      {
        role: 'Site Reliability Engineer',
        description:
          'Owns production reliability for core platform services, including on-call rotation, incident response, and capacity planning.',
        department: 'Platform Engineering',
        region: 'Remote, US',
      },
      {
        role: 'Frontend Engineer',
        description:
          'Builds customer-facing dashboard features in React/TypeScript, working closely with product design.',
        department: 'Product Engineering',
        region: 'Remote, EU',
      },
      {
        role: 'Data Engineer',
        description:
          'Builds and maintains ETL pipelines feeding the analytics warehouse used by the customer success team.',
        department: 'Data Platform',
        region: 'Seattle, US',
      },
      {
        role: 'Machine Learning Engineer',
        description:
          'Develops and productionises ranking models for the recommendation service.',
        department: 'Applied ML',
        region: 'Austin, US',
      },
      {
        role: 'DevOps Engineer',
        description:
          'Maintains CI/CD pipelines and Kubernetes infrastructure across staging and production environments.',
        department: 'Platform Engineering',
        region: 'Remote, US',
      },
    ],
    strategyTitle: 'FY2027 Engineering Hiring Strategy',
    strategyParagraphs: [
      'Cascadia Cloud Systems plans to grow engineering headcount by 20% in FY2027, with the largest single increase in Platform Engineering to support the new multi-region rollout.',
      'Remote hiring will account for over half of new engineering headcount this year, widening the candidate pool beyond the Austin and Seattle offices in response to increasingly remote-first competition from Vantage Cloud.',
      'Applied ML is a new department for FY2027; the first Machine Learning Engineer hires will report directly into the VP of Engineering while the team is established.',
      'Retention data shows engineers most commonly cite "technical challenge" and "on-call load" as reasons for leaving; the SRE hiring plan is partly aimed at reducing on-call burden on product engineering teams.',
    ],
    marketResearchParagraphs: [
      'Industry talent surveys consistently rank "interesting technical problems" and "engineering autonomy" above compensation for senior engineers considering a move, though compensation remains a threshold requirement.',
      'Vantage Cloud has publicly marketed a fully remote-first engineering org as a hiring differentiator, while Northfield Systems emphasises its return-to-office policy and in-person collaboration culture.',
      'Ionix Data has faced public criticism in engineering communities over on-call load following a string of high-profile outages, which recruiters report has made its senior SRE roles harder to fill.',
      'Candidates increasingly ask about AI/ML tooling investment during interviews, reflecting broader industry interest in working with modern ML infrastructure rather than legacy systems.',
    ],
    jobAdvert: {
      title: 'Senior Backend Engineer',
      department: 'Platform Engineering',
      region: 'Austin, US',
      body: [
        'Cascadia Cloud Systems is hiring a Senior Backend Engineer to design and build services powering our order-fulfilment platform.',
        'You will work on distributed systems handling millions of orders per day, with a strong focus on reliability, observability, and horizontal scale.',
        'We are looking for 5+ years of backend experience with a language such as Go, Java, or TypeScript, and prior experience operating services at scale.',
        'This role is based in our Austin office (hybrid, 3 days/week on-site) and reports to the Platform Engineering Lead.',
      ],
    },
    jobDescriptionText:
      'Job Title: Site Reliability Engineer\n' +
      'Department: Platform Engineering\n' +
      'Region: Remote, US\n\n' +
      'Cascadia Cloud Systems is looking for a Site Reliability Engineer to own production reliability for our core platform services. ' +
      'Responsibilities include participating in an on-call rotation, leading incident response and postmortems, and driving capacity planning ahead of major traffic events.\n\n' +
      'The ideal candidate has 4+ years of SRE or infrastructure experience, strong Kubernetes and observability tooling knowledge, and is comfortable working fully remote across US time zones.',
  },
  {
    key: 'hospitality-operations',
    label: 'Hospitality Operations',
    company: 'Northbridge Hotels & Resorts',
    industry: 'hospitality and hotel operations',
    competitors: ['Aldermere Resorts', 'Crestline Inns', 'Solaire Hospitality Group'],
    roles: [
      {
        role: 'Front Office Manager',
        description:
          'Leads the front desk and guest services team, owning check-in/out standards, upselling, and guest complaint resolution.',
        department: 'Guest Services',
        region: 'Orlando, US',
      },
      {
        role: 'Food & Beverage Supervisor',
        description:
          'Supervises restaurant and bar service across breakfast, lunch and dinner shifts, managing rostering and stock control.',
        department: 'Food & Beverage',
        region: 'Miami, US',
      },
      {
        role: 'Housekeeping Team Leader',
        description:
          'Leads a team of room attendants, ensuring room turnaround times and cleanliness standards are met across the property.',
        department: 'Housekeeping',
        region: 'Las Vegas, US',
      },
      {
        role: 'Events & Conference Coordinator',
        description:
          'Plans and delivers on-site conferences and weddings, liaising with clients and coordinating catering and AV setup.',
        department: 'Events',
        region: 'Orlando, US',
      },
      {
        role: 'Guest Experience Agent',
        description:
          'First point of contact for guest requests via phone, app and in-person, resolving issues and coordinating with other departments.',
        department: 'Guest Services',
        region: 'Chicago, US',
      },
      {
        role: 'Revenue Management Analyst',
        description:
          'Sets nightly room pricing and forecasts occupancy across the property portfolio using historical booking data.',
        department: 'Revenue Management',
        region: 'Remote, US',
      },
    ],
    strategyTitle: 'FY2027 Property Operations Hiring Strategy',
    strategyParagraphs: [
      'Northbridge Hotels & Resorts plans to grow property-level headcount by 8% in FY2027 to support the opening of two new properties in Orlando and Miami.',
      'Guest Services and Food & Beverage account for the largest share of planned hires, reflecting both new-property ramp-up and seasonal peak staffing for the FY2027 summer season.',
      'Revenue Management is being centralised into a remote team for FY2027, reducing the need for a dedicated on-property analyst at every location and freeing budget for guest-facing roles.',
      'Exit interview data shows front-line hospitality staff most frequently cite "shift predictability" and "career progression into management" as reasons for leaving, ahead of base pay, which is informing this year\'s retention-focused scheduling pilot.',
    ],
    marketResearchParagraphs: [
      'Hospitality workforce surveys consistently show shift predictability and total compensation (including tips/service charge) ranking above base hourly rate for front-line staff considering a move.',
      'Aldermere Resorts has publicly promoted a four-day compressed workweek pilot for housekeeping staff as a retention differentiator, while Crestline Inns emphasises internal promotion rates in its employer branding.',
      'Solaire Hospitality Group has faced public commentary around high turnover in Food & Beverage roles, which industry recruiters attribute to inconsistent scheduling practices at the property level.',
      'Across the sector, candidates increasingly research an employer\'s scheduling app and shift-swap flexibility before applying, alongside more traditional factors like pay and location.',
    ],
    jobAdvert: {
      title: 'Front Office Manager',
      department: 'Guest Services',
      region: 'Orlando, US',
      body: [
        'Northbridge Hotels & Resorts is hiring a Front Office Manager to lead the front desk and guest services team at our Orlando property.',
        'You will own check-in/check-out standards, drive upselling performance, and be the escalation point for guest complaint resolution.',
        'We are looking for 3+ years of front office leadership experience in a full-service hotel, with strong people-management skills.',
        'This role is based on-property in Orlando and reports to the Director of Guest Services.',
      ],
    },
    jobDescriptionText:
      'Job Title: Food & Beverage Supervisor\n' +
      'Department: Food & Beverage\n' +
      'Region: Miami, US\n\n' +
      'Northbridge Hotels & Resorts is looking for a Food & Beverage Supervisor to oversee restaurant and bar service across breakfast, lunch and dinner shifts. ' +
      'Responsibilities include staff rostering, stock control, and maintaining service standards during peak periods.\n\n' +
      'The ideal candidate has 2+ years of food and beverage supervisory experience in a hotel or high-volume restaurant setting, and is comfortable working evenings and weekends.',
  },
];
