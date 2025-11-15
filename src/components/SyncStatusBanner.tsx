import { useEffect, useState } from "react";
import { CloudOff, RefreshCcw } from "lucide-react";
import { getSyncStatus, syncNow } from "../utils/api";
import { SyncStatus } from "../lib/types";

export default function SyncStatusBanner() {
  const [status, setStatus] = useState<SyncStatus>({ lastSynced: null, offline: false, syncing: false });

  const refresh = async () => {
    setStatus((prev) => ({ ...prev, syncing: true }));
    try {
      await syncNow();
      const next = await getSyncStatus();
      setStatus(next);
    } catch (error) {
      console.error("Sync error", error);
      setStatus((prev) => ({ ...prev, offline: true, syncing: false }));
    }
  };

  useEffect(() => {
    getSyncStatus().then(setStatus).catch(() => setStatus((prev) => ({ ...prev, offline: true })));
  }, []);

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
      <div className="flex items-center gap-2">
        {status.offline && <CloudOff className="h-4 w-4 text-amber-500" />}
        <span>
          Last synced: {status.lastSynced ? new Date(status.lastSynced).toLocaleString() : "never"}
          {status.offline ? " · Offline" : ""}
        </span>
      </div>
      <button
        type="button"
        onClick={refresh}
        className="flex items-center gap-1 rounded-md border border-primary/40 px-2 py-1 text-xs font-semibold text-primary hover:bg-primary/10 disabled:opacity-50"
        disabled={status.syncing}
      >
        <RefreshCcw className="h-3 w-3" /> {status.syncing ? "Syncing" : "Refresh now"}
      </button>
    </div>
  );
}
