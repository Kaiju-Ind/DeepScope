import type { AnalyzeVisibleTabInput } from "../../lib/messaging/index.ts";

import type { TabTarget } from "../browser/tabs.ts";

/** Panel commands own the visible target separately from mode and observation policy. */
export type AnalysisCommandInputType = Omit<AnalyzeVisibleTabInput, "target">;

/** Why the panel needs to resolve the browser's visible tab again. */
export type TabSyncReasonType = "initial" | "tab-change";

/** Identity resolution owns one browser lookup and its completion for commands awaiting that decision. */
export type VisibleTabLookup = {
  readonly reason: TabSyncReasonType;
  readonly requestedTarget: TabTarget | undefined;
  readonly completed: Promise<void>;
  readonly settle: () => void;
};
