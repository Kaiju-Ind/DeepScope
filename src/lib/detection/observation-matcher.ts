import type {
	DetectionRunOptions,
	DetectionRule,
	HeaderDetectionRule,
	LinkSignal,
	VersionExtraction,
} from './types';
import type {
	ObservationAttributes,
	ObservationValue,
	NormalizedObservation,
} from '../observations';
import type {
	MatchObservationBatchInput,
	MatchObservationRuleInput,
	ObservationPatternMatch,
	ObservationPatternMatchBatch,
} from './observation-match-types';
import { createEvidenceEntryFromObservation } from '../evidence';
import { redactEvidenceValue } from '../privacy/redaction';
import { extractVersion } from './version';

const EVIDENCE_VALUE_CHAR_LIMIT = 160;

export type {
	MatchObservationBatchInput,
	MatchObservationRuleInput,
	ObservationPatternMatch,
	ObservationPatternMatchBatch,
} from './observation-match-types';

/** Match a normalized observation against one rule and return the pattern event. */
export function matchObservationRule(
	input: MatchObservationRuleInput,
): ObservationPatternMatch | null {
	if (!canMatchRule(input.rule, input.options)) {
		return null;
	}

	const matched = matchRuleObservation({
		technologyId: input.technology.id,
		ruleIndex: input.ruleIndex,
		rule: input.rule,
		observation: input.observation,
	});
	if (!matched) {
		return null;
	}

	const confidence = input.rule.confidence ?? 100;
	const evidence = createEvidenceEntryFromObservation({
		technologyId: input.technology.id,
		observation: input.observation,
		confidence,
		ruleId: input.rule.id,
		ruleDescription: input.rule.description,
		version: matched.version,
		matchedValue: matched.matchedValue,
		attributes: withRuleOrder(matched.attributes, input.ruleIndex),
	});

	return {
		target: input.observation.target,
		technologyId: input.technology.id,
		ruleIndex: input.ruleIndex,
		ruleId: input.rule.id,
		kind: evidence.kind,
		observation: input.observation,
		evidence,
	};
}

/** Match every observation in a batch against a registry without running graph inference. */
export function matchObservationBatch(
	input: MatchObservationBatchInput,
): ObservationPatternMatchBatch {
	const matches: ObservationPatternMatch[] = [];

	for (const observation of input.batch.observations) {
		for (const technology of input.registry) {
			for (const [ruleIndex, rule] of technology.rules.entries()) {
				const match = matchObservationRule({
					technology,
					rule,
					ruleIndex: getRuleSourceIndex(rule, ruleIndex),
					observation,
					options: input.options,
				});
				if (match) {
					matches.push(match);
				}
			}
		}
	}

	return {
		target: input.batch.target,
		observedAt: input.batch.observedAt,
		matches,
		evidenceBatch: {
			target: input.batch.target,
			observedAt: input.batch.observedAt,
			entries: matches.map((match) => match.evidence),
		},
	};
}

interface MatchRuleObservationInput {
	technologyId: string;
	ruleIndex: number;
	rule: DetectionRule;
	observation: NormalizedObservation;
}

interface MatchedObservationValue {
	matchedValue: ObservationValue;
	version?: string;
	attributes?: ObservationAttributes;
}


/**
 * Preserve detector rule order after observations become evidence entries.
 *
 * The observation matcher loops over observations first so it can stream facts
 * later. Carrying the rule index as scalar evidence context lets candidate
 * aggregation restore registry order for evidence, version selection, and replay
 * without widening the public `Evidence` shape.
 */
function withRuleOrder(
	attributes: ObservationAttributes | undefined,
	ruleIndex: number,
): ObservationAttributes {
	return Object.assign({}, attributes, { ruleIndex });
}

function canMatchRule(rule: DetectionRule, options: DetectionRunOptions = {}): boolean {
	if (rule.id && options.disabledRuleIds?.includes(rule.id)) {
		return false;
	}

	return !options.disabledKinds?.includes(rule.kind);
}

