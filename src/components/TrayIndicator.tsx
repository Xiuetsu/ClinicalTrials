import { useEffect } from "react";
import { getSyncStatus } from "../utils/api";
import { invoke } from "@tauri-apps/api/core";

export default function TrayIndicator() {
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      try {
        const status = await getSyncStatus();
        if (!mounted) return;
        await invoke("update_tray", { lastSynced: status.lastSynced });
      } catch (error) {
        console.warn("Tray update failed", error);
      }
    };
    update();
    const interval = window.setInterval(update, 60000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  return null;
}
