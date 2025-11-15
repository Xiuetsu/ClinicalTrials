import { create } from "zustand";

const storageKey = "trialtracker.investorMode";

type ModeState = {
  investorMode: boolean;
  toggleInvestorMode: () => void;
  setInvestorMode: (value: boolean) => void;
};

export const useModeStore = create<ModeState>((set) => ({
  investorMode: (() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        return stored === "true";
      }
    } catch (error) {
      console.warn("Failed to read mode", error);
    }
    return false;
  })(),
  toggleInvestorMode: () =>
    set((state) => {
      const value = !state.investorMode;
      try {
        window.localStorage.setItem(storageKey, value ? "true" : "false");
      } catch (error) {
        console.warn("Unable to persist mode", error);
      }
      return { investorMode: value };
    }),
  setInvestorMode: (value) => {
    try {
      window.localStorage.setItem(storageKey, value ? "true" : "false");
    } catch (error) {
      console.warn("Unable to persist mode", error);
    }
    set({ investorMode: value });
  }
}));
