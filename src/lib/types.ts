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
  nextAction: string;
  nextActionDate: string;
  priority: Priority;
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
  firstContactDate: "When did you first reach out? Helps track momentum.",
  funnelStage: "Be precise here — it helps your kanban view stay honest.",
  checkSizeRange: "Typical range, e.g. '$50K–$150K'. Avoids awkward sizing conversations later.",
  geography: "Their time zone matters more than their address. 'US West' or 'EU' works fine.",
  clinicalFocus: "Which clinical areas align with your work? Multi-select what's relevant.",
  productType: "What product categories interest them? Helps match your offering.",
  evidenceStage: "Be honest here; investors sense exaggeration on evidence stage, and this is just for you.",
  regulatoryStatus: "Your current regulatory pathway. Investors in medtech will ask about this early.",
  strategicInterest: "Who would they want you to sell to? Alignment here is a strong signal.",
  keyNotes: "If a detail feels too sensitive, summarize in your own shorthand. This tracker supports your memory, not surveillance.",
  nextAction: "What's the single most important next step with this investor?",
  nextActionDate: "When should you do it? Your follow-up view depends on this.",
  priority: "Trust your gut. High = active deal energy. Low = nurture for later.",
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
    nextAction: '',
    nextActionDate: '',
    priority: 'Medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
