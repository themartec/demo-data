// Source data for the role/content/brand fixture areas, all built around one
// fictional company — Cascadia Cloud Systems, the same one used for the
// software-engineering job-board fixtures, so its role list can be reused
// directly instead of duplicated. Company/competitor names are fictional —
// see README.md for why.

export interface EvpPillar {
  title: string;
  body: string;
}

export const EVP_COMPANY = 'Cascadia Cloud Systems';

export const EVP_PILLARS: EvpPillar[] = [
  {
    title: 'Meaningful technical challenges',
    body: 'Engineers work on distributed systems handling real production scale — order-fulfilment, ranking, and platform infrastructure used by paying customers, not internal toy projects.',
  },
  {
    title: 'Remote-first flexibility',
    body: 'Most engineering roles are remote-friendly with a small overlap window for synchronous collaboration. Work from wherever you do your best work.',
  },
  {
    title: 'Growth and mentorship',
    body: 'Every engineer is paired with a mentor in their first month, and there is a defined technical ladder through to Staff and Principal, not just a management track.',
  },
  {
    title: 'Competitive total rewards',
    body: 'Above-market base pay, meaningful equity, and an annual learning budget engineers can spend on courses, conferences or books with no approval friction.',
  },
  {
    title: 'Low-ego, high-trust culture',
    body: 'Blameless postmortems, decisions made in the open, and a norm of engineers pushing back on their own leads in design review without it being a career risk.',
  },
];

export interface Testimonial {
  slug: string;
  employeeName: string;
  role: string;
  team: string;
  location: string;
  tenure: string;
  storyTitle: string;
  quote: string;
  publishedDate: string;
}

// Deliberately uneven coverage across Cascadia's 6 software-engineering
// roles (see fixture-data.ts): Senior Backend Engineer has two, Frontend
// Engineer and DevOps Engineer have one each (one of those framed as
// older/thin), and Site Reliability Engineer, Data Engineer and Machine
// Learning Engineer have none at all. Real, testable gaps — not uniform
// coverage that would make a coverage/gap analysis meaningless to test.
export const TESTIMONIALS: Testimonial[] = [
  {
    slug: 'priya-nandakumar',
    employeeName: 'Priya Nandakumar',
    role: 'Senior Backend Engineer',
    team: 'Platform Engineering',
    location: 'Austin, US',
    tenure: '3 years',
    storyTitle: 'Why I stayed for the hard problems',
    quote:
      'I get to work on systems that actually matter at scale — when I joined I was skeptical "distributed systems" wasn\'t just a buzzword here, but the order-fulfilment rewrite was the real thing. Nobody hands you a toy problem.',
    publishedDate: '2026-03-14',
  },
  {
    slug: 'marcus-feld',
    employeeName: 'Marcus Feld',
    role: 'Senior Backend Engineer',
    team: 'Platform Engineering',
    location: 'Remote, US',
    tenure: '1.5 years',
    storyTitle: 'Remote done properly',
    quote:
      'I moved twice in eighteen months and nothing about my job changed. The only thing that matters is the overlap window for design reviews — outside that, nobody cares where or when I work.',
    publishedDate: '2026-06-02',
  },
  {
    slug: 'jordan-whitfield',
    employeeName: 'Jordan Whitfield',
    role: 'Frontend Engineer',
    team: 'Product Engineering',
    location: 'Remote, EU',
    tenure: '2 years',
    storyTitle: 'Pushing back without it being a thing',
    quote:
      'In my first design review I disagreed with my lead\'s approach in front of the whole team. I expected it to be awkward. It genuinely wasn\'t — we just talked through it and went with the better option, which happened to be mine that time.',
    publishedDate: '2026-01-20',
  },
  {
    slug: 'anh-tran',
    employeeName: 'Anh Tran',
    role: 'DevOps Engineer',
    team: 'Platform Engineering',
    location: 'Remote, US',
    tenure: '4 years',
    storyTitle: 'Four years of learning budget',
    quote:
      'I\'ve used my learning budget every single year — a Kubernetes certification, two conferences, and a pile of books. Nobody has ever questioned an expense.',
    // Older publish date than the others — a deliberately "thin/dated"
    // testimonial rather than a fresh one, for testing Keep vs Update
    // classification against recency, not just presence/absence.
    publishedDate: '2023-11-08',
  },
];

