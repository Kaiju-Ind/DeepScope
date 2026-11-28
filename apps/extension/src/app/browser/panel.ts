import { defineProxy } from "comctx";

import { DEFAULT_AUTO_SCAN_ENABLED, getAutoScanEnabled, setAutoScanEnabled as persistAutoScanEnabled } from "../../lib/autostart/settings.ts";

import type { VisibleTabIdentity, BackgroundApi } from "../../lib/messaging/index.ts";
import { BACKGROUND_RPC_NAMESPACE, createBackgroundClientAdapter } from "../../lib/messaging/index.ts";

import { getStoredAnalysis, subscribeToSnapshotRevisions } from "./stored.ts";
import { browserDetectionPersistence } from "../../lib/persistence/index.ts";

import { getTabTarget, getWindowId, subscribeTabTargetChanges } from "./tabs.ts";

/** Browser capabilities captured by one mounted panel. */
export type Type = ReturnType<typeof create>;

/** Bind RPC lazily when the panel mounts, keeping module imports free from client construction. */
export function create() {
  const [, injectBackgroundApi] = defineProxy(() => ({}) as BackgroundApi, {
    namespace: BACKGROUND_RPC_NAMESPACE,
    heartbeatCheck: false,
    transfer: false,
  });

  const backgroundApi = injectBackgroundApi(
    createBackgroundClientAdapter("sidepanel", { href: globalThis.location?.href }),
  );
  return {
    backgroundApi,
    defaultAutoScanEnabled: DEFAULT_AUTO_SCAN_ENABLED,
    getAutoScanEnabled,
    /** Persist the chosen auto-scan preference through its existing settings owner; the panel retains reactive state. */
    persistAutoScanEnabled: (enabled: boolean) => persistAutoScanEnabled(enabled),
    /** Bind stored-result lookup to the concrete browser persistence adapter while callers retain the visible-tab identity. */
    getStoredAnalysis: (identity: VisibleTabIdentity) => getStoredAnalysis(identity, browserDetectionPersistence),
    /** Delegate deletion to the concrete browser store instead of exposing storage operations to panel state owners. */
    clearStoredDataFromBrowser: () => browserDetectionPersistence.clearStoredData(),
    subscribeToSnapshotRevisions,
    getTabTarget,
    getWindowId,
    subscribeTabTargetChanges,
  };
}
