import { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist, exportTrials } from "../utils/api";
import { WatchlistItem } from "../lib/types";
import { useFilterStore } from "../state/filter-store";

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const filters = useFilterStore();

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getWatchlist();
      setItems(data);
    } catch (err) {
      console.error("Watchlist load failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleRemove = async (trialId: string) => {
    await removeFromWatchlist(trialId);
    refresh();
  };

  const handleExport = async (format: "csv" | "pdf") => {
    try {
      const filePath = await exportTrials(format, { ...filters, investorMode: true });
      window.alert(`Export created at ${filePath}`);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-primary">Watchlist</h2>
          <p className="text-sm text-slate-500 dark:text-slate-300">Track trials and receive desktop notifications on updates.</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleExport("csv")}
            className="rounded-md border border-primary/40 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => handleExport("pdf")}
            className="rounded-md border border-primary/40 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            Export PDF
          </button>
        </div>
      </header>
      {loading && <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-primary">Loading watchlist…</div>}
      <div className="grid gap-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-primary">{item.trial.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{item.trial.nctId}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(item.trialId)}
                className="rounded-md border border-red-400 px-2 py-1 text-xs font-semibold text-red-500 hover:bg-red-50 dark:border-red-500 dark:hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.trial.briefSummary}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Added {new Date(item.addedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
