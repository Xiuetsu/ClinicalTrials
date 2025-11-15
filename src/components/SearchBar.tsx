import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useFilterStore } from "../state/filter-store";
import { useModeStore } from "../state/mode-store";

export default function SearchBar() {
  const { query, setFilters } = useFilterStore((state) => ({
    query: state.query,
    setFilters: state.setFilters
  }));
  const { investorMode } = useModeStore();
  const [value, setValue] = useState(query);

  useEffect(() => {
    const id = window.setTimeout(() => setFilters({ query: value }), 300);
    return () => window.clearTimeout(id);
  }, [value, setFilters]);

  useEffect(() => {
    setFilters({ investorMode });
  }, [investorMode, setFilters]);

  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <Search className="h-5 w-5 text-primary" />
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search conditions, locations, sponsors, or NCT IDs"
        className="flex-1 bg-transparent text-base outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
