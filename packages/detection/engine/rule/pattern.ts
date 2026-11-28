import type { Evidence, ResourceSignal, RequestSignal } from "../../types.ts";
import type { PatternMatchRule, EvidenceMatchMetadata } from "./types.ts";
import { execDetectionPattern } from "../../pattern.ts";
import { extractVersion } from "../../version.ts";
import { redactEvidenceValue } from "../../privacy/redaction.ts";
import { SOURCE_LIMITS } from "../../limits.ts";

/** Return the first matching input value, preserving collector order as the evidence-selection policy. */
export function matchStringList(
	rule: PatternMatchRule,
	values: readonly string[],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	for (const value of values) {
		const match = matchPattern(rule, value, confidence, metadata);
		if (match) {
			return match;
		}
	}
	return null;
}

/** Match resource URLs only; timing and resource-type fields do not participate in this rule path. */
export function matchResourceSignals(
	rule: PatternMatchRule,
	resources: readonly ResourceSignal[],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	return matchStringList(rule, resources.map((resource) => resource.url), confidence, metadata);
}

/** Match request URLs only, leaving request-header rules to their dedicated matcher. */
export function matchRequestSignals(
	rule: PatternMatchRule,
	requests: readonly RequestSignal[],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	return matchStringList(rule, requests.map((request) => request.url), confidence, metadata);
}

/** Execute a configured pattern and emit bounded, redacted evidence plus its version capture; absent or unmatched patterns return null. */
export function matchPattern(
	rule: PatternMatchRule,
	value: string,
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	if (!rule.pattern) {
		return null;
	}

	const match = execDetectionPattern(rule.pattern, value) as RegExpMatchArray | null;
	if (!match) {
		return null;
	}

	return {
		kind: rule.kind,
		matchedValue: safeMatchedValue(match[0]),
		confidence,
		version: extractVersion(rule.version, match, match[0]),
		ruleDescription: rule.description,
		...metadata,
	};
}

/** Join stable technology ID and rule position using the same identity as precomputed HTML probes. */
export function htmlProbeKey(technologyId: string, ruleIndex: number): string {
	return `${technologyId}:${ruleIndex}`;
}

/** Redact sensitive evidence text and enforce the shared evidence-value character limit. */
export function safeMatchedValue(value: string): string {
	return redactEvidenceValue(value, SOURCE_LIMITS.evidenceValueChars);
}
