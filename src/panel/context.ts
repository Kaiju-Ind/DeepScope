import { createContext, useContext, type Accessor } from 'solid-js';

import type { DetectionEvidenceState, DetectionReplaySummary } from '@/lib/contracts/detection-session';
import type { AnalysisStatus, SiteAnalysis } from '@/lib/detection/types';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import type { VisibleTabIdentity } from '@/lib/messaging';
import {
	getPanelAnalysisActivity,
	groupDetectionsByPrimaryCategory,
	type PanelExplanationLookup,
	type PanelMatcherStatus,
	type PanelNotice,
	type PanelObservationMode,
} from '@/lib/panel/view-model';

/** Reactive state and commands shared by the side-panel pages. */
export type PanelContextType = {
	readonly status: AnalysisStatus;
	readonly busy: Accessor<boolean>;
	readonly liveUpdateMode: Accessor<PanelObservationMode>;
	readonly notice: Accessor<PanelNotice | null>;
	readonly errorMessage: Accessor<string>;
	readonly analysis: Accessor<SiteAnalysis | null>;
	readonly visibleTabIdentity: Accessor<VisibleTabIdentity | null>;
	readonly lateAddedIds: Accessor<string[]>;
	readonly explanationsByTechnologyId: Accessor<PanelExplanationLookup>;
	readonly matcherStatus: Accessor<PanelMatcherStatus>;
	readonly replayHistory: Accessor<readonly DetectionReplayTrace[]>;
	readonly latestReplaySummary: Accessor<DetectionReplaySummary | null>;
	readonly evidenceState: Accessor<DetectionEvidenceState | null>;
	readonly resultCount: Accessor<number>;
	readonly groupedResults: Accessor<ReturnType<typeof groupDetectionsByPrimaryCategory>>;
	readonly hasLateDetections: Accessor<boolean>;
	readonly liveUpdateChipLabel: Accessor<string>;
	readonly evidenceCompletenessLabel: Accessor<string>;
	readonly analysisActivity: Accessor<ReturnType<typeof getPanelAnalysisActivity>>;
	readonly autoScanEnabled: Accessor<boolean>;
	readonly autoScanSettingInFlight: Accessor<boolean>;
	readonly clearStoredDataInFlight: Accessor<boolean>;
	readonly refresh: () => Promise<void>;
	readonly stopObservation: () => Promise<void>;
	readonly setAutoScanEnabled: (enabled: boolean) => Promise<void>;
	readonly clearStoredData: () => Promise<void>;
};


/** State and commands required by the scan summary page. */
export type ScansPageType = Pick<
	PanelContextType,
	| 'status'
	| 'busy'
	| 'liveUpdateMode'
	| 'notice'
	| 'errorMessage'
	| 'analysis'
	| 'visibleTabIdentity'
	| 'resultCount'
	| 'liveUpdateChipLabel'
	| 'evidenceCompletenessLabel'
	| 'analysisActivity'
	| 'refresh'
	| 'stopObservation'
>;

/** State and commands required by the settings page. */
export type SettingsPageType = Pick<
	PanelContextType,
	| 'autoScanEnabled'
	| 'autoScanSettingInFlight'
	| 'clearStoredDataInFlight'
	| 'setAutoScanEnabled'
	| 'clearStoredData'
>;

/** State required by the technology result page. */
export type TechnologiesPageType = Pick<
	PanelContextType,
	| 'analysis'
	| 'liveUpdateMode'
	| 'lateAddedIds'
	| 'explanationsByTechnologyId'
	| 'matcherStatus'
	| 'replayHistory'
	| 'latestReplaySummary'
	| 'groupedResults'
	| 'hasLateDetections'
	| 'analysisActivity'
>;

export const PanelContext = createContext<PanelContextType>();

/** Return the side-panel state owner installed above every routed page. */
export function usePanel(): PanelContextType {
	const context = useContext(PanelContext);
	if (!context) {
		throw new Error('usePanel must be called inside <PanelProvider>.');
	}

	return context;
}

/** Return only the state and commands used by the scan page. */
export function useScans(): ScansPageType {
	return usePanel();
}

/** Return only the state and commands used by the settings page. */
export function useSettings(): SettingsPageType {
	return usePanel();
}

/** Return only the state used by the technology result page. */
export function useTechnologies(): TechnologiesPageType {
	return usePanel();
}
