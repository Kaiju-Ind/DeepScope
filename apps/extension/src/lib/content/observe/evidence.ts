import type { SnapshotType } from '@deepscope/detection/observations/snapshot';
import { mergeStringsByTotalChars } from "@deepscope/detection/normalizers";
import { SOURCE_LIMITS } from "@deepscope/detection/limits";

import type { PageSignals } from "@deepscope/detection/types";

import { createObservationBatchController, normalizeObservedPageSignalsSnapshot, type ObservationTarget } from "@deepscope/detection/observations";

import type * as observe from './types.ts';
import * as dictionary from '@deepscope/detection/observations/dictionary';
import type { ObserverState } from './state.ts';
import type { ObservationBatchController } from "@deepscope/detection/observations";

/** Evidence operations exposed to collection and lifecycle owners. */
export interface Type {
	readonly clearEvidence: () => void;
	readonly getRetainedEvidenceCounts: () => Record<string, number>;
	readonly rememberSnapshot: (snapshot: SnapshotType, generation?: number) => void;
	readonly getTarget: () => ObservationTarget | undefined;
	readonly snapshot: (content: observe.SnapshotOptionsType) => SnapshotType;
	/** Read-only selector membership used to retire positive matches from later scans. */
	readonly selectors: ReadonlyMap<string, boolean>;
	/** Existing bounded normalized-observation queue, shared with explicit flush operations. */
	readonly batch: ObservationBatchController;
}

