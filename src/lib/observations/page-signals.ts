import type {
	DnsRecordType,
	LinkSignal,
	PageSignals,
	RequestSignal,
} from '../detection/types';
import type {
	NormalizedObservation,
	NormalizedObservationKind,
	ObservationAttributes,
	ObservationBatch,
	ObservationCollector,
	ObservationInterface,
	ObservationTarget,
	ObservationValue,
} from './types';

const DNS_RECORD_ORDER: DnsRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'SOA', 'TXT'];

/**
 * Options for turning a page-signal snapshot into normalized observations.
 *
 * The adapter is intentionally configurable because the same `PageSignals`
 * shape can come from initial content collection, late observation refreshes,
 * tests, and eventually CLI fixtures.
 */
export interface PageSignalsObservationOptions {
	/** Interface that produced the original snapshot. */
	interface?: ObservationInterface;
	/** Default collector assigned to observations that do not have a more specific source. */
	collector?: ObservationCollector;
	/** Timestamp override for deterministic tests and replay fixtures. */
	observedAt?: number;
	/** Include `dom` observations for selectors that were probed but not present. */
	includeAbsentDomSelectors?: boolean;
}

/**
 * Convert today's `PageSignals` snapshot into the target normalized observation shape.
 *
 * The content collector still knows how to gather a bounded page snapshot. This
 * adapter turns that snapshot into event-pipeline facts so tests, docs, and
 * extension runtime code reason over the same normalized observation shape.
 */
export function normalizePageSignals(
	signals: PageSignals,
	options: PageSignalsObservationOptions = {},
): ObservationBatch {
	const target: ObservationTarget = {
		url: signals.url,
		hostname: signals.hostname,
	};
	const observationInterface = options.interface ?? 'extension';
	const observedAt = options.observedAt ?? signals.collectedAt;
	const defaultCollector = options.collector ?? 'content-snapshot';
	const observations: NormalizedObservation[] = [];

	const addObservation = createObservationAppender({
		observations,
		target,
		observationInterface,
		observedAt,
		defaultCollector,
	});

	addTextObservation(addObservation, 'url', signals.url, { hostname: signals.hostname });
	addTextObservation(addObservation, 'html', signals.html);
	addHtmlMatchObservations(addObservation, signals.htmlMatches ?? {});
	addTextObservation(addObservation, 'text', signals.text);

	for (const script of signals.scripts) {
		addTextObservation(addObservation, 'scriptSrc', script);
	}
	for (const stylesheet of signals.stylesheets) {
		addTextObservation(addObservation, 'stylesheetHref', stylesheet);
	}
	for (const link of signals.links) {
		addLinkObservation(addObservation, link);
	}
	for (const resource of signals.resources) {
		addTextObservation(addObservation, 'resourceUrl', resource.url, compactAttributes({
			initiatorType: resource.initiatorType,
		}));
	}
	for (const request of signals.requests) {
		addRequestObservations(addObservation, request);
	}
	for (const content of signals.scriptContents) {
		addTextObservation(addObservation, 'scriptContent', content);
	}
	for (const content of signals.stylesheetContents) {
		addTextObservation(addObservation, 'stylesheetContent', content);
	}

	for (const cookieName of sortedKeys(signals.cookies)) {
		addObservation({
			kind: 'cookie',
			key: cookieName,
			value: true,
			attributes: { redacted: true },
		});
	}
	for (const [key, value] of sortedEntries(signals.headers)) {
		addTextObservation(addObservation, 'header', value, undefined, key, 'background-enrichment');
	}
	for (const [key, values] of sortedEntries(signals.meta)) {
		for (const value of values) {
			addTextObservation(addObservation, 'meta', value, undefined, key);
		}
	}
	for (const [selector, matched] of sortedEntries(signals.dom.selectors)) {
		if (matched || options.includeAbsentDomSelectors) {
			addObservation({
				kind: 'dom',
				key: selector,
				value: matched,
			});
		}
	}
	addStorageObservations(addObservation, signals.storage.localStorage, 'localStorage');
	addStorageObservations(addObservation, signals.storage.sessionStorage, 'sessionStorage');

	for (const [property, value] of sortedEntries(signals.jsGlobals)) {
		addObservation({
			kind: 'jsGlobal',
			key: property,
			value: toObservationValue(value),
			collector: 'page-main-world',
		});
	}
	addTextObservation(addObservation, 'robots', signals.robotsTxt, undefined, undefined, 'background-enrichment');
	addDnsObservations(addObservation, signals);
	addTextObservation(addObservation, 'certIssuer', signals.certIssuer, undefined, undefined, 'background-enrichment');
	for (const result of signals.probeResults) {
		addTextObservation(addObservation, 'probe', result, undefined, undefined, 'background-enrichment');
	}

	return {
		target,
		interface: observationInterface,
		observedAt,
		observations,
	};
}

