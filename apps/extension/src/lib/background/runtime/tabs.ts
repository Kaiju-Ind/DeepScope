import type { VisibleTabIdentity, ObservationSessionTarget } from "../../messaging/index.ts";

import * as tabIdentity from '../../messaging/identity.ts';

import { errorResponse, ok, type ExtensionResult } from "../../messaging/result.ts";

import * as url from '../../../utils/url.ts';

import type { BackgroundRuntimeTab, ScheduledTabIdentity, BackgroundRuntimeDependencies, InspectableTab } from './types.ts';
import { createVisibleTabIdentity } from './output.ts';

/** Only adapters and peer operations needed by this owner. Constructors perform no browser work. */
export interface Dependencies {
	readonly getTab: BackgroundRuntimeDependencies['getTab'];
	readonly missingUrlFailure: BackgroundRuntimeDependencies['missingUrlFailure'];
	readonly logEvent: BackgroundRuntimeDependencies['logEvent'];
}

/** Operations owned by this runtime instance; state remains private to its factory. */
export interface Type {
	readonly getInspectableVisibleTab: (target: VisibleTabIdentity) => Promise<ExtensionResult<InspectableTab>>;
	readonly getInspectableScheduledTab: (target: VisibleTabIdentity) => Promise<ExtensionResult<InspectableTab>>;
	readonly resolveScheduledTab: (target: ScheduledTabIdentity) => Promise<ExtensionResult<VisibleTabIdentity>>;
	readonly getInspectableTab: (tabId: number, windowId: number) => Promise<ExtensionResult<InspectableTab>>;
	readonly getInspectableActiveTab: (tabId: number, windowId: number) => Promise<ExtensionResult<InspectableTab>>;
	readonly canSaveMatcher: (tab: InspectableTab, expectedUrl: string) => Promise<boolean>;
	readonly getInspectableTabForObservationSessionTarget: (target: ObservationSessionTarget) => Promise<ExtensionResult<InspectableTab>>;
}

