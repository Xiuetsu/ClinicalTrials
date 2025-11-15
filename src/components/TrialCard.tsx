import { ExternalLink, Globe, Layers, ListCollapse, Share2, Sparkles } from "lucide-react";
import WatchlistButton from "./WatchlistButton";
import { Trial } from "../lib/types";
import { useModeStore } from "../state/mode-store";
import { getSponsorMetadata } from "../utils/sponsors";

export default function TrialCard({
  trial,
  watchlisted,
  onToggleWatchlist,
  onCopySummary
}: {
  trial: Trial;
  watchlisted: boolean;
  onToggleWatchlist: () => void;
  onCopySummary: () => void;
}) {
  const { investorMode } = useModeStore();
  const sponsorMeta = getSponsorMetadata(trial.sponsor);

  const openLink = (url: string) => window.open(url, "_blank", "noopener");

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-primary">{trial.title}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{trial.nctId}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopySummary}
              className="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Share2 className="h-3 w-3" /> Copy summary
            </button>
            <WatchlistButton watchlisted={watchlisted} onToggle={onToggleWatchlist} />
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
          <span>{trial.status}</span>
          {trial.phase && <span>• {trial.phase}</span>}
          <span>• {trial.conditions.join(", ")}</span>
          {trial.enrollment && <span>• Enrollment: {trial.enrollment.toLocaleString()}</span>}
          {trial.compensation && <span>• Compensation: {trial.compensation}</span>}
          {trial.duration && <span>• Duration: {trial.duration}</span>}
        </div>
      </header>
      <section className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <p>{trial.briefSummary ?? "No summary available."}</p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Eligibility
            </h3>
            <p>Age: {trial.eligibilityAge ?? "Not specified"}</p>
            <p>Gender: {trial.eligibilityGender ?? "All"}</p>
            {trial.inclusionCriteria && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-semibold text-primary">Inclusion criteria</summary>
                <p className="whitespace-pre-wrap text-xs text-slate-500 dark:text-slate-400">{trial.inclusionCriteria}</p>
              </details>
            )}
            {trial.exclusionCriteria && (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs font-semibold text-primary">Exclusion criteria</summary>
                <p className="whitespace-pre-wrap text-xs text-slate-500 dark:text-slate-400">{trial.exclusionCriteria}</p>
              </details>
            )}
          </div>
          {trial.treatmentAlternatives && (
            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
              <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Treatment alternatives
              </h3>
              <p className="text-xs">{trial.treatmentAlternatives}</p>
            </div>
          )}
        </div>
        <div className="space-y-3 text-xs text-slate-500 dark:text-slate-300">
          <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Globe className="h-4 w-4" /> Locations
            </h3>
            <ul className="space-y-1">
              {trial.locations.map((location) => (
                <li key={location.id}>
                  {[location.city, location.state, location.country].filter(Boolean).join(", ")}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
              <Layers className="h-4 w-4" /> Similar trials
            </h3>
            <p>
              Powered by local similarity search. Refresh data to get updated recommendations based on condition overlap and
              sponsor portfolio trends.
            </p>
          </div>
          {trial.riskBenefitSummary && (
            <div className="rounded-lg border border-slate-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-800/60">
              <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
                <ListCollapse className="h-4 w-4" /> Risk & benefit
              </h3>
              <p>{trial.riskBenefitSummary}</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => openLink(trial.url)}
            className="flex items-center gap-2 rounded-md border border-primary/40 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10"
          >
            <ExternalLink className="h-4 w-4" /> View on ClinicalTrials.gov
          </button>
        </div>
      </section>
      {investorMode && (
        <section className="grid gap-4 rounded-xl border border-amber-400 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-500 dark:bg-amber-900/30 dark:text-amber-100">
          <header className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="h-4 w-4" /> Investor insights
          </header>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <strong>Sponsor:</strong> {sponsorMeta.name} {sponsorMeta.ticker && `(${sponsorMeta.ticker})`}
            </div>
            {trial.primaryCompletion && <div><strong>Catalyst:</strong> Primary completion {new Date(trial.primaryCompletion).toLocaleDateString()}</div>}
            {trial.pdufaDate && <div><strong>PDUFA:</strong> {new Date(trial.pdufaDate).toLocaleDateString()}</div>}
            <div><strong>Impact score:</strong> {trial.phase === "Phase 3" ? "High" : trial.phase === "Phase 2" ? "Medium" : "Exploratory"}</div>
            {trial.historicalWinRate != null && (
              <div><strong>Historical win rate:</strong> {(trial.historicalWinRate * 100).toFixed(1)}%</div>
            )}
            {trial.enrollmentBenchmark != null && (
              <div><strong>Peer benchmark:</strong> {trial.enrollmentBenchmark.toFixed(1)}x enrollment velocity</div>
            )}
            {trial.fastTrack && <div>FDA Fast Track</div>}
            {trial.orphanDrug && <div>Orphan drug designation</div>}
            {trial.fdaWarning && <div>FDA warnings present</div>}
          </div>
          <div className="flex flex-wrap gap-2">
            {sponsorMeta.ticker && (
              <button type="button" onClick={() => openLink(`https://finance.yahoo.com/quote/${sponsorMeta.ticker}`)} className="rounded-md border border-amber-500 px-2 py-1 text-xs">
                Yahoo Finance
              </button>
            )}
            {trial.secFilingUrl && (
              <button type="button" onClick={() => openLink(trial.secFilingUrl)} className="rounded-md border border-amber-500 px-2 py-1 text-xs">
                SEC filings
              </button>
            )}
            {trial.earningsMention && (
              <button type="button" onClick={() => openLink(trial.earningsMention)} className="rounded-md border border-amber-500 px-2 py-1 text-xs">
                Earnings search
              </button>
            )}
            {trial.patentExpiration && (
              <button type="button" onClick={() => openLink(trial.patentExpiration)} className="rounded-md border border-amber-500 px-2 py-1 text-xs">
                Patent details
              </button>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
