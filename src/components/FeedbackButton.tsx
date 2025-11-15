import { MessageSquare } from "lucide-react";

export default function FeedbackButton() {
  const openFeedback = () => {
    window.open("mailto:feedback@trialtracker.app?subject=TrialTracker%20Feedback", "_blank");
  };

  return (
    <button
      type="button"
      onClick={openFeedback}
      className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      <MessageSquare className="h-3 w-3" /> Feedback
    </button>
  );
}
