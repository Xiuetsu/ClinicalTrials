import { ShieldCheck, TrendingUp } from "lucide-react";

export default function InvestorBadge() {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800 dark:border-amber-500 dark:bg-amber-900/40 dark:text-amber-200">
      <TrendingUp className="h-4 w-4" /> Investor mode
      <ShieldCheck className="h-4 w-4" />
    </div>
  );
}
