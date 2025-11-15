import { useEffect, useMemo, useState } from "react";
import Calendar from "react-calendar";
import { format, startOfMonth } from "date-fns";
import { getCalendarEvents } from "../utils/api";
import { CalendarEvent } from "../lib/types";
import { useModeStore } from "../state/mode-store";

export default function CalendarPage() {
  const [value, setValue] = useState<Date>(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { investorMode } = useModeStore();

  useEffect(() => {
    const monthIso = startOfMonth(value).toISOString();
    getCalendarEvents(monthIso)
      .then(setEvents)
      .catch((err) => console.warn("Calendar fetch failed", err));
  }, [value]);

  const grouped = useMemo(() => {
    return events.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
      const key = event.primaryCompletion ?? event.completionDate ?? "unknown";
      if (!acc[key]) acc[key] = [];
      acc[key].push(event);
      return acc;
    }, {});
  }, [events]);

  return (
    <div className="grid gap-6 md:grid-cols-[360px_1fr]">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Calendar value={value} onChange={(date) => setValue(date as Date)} className="w-full" tileContent={({ date }) => {
          const iso = date.toISOString().split("T")[0];
          const hasEvent = events.some((event) => {
            const eventDate = (event.primaryCompletion ?? event.completionDate ?? "").split("T")[0];
            return eventDate === iso;
          });
          return hasEvent ? <span className="mt-1 block h-1 w-1 rounded-full bg-primary"></span> : null;
        }} />
      </div>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-primary">Milestones for {format(value, "MMMM yyyy")}</h2>
        <div className="space-y-3">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {date === "unknown" ? "To be announced" : format(new Date(date), "PPP")}
              </h3>
              <ul className="mt-2 space-y-2 text-xs text-slate-500 dark:text-slate-300">
                {items.map((item) => (
                  <li key={item.id} className="rounded-md border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary">{item.title}</p>
                        <p>{item.nctId}</p>
                      </div>
                      {investorMode && item.ticker && (
                        <a
                          href={`https://finance.yahoo.com/quote/${item.ticker}`}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md border border-amber-500 px-2 py-1 text-xs text-amber-700"
                        >
                          {item.ticker}
                        </a>
                      )}
                    </div>
                    <p className="mt-2 text-xs">
                      Phase {item.phase ?? "N/A"} milestone • Sponsor: {item.sponsor}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
