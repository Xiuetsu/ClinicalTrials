import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { Trial, TrialFilters, WatchlistItem, CalendarEvent, SyncStatus } from "../lib/types";

export async function getTrials(filters: TrialFilters): Promise<Trial[]> {
  return invoke<Trial[]>("get_trials", { filters });
}

export async function getTrial(id: string): Promise<Trial> {
  return invoke<Trial>("get_trial", { id });
}

export async function getCalendarEvents(monthIso: string): Promise<CalendarEvent[]> {
  return invoke<CalendarEvent[]>("get_calendar_events", { monthIso });
}

export async function getWatchlist(): Promise<WatchlistItem[]> {
  return invoke<WatchlistItem[]>("get_watchlist", {});
}

export async function addToWatchlist(trialId: string, notes?: string) {
  return invoke("add_watchlist", { trialId, notes });
}

export async function removeFromWatchlist(trialId: string) {
  return invoke("remove_watchlist", { trialId });
}

export async function exportTrials(format: "csv" | "pdf", filters: TrialFilters) {
  return invoke<string>("export_trials", { format, filters });
}

export async function syncNow() {
  return invoke("sync_now");
}

export async function getSyncStatus(): Promise<SyncStatus> {
  return invoke<SyncStatus>("get_sync_status");
}

export async function listenForNotifications(callback: (payload: unknown) => void) {
  return listen("trialtracker://notification", (event) => callback(event.payload));
}
