export type InvestorType = 'Angel' | 'Fund' | 'Family Office' | 'CVC' | 'Grant';
export type StageF = 'Pre-seed' | 'Seed' | 'Series A' | 'Series B+';
export type FemtechFit = 'Yes' | 'No' | 'Unknown';
export type HealthcareFocus = 'Payer' | 'Provider' | 'Employer' | 'Pharma' | 'Consumer' | 'Multi';
export type FunnelStage = 
  | 'Research' 
  | 'Intro needed' 
  | 'Intro sent' 
  | 'Meeting scheduled' 
  | 'Meeting done' 
  | 'Diligence' 
  | 'Soft yes' 
  | 'Passed' 
  | 'On hold';

export type ClinicalFocus = 
  | 'Fertility' | 'Menopause' | 'Pelvic health' | 'Maternal' 
  | 'Mental health' | 'Chronic disease' | 'Sexual health' | 'Other';

export type ProductType = 'App' | 'Device' | 'Service' | 'Platform' | 'Data' | 'Diagnostics';
export type EvidenceStage = 'Anecdotal' | 'Pilot planned' | 'Pilot running' | 'Pilot completed' | 'Published' | 'Regulatory submission';
export type RegulatoryStatus = 'Non-medical/wellness' | 'FDA exempt' | '510(k) path' | 'De novo' | 'EU MDR class' | 'Other';
export type StrategicInterest = 'Employers' | 'Payers' | 'Health systems' | 'OB/GYN groups' | 'D2C only' | 'Multi';
export type Priority = 'High' | 'Medium' | 'Low';

export interface Investor {
  id: string;
  investorName: string;
  fundName: string;
  type: InvestorType;
  stageFocus: StageF[];
  femtechFit: FemtechFit;
  femtechFitTag: string;
  healthcareFocus: HealthcareFocus;
  warmIntroSource: string;
  introPath: string;
  firstContactDate: string;
  funnelStage: FunnelStage;
  checkSizeRange: string;
  geography: string;
  clinicalFocus: ClinicalFocus[];
  productType: ProductType[];
  evidenceStage: EvidenceStage;
  regulatoryStatus: RegulatoryStatus;
  strategicInterest: StrategicInterest;
  keyNotes: string;
  founderNotes: string;
  nextAction: string;
  nextActionDate: string;
  priority: Priority;
  isPractice?: boolean;
  createdAt: string;
  updatedAt: string;
}

export const FUNNEL_STAGES: FunnelStage[] = [
  'Research', 'Intro needed', 'Intro sent', 'Meeting scheduled',
  'Meeting done', 'Diligence', 'Soft yes', 'Passed', 'On hold'
];

export const FUNNEL_STAGE_COLORS: Record<FunnelStage, string> = {
  'Research': 'bg-kanban-research',
  'Intro needed': 'bg-kanban-intro',
  'Intro sent': 'bg-kanban-intro',
  'Meeting scheduled': 'bg-kanban-meeting',
  'Meeting done': 'bg-kanban-meeting',
  'Diligence': 'bg-kanban-diligence',
  'Soft yes': 'bg-kanban-yes',
  'Passed': 'bg-kanban-passed',
  'On hold': 'bg-kanban-hold',
};

export const FIELD_HELPERS: Record<string, string> = {
  investorName: "Just the person's name — no titles or personal details needed.",
  fundName: "The firm or fund they represent. Leave blank for solo angels.",
  type: "How would you categorize this investor? Helps you spot portfolio gaps.",
  stageFocus: "What stages do they typically invest in? Check their recent deals.",
  femtechFit: "Be honest — 'Unknown' is fine. You'll refine this after conversations.",
  femtechFitTag: "A quick tag like 'invested in Elvie' or 'new to space' — just for your memory.",
  healthcareFocus: "Where in the healthcare value chain do they focus? Helps you tailor the pitch.",
  warmIntroSource: "Who can intro you? Use initials or shorthand if you prefer — this is just for you.",
  introPath: "Map the intro chain: e.g. 'Dr. K → Angel X → Fund Y'. Warm intros dramatically increase response rates.",
  firstContactDate: "When did you first reach out? Helps track momentum.",
  funnelStage: "Be precise here — it helps your kanban view stay honest.",
  checkSizeRange: "Typical range, e.g. '$50K–$150K'. Avoids awkward sizing conversations later.",
  geography: "Their time zone matters more than their address. 'US West' or 'EU' works fine.",
  clinicalFocus: "Which clinical areas align with your work? Multi-select what's relevant.",
  productType: "What product categories interest them? Helps match your offering.",
  evidenceStage: "Be honest here; investors sense exaggeration. At 'Pilot running', they'll look for early outcome signals, not perfect RCTs.",
  regulatoryStatus: "Your current regulatory pathway. Investors in medtech will ask about this early.",
  strategicInterest: "Who would they want you to sell to? Alignment here is a strong signal.",
  keyNotes: "If a detail feels too sensitive, summarize in your own shorthand. This tracker supports your memory, not surveillance.",
  founderNotes: "For your eyes only — vibes, red flags, gut feelings. No one else will ever see this.",
  nextAction: "What's the single most important next step with this investor?",
  nextActionDate: "When should you do it? Your follow-up view depends on this.",
  priority: "Trust your gut. High = active deal energy. Low = nurture for later.",
  isPractice: "Practice investors are lower-priority funds you can rehearse your pitch with first — a common fundraising strategy.",
};

