import { useState } from "react";
import { ChevronLeft, Filter } from "lucide-react";
import { useFilterStore } from "../state/filter-store";

const STATUS_OPTIONS = [
  "Recruiting",
  "Active, not recruiting",
  "Not yet recruiting",
  "Completed",
  "Terminated",
  "Suspended",
  "Withdrawn"
];

const PHASE_OPTIONS = ["Phase 1", "Phase 2", "Phase 3", "Phase 4"];
const TYPE_OPTIONS = ["Interventional", "Observational"];
const AGE_OPTIONS = ["Adult", "Child", "Older Adult"];
const GENDER_OPTIONS = ["All", "Female", "Male"];

function ToggleChip({
  label,
  active,
  onClick
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-slate-200 text-slate-500 hover:border-primary/60 hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export default function FiltersPanel() {
  const [open, setOpen] = useState(true);
  const filters = useFilterStore();

  const toggleValue = (field: "statuses" | "phases" | "trialTypes" | "ageGroups" | "genders", value: string) => {
    const current = filters[field];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    filters.setFilters({ [field]: next });
  };

  return (
    <aside className={`flex w-72 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900 ${open ? "" : "translate-x-[260px]"}`}>
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-200">
          <Filter className="h-4 w-4" /> Filters
        </div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${open ? "" : "rotate-180"}`} />
        </button>
      </header>
      {open && (
        <div className="flex flex-col gap-6 overflow-y-auto pr-2 text-xs text-slate-600 dark:text-slate-300">
          <section className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Status</h3>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={filters.statuses.includes(option)}
                  onClick={() => toggleValue("statuses", option)}
                />
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Phase</h3>
            <div className="flex flex-wrap gap-2">
              {PHASE_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={filters.phases.includes(option)}
                  onClick={() => toggleValue("phases", option)}
                />
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Trial Type</h3>
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={filters.trialTypes.includes(option)}
                  onClick={() => toggleValue("trialTypes", option)}
                />
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Age</h3>
            <div className="flex flex-wrap gap-2">
              {AGE_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={filters.ageGroups.includes(option)}
                  onClick={() => toggleValue("ageGroups", option)}
                />
              ))}
            </div>
          </section>
          <section className="space-y-2">
            <h3 className="font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {GENDER_OPTIONS.map((option) => (
                <ToggleChip
                  key={option}
                  label={option}
                  active={filters.genders.includes(option)}
                  onClick={() => toggleValue("genders", option)}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </aside>
  );
}
