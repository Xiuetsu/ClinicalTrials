import { useEffect, useState } from "react";
import { X } from "lucide-react";

const storageKey = "trialtracker.tutorial.dismissed";

export default function TutorialDialog() {
  const [open, setOpen] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(storageKey) !== "true";
    } catch (error) {
      console.warn("Unable to read tutorial state", error);
      return true;
    }
  });

  useEffect(() => {
    if (!open) {
      try {
        window.localStorage.setItem(storageKey, "true");
      } catch (error) {
        console.warn("Unable to persist tutorial state", error);
      }
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur">
      <div className="max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Welcome to TrialTracker</h2>
          <button type="button" onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        <ol className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Search</strong> by condition, location, or sponsor with patient-friendly filters.</li>
          <li>Toggle <strong>Investor mode</strong> to unlock catalysts, tickers, and financial context.</li>
          <li><strong>Sync</strong> data when online; offline browsing uses your secure local database.</li>
          <li>Pin trials to your <strong>watchlist</strong> to receive desktop notifications on updates.</li>
          <li>Explore the <strong>calendar</strong> for upcoming milestones and PDUFA dates.</li>
        </ol>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow hover:bg-primary/90"
          >
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
}
