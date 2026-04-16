import { Button } from "@/components/ui/button";
import { TABS, type TabId } from "../config";

export function OnboardFooter({
  currentIndex,
  activeTab,
  tabErrorCounts,
  isSubmitting,
  onTabChange,
}: {
  currentIndex: number;
  activeTab: TabId;
  tabErrorCounts: Record<TabId, number>;
  isSubmitting: boolean;
  onTabChange: (id: TabId) => void;
}) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-2xl border border-border/60 bg-card px-3 py-3 shadow-sm sm:px-6 sm:py-4">
      {/* Prev / Next */}
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl text-[12px] font-semibold"
          disabled={currentIndex === 0}
          onClick={() => onTabChange(TABS[currentIndex - 1].id)}
        >
          ← Prev
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl text-[12px] font-semibold"
          disabled={currentIndex === TABS.length - 1}
          onClick={() => onTabChange(TABS[currentIndex + 1].id)}
        >
          Next →
        </Button>
      </div>

      {/* Pill dots */}
      <div className="hidden items-center gap-1.5 sm:flex">
        {TABS.map((tab) => {
          const hasErr = tabErrorCounts[tab.id] > 0;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              aria-label={`Go to ${tab.label}`}
              className="rounded-full transition-all duration-300"
              style={{
                height: "8px",
                width: isActive ? "24px" : "8px",
                background: hasErr ? "#f43f5e" : isActive ? tab.accent : "#d1d5db",
              }}
            />
          );
        })}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 text-[12px] font-semibold text-white shadow-md hover:from-violet-700 hover:to-indigo-700 disabled:opacity-60 sm:px-7 sm:text-[13px]"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10"
                stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            Submitting…
          </span>
        ) : "Onboard"}
      </Button>
    </div>
  );
}