function matchRuleObservation(input: MatchRuleObservationInput): MatchedObservationValue | null {
	switch (input.rule.kind) {
		case 'dom':
			return matchDomRule(input.rule, input.observation);
		case 'cookie':
			return matchCookieRule(input.rule, input.observation);
		case 'header':
		case 'responseHeader':
		case 'requestHeader':
			return matchHeaderRule(input.rule, input.observation);
		case 'meta':
			return matchMetaRule(input.rule, input.observation);
		case 'jsGlobal':
			return matchJsGlobalRule(input.rule, input.observation);
		case 'link':
			return matchLinkRule(input.rule, input.observation);
		case 'storage':
			return matchStorageRule(input.rule, input.observation);
		case 'dns':
			return matchDnsRule(input.rule, input.observation);
		case 'html':
			return matchHtmlRule(input);
		default:
			return matchPatternRule(input.rule, input.observation);
	}
}

function matchDomRule(
	rule: Extract<DetectionRule, { kind: 'dom' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'dom' || observation.key !== rule.selector || observation.value !== true) {
		return null;
	}

	return { matchedValue: rule.selector };
}

function matchCookieRule(
	rule: Extract<DetectionRule, { kind: 'cookie' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'cookie' || !observation.key) {
		return null;
	}
	if (rule.key && observation.key !== rule.key) {
		return null;
	}
	if (rule.keyPattern && !testPattern(rule.keyPattern, observation.key)) {
		return null;
	}
	if (!rule.key && !rule.keyPattern) {
		return null;
	}

	return { matchedValue: safeMatchedValue(observation.key) };
}

function matchHeaderRule(
	rule: HeaderDetectionRule,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (!isHeaderObservationForRule(rule, observation)) {
		return null;
	}
	if ((observation.key ?? '').toLowerCase() !== rule.key.toLowerCase()) {
		return null;
	}

	const value = String(observation.value);
	if (rule.valuePattern) {
		return matchPatternValue(rule.valuePattern, value, rule.version);
	}

	return { matchedValue: safeMatchedValue(rule.key) };
}

function matchMetaRule(
	rule: Extract<DetectionRule, { kind: 'meta' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'meta' || (observation.key ?? '').toLowerCase() !== rule.key.toLowerCase()) {
		return null;
	}

	const pattern = rule.valuePattern ?? rule.pattern;
	return pattern
		? matchPatternValue(pattern, String(observation.value), rule.version)
		: { matchedValue: safeMatchedValue(String(observation.value)) };
}

function matchJsGlobalRule(
	rule: Extract<DetectionRule, { kind: 'jsGlobal' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'jsGlobal' || observation.key !== rule.property) {
		return null;
	}

	return rule.valuePattern
		? matchPatternValue(rule.valuePattern, String(observation.value), rule.version)
		: { matchedValue: safeMatchedValue(rule.property) };
}

function matchLinkRule(
	rule: Extract<DetectionRule, { kind: 'link' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'link') {
		return null;
	}

	const link = linkSignalFromObservation(observation);
	if (rule.rel && !link.rel.toLowerCase().split(/\s+/).includes(rule.rel.toLowerCase())) {
		return null;
	}
	if (rule.hrefPattern && !testPattern(rule.hrefPattern, link.href)) {
		return null;
	}
	if (rule.typePattern && !testPattern(rule.typePattern, link.type ?? '')) {
		return null;
	}
	if (rule.as && link.as !== rule.as) {
		return null;
	}
	if (rule.hreflangPattern && !testPattern(rule.hreflangPattern, link.hreflang ?? '')) {
		return null;
	}
	if (rule.mediaPattern && !testPattern(rule.mediaPattern, link.media ?? '')) {
		return null;
	}

	const combined = [link.rel, link.type, link.as, link.hreflang, link.media, link.href]
		.filter(Boolean)
		.join(' ');
	if (rule.valuePattern) {
		return matchPatternValue(rule.valuePattern, combined, rule.version);
	}

	return { matchedValue: safeMatchedValue(combined) };
}

