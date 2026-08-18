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
	const panel = usePanel();
	return {
		busy: panel.busy,
		liveUpdateMode: panel.liveUpdateMode,
		notice: panel.notice,
		errorMessage: panel.errorMessage,
		analysis: panel.analysis,
		visibleTabIdentity: panel.visibleTabIdentity,
		resultCount: panel.resultCount,
		groupedResults: panel.groupedResults,
		liveUpdateChipLabel: panel.liveUpdateChipLabel,
		evidenceCompletenessLabel: panel.evidenceCompletenessLabel,
		analysisActivity: panel.analysisActivity,
		matcherStatus: panel.matcherStatus,
		refresh: panel.refresh,
		stopObservation: panel.stopObservation,
	};
}

/** Return only the active page identity required by retained history. */
export function useHistory(): HistoryPageType {
	const panel = usePanel();
	return { analysis: panel.analysis, visibleTabIdentity: panel.visibleTabIdentity };
}

/** Return only the settings state and commands. */
export function useSettings(): SettingsPageType {
	const panel = usePanel();
	return {
		autoScanEnabled: panel.autoScanEnabled,
		autoScanSettingInFlight: panel.autoScanSettingInFlight,
		clearStoredDataInFlight: panel.clearStoredDataInFlight,
		status: panel.status,
		setAutoScanEnabled: panel.setAutoScanEnabled,
		clearStoredData: panel.clearStoredData,
	};
}

/** Return only the state and commands used by the technology result page. */
export function useTechnologies(): TechnologiesPageType {
	const panel = usePanel();
	return {
		analysis: panel.analysis,
		busy: panel.busy,
		liveUpdateMode: panel.liveUpdateMode,
		notice: panel.notice,
		errorMessage: panel.errorMessage,
		visibleTabIdentity: panel.visibleTabIdentity,
		lateAddedIds: panel.lateAddedIds,
		groupedResults: panel.groupedResults,
		analysisActivity: panel.analysisActivity,
		refresh: panel.refresh,
	};
}

/** Return only the analysis data used by one technology detail page. */
export function useTechnology(): TechnologyPageType {
	const panel = usePanel();
	return {
		analysis: panel.analysis,
		explanationsByTechnologyId: panel.explanationsByTechnologyId,
	};
}
