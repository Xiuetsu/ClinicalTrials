import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { useModeStore } from "./state/mode-store";
import { useTheme } from "./providers/theme-provider";
import ModeToggle from "./components/ModeToggle";
import InvestorBadge from "./components/InvestorBadge";
import SyncStatusBanner from "./components/SyncStatusBanner";
import FeedbackButton from "./components/FeedbackButton";
import TutorialDialog from "./components/TutorialDialog";
import TrayIndicator from "./components/TrayIndicator";
import { listenForNotifications } from "./utils/api";

const navLinks = [
  { to: "/", label: "Browse" },
  { to: "/calendar", label: "Calendar" },
  { to: "/watchlist", label: "Watchlist" }
];

export default function App() {
  const location = useLocation();
  const { investorMode } = useModeStore();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const unlistenPromise = listenForNotifications((payload) => {
      console.debug("Notification event", payload);
    });
    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  return (
    <div className={clsx("min-h-screen bg-slate-100 text-slate-900 transition-colors", theme === "dark" && "bg-slate-950 text-slate-200")}> 
      <TutorialDialog />
      <TrayIndicator />
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-4 px-6 py-4">
        <header className="flex flex-col gap-4 rounded-xl bg-white/70 p-4 shadow-lg backdrop-blur dark:bg-slate-900/70">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-primary">TrialTracker</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Offline-first clinical trial explorer with investor intelligence.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <button
                type="button"
                onClick={toggleTheme}
                className="rounded-md border border-slate-200 px-3 py-1 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                {theme === "dark" ? "Light" : "Dark"} mode
              </button>
            </div>
          </div>
          <nav className="flex gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={clsx(
                  "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-primary text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                )}
              >
                {link.label}
              </Link>
            ))}
            {investorMode && <InvestorBadge />}
          </nav>
          <SyncStatusBanner />
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="flex items-center justify-between pb-4 text-xs text-slate-500 dark:text-slate-400">
          <span>© {new Date().getFullYear()} TrialTracker. Data courtesy of ClinicalTrials.gov.</span>
          <FeedbackButton />
        </footer>
      </div>
    </div>
  );
}
