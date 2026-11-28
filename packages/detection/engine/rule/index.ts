import type { RuntimeDetectionKind, DetectionRule } from "@deepscope/registry/rules";
import type { PageSignals, DetectionRunOptions, Evidence } from "../../types.ts";
import { extractVersion } from "../../version.ts";
import { htmlProbeKey, safeMatchedValue, matchPattern, matchStringList, matchResourceSignals, matchRequestSignals } from "./pattern.ts";
import { matchCookieRule, matchHeaderRule, matchRequestHeaderRule, matchMetaRule, matchGlobalRule, matchStorageRule, matchDnsRule } from "./properties.ts";
import { matchLinkRule } from "./link.ts";
import type { EvidenceMatchMetadata } from "./types.ts";

export const runtimeDetectionKinds = [
	'dom',
	'html',
	'imageSrc',
	'scriptSrc',
	'stylesheetHref',
	'resourceUrl',
	'requestUrl',
	'scriptContent',
	'stylesheetContent',
	'cookie',
	'header',
	'responseHeader',
	'requestHeader',
	'jsGlobal',
	'meta',
	'link',
	'storage',
	'url',
	'text',
	'robots',
	'dns',
	'certIssuer',
	'probe',
] as const satisfies readonly RuntimeDetectionKind[];

/**
 * Match one normalized signal rule. Evidence is intentionally small/redacted so
 * cached analyses do not become raw page-content storage.
 */
export function matchRule(
	technologyId: string,
	ruleIndex: number,
	rule: DetectionRule,
	signals: PageSignals,
	options: DetectionRunOptions,
): Evidence | null {
	if (!canExecuteRule(rule, signals, options)) {
		return null;
	}

	const confidence = rule.confidence ?? 100;
	const metadata = ruleEvidenceMetadata(rule, ruleIndex);

	switch (rule.kind) {
		case 'dom': {
			if (!rule.selector || !signals.dom.selectors[rule.selector]) {
				return null;
			}

			return {
				kind: 'dom',
				confidence,
				ruleDescription: rule.description,
				matchedValue: rule.selector,
				...metadata,
			};
		}

		case 'html': {
			const htmlMatch = signals.htmlMatches?.[htmlProbeKey(technologyId, ruleIndex)];
			if (htmlMatch) {
				return {
					kind: 'html',
					matchedValue: safeMatchedValue(htmlMatch.matchedValue),
					confidence,
					version: extractVersion(
						rule.version,
						[htmlMatch.matchedValue, ...htmlMatch.captures] as unknown as RegExpMatchArray,
						htmlMatch.matchedValue,
					),
					ruleDescription: rule.description,
					...metadata,
				};
			}

			return matchPattern(rule, signals.html, confidence, metadata);
		}

		case 'imageSrc':
			return matchStringList(rule, signals.images ?? [], confidence, metadata);

		case 'scriptSrc':
			return matchStringList(rule, signals.scripts, confidence, metadata);

		case 'stylesheetHref':
			return matchStringList(rule, signals.stylesheets, confidence, metadata);

		case 'resourceUrl':
			return matchResourceSignals(rule, signals.resources, confidence, metadata);

		case 'requestUrl':
			return matchRequestSignals(rule, signals.requests, confidence, metadata);

		case 'scriptContent':
			return matchStringList(rule, signals.scriptContents, confidence, metadata);

		case 'stylesheetContent':
			return matchStringList(rule, signals.stylesheetContents, confidence, metadata);

		case 'cookie':
			return matchCookieRule(rule, signals.cookies, confidence, metadata);

		case 'header':
		case 'responseHeader':
			return matchHeaderRule(rule, signals.headers, confidence, metadata);

		case 'requestHeader':
			return matchRequestHeaderRule(rule, signals.requests, confidence, metadata);

		case 'meta':
			return matchMetaRule(rule, signals, confidence, metadata);

		case 'jsGlobal':
			return matchGlobalRule(rule, signals.jsGlobals, confidence, metadata);

		case 'link':
			return matchLinkRule(rule, signals.links, confidence, metadata);

		case 'storage':
			return matchStorageRule(rule, signals.storage, confidence, metadata);

		case 'url':
			return matchPattern(rule, signals.url, confidence, metadata);

		case 'text':
			return matchPattern(rule, signals.text, confidence, metadata);

		case 'robots':
			return matchPattern(rule, signals.robotsTxt, confidence, metadata);

		case 'dns':
			return matchDnsRule(rule, signals.dnsRecords, confidence, metadata);

		case 'certIssuer':
			return matchPattern(rule, signals.certIssuer, confidence, metadata);

		case 'probe':
			return matchStringList(rule, signals.probeResults, confidence, metadata);

		default:
			return null;
	}
}

/** Skip disabled rule IDs, disabled kinds and kinds that this runtime cannot execute. */
function canExecuteRule(
	rule: DetectionRule,
	signals: PageSignals,
	options: DetectionRunOptions,
): boolean {
	if (rule.id && options.disabledRuleIds?.includes(rule.id)) {
		return false;
	}

	if (options.disabledKinds?.includes(rule.kind)) {
		return false;
	}

	if (!runtimeDetectionKinds.includes(rule.kind as (typeof runtimeDetectionKinds)[number])) {
		return false;
	}

	return true;
}

/** Mark this match as direct evidence and retain its rule position for later source diagnostics. */
function ruleEvidenceMetadata(_rule: DetectionRule, ruleIndex: number): EvidenceMatchMetadata {
	return { direct: true, attributes: { ruleIndex } };
}
