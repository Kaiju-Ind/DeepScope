import type { DetectionRule, HeaderDetectionRule } from "@deepscope/registry/rules";
import type { Evidence, RequestSignal, PageSignals, StorageSignals } from "../../types.ts";
import { testDetectionPattern, execDetectionPattern } from "../../pattern.ts";
import type { EvidenceMatchMetadata } from "./types.ts";
import { safeMatchedValue, matchPattern } from "./pattern.ts";
import { extractVersion } from "../../version.ts";

/** Match cookie names by exact key or key pattern; cookie values are never needed or exposed. */
export function matchCookieRule(
	rule: Extract<DetectionRule, { kind: 'cookie' }>,
	cookies: Record<string, true>,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	for (const cookieName of Object.keys(cookies)) {
		if (rule.key && cookieName === rule.key) {
			return {
				kind: 'cookie',
				matchedValue: safeMatchedValue(cookieName),
				confidence,
				ruleDescription: rule.description,
				observationKey: rule.key,
				...metadata,
			};
		}

		if (rule.keyPattern ? testDetectionPattern(rule.keyPattern, cookieName) : false) {
			return {
				kind: 'cookie',
				matchedValue: safeMatchedValue(cookieName),
				confidence,
				ruleDescription: rule.description,
				...metadata,
			};
		}
	}

	return null;
}

/** Use a lowercase header lookup and optionally match its value; presence-only rules expose the key rather than the value. */
export function matchHeaderRule(
	rule: HeaderDetectionRule,
	headers: Record<string, string>,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	const value = headers[rule.key.toLowerCase()];
	if (value === undefined) {
		return null;
	}

	if (rule.valuePattern) {
		const match = matchPattern({ ...rule, pattern: rule.valuePattern }, value, confidence, metadata);
		return match ? { ...match, observationKey: rule.key } : null;
	}

	return {
		kind: rule.kind,
		matchedValue: safeMatchedValue(rule.key),
		confidence,
		ruleDescription: rule.description,
		observationKey: rule.key,
		...metadata,
	};
}

/** Inspect request headers in collector order and use the first present requested header for this rule. */
export function matchRequestHeaderRule(
	rule: HeaderDetectionRule,
	requests: readonly RequestSignal[],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	for (const request of requests) {
		const value = request.requestHeaders?.[rule.key.toLowerCase()];
		if (value === undefined) {
			continue;
		}

		if (rule.valuePattern) {
			const match = matchPattern({ ...rule, pattern: rule.valuePattern }, value, confidence, metadata);
			return match ? { ...match, observationKey: rule.key } : null;
		}

		return {
			kind: 'requestHeader',
			matchedValue: safeMatchedValue(rule.key),
			confidence,
			ruleDescription: rule.description,
			observationKey: rule.key,
			...metadata,
		};
	}

	return null;
}

/** Match values for a lowercase meta key, accepting presence when the rule has no value pattern. */
export function matchMetaRule(
	rule: Extract<DetectionRule, { kind: 'meta' }>,
	signals: PageSignals,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	const values = signals.meta[rule.key.toLowerCase()] ?? [];
	const pattern = rule.valuePattern ?? rule.pattern;

	for (const value of values) {
		if (!pattern) {
			return {
				kind: 'meta',
				matchedValue: safeMatchedValue(value),
				confidence,
				ruleDescription: rule.description,
				observationKey: rule.key,
				...metadata,
			};
		}

		const match = matchPattern({ ...rule, pattern }, value, confidence, metadata);
		if (match) {
			return { ...match, observationKey: rule.key };
		}
	}
	return null;
}

/** Reject absent/null globals and match their string form only when the rule requests value evidence. */
export function matchGlobalRule(
	rule: Extract<DetectionRule, { kind: 'jsGlobal' }>,
	globals: Record<string, unknown>,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	const value = globals[rule.property];
	if (value === undefined || value === null) {
		return null;
	}

	const valueString = String(value);
	if (rule.valuePattern) {
		const match = matchPattern({ ...rule, pattern: rule.valuePattern }, valueString, confidence, metadata);
		return match ? { ...match, observationKey: rule.property } : null;
	}

	return {
		kind: rule.kind,
		matchedValue: safeMatchedValue(rule.property),
		confidence,
		ruleDescription: rule.description,
		observationKey: rule.property,
		...metadata,
	};
}

/** Match storage key names in the requested area, or local then session storage when no area is specified. */
export function matchStorageRule(
	rule: Extract<DetectionRule, { kind: 'storage' }>,
	storage: StorageSignals,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	const areas = rule.area ? [rule.area] : (['localStorage', 'sessionStorage'] as const);

	for (const area of areas) {
		for (const key of Object.keys(storage[area])) {
			if ((rule.key && key === rule.key) || (rule.keyPattern ? testDetectionPattern(rule.keyPattern, key) : false)) {
				return {
					kind: 'storage',
					matchedValue: safeMatchedValue(`${area}:${key}`),
					confidence,
					ruleDescription: rule.description,
					observationKey: key,
					attributes: { ...metadata.attributes, area },
					...metadata,
				};
			}
		}
	}

	return null;
}

/** Match records of the requested DNS type and retain bounded evidence plus any version capture. */
export function matchDnsRule(
	rule: Extract<DetectionRule, { kind: 'dns' }>,
	dnsRecords: PageSignals['dnsRecords'],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	const values = dnsRecords[rule.recordType] ?? [];
	for (const value of values) {
		const match = execDetectionPattern(rule.valuePattern, value) as RegExpMatchArray | null;
		if (!match) {
			continue;
		}

		return {
			kind: 'dns',
			matchedValue: safeMatchedValue(match[0]),
			confidence,
			version: extractVersion(rule.version, match, match[0]),
			ruleDescription: rule.description,
			...metadata,
		};
	}
	return null;
}
