import type { TechnologyDefinition } from "@deepscope/registry/types";
import type { RulePerformanceFixture, RuleProfileCase, RuleProfileTarget, RuleProfileExpectedOutcome, RuleProfileCaseOrigin } from "./types.ts";
import { findRuleProfileTarget, collectRuleProfileTargets } from "./catalog.ts";
import { makeRuleProfileObservation, makeReactRouterHydrationPayload } from "./observations.ts";
import type { NormalizedObservation, NormalizedObservationKind } from "../observations/index.ts";
import { profileRuleCase } from "./index.ts";
import type { DetectionRule } from "@deepscope/registry/rules";
import { isDetectionPattern } from "../pattern.ts";

/** Convert hand-authored pass/fail fixtures into semantic benchmark cases. */
export function createCuratedRuleProfileCases(input: {
	readonly registry: readonly TechnologyDefinition[];
	readonly fixtures: readonly RulePerformanceFixture[];
}): readonly RuleProfileCase[] {
	return input.fixtures.flatMap((fixture) => {
		const target = findRuleProfileTarget(input.registry, fixture.technologyId, fixture.ruleId);
		const label = `${fixture.ruleId} ${fixture.note}`;
		const failValues = [
			{ label: 'hydration', value: fixture.failValue },
			...(fixture.additionalFailValues ?? []),
		];

		return [
			{
				target,
				scenario: `passing sample: ${label}`,
				expected: 'match',
				origin: 'curated',
				observation: makeRuleProfileObservation(fixture.kind, fixture.passValue),
			},
			...failValues.map((failValue): RuleProfileCase => ({
				target,
				scenario: `failing ${failValue.label} sample: ${label}`,
				expected: 'miss',
				origin: 'curated',
				observation: makeRuleProfileObservation(fixture.kind, failValue.value),
			})),
		] satisfies readonly RuleProfileCase[];
	});
}

/** Create one generated miss case for every registry rule. */
export function createGeneratedRuleMissCases(
	registry: readonly TechnologyDefinition[],
	options: { readonly contentPayloadChars?: number } = {},
): readonly RuleProfileCase[] {
	const cases: RuleProfileCase[] = [];
	for (const target of collectRuleProfileTargets(registry)) {
		const profileCase = createVerifiedGeneratedCase({
			target,
			scenario: `generated miss: ${target.ruleId}`,
			expected: 'miss',
			observations: createGeneratedMissObservationCandidates(target, options.contentPayloadChars),
		});
		if (profileCase) {
			cases.push(profileCase);
		}
	}
	return cases;
}

/** Create generated pass cases for rules whose structural match condition is unambiguous. */
export function createGeneratedRulePassCases(
	registry: readonly TechnologyDefinition[],
): readonly RuleProfileCase[] {
	const cases: RuleProfileCase[] = [];
	for (const target of collectRuleProfileTargets(registry)) {
		const observation = createGeneratedPassObservation(target);
		if (!observation) {
			continue;
		}
		const profileCase = createVerifiedGeneratedCase({
			target,
			scenario: `generated pass: ${target.ruleId}`,
			expected: 'match',
			observations: [observation],
		});
		if (profileCase) {
			cases.push(profileCase);
		}
	}
	return cases;
}

/** Create registry-wide payload scans for high-risk content-like rule surfaces. */
export function createPayloadScanCases(input: {
	readonly registry: readonly TechnologyDefinition[];
	readonly scenario: string;
	readonly payload: string;
}): readonly RuleProfileCase[] {
	const cases: RuleProfileCase[] = [];
	for (const target of collectRuleProfileTargets(input.registry)) {
		if (!isPayloadScanKind(target.rule.kind) || !hasPatternLikeMatcher(target.rule)) {
			continue;
		}
		const profileCase = createVerifiedGeneratedCase({
			target,
			scenario: `${input.scenario}: ${target.ruleId}`,
			expected: 'miss',
			origin: 'payload-scan',
			observations: [makeRuleProfileObservation(target.rule.kind, input.payload)],
		});
		if (profileCase) {
			cases.push(profileCase);
		}
	}
	return cases;
}


/** Accept the first generated observation whose real matcher result agrees with the proposed expectation; discard unverifiable cases. */
function createVerifiedGeneratedCase(input: {
	readonly target: RuleProfileTarget;
	readonly scenario: string;
	readonly expected: RuleProfileExpectedOutcome;
	readonly observations: readonly NormalizedObservation[];
	readonly origin?: RuleProfileCaseOrigin;
}): RuleProfileCase | undefined {
	for (const observation of input.observations) {
		const profileCase: RuleProfileCase = {
			target: input.target,
			scenario: input.scenario,
			expected: input.expected,
			origin: input.origin ?? 'generated',
			observation,
		};
		const record = profileRuleCase(profileCase);
		if ((input.expected === 'match') === record.matched) {
			return profileCase;
		}
	}
	return undefined;
}