export interface MarketRegion {
  key: string;
  market: string;
  homeMarket: string;
  competitors: string[];
  talentMarket: string[];
  compensationAndBenefits: string[];
  workingCulture: string[];
  legalAndCompliance: string[];
  recruitingChannels: string[];
}

export const MARKET_REGIONS: MarketRegion[] = [
  {
    key: 'germany',
    market: 'Germany',
    homeMarket: 'United States',
    competitors: ['Kessler Technologies', 'Nordwelle Systems'],
    talentMarket: [
      'Senior backend and platform engineering talent is in short supply in Berlin and Munich; time-to-fill for comparable roles at local firms averages 9-11 weeks per regional hiring surveys.',
      'Kessler Technologies and Nordwelle Systems are the two most commonly cited competing employers among candidates interviewed in exit surveys for similar roles.',
    ],
    compensationAndBenefits: [
      'Statutory minimum annual leave is 20 days for a 5-day week; most competitive employers offer 28-30 days as a norm, not a perk.',
      'Public health insurance is the default and expected; supplementary private health coverage is viewed as a differentiator but not a baseline requirement.',
      'Base salary transparency within a company (via the works council) is more common and more expected than in the US market.',
    ],
    workingCulture: [
      'Works councils (Betriebsrat) have formal co-determination rights over working conditions at companies above a certain size — this is a structural expectation, not a cultural preference.',
      'A stricter line between work and personal time is broadly expected; after-hours contact outside genuine emergencies is viewed negatively.',
      'Hybrid work (2-3 days in office) is more common than fully remote for engineering roles at local competitors, though fully remote postings do exist and get strong response.',
    ],
    legalAndCompliance: [
      'German and EU data protection requirements (GDPR, plus domestic implementing law) are treated as a baseline expectation by candidates, not a selling point — any messaging that treats data privacy as a differentiator undersells local norms.',
      'Fixed-term contracts face stricter legal limits than at-will employment norms familiar to a US-based hiring team; candidates commonly ask about contract type early in the process.',
    ],
    recruitingChannels: [
      'LinkedIn and Xing (a Germany/DACH-region professional network) are both commonly used; Xing has meaningfully higher engagement for mid-career engineering candidates than in most other European markets.',
      'Direct referral and specialist tech recruiters are reported as more trusted than open job-board postings for senior roles.',
    ],
  },
  {
    key: 'japan',
    market: 'Japan',
    homeMarket: 'United States',
    competitors: ['Sakura Cloud K.K.', 'Meiwa Systems'],
    talentMarket: [
      'Demand for engineers with strong English-language documentation/communication skills alongside technical ability outstrips supply; candidates with both are typically fielding multiple competing offers.',
      'Sakura Cloud K.K. and Meiwa Systems are named most frequently as reference employers by candidates benchmarking compensation and career-path expectations.',
    ],
    compensationAndBenefits: [
      'Bi-annual bonus payments (typically summer and winter) are a standard and expected part of total compensation structure at most competing employers, not a discretionary add-on.',
      'Long-term employer commitment remains a meaningfully weighted factor for mid-career and senior candidates, more so than in the US market — tenure signals stability to a candidate\'s own network.',
    ],
    workingCulture: [
      'Seniority- and tenure-based progression expectations remain stronger than in the US market, even at technology-sector employers that otherwise present as Western in style.',
      'Consensus-based decision-making (often described locally as nemawashi — informal groundwork/alignment before a formal decision) is a common norm; a "move fast, decide alone" framing can read as disrespectful of process rather than as a strength.',
      'Fully remote-only roles remain less common among local competitors than hybrid arrangements, though this is shifting post-pandemic, particularly for candidates under 35.',
    ],
    legalAndCompliance: [
      'Employment protections make termination meaningfully more difficult than at-will markets; candidates evaluating a move from a large, stable local employer weigh this heavily.',
      'Visa sponsorship processes and timelines are a common early question from candidates outside Japan; unclear sponsorship messaging is reported as a common reason candidates drop out of process.',
    ],
    recruitingChannels: [
      'Specialist bilingual recruiting agencies are the dominant channel for mid-to-senior technical roles, more so than direct job-board applications.',
      'Employer reputation on Japanese-language review platforms carries more weight with local candidates than English-language employer review sites.',
    ],
  },
];