/** Retain bounded page evidence only for this document observer. */
export function create(state: ObserverState): Type {
	const scripts = new Set<string>();

	const images = new Set<string>();

	const stylesheets = new Set<string>();

	let scriptContents: string[] = [];

	let stylesheetContents: string[] = [];

	const metaEntries = new Map<string, Set<string>>();

	const domSelectorEntries = new Map<string, boolean>();

	const linkEntries = new Map<string, PageSignals['links'][number]>();

	const resourceEntries = new Map<string, PageSignals['resources'][number]>();

	const requestEntries = new Map<string, PageSignals['requests'][number]>();

	const observationBatchController = createObservationBatchController();

	/** Release page-owned evidence retained by a completed observation session. */
	function clearEvidence(): void {
		scripts.clear();
		images.clear();
		stylesheets.clear();
		scriptContents = [];
		stylesheetContents = [];
		metaEntries.clear();
		domSelectorEntries.clear();
		linkEntries.clear();
		resourceEntries.clear();
		requestEntries.clear();
	}

	/** Return count-only evidence-retention diagnostics without exposing page values. */
	function getRetainedEvidenceCounts(): Record<string, number> {
		return {
			retainedScriptCount: scripts.size,
			retainedImageCount: images.size,
			retainedStylesheetCount: stylesheets.size,
			retainedScriptContentCount: scriptContents.length,
			retainedStylesheetContentCount: stylesheetContents.length,
			retainedMetaKeyCount: metaEntries.size,
			retainedSelectorCount: domSelectorEntries.size,
			retainedLinkCount: linkEntries.size,
			retainedResourceCount: resourceEntries.size,
			retainedRequestCount: requestEntries.size,
		};
	}

	/** Merge bounded meta values into the document-level evidence cache. */
	function rememberMeta(meta: Record<string, string[]>): void {
		for (const [key, values] of Object.entries(meta)) {
			let bucket = metaEntries.get(key);
			if (!bucket) {
				bucket = new Set<string>();
				metaEntries.set(key, bucket);
			}

			for (const value of values) {
				if (bucket.size >= SOURCE_LIMITS.metaValuesPerKey) {
					break;
				}
				bucket.add(value);
			}
		}
	}

	/** Preserve selector matches once observed because later DOM removal does not erase evidence. */
	function rememberSelectors(selectors: Record<string, boolean>): void {
		const selectorLimit = state.activeSession?.domSelectorPlan?.selectors.length ?? Number.POSITIVE_INFINITY;
		for (const [selector, matched] of Object.entries(selectors)) {
			if (!matched) continue;
			if (!domSelectorEntries.has(selector) && domSelectorEntries.size >= selectorLimit) continue;
			domSelectorEntries.set(selector, true);
		}
	}

	/** Merge one incremental page snapshot and enqueue its normalized observations. */
	function rememberSnapshot(snapshot: SnapshotType, generation?: number): void {
		if (generation !== undefined && state.activeSession?.generation !== generation) return;
		const observedAt = Date.now();
		for (const source of snapshot.images) {
			addBoundedValue(images, source, SOURCE_LIMITS.imageSrc);
		}
		for (const source of snapshot.scripts) {
			addBoundedValue(scripts, source, SOURCE_LIMITS.scriptSrc);
		}

		for (const href of snapshot.stylesheets) {
			addBoundedValue(stylesheets, href, SOURCE_LIMITS.stylesheetHref);
		}

		scriptContents = mergeStringsByTotalChars(
			scriptContents,
			snapshot.scriptContents,
			SOURCE_LIMITS.scriptContentItems,
			SOURCE_LIMITS.scriptContentChars,
			SOURCE_LIMITS.scriptContentTotalChars,
		);

		stylesheetContents = mergeStringsByTotalChars(
			stylesheetContents,
			snapshot.stylesheetContents,
			SOURCE_LIMITS.stylesheetContentItems,
			SOURCE_LIMITS.stylesheetContentChars,
			SOURCE_LIMITS.stylesheetContentTotalChars,
		);

		for (const link of snapshot.links) {
			setBoundedEntry(linkEntries, `${link.rel}:${link.type ?? ''}:${link.href}`, link, SOURCE_LIMITS.linkTags);
		}

		for (const resource of snapshot.resources) {
			setBoundedEntry(resourceEntries, resource.url, resource, SOURCE_LIMITS.resourceUrls);
		}

		for (const request of snapshot.requests) {
			setBoundedEntry(requestEntries, request.url, request, SOURCE_LIMITS.requestUrls);
		}

		rememberMeta(snapshot.meta);
		rememberSelectors(snapshot.dom.selectors);
		enqueueSnapshot(snapshot, observedAt);
	}

	/** Normalize one incremental snapshot into the bounded observation controller. */
	function enqueueSnapshot(snapshot: SnapshotType, observedAt: number): void {
		const target = getTarget();
		if (!target || state.sessionStatus === 'stopped') return;

		const batch = normalizeObservedPageSignalsSnapshot(snapshot, {
			target,
			observedAt,
			collector: 'content-observer',
		});

		for (const observation of batch.observations) observationBatchController.push(observation);
	}

	/** Return the current session target used to normalize late observations. */
	function getTarget(): ObservationTarget | undefined {
		if (!state.activeSession) return undefined;

		return {
			url: state.activeSession.expectedUrl,
			hostname: new globalThis.URL(state.activeSession.expectedUrl).hostname,
		};
	}

	/** Materialize bounded meta evidence for an explicit page snapshot. */
	function getMeta(): Record<string, string[]> {
		return dictionary.fromEntries(
			[...metaEntries.entries()].map(([key, values]) => [
				key,
				[...values].slice(0, SOURCE_LIMITS.metaValuesPerKey),
			]),
		);
	}

	/** Add one unique value without letting a long-lived observation cache exceed its public source limit. */
	function addBoundedValue(target: Set<string>, value: string, limit: number): void {
		if (target.has(value) || target.size < limit) target.add(value);
	}

	/** Insert or update one keyed value while bounding the number of retained page-owned objects. */
	function setBoundedEntry<T>(target: Map<string, T>, key: string, value: T, limit: number): void {
		if (target.has(key) || target.size < limit) target.set(key, value);
	}

	/** Materialize the retained evidence without returning cache or DOM ownership. */
	function snapshot(content: observe.SnapshotOptionsType): SnapshotType {
		return {
			images: [...images].slice(0, SOURCE_LIMITS.imageSrc),
			scripts: [...scripts].slice(0, SOURCE_LIMITS.scriptSrc),
			stylesheets: [...stylesheets].slice(0, SOURCE_LIMITS.stylesheetHref),
			links: [...linkEntries.values()].slice(0, SOURCE_LIMITS.linkTags),
			resources: [...resourceEntries.values()].slice(0, SOURCE_LIMITS.resourceUrls),
			requests: [...requestEntries.values()].slice(0, SOURCE_LIMITS.requestUrls),
			scriptContents: content.includeScriptContent ? scriptContents : [],
			stylesheetContents: content.includeStylesheetContent ? stylesheetContents : [],
			meta: getMeta(),
			dom: { selectors: dictionary.fromEntries(domSelectorEntries) },
		};
	}
	return { clearEvidence, getRetainedEvidenceCounts, rememberSnapshot, getTarget, snapshot, selectors: domSelectorEntries, batch: observationBatchController };
}