export const EVIDENCE_FUNDRAISING_TIPS: Record<EvidenceStage, string> = {
  'Anecdotal': "Early — focus on the problem size and your unique insight. Investors want to see you deeply understand the patient.",
  'Pilot planned': "Show a clear study design and timeline. Investors want to know you're rigorous, even pre-data.",
  'Pilot running': "Share early outcome signals, not perfection. N=30 with clear trends beats waiting for N=300.",
  'Pilot completed': "Lead with outcomes. Quantify improvement: 'X% reduction in Y over Z weeks' is powerful.",
  'Published': "Strong position. Reference the publication early in your deck and connect it to market readiness.",
  'Regulatory submission': "Investors see de-risked regulatory path as a major value driver. Lead with timeline to clearance.",
};

export type ViewType = 'kanban' | 'follow-ups' | 'femtech-fit' | 'clinical' | 'warm-intros';

export const VIEW_INFO: Record<ViewType, { label: string; description: string }> = {
  'kanban': {
    label: 'Pipeline',
    description: 'Your full funnel at a glance — drag investors through stages as conversations progress.',
  },
  'follow-ups': {
    label: "This Week",
    description: "What needs your attention this week? Sorted by priority and next action date.",
  },
  'femtech-fit': {
    label: 'Femtech Fit',
    description: "Investors who get femtech. Start here when you're planning outreach.",
  },
  'clinical': {
    label: 'Clinical Lens',
    description: 'Grouped by evidence stage and regulatory status — for when you need to match investor expectations to your clinical story.',
  },
  'warm-intros': {
    label: 'Warm Intros',
    description: "Only investors you can reach through a warm connection. Cold outreach is separate.",
  },
};

export function createEmptyInvestor(): Investor {
  return {
    id: crypto.randomUUID(),
    investorName: '',
    fundName: '',
    type: 'Fund',
    stageFocus: ['Seed'],
    femtechFit: 'Unknown',
    femtechFitTag: '',
    healthcareFocus: 'Consumer',
    warmIntroSource: '',
    introPath: '',
    firstContactDate: '',
    funnelStage: 'Research',
    checkSizeRange: '',
    geography: '',
    clinicalFocus: [],
    productType: [],
    evidenceStage: 'Anecdotal',
    regulatoryStatus: 'Non-medical/wellness',
    strategicInterest: 'D2C only',
    keyNotes: '',
    founderNotes: '',
    nextAction: '',
    nextActionDate: '',
    priority: 'Medium',
    isPractice: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// Known women's health investors (curated, public info only)
export interface KnownInvestor {
  name: string;
  fund: string;
  focus: string;
  stages: string;
  url: string;
}

export const KNOWN_FEMTECH_INVESTORS: KnownInvestor[] = [
  { name: "Portfolia FemTech Fund", fund: "Portfolia", focus: "Fertility, maternal, menopause, sexual health", stages: "Seed–Series A", url: "https://www.portfolia.com" },
  { name: "Coyote Ventures", fund: "Coyote Ventures", focus: "Women's health, femtech, digital health", stages: "Pre-seed–Seed", url: "https://www.coyote.vc" },
  { name: "Amboy Street Ventures", fund: "Amboy Street", focus: "Women's health, consumer health", stages: "Pre-seed–Seed", url: "https://www.amboystreet.vc" },
  { name: "Rhia Ventures", fund: "Rhia Ventures", focus: "Reproductive & maternal health equity", stages: "Seed–Series A", url: "https://rhiaventures.org" },
  { name: "Avestria Venture Capital", fund: "Avestria VC", focus: "Women's health, longevity, underserved populations", stages: "Seed–Series A", url: "https://avestria.vc" },
  { name: "Goddess Gaia Ventures", fund: "Goddess Gaia", focus: "Female founders, femtech, wellness", stages: "Pre-seed–Seed", url: "https://www.goddessgaia.com" },
  { name: "True Wealth Ventures", fund: "True Wealth", focus: "Sustainability, women's health, female founders", stages: "Seed", url: "https://truewealthvc.com" },
  { name: "Forerunner Ventures", fund: "Forerunner", focus: "Consumer health, DTC health/wellness", stages: "Seed–Series B", url: "https://forerunnerventures.com" },
  { name: "Rock Health", fund: "Rock Health", focus: "Digital health, femtech thesis", stages: "Seed–Series A", url: "https://rockhealth.com" },
  { name: "7wireVentures", fund: "7wireVentures", focus: "Digital health, consumer-driven healthcare", stages: "Seed–Series B", url: "https://7wireventures.com" },
  { name: "Maveron", fund: "Maveron", focus: "Consumer health, wellness platforms", stages: "Seed–Series A", url: "https://maveron.com" },
  { name: "Female Founders Fund", fund: "Female Founders Fund", focus: "Female-led companies across health & tech", stages: "Pre-seed–Seed", url: "https://femalefoundersfund.com" },
];

// Export utilities
export function exportToJSON(investors: Investor[]): string {
  return JSON.stringify(investors, null, 2);
}

export function exportToCSV(investors: Investor[]): string {
  if (investors.length === 0) return '';
  const headers = [
    'Investor Name', 'Fund', 'Type', 'Priority', 'Funnel Stage',
    'Femtech Fit', 'Healthcare Focus', 'Clinical Focus', 'Evidence Stage',
    'Regulatory Status', 'Check Size', 'Geography', 'Warm Intro Source',
    'Intro Path', 'Next Action', 'Next Action Date', 'Key Notes'
  ];
  const rows = investors.map(inv => [
    inv.investorName, inv.fundName, inv.type, inv.priority, inv.funnelStage,
    inv.femtechFit, inv.healthcareFocus, inv.clinicalFocus.join('; '), inv.evidenceStage,
    inv.regulatoryStatus, inv.checkSizeRange, inv.geography, inv.warmIntroSource,
    inv.introPath, inv.nextAction, inv.nextActionDate, inv.keyNotes.replace(/"/g, '""')
  ].map(v => `"${v}"`).join(','));
  return [headers.join(','), ...rows].join('\n');
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
