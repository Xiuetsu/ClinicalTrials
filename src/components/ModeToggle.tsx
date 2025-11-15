import { useModeStore } from "../state/mode-store";

export default function ModeToggle() {
  const { investorMode, toggleInvestorMode } = useModeStore();

  return (
    <button
      type="button"
      onClick={toggleInvestorMode}
      className="flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary hover:bg-primary/20 dark:border-primary/50"
    >
      <span>{investorMode ? "Investor" : "Patient"} mode</span>
    </button>
  );
}
