import { BookmarkCheck, BookmarkPlus } from "lucide-react";

export default function WatchlistButton({
  watchlisted,
  onToggle
}: {
  watchlisted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold transition-colors ${
        watchlisted
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:border-emerald-300 dark:text-emerald-200"
          : "border-slate-200 text-slate-500 hover:border-emerald-500 hover:text-emerald-600"
      }`}
    >
      {watchlisted ? <BookmarkCheck className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
      {watchlisted ? "Saved" : "Save"}
    </button>
  );
}