function matchStorageRule(
	rule: Extract<DetectionRule, { kind: 'storage' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'storage' || !observation.key) {
		return null;
	}
	if (rule.area && observation.attributes?.area !== rule.area) {
		return null;
	}
	if ((rule.key && observation.key === rule.key) || (rule.keyPattern && testPattern(rule.keyPattern, observation.key))) {
		return { matchedValue: safeMatchedValue(`${observation.attributes?.area ?? 'storage'}:${observation.key}`) };
	}

	return null;
}

function matchDnsRule(
	rule: Extract<DetectionRule, { kind: 'dns' }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== 'dns' || observation.attributes?.recordType !== rule.recordType) {
		return null;
	}

	return matchPatternValue(rule.valuePattern, String(observation.value), rule.version);
}

function matchHtmlRule(input: MatchRuleObservationInput): MatchedObservationValue | null {
	if (input.observation.kind === 'htmlMatch') {
		if (input.observation.key !== htmlProbeKey(input.technologyId, input.ruleIndex)) {
			return null;
		}

		return matchPatternValue(input.rule.pattern, String(input.observation.value), input.rule.version)
			?? { matchedValue: safeMatchedValue(String(input.observation.value)) };
	}

	return matchPatternRule(input.rule, input.observation);
}

function matchPatternRule(
	rule: Extract<DetectionRule, { pattern?: RegExp; version?: VersionExtraction }>,
	observation: NormalizedObservation,
): MatchedObservationValue | null {
	if (observation.kind !== rule.kind) {
		return null;
	}

	return matchPatternValue(rule.pattern, String(observation.value), rule.version);
}

function matchPatternValue(
	pattern: RegExp | undefined,
	value: string,
	version?: VersionExtraction,
): MatchedObservationValue | null {
	if (!pattern) {
		return null;
	}

	const match = execPattern(pattern, value);
	if (!match) {
		return null;
	}

	return {
		matchedValue: safeMatchedValue(match[0]),
		version: extractVersion(version, match, match[0]),
	};
}

function isHeaderObservationForRule(
	rule: HeaderDetectionRule,
	observation: NormalizedObservation,
): boolean {
	if (rule.kind === observation.kind) {
		return true;
	}

	// Current extension snapshots normalize background response headers as `header`.
	// Keep `responseHeader` rules compatible until collection emits both surfaces.
	return rule.kind === 'responseHeader' && observation.kind === 'header';
}

function linkSignalFromObservation(observation: NormalizedObservation): LinkSignal {
	return {
		rel: String(observation.attributes?.rel ?? observation.key ?? ''),
		href: String(observation.value),
		type: optionalString(observation.attributes?.type),
		as: optionalString(observation.attributes?.as),
		media: optionalString(observation.attributes?.media),
		hreflang: optionalString(observation.attributes?.hreflang),
		crossOrigin: optionalString(observation.attributes?.crossOrigin),
	};
}

function optionalString(value: ObservationValue | undefined): string | undefined {
	return value === undefined ? undefined : String(value);
}


/** Prefer a generated shard's full-registry rule index when one is present. */
function getRuleSourceIndex(rule: DetectionRule, fallbackRuleIndex: number): number {
	return typeof rule.sourceRuleIndex === 'number' ? rule.sourceRuleIndex : fallbackRuleIndex;
}

function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}

function safeMatchedValue(value: string): string {
	return redactEvidenceValue(value, EVIDENCE_VALUE_CHAR_LIMIT);
}

/**
 * Execute regexes without leaking `lastIndex` across observations.
 *
 * Registry rules occasionally use global or sticky flags. Resetting around each
 * match keeps replay deterministic when the same compiled `RegExp` instance is
 * reused for many observations.
 */
function execPattern(pattern: RegExp, value: string): RegExpMatchArray | null {
	pattern.lastIndex = 0;
	const match = pattern.exec(value) as RegExpMatchArray | null;
	pattern.lastIndex = 0;
	return match;
}

function testPattern(pattern: RegExp, value: string): boolean {
	return Boolean(execPattern(pattern, value));
}
