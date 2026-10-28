"use client";

import type { ReactNode } from "react";

export type BottomSheetProps = {
  children: ReactNode;
  /** Peek height when collapsed (CSS value) */
  peek?: string;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
  /** Space above fixed bottom nav (CSS value) */
  bottomOffset?: string;
};

/**
 * Map-first bottom sheet. Uses max-height (not transform) so taps work in Median / mobile WebViews.
 */
export function BottomSheet({
  children,
  peek = "11rem",
  expanded = false,
  onToggle,
  className = "",
  bottomOffset = "4.25rem",
}: BottomSheetProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 z-[1100] mx-auto max-w-lg ${className}`}
      style={{ bottom: bottomOffset }}
    >
      <div
        className="pointer-events-auto flex flex-col overflow-hidden rounded-t-3xl bg-white shadow-[0_-8px_30px_rgba(15,23,42,0.12)] transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: expanded
            ? "min(72dvh, calc(100dvh - 8rem))"
            : peek,
        }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-6 pt-2 touch-manipulation">
          {onToggle ? (
            <button
              type="button"
              className="mx-auto mb-2 flex w-full justify-center py-2"
              aria-label={expanded ? "Collapse sheet" : "Expand sheet"}
              onClick={onToggle}
            >
              <span className="h-1 w-10 rounded-full bg-slate-300" />
            </button>
          ) : (
            <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-slate-300" />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
