import { collectResourceEntries, collectResourceTimings } from "../signals/resources.ts";

import type { PageSignals } from "@deepscope/detection/types";

import * as scan from './scan.ts';

import type { ObserverState } from './state.ts';
import type { Type as Evidence } from './evidence.ts';

/** The Performance Timeline observer and its existing-entry snapshot. */
export interface Type {
	readonly stopResources: () => void;
	readonly startResources: () => void;
	readonly rememberTimings: (notify?: boolean) => void;
}

/** Create resource collection without subscribing before a session begins. */
export function create(state: ObserverState, evidence: Evidence, scheduleNotice: () => void): Type {
	const { rememberSnapshot, batch: observationBatchController } = evidence;
	let resourceObserver: PerformanceObserver | undefined;
	/** Disconnect the incremental Performance Timeline observer. */
	function stopResources(): void {
		resourceObserver?.disconnect();
		resourceObserver = undefined;
	}

	/** Remember resource entries without rescanning the complete Performance Timeline. */
	function rememberResources(
		resources: PageSignals['resources'],
		notify: boolean,
		generation = state.activeSession?.generation,
	): void {
		if (resources.length === 0) return;

		const acceptedBefore = observationBatchController.stats().acceptedCount;
		rememberSnapshot({
			...scan.empty(),
			resources,
			requests: resources.map((resource) => ({
				url: resource.url,
				type: resource.initiatorType,
			})),
		}, generation);

		if (observationBatchController.stats().acceptedCount <= acceptedBefore) return;
		state.lastObservedAt = Date.now();
		if (notify) scheduleNotice();
	}

	/** Remember resources that existed before the live PerformanceObserver started reporting entries. */
	function rememberTimings(notify = false): void {
		rememberResources(collectResourceTimings(), notify, state.activeSession?.generation);
	}

	/** Observe only new resource entries after the initial timeline snapshot. */
	function startResources(): void {
		stopResources();

		if (typeof globalThis.PerformanceObserver !== 'function') return;
		const generation = state.activeSession?.generation;
		if (generation === undefined) return;

		try {
			resourceObserver = new globalThis.PerformanceObserver((list) => {
				if (state.activeSession?.generation !== generation) return;
				rememberResources(collectResourceEntries(list.getEntries()), true, generation);
			});

			try {
				resourceObserver.observe({ type: 'resource' });
			} catch {
				resourceObserver.observe({ entryTypes: ['resource'] });
			}
		} catch {
			stopResources();
		}
	}
	return { stopResources, startResources, rememberTimings };
}
