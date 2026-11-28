import type { VisibleTabIdentity } from "../../lib/messaging/index.ts";

/** User-visible side-panel work that can own buttons, progress, or tab transition state. */
export type WorkflowStateType =
  | { readonly kind: "idle" }
  | { readonly kind: "loading-stored-snapshot"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "queued-initial-analysis"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "streaming-revisions"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "refreshing-observed-session"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "switching-tab"; readonly identity: VisibleTabIdentity }
  | { readonly kind: "stopped"; readonly identity: VisibleTabIdentity | null }
  | { readonly kind: "failed"; readonly identity: VisibleTabIdentity | null; readonly message: string };

/** Panel actions are busy only while user-visible commands own the current tab target. */
export function isWorkflowBusy(state: WorkflowStateType): boolean {
  return (
    state.kind === "loading-stored-snapshot" ||
    state.kind === "queued-initial-analysis" ||
    state.kind === "refreshing-observed-session" ||
    state.kind === "switching-tab"
  );
}
