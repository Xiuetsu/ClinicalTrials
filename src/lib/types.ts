export type Trial = {
  id: string;
  nctId: string;
  title: string;
  briefSummary?: string | null;
  status: string;
  phase?: string | null;
  conditions: string[];
  sponsor: string;
  ticker?: string | null;
  isMajorSponsor: boolean;
  startDate?: string | null;
  primaryCompletion?: string | null;
  completionDate?: string | null;
  enrollment?: number | null;
  compensation?: string | null;
  duration?: string | null;
  eligibilityAge?: string | null;
  eligibilityGender?: string | null;
  inclusionCriteria?: string | null;
  exclusionCriteria?: string | null;
  treatmentAlternatives?: string | null;
  riskBenefitSummary?: string | null;
  url: string;
  pdufaDate?: string | null;
  fastTrack: boolean;
  orphanDrug: boolean;
  historicalWinRate?: number | null;
  secFilingUrl?: string | null;
  earningsMention?: string | null;
  patentExpiration?: string | null;
  fdaWarning: boolean;
  competitorOverlaps?: string[] | null;
  pipelineHeatmap?: Record<string, unknown> | null;
  enrollmentBenchmark?: number | null;
  lastUpdated: string;
  locations: TrialLocation[];
};

export type TrialLocation = {
  id: string;
  trialId: string;
  city?: string | null;
  state?: string | null;
  country: string;
};

export type CalendarEvent = {
  id: string;
  nctId: string;
  title: string;
  phase?: string | null;
  sponsor: string;
  ticker?: string | null;
  primaryCompletion?: string | null;
  completionDate?: string | null;
};

export type WatchlistItem = {
  id: string;
  trialId: string;
  trial: Trial;
  addedAt: string;
  notes?: string | null;
};

export type TrialFilters = {
  query: string;
  statuses: string[];
  phases: string[];
  trialTypes: string[];
  ageGroups: string[];
  genders: string[];
  countries: string[];
  states: string[];
  cities: string[];
  investorMode: boolean;
};

export type SyncStatus = {
  lastSynced: string | null;
  syncing: boolean;
  offline: boolean;
};
