import { useCallback, useEffect, useMemo, useState } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import SearchBar from "../components/SearchBar";
import FiltersPanel from "../components/FiltersPanel";
import TrialCard from "../components/TrialCard";
import { getTrials, addToWatchlist, removeFromWatchlist, getWatchlist } from "../utils/api";
import { Trial } from "../lib/types";
import { useFilterStore } from "../state/filter-store";

export default function DashboardPage() {
  const filters = useFilterStore((state) => ({
    query: state.query,
    statuses: state.statuses,
    phases: state.phases,
    trialTypes: state.trialTypes,
    ageGroups: state.ageGroups,
    genders: state.genders,
    countries: state.countries,
    states: state.states,
    cities: state.cities,
    investorMode: state.investorMode
  }));
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [watchlistIds, setWatchlistIds] = useState<Set<string>>(new Set());

  const refreshTrials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTrials(filters);
      setTrials(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load trials while offline. Reconnect or import data.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    refreshTrials();
  }, [refreshTrials]);

  useEffect(() => {
    getWatchlist()
      .then((items) => setWatchlistIds(new Set(items.map((item) => item.trialId))))
      .catch((err) => console.warn("Watchlist fetch failed", err));
  }, []);

  const handleToggleWatchlist = useCallback(
    async (trial: Trial) => {
      const isSaved = watchlistIds.has(trial.id);
      try {
        if (isSaved) {
          await removeFromWatchlist(trial.id);
          setWatchlistIds((prev) => {
            const next = new Set(prev);
            next.delete(trial.id);
            return next;
          });
        } else {
          await addToWatchlist(trial.id);
          setWatchlistIds((prev) => new Set(prev).add(trial.id));
        }
      } catch (err) {
        console.error("Watchlist toggle failed", err);
      }
    },
    [watchlistIds]
  );

  const handleCopySummary = (trial: Trial) => {
    const summary = `${trial.title}\n${trial.nctId}\n${trial.briefSummary ?? ""}`;
    navigator.clipboard.writeText(summary).catch((err) => console.warn("Copy failed", err));
  };

  const Row = useMemo(
    () =>
      ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const trial = trials[index];
        return (
          <div style={style} className="px-2 py-2">
            <TrialCard
              trial={trial}
              watchlisted={watchlistIds.has(trial.id)}
              onToggleWatchlist={() => handleToggleWatchlist(trial)}
              onCopySummary={() => handleCopySummary(trial)}
            />
          </div>
        );
      },
    [handleToggleWatchlist, trials, watchlistIds]
  );

  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        <SearchBar />
        {loading && <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-primary">Loading trials…</div>}
        {error && <div className="rounded-lg border border-amber-400 bg-amber-50 p-4 text-sm text-amber-700">{error}</div>}
        <div className="h-[calc(100vh-260px)] min-h-[400px] overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/40">
          <AutoSizer>
            {({ height, width }) => (
              <List height={height} width={width} itemCount={trials.length} itemSize={360} overscanCount={2}>
                {Row}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
      <FiltersPanel />
    </div>
  );
}
