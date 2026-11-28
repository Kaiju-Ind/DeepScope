import type { DetectionRule } from "@deepscope/registry/rules";
import type { LinkSignal, Evidence } from "../../types.ts";
import { testDetectionPattern } from "../../pattern.ts";
import type { EvidenceMatchMetadata } from "./types.ts";
import { matchPattern, safeMatchedValue } from "./pattern.ts";

/** Require every configured link attribute constraint, then optionally match their combined text and return the first accepted link. */
export function matchLinkRule(
	rule: Extract<DetectionRule, { kind: 'link' }>,
	links: readonly LinkSignal[],
	confidence: number,
	metadata: EvidenceMatchMetadata,
): Evidence | null {
	for (const link of links) {
		if (rule.rel && !link.rel.toLowerCase().split(/\s+/).includes(rule.rel.toLowerCase())) {
			continue;
		}

		if (rule.hrefPattern && !testDetectionPattern(rule.hrefPattern, link.href)) {
			continue;
		}

		if (rule.typePattern && !testDetectionPattern(rule.typePattern, link.type ?? '')) {
			continue;
		}

		if (rule.as && link.as !== rule.as) {
			continue;
		}

		if (rule.hreflangPattern && !testDetectionPattern(rule.hreflangPattern, link.hreflang ?? '')) {
			continue;
		}

		if (rule.mediaPattern && !testDetectionPattern(rule.mediaPattern, link.media ?? '')) {
			continue;
		}

		const combined = `${link.rel} ${link.type ?? ''} ${link.as ?? ''} ${link.hreflang ?? ''} ${link.media ?? ''} ${link.href}`.trim();
		if (rule.valuePattern) {
			const match = matchPattern(
				{ kind: 'link', pattern: rule.valuePattern, version: rule.version, description: rule.description },
				combined,
				confidence,
				metadata,
			);
			if (!match) {
				continue;
			}
			return match;
		}

		return {
			kind: 'link',
			matchedValue: safeMatchedValue(combined),
			confidence,
			ruleDescription: rule.description,
			...metadata,
		};
	}

	return null;
}