/** Create one tabs owner for the background context. */
export function create(dependencies: Dependencies): Type {
	const logBackgroundEvent = dependencies.logEvent;

	/** Keep browser/internal pages out of content-script orchestration. */
	function canInspectTab(tab: { readonly url?: string }): boolean {
		if (!tab.url) {
			return false;
		}

		try {
			const { protocol } = new globalThis.URL(tab.url);
			return protocol === 'http:' || protocol === 'https:';
		} catch {
			return false;
		}
	}

	/** Require the active inspected tab to retain the caller's complete document identity. */
	async function getInspectableVisibleTab(target: VisibleTabIdentity): Promise<ExtensionResult<InspectableTab>> {
		return validateInspectableTarget(target, await getInspectableActiveTab(target.tabId, target.windowId));
	}

	/** Validate scheduler-owned work against the exact still-open document without requiring tab visibility. */
	async function getInspectableScheduledTab(target: VisibleTabIdentity): Promise<ExtensionResult<InspectableTab>> {
		return validateInspectableTarget(target, await getInspectableTab(target.tabId, target.windowId));
	}

	/** Resolve durable hashed scheduler identity without persisting the page URL. */
	async function resolveScheduledTab(target: ScheduledTabIdentity): Promise<ExtensionResult<VisibleTabIdentity>> {
		const tab = await getInspectableTab(target.tabId, target.windowId);
		if (!tab.ok) return tab;
		const identity = createVisibleTabIdentity(tab.value);
		if (identity.frameId === target.frameId && identity.urlHash === target.urlHash) {
			return ok(identity);
		}

		logBackgroundEvent('scheduled-tab-target-mismatch', {
			requestedWindowId: target.windowId,
			actualWindowId: identity.windowId,
			requestedTabId: target.tabId,
			actualTabId: identity.tabId,
			requestedUrlHash: target.urlHash,
			actualUrlHash: identity.urlHash,
		});
		return errorResponse('VALIDATION_ERROR', 'Scheduled analysis no longer matches its browser document.');
	}

	/** Reject a target whose current tab/window/URL identity changed after the caller captured it. */
	function validateInspectableTarget(
		target: VisibleTabIdentity,
		targetTab: ExtensionResult<InspectableTab>,
	): ExtensionResult<InspectableTab> {
		if (!targetTab.ok) return targetTab;
		const targetIdentity = createVisibleTabIdentity(targetTab.value);
		if (tabIdentity.same(targetIdentity, target)) return targetTab;

		logBackgroundEvent('visible-tab-target-mismatch', {
			requestedWindowId: target.windowId,
			actualWindowId: targetIdentity.windowId,
			requestedTabId: target.tabId,
			actualTabId: targetIdentity.tabId,
			requestedUrlHash: target.urlHash,
			actualUrlHash: targetIdentity.urlHash,
		});
		return errorResponse('VALIDATION_ERROR', 'Analysis request no longer matches its browser document.');
	}

	/** Resolve a live tab in its expected window and reject missing permissions or non-HTTP(S) documents before collection. */
	async function getInspectableTab(tabId: number, windowId: number): Promise<ExtensionResult<InspectableTab>> {
		let tab: BackgroundRuntimeTab;
		try {
			tab = await dependencies.getTab(tabId);
		} catch {
			logBackgroundEvent('tab-missing', { tabId });
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer available.');
		}

		if (tab.windowId !== windowId) {
			logBackgroundEvent('tab-window-mismatch', {
				tabId,
				requestedWindowId: windowId,
				actualWindowId: tab.windowId,
			});
			return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab no longer belongs to this window.');
		}

		if (typeof tab.id !== 'number' || !tab.url) {
			logBackgroundEvent('tab-unavailable', { tabId });
			return await dependencies.missingUrlFailure();
		}

		if (!canInspectTab(tab)) {
			logBackgroundEvent('tab-unsupported', { tabId: tab.id, url: tab.url });
			return errorResponse(
				'UNSUPPORTED_URL',
				'Detection only works on normal http/https pages. Reload a website tab and try again.',
			);
		}

		return ok({
			id: tab.id,
			windowId: tab.windowId,
			url: tab.url,
			active: tab.active === true,
			incognito: tab.incognito === true,
		});
	}

	/** Require an active tab only while acquiring a user-visible target. */
	async function getInspectableActiveTab(tabId: number, windowId: number): Promise<ExtensionResult<InspectableTab>> {
		const tab = await getInspectableTab(tabId, windowId);
		if (!tab.ok || tab.value.active) return tab;
		logBackgroundEvent('visible-tab-inactive', { tabId });
		return errorResponse('NO_ACTIVE_TAB', 'The requested browser tab is no longer active.');
	}

	/**
	 * Return whether matcher output still belongs to the document the tab now shows.
	 *
	 * Publication is keyed by document identity: the same tab id, the same private
	 * or ordinary profile, and the same document URL. Window id is deliberately not
	 * compared because a user can drag a tab into another window without changing
	 * its document, and activation is only a priority signal, so an inactive tab may
	 * still publish. Cross-document navigation revokes ownership separately through
	 * `forgetTabRuntimeState`.
	 */
	async function canSaveMatcher(tab: InspectableTab, expectedUrl: string): Promise<boolean> {
		try {
			const current = await dependencies.getTab(tab.id);
			if (!current.url) return false;
			if ((current.incognito === true) !== tab.incognito) return false;
			return url.sameDocument(current.url, expectedUrl);
		} catch {
			return false;
		}
	}

	/** Resolve the exact observed document without requiring activation, retaining private context from either trusted source. */
	async function getInspectableTabForObservationSessionTarget(
		target: ObservationSessionTarget,
	): Promise<ExtensionResult<InspectableTab>> {
		try {
			const tab = await dependencies.getTab(target.tabId);
			if (typeof tab.windowId !== 'number') {
				return errorResponse(
					'OBSERVATION_SESSION_UNAVAILABLE',
					'The browser no longer reports the window that owns the observed tab.',
				);
			}

			if (!tab.url || !url.sameDocument(tab.url, target.expectedUrl)) {
				return errorResponse(
					'OBSERVATION_SESSION_UNAVAILABLE',
					'The visible tab navigated away from the observed document.',
				);
			}

			if (!canInspectTab(tab)) {
				return errorResponse(
					'UNSUPPORTED_URL',
					'Detection only works on normal http/https pages. Reload a website tab and try again.',
				);
			}

			return ok({
				id: target.tabId,
				windowId: tab.windowId,
				url: tab.url,
				active: tab.active === true,
				incognito: target.incognito === true || tab.incognito === true,
			});
		} catch {
			return errorResponse(
				'OBSERVATION_SESSION_UNAVAILABLE',
				'The requested observation session is no longer active in the target tab.',
			);
		}
	}

	return { getInspectableVisibleTab, getInspectableScheduledTab, resolveScheduledTab, getInspectableTab, getInspectableActiveTab, canSaveMatcher, getInspectableTabForObservationSessionTarget };
}