type ObservationAppender = (input: {
	kind: NormalizedObservationKind;
	value: ObservationValue;
	key?: string;
	attributes?: ObservationAttributes;
	collector?: ObservationCollector;
}) => void;

/** Create an appender that fills shared batch metadata for every observation. */
function createObservationAppender(options: {
	observations: NormalizedObservation[];
	target: ObservationTarget;
	observationInterface: ObservationInterface;
	observedAt: number;
	defaultCollector: ObservationCollector;
}): ObservationAppender {
	return (input) => {
		const attributes = input.attributes ? compactAttributes(input.attributes) : undefined;
		const observation: NormalizedObservation = {
			kind: input.kind,
			interface: options.observationInterface,
			collector: input.collector ?? options.defaultCollector,
			target: options.target,
			observedAt: options.observedAt,
			value: input.value,
		};

		if (input.key !== undefined) {
			observation.key = input.key;
		}
		if (attributes && Object.keys(attributes).length > 0) {
			observation.attributes = attributes;
		}

		options.observations.push(observation);
	};
}

/** Skip empty strings so the batch records facts that can become evidence. */
function addTextObservation(
	addObservation: ObservationAppender,
	kind: NormalizedObservationKind,
	value: string,
	attributes?: ObservationAttributes,
	key?: string,
	collector?: ObservationCollector,
): void {
	if (!value) {
		return;
	}

	addObservation({ kind, value, attributes, key, collector });
}

function addHtmlMatchObservations(
	addObservation: ObservationAppender,
	htmlMatches: NonNullable<PageSignals['htmlMatches']>,
): void {
	for (const [key, match] of sortedEntries(htmlMatches)) {
		addTextObservation(addObservation, 'htmlMatch', match.matchedValue, {
			captureCount: match.captures.length,
		}, key);
	}
}

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

function addRequestObservations(addObservation: ObservationAppender, request: RequestSignal): void {
	addTextObservation(addObservation, 'requestUrl', request.url, compactAttributes({
		method: request.method,
		type: request.type,
	}));

	for (const [key, value] of sortedEntries(request.requestHeaders ?? {})) {
		addTextObservation(addObservation, 'requestHeader', value, { requestUrl: request.url }, key);
	}
	for (const [key, value] of sortedEntries(request.responseHeaders ?? {})) {
		addTextObservation(addObservation, 'responseHeader', value, { requestUrl: request.url }, key);
	}
}

function addStorageObservations(
	addObservation: ObservationAppender,
	storageKeys: Record<string, true>,
	area: 'localStorage' | 'sessionStorage',
): void {
	for (const key of sortedKeys(storageKeys)) {
		addObservation({
			kind: 'storage',
			key,
			value: true,
			attributes: { area },
		});
	}
}

function addDnsObservations(addObservation: ObservationAppender, signals: PageSignals): void {
	for (const recordType of DNS_RECORD_ORDER) {
		for (const value of signals.dnsRecords[recordType] ?? []) {
			addTextObservation(addObservation, 'dns', value, { recordType }, recordType, 'background-enrichment');
		}
	}
}

/** Convert unknown page-global values into stable replay-safe scalars. */
function toObservationValue(value: unknown): ObservationValue {
	if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
		return value;
	}
	if (value === null) {
		return 'null';
	}
	if (value === undefined) {
		return 'undefined';
	}

	return Object.prototype.toString.call(value);
}

function compactAttributes(
	attributes: Record<string, ObservationValue | undefined>,
): ObservationAttributes {
	const compacted: ObservationAttributes = {};
	for (const [key, value] of Object.entries(attributes)) {
		if (value !== undefined && value !== '') {
			compacted[key] = value;
		}
	}

	return compacted;
}

function sortedEntries<T>(record: Record<string, T>): [string, T][] {
	return Object.entries(record).sort(([left], [right]) => left.localeCompare(right));
}

function sortedKeys(record: Record<string, unknown>): string[] {
	return Object.keys(record).sort((left, right) => left.localeCompare(right));
}