/** Build kind-appropriate miss candidates, including large payload scans; callers verify each candidate with the real matcher. */
function createGeneratedMissObservationCandidates(
	target: RuleProfileTarget,
	contentPayloadChars?: number,
): readonly NormalizedObservation[] {
	const missId = `__kaiju_site_scope_miss_${target.technology.id}_${target.ruleId}`;
	const missValue = `${missId}_value__`;

	switch (target.rule.kind) {
		case 'dom':
			return [makeRuleProfileObservation('dom', false, { key: target.rule.selector })];
		case 'cookie':
			return [makeRuleProfileObservation('cookie', true, { key: missId })];
		case 'header':
		case 'requestHeader':
		case 'responseHeader':
			return target.rule.valuePattern
				? [
					makeRuleProfileObservation(target.rule.kind, missValue, { key: target.rule.key }),
					makeRuleProfileObservation(target.rule.kind, missValue, { key: missId }),
				]
				: [makeRuleProfileObservation(target.rule.kind, missValue, { key: missId })];
		case 'meta':
			return target.rule.valuePattern || target.rule.pattern
				? [
					makeRuleProfileObservation('meta', missValue, { key: target.rule.key }),
					makeRuleProfileObservation('meta', missValue, { key: missId }),
				]
				: [makeRuleProfileObservation('meta', missValue, { key: missId })];
		case 'jsGlobal':
			return target.rule.valuePattern
				? [
					makeRuleProfileObservation('jsGlobal', missValue, { key: target.rule.property }),
					makeRuleProfileObservation('jsGlobal', missValue, { key: missId }),
				]
				: [makeRuleProfileObservation('jsGlobal', missValue, { key: missId })];
		case 'link':
			return [makeRuleProfileObservation('link', `https://static.example.invalid/${missId}.css`, {
				key: missId,
				attributes: {
					rel: missId,
					type: 'text/plain',
					as: 'fetch',
				},
			})];
		case 'storage':
			return [makeRuleProfileObservation('storage', true, { key: missId })];
		case 'dns':
			return [makeRuleProfileObservation('dns', missValue, { attributes: { recordType: target.rule.recordType } })];
		case 'scriptContent':
		case 'stylesheetContent':
		case 'html':
		case 'text':
			return [
				makeRuleProfileObservation(target.rule.kind, makeReactRouterHydrationPayload(contentPayloadChars)),
				makeRuleProfileObservation(target.rule.kind, ''),
			];
		case 'scriptSrc':
		case 'imageSrc':
		case 'stylesheetHref':
		case 'resourceUrl':
		case 'requestUrl':
		case 'url':
		case 'robots':
		case 'certIssuer':
		case 'probe':
			return [
				makeRuleProfileObservation(target.rule.kind, `https://static.example.invalid/${missId}.js`),
				makeRuleProfileObservation(target.rule.kind, ''),
			];
	}
}

/** Generate positive presence-only facts where rule metadata is sufficient; pattern-dependent rules require authored evidence. */
function createGeneratedPassObservation(target: RuleProfileTarget): NormalizedObservation | undefined {
	switch (target.rule.kind) {
		case 'dom':
			return makeRuleProfileObservation('dom', true, { key: target.rule.selector });
		case 'cookie':
			return target.rule.key
				? makeRuleProfileObservation('cookie', true, { key: target.rule.key })
				: undefined;
		case 'header':
		case 'requestHeader':
		case 'responseHeader':
			return target.rule.valuePattern
				? undefined
				: makeRuleProfileObservation(target.rule.kind, target.rule.key, { key: target.rule.key });
		case 'meta':
			return target.rule.pattern || target.rule.valuePattern
				? undefined
				: makeRuleProfileObservation('meta', target.rule.key, { key: target.rule.key });
		case 'jsGlobal':
			return target.rule.valuePattern
				? undefined
				: makeRuleProfileObservation('jsGlobal', true, { key: target.rule.property });
		case 'storage':
			return target.rule.key
				? makeRuleProfileObservation('storage', true, { key: target.rule.key })
				: undefined;
		default:
			return undefined;
	}
}

/** Select content surfaces that need long-string timing cases instead of short scalar URL fixtures. */
function isPayloadScanKind(kind: NormalizedObservationKind): boolean {
	switch (kind) {
		case 'scriptContent':
		case 'stylesheetContent':
		case 'html':
		case 'text':
			return true;
		default:
			return false;
	}
}

/** Require an actual supported pattern object before deriving pattern-specific profile cases. */
function hasPatternLikeMatcher(rule: DetectionRule): boolean {
	return 'pattern' in rule && isDetectionPattern(rule.pattern);
}
