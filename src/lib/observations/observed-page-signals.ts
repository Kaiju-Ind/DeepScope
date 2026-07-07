import type { ObservedPageSignalsSnapshot } from '../content/observed-page-signals';
import type { LinkSignal, RequestSignal } from '../detection/types';
import type {
	NormalizedObservation,
	ObservationAttributes,
	ObservationBatch,
	ObservationCollector,
	ObservationInterface,
	ObservationTarget,
	ObservationValue,
} from './types';

/**
 * Metadata needed to turn late observer data into shared observation events.
 *
 * The content observer sees a narrow runtime slice after initial analysis. It
 * needs this metadata because late DOM and resource events do not carry the
 * target document, interface label, or collector identity on their own.
 */
export interface ObservedPageSignalsObservationOptions {
	/** Document target that owns the observed late signals. */
	readonly target: ObservationTarget;
	/** Timestamp assigned to observations emitted from this observer snapshot. */
	readonly observedAt: number;
	/** Interface that produced the batch. Defaults to the browser extension. */
	readonly interface?: ObservationInterface;
	/** Collector boundary that produced the facts. Defaults to the content observer. */
	readonly collector?: ObservationCollector;
}

/**
 * Convert a late observer snapshot into a normalized observation batch.
 *
 * This adapter only emits surfaces the content observer can actually see after
 * the initial scan: scripts, stylesheets, links, resource timings, derived
 * request URLs, inline source snippets, and metadata. Keeping it narrower than
 * `normalizePageSignals(...)` prevents refresh batches from implying that
 * headers, cookies, storage keys, or page globals were re-collected.
 */
export function normalizeObservedPageSignalsSnapshot(
	snapshot: ObservedPageSignalsSnapshot,
	options: ObservedPageSignalsObservationOptions,
): ObservationBatch {
	const observations: NormalizedObservation[] = [];
	const addObservation = createObservationAppender({
		observations,
		target: options.target,
		observedAt: options.observedAt,
		observationInterface: options.interface ?? 'extension',
		collector: options.collector ?? 'content-observer',
	});

	for (const script of snapshot.scripts) addTextObservation(addObservation, 'scriptSrc', script);
	for (const stylesheet of snapshot.stylesheets) addTextObservation(addObservation, 'stylesheetHref', stylesheet);
	for (const link of snapshot.links) addLinkObservation(addObservation, link);
	for (const resource of snapshot.resources) {
		addTextObservation(addObservation, 'resourceUrl', resource.url, compactAttributes({
			initiatorType: resource.initiatorType,
		}));
	}
	for (const request of snapshot.requests) addRequestObservation(addObservation, request);
	for (const content of snapshot.scriptContents) addTextObservation(addObservation, 'scriptContent', content);
	for (const content of snapshot.stylesheetContents) addTextObservation(addObservation, 'stylesheetContent', content);
	for (const [key, values] of sortedEntries(snapshot.meta)) {
		for (const value of values) addTextObservation(addObservation, 'meta', value, undefined, key);
	}
	for (const [selector, matched] of sortedEntries(snapshot.dom.selectors)) {
		if (matched) {
			addObservation({ kind: 'dom', key: selector, value: true });
		}
	}

	return {
		target: options.target,
		interface: options.interface ?? 'extension',
		observedAt: options.observedAt,
		observations,
	};
}

/** Adds one observation while filling the shared batch metadata. */
type ObservationAppender = (input: {
	/** Surface consumed by the observation matcher. */
	readonly kind: NormalizedObservation['kind'];
	/** Scalar value that can be matched, deduped, and replayed. */
	readonly value: ObservationValue;
	/** Optional lookup key such as a meta name or link relation. */
	readonly key?: string;
	/** Optional scalar context for source-specific matchers. */
	readonly attributes?: ObservationAttributes;
}) => void;

/** Create an appender that closes over the common batch-level fields. */
function createObservationAppender(options: {
	readonly observations: NormalizedObservation[];
	readonly target: ObservationTarget;
	readonly observedAt: number;
	readonly observationInterface: ObservationInterface;
	readonly collector: ObservationCollector;
}): ObservationAppender {
	return (input) => {
		const attributes = input.attributes ? compactAttributes(input.attributes) : undefined;
		const observation: NormalizedObservation = {
			kind: input.kind,
			interface: options.observationInterface,
			collector: options.collector,
			target: options.target,
			observedAt: options.observedAt,
			value: input.value,
		};

		if (input.key !== undefined) observation.key = input.key;
		if (attributes && Object.keys(attributes).length > 0) observation.attributes = attributes;

		options.observations.push(observation);
	};
}

/** Skip empty strings so late batches only carry evidence-bearing facts. */
function addTextObservation(
	addObservation: ObservationAppender,
	kind: NormalizedObservation['kind'],
	value: string,
	attributes?: ObservationAttributes,
	key?: string,
): void {
	if (!value) return;
	addObservation({ kind, value, attributes, key });
}

/** Preserve link attributes that current link rules can inspect. */
function addLinkObservation(addObservation: ObservationAppender, link: LinkSignal): void {
	addTextObservation(addObservation, 'link', link.href, compactAttributes({
		rel: link.rel,
		type: link.type,
		as: link.as,
		media: link.media,
		hreflang: link.hreflang,
		crossOrigin: link.crossOrigin,
	}), link.rel);
}

/** Convert resource-timing request records into matcher-compatible observations. */
function addRequestObservation(addObservation: ObservationAppender, request: RequestSignal): void {
	addTextObservation(addObservation, 'requestUrl', request.url, compactAttributes({
		method: request.method,
		type: request.type,
	}));
}

/** Remove empty optional attributes before values reach replay or dedupe. */
function compactAttributes(
	attributes: Record<string, ObservationValue | undefined>,
): ObservationAttributes {
	const compacted: ObservationAttributes = {};
	for (const [key, value] of Object.entries(attributes)) {
		if (value !== undefined && value !== '') compacted[key] = value;
	}

	return compacted;
}

/** Return stable key order so replay and tests do not depend on insertion order. */
function sortedEntries<T>(record: Record<string, T>): [string, T][] {
	return Object.entries(record).sort(([left], [right]) => left.localeCompare(right));
}
