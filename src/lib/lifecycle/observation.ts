import type {
	VisibleTabObservationMode,
	AnalyzeVisibleTabInput,
	BeginObservationSessionInput,
} from '../contracts/analysis';
import type { ObservationSessionState } from '../content/observed-page-signals';
import { isSameDocumentUrl } from '../shared/url';

/**
 * Standard observation policy for the visible-tab extension flow.
 *
 * The background sends these limits to the content script after a fresh analysis.
 * Matching can run for longer than the first collection pass on large sites, so
 * the observer window must outlive the initial CPU work while still staying
 * bounded. Keeping the policy here makes that lifecycle tradeoff visible.
 */
export const EXTENSION_OBSERVATION_POLICY = {
	durationMs: 5 * 60_000,
	throttleMs: 1_500,
	maxPendingNodes: 100,
	maxMutations: 5_000,
} as const satisfies BeginObservationSessionInput['policy'];

/** Observation statuses that may be refreshed into a new analysis. */
export const REFRESHABLE_OBSERVATION_STATUSES = ['observing', 'dirty'] as const;

/** Status value that can be refreshed by the background. */
export type RefreshableObservationSessionStatus =
	typeof REFRESHABLE_OBSERVATION_STATUSES[number];

/**
 * Returns whether a fresh analysis should open page watching afterwards.
 *
 * `bounded` and `while-popup-open` both start the same content-script observation
 * session today. The helper keeps that product choice in one place so the modes
 * can diverge without changing every visible-tab call site.
 */
export function shouldStartObservation(mode: VisibleTabObservationMode): boolean {
	return mode !== 'none';
}

/** Return whether a visible-tab request should start page watching. */
export function shouldStartObservationForAnalysis(
	input: Pick<AnalyzeVisibleTabInput, 'observe'>,
): boolean {
	return shouldStartObservation(input.observe);
}

/** Return whether the session status can be refreshed into a new analysis. */
export function canRefreshObservationSession(
	session: Pick<ObservationSessionState, 'status'>,
): session is ObservationSessionState & { status: RefreshableObservationSessionStatus } {
	return REFRESHABLE_OBSERVATION_STATUSES.includes(
		session.status as RefreshableObservationSessionStatus,
	);
}

/**
 * Checks whether a content-script session still belongs to the active document.
 *
 * The background stores the URL it expected when observation started. A hash-only
 * change still counts as the same document, but a path or origin change means
 * the popup is now looking at a different page than the session was created for.
 */
export function isObservationSessionForUrl(
	session: Pick<ObservationSessionState, 'expectedUrl'>,
	activeUrl: string,
): boolean {
	return !session.expectedUrl || isSameDocumentUrl(session.expectedUrl, activeUrl);
}

/** Reason the background should refuse an observation refresh, if any. */
export type ObservationRefreshBlockReason = 'unavailable' | 'navigation';

/**
 * Explains why the background cannot refresh an observation session.
 *
 * `unavailable` means no refreshable session exists. `navigation` means the
 * content script reports a session for an older document, so refreshing it would
 * mix old observation state with the visible tab's current URL.
 */
export function getObservationRefreshBlockReason(
	session: ObservationSessionState,
	activeUrl: string,
): ObservationRefreshBlockReason | null {
	if (!canRefreshObservationSession(session)) {
		return 'unavailable';
	}

	if (!isObservationSessionForUrl(session, activeUrl)) {
		return 'navigation';
	}

	return null;
}
