import { createContext, useContext, type Accessor } from 'solid-js';

import type { DetectionEvidenceState, DetectionReplaySummary } from '@/lib/storage/session';
import type { AnalysisStatus, SiteAnalysis } from '@/lib/detection/types';
import type { DetectionReplayTrace } from '@/lib/pipeline';
import type { VisibleTabIdentity } from '@/lib/messaging';
import {
	getAnalysisActivity,
	groupDetectionsByPrimaryCategory,
	type ExplanationLookup,
	type MatcherStatus,
	type Notice,
	type ObservationMode,
} from '@/app/model';

/** Reactive state and commands shared by the side-panel pages. */
export type PanelContextType = {
	readonly status: AnalysisStatus;
	readonly busy: Accessor<boolean>;
	readonly liveUpdateMode: Accessor<ObservationMode>;
	readonly notice: Accessor<Notice | null>;
	readonly errorMessage: Accessor<string>;
	readonly analysis: Accessor<SiteAnalysis | null>;
	readonly visibleTabIdentity: Accessor<VisibleTabIdentity | null>;
	readonly lateAddedIds: Accessor<string[]>;
	readonly explanationsByTechnologyId: Accessor<ExplanationLookup>;
	readonly matcherStatus: Accessor<MatcherStatus>;
	readonly replayHistory: Accessor<readonly DetectionReplayTrace[]>;
	readonly latestReplaySummary: Accessor<DetectionReplaySummary | null>;
	readonly evidenceState: Accessor<DetectionEvidenceState | null>;
	readonly resultCount: Accessor<number>;
	readonly groupedResults: Accessor<ReturnType<typeof groupDetectionsByPrimaryCategory>>;
	readonly hasLateDetections: Accessor<boolean>;
	readonly liveUpdateChipLabel: Accessor<string>;
	readonly evidenceCompletenessLabel: Accessor<string>;
	readonly analysisActivity: Accessor<ReturnType<typeof getAnalysisActivity>>;
	readonly autoScanEnabled: Accessor<boolean>;
	readonly autoScanSettingInFlight: Accessor<boolean>;
	readonly clearStoredDataInFlight: Accessor<boolean>;
	readonly refresh: () => Promise<void>;
	readonly stopObservation: () => Promise<void>;
	readonly setAutoScanEnabled: (enabled: boolean) => Promise<void>;
	readonly clearStoredData: () => Promise<void>;
};


/** State and commands required by the default findings summary. */
export type SummaryPageType = Pick<
	PanelContextType,
	| 'busy'
	| 'liveUpdateMode'
	| 'notice'
	| 'errorMessage'
	| 'analysis'
	| 'visibleTabIdentity'
	| 'resultCount'
	| 'groupedResults'
	| 'liveUpdateChipLabel'
	| 'evidenceCompletenessLabel'
	| 'analysisActivity'
	| 'matcherStatus'
	| 'refresh'
	| 'stopObservation'
>;

/** State required by the retained detector history page. */
export type HistoryPageType = Pick<PanelContextType, 'analysis' | 'visibleTabIdentity'>;

/** State and commands required by the settings page. */
export type SettingsPageType = Pick<
	PanelContextType,
	| 'autoScanEnabled'
	| 'autoScanSettingInFlight'
	| 'clearStoredDataInFlight'
	| 'status'
	| 'setAutoScanEnabled'
	| 'clearStoredData'
>;

/** State required by the technology result page. */
export type TechnologiesPageType = Pick<
	PanelContextType,
	| 'analysis'
	| 'busy'
	| 'liveUpdateMode'
	| 'notice'
	| 'errorMessage'
	| 'visibleTabIdentity'
	| 'lateAddedIds'
	| 'groupedResults'
	| 'analysisActivity'
	| 'refresh'
>;

/** State required by one technology detail page. */
export type TechnologyPageType = Pick<
	PanelContextType,
	| 'analysis'
	| 'explanationsByTechnologyId'
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

/** Return only the state and commands used by the summary page. */
export function useSummary(): SummaryPageType {
	return usePanel();
}

/** Return only the active-origin identity needed by the history page. */
export function useHistory(): HistoryPageType {
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

/** Return only the state used by one technology detail page. */
export function useTechnology(): TechnologyPageType {
	return usePanel();
}
