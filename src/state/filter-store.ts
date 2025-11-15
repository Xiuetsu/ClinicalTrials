import { create } from "zustand";
import { TrialFilters } from "../lib/types";

const defaultFilters: TrialFilters = {
  query: "",
  statuses: [],
  phases: [],
  trialTypes: [],
  ageGroups: [],
  genders: [],
  countries: [],
  states: [],
  cities: [],
  investorMode: false
};

type FilterState = TrialFilters & {
  setFilters: (filters: Partial<TrialFilters>) => void;
  reset: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  ...defaultFilters,
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  reset: () => set(defaultFilters)
}));
