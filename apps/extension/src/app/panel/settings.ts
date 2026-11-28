import { normalizeError } from './logging.ts';
import type { Type as State } from './state.ts';
import type { Type as Browser } from '../browser/panel.ts';
import type { Type as Snapshots } from './snapshots.ts';

/** Explicit state accessors, browser capabilities and peer operations used by this owner. */
export interface Dependencies {
  readonly state: Pick<State, 'setStatus' | 'setNotice' | 'setErrorMessage' | 'setAnalysis' | 'setLateAddedIds' | 'setExplanationsByTechnologyId' | 'setReplayHistory' | 'setLatestReplaySummary' | 'setEvidenceState' | 'setClearStoredDataInFlight' | 'setAutoScanEnabled' | 'autoScanSettingInFlight' | 'setAutoScanSettingInFlight' | 'setVisibleDetectorSnapshotRevision' | 'isDisposed'>;
  readonly browser: Pick<Browser, 'backgroundApi' | 'persistAutoScanEnabled' | 'clearStoredDataFromBrowser'>;
  readonly resetLifecycleSnapshot: Snapshots['resetLifecycleSnapshot'];
}

/** Panel operations with state retained only for the mounted provider lifetime. */
export interface Type {
  readonly refreshStatus: () => Promise<void>;
  readonly setAutoScan: (enabled: boolean) => Promise<void>;
  readonly clearStoredData: () => Promise<void>;
}

/** Create the panel's settings owner without starting asynchronous work. */
export function create(dependencies: Dependencies): Type {
  const { setStatus, setNotice, setErrorMessage, setAnalysis, setLateAddedIds, setExplanationsByTechnologyId, setReplayHistory, setLatestReplaySummary, setEvidenceState, setClearStoredDataInFlight, setAutoScanEnabled, autoScanSettingInFlight, setAutoScanSettingInFlight, setVisibleDetectorSnapshotRevision, isDisposed } = dependencies.state;

  const { backgroundApi, persistAutoScanEnabled, clearStoredDataFromBrowser } = dependencies.browser;

  const { resetLifecycleSnapshot } = dependencies;

  /** Refresh durable analysis counters shown by the panel chrome. */
  async function refreshStatus() {
    try {
      const response = await backgroundApi.getAnalysisStatus();
      if (isDisposed()) return;
      if (response.ok) {
        setStatus(response.value);
      }
    } catch (error) {
      if (!isDisposed()) setErrorMessage(normalizeError(error));
    }
  }

  /** Persist the automatic-inspection setting and update local UI state. */
  async function setAutoScan(enabled: boolean): Promise<void> {
    if (autoScanSettingInFlight()) {
      return;
    }

    setAutoScanSettingInFlight(true);
    try {
      await persistAutoScanEnabled(enabled);
      setAutoScanEnabled(enabled);
      setNotice({
        variant: "success",
        text: enabled
          ? "Automatic scanning is on. New active pages will scan as soon as they finish loading."
          : "Automatic scanning is off. You can still scan manually from this panel.",
      });
    } catch (error) {
      setErrorMessage(normalizeError(error));
    } finally {
      setAutoScanSettingInFlight(false);
    }
  }

  /** Clear retained detector data while preserving unrelated extension settings. */
  async function clearStoredData() {
    setClearStoredDataInFlight(true);
    setErrorMessage("");
    setNotice(null);
    try {
      const removedCount = await clearStoredDataFromBrowser();
      setAnalysis(null);
      setVisibleDetectorSnapshotRevision(null);
      resetLifecycleSnapshot();
      setReplayHistory([]);
      setLatestReplaySummary(null);
      setEvidenceState(null);
      setExplanationsByTechnologyId({});
      setLateAddedIds([]);
      await refreshStatus();
      setNotice({
        variant: "success",
        text: removedCount === 0
          ? "No stored detector data was found."
          : `Cleared ${removedCount} stored detector record${removedCount === 1 ? "" : "s"}.`,
      });
    } catch (error) {
      setErrorMessage(normalizeError(error));
    } finally {
      setClearStoredDataInFlight(false);
    }
  }

  return { refreshStatus, setAutoScan, clearStoredData };
}
