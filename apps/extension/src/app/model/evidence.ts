import type { DetectionEvidenceState } from "../../lib/storage/session.ts";

/** Convert evidence progress into the compact Summary label. */
export function formatCompleteness(state: DetectionEvidenceState | null): string {
  if (!state) return "unknown";

  if (state.level === "full") return "complete";
  if (state.level === "enriched") return state.complete ? "enriched" : "enriching";
  if (state.level === "incremental") return "incremental";
  if (state.level === "initial") return state.complete ? "initial complete" : "initial";
  if (state.level === "recovered-initial") return "recovered initial";
  return "unknown";
}
