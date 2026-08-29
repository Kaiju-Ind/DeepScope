import { matchObservationRule } from './observation-matcher';
import type { DetectionRule, TechnologyDefinition } from './types';
import type { NormalizedObservation, NormalizedObservationKind } from '../observations';
import { isDetectionPattern } from './pattern';

/** Target document reused by generated rule-profile observations. */
export const RULE_PROFILE_TARGET = {
	url: 'https://example.com/products',
	hostname: 'example.com',
} as const;

/** Default large-payload size used to make content-rule misses expose regex backtracking cost. */
export const DEFAULT_RULE_PROFILE_PAYLOAD_CHARS = 24_000;

/** Kind of semantic outcome a rule-profile case is expected to produce. */
export type RuleProfileExpectedOutcome = 'match' | 'miss';

/** Source of a benchmark case. */
export type RuleProfileCaseOrigin = 'curated' | 'generated' | 'payload-scan';

/** Registry rule paired with its owning technology and stable source order. */
export interface RuleProfileTarget {
	/** Technology that owns the profiled rule. */
	readonly technology: TechnologyDefinition;
	/** Rule evaluated by the benchmark case. */
	readonly rule: DetectionRule;
	/** Rule index inside the owning technology definition. */
	readonly ruleIndex: number;
	/** Stable rule identifier used in reports and budget failures. */
	readonly ruleId: string;
}

/** One rule benchmark case with a concrete observation and expected result. */
export interface RuleProfileCase {
	/** Rule target evaluated by the case. */
	readonly target: RuleProfileTarget;
	/** Stable scenario label printed by Vitest and slow-rule reports. */
	readonly scenario: string;
	/** Whether the case should match or miss when the rule behaves correctly. */
	readonly expected: RuleProfileExpectedOutcome;
	/** Whether the case came from a hand-authored fixture or generated coverage. */
	readonly origin: RuleProfileCaseOrigin;
	/** Observation fed directly into the semantic one-rule matcher. */
	readonly observation: NormalizedObservation;
}

/** Summary of generated benchmark coverage for the current registry. */
export interface RuleProfileCoverageSummary {
	/** Number of technologies represented in the scanned registry. */
	readonly technologyCount: number;
	/** Number of rules represented in the scanned registry. */
	readonly ruleCount: number;
	/** Number of generated miss cases created for registry rules. */
	readonly generatedMissCaseCount: number;
	/** Number of generated pass cases created for rules with safe structural fixtures. */
	readonly generatedPassCaseCount: number;
	/** Rules whose match shape cannot safely produce a generated miss case. */
	readonly generatedMissUncoveredRuleCount: number;
	/** Rules whose match shape cannot safely produce a generated pass case. */
	readonly generatedPassUncoveredRuleCount: number;
	/** Number of hand-authored benchmark fixtures loaded by the caller. */
	readonly curatedFixtureCount: number;
}

/** Hand-authored performance fixture consumed by benchmark and regression tests. */
export interface RulePerformanceFixture {
	/** Technology that owns the fixture target. */
	readonly technologyId: string;
	/** Rule id targeted by the fixture. */
	readonly ruleId: string;
	/** Observation kind produced by the fixture. */
	readonly kind: NormalizedObservationKind;
	/** Value expected to make the rule match. */
	readonly passValue: string;
	/** Value expected to make the rule miss. */
	readonly failValue: string;
	/** Extra miss samples that protect near-match false positives for risky rules. */
	readonly additionalFailValues?: readonly RulePerformanceFailValue[];
	/** Human-readable note that explains the performance risk being profiled. */
	readonly note: string;
}

/** Named miss sample used when one hydration blob is not enough to protect rule accuracy. */
export interface RulePerformanceFailValue {
	/** Short label appended to the benchmark scenario and failure diagnostics. */
	readonly label: string;
	/** Value expected to miss the targeted rule. */
	readonly value: string;
}

/** Build coverage counters for the registry-wide rule profile. */
export function summarizeRuleProfileCoverage(input: {
	readonly registry: readonly TechnologyDefinition[];
	readonly generatedMissCases: readonly RuleProfileCase[];
	readonly generatedPassCases: readonly RuleProfileCase[];
	readonly curatedFixtures: readonly RulePerformanceFixture[];
}): RuleProfileCoverageSummary {
	return {
		technologyCount: input.registry.length,
		ruleCount: countRegistryRules(input.registry),
		generatedMissCaseCount: input.generatedMissCases.length,
		generatedPassCaseCount: input.generatedPassCases.length,
		generatedMissUncoveredRuleCount: countRegistryRules(input.registry) - input.generatedMissCases.length,
		generatedPassUncoveredRuleCount: countRegistryRules(input.registry) - input.generatedPassCases.length,
		curatedFixtureCount: input.curatedFixtures.length,
	};
}

/** Collect every rule in registry order with a stable report id. */
export function collectRuleProfileTargets(
	registry: readonly TechnologyDefinition[],
): readonly RuleProfileTarget[] {
	const targets: RuleProfileTarget[] = [];
	for (const technology of registry) {
		for (const [ruleIndex, rule] of technology.rules.entries()) {
			targets.push({
				technology,
				rule,
				ruleIndex: getRuleSourceIndex(rule, ruleIndex),
				ruleId: getRuleId(rule, ruleIndex),
			});
		}
	}
	return targets;
}

/** Resolve a hand-authored fixture to a concrete registry rule. */
export function findRuleProfileTarget(
	registry: readonly TechnologyDefinition[],
	technologyId: string,
	ruleId: string,
): RuleProfileTarget {
	const technology = registry.find((candidate) => candidate.id === technologyId);
	if (!technology) {
		throw new Error(`Missing technology fixture target: ${technologyId}`);
	}

	const ruleIndex = technology.rules.findIndex((candidate) => candidate.id === ruleId);
	const rule = technology.rules[ruleIndex];
	if (!rule) {
		throw new Error(`Missing rule fixture target: ${technologyId}/${ruleId}`);
	}

	return {
		technology,
		rule,
		ruleIndex: getRuleSourceIndex(rule, ruleIndex),
		ruleId: getRuleId(rule, ruleIndex),
	};
}

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

/** Execute one rule case through the production semantic matcher without timing it. */
export function evaluateRuleProfileCase(input: RuleProfileCase): boolean {
	return Boolean(matchObservationRule({
		technology: input.target.technology,
		rule: input.target.rule,
		ruleIndex: input.target.ruleIndex,
		observation: input.observation,
	}));
}


/** Create a normalized observation for a rule-profile case. */
export function makeRuleProfileObservation(
	kind: NormalizedObservationKind,
	value: string | number | boolean,
	options: {
		readonly key?: string;
		readonly attributes?: NormalizedObservation['attributes'];
	} = {},
): NormalizedObservation {
	return {
		kind,
		interface: 'test',
		collector: 'test-fixture',
		target: RULE_PROFILE_TARGET,
		observedAt: 1_700_000_000_000,
		...(options.key === undefined ? {} : { key: options.key }),
		value,
		...(options.attributes === undefined ? {} : { attributes: options.attributes }),
	};
}

/** Build a React Router-style hydration payload that should miss technology markers. */
export function makeReactRouterHydrationPayload(
	length: number = getConfiguredHydrationPayloadLength(process.env.KAIJU_DEEPSCOPE_RULE_BENCH_PAYLOAD_CHARS),
): string {
	const bodyLength = Math.max(0, length);
	return `window.__reactRouterContext.streamController.enqueue("${'x'.repeat(bodyLength)}");`;
}

/** Build a Next.js-style hydration payload that should miss unrelated technology markers. */
export function makeNextHydrationPayload(
	length: number = getConfiguredHydrationPayloadLength(process.env.KAIJU_DEEPSCOPE_RULE_BENCH_PAYLOAD_CHARS),
): string {
	const bodyLength = Math.max(0, length);
	return `self.__next_f.push([1,"${'x'.repeat(bodyLength)}"]);`;
}


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
		const matched = evaluateRuleProfileCase(profileCase);
		if ((input.expected === 'match') === matched) {
			return profileCase;
		}
	}
	return undefined;
}

function countRegistryRules(registry: readonly TechnologyDefinition[]): number {
	return registry.reduce((count, technology) => count + technology.rules.length, 0);
}

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

function hasPatternLikeMatcher(rule: DetectionRule): boolean {
	return 'pattern' in rule && isDetectionPattern(rule.pattern);
}

function getRuleId(rule: DetectionRule, ruleIndex: number): string {
	return rule.id ?? `rule:${ruleIndex}`;
}

function getRuleSourceIndex(rule: DetectionRule, fallbackRuleIndex: number): number {
	return typeof rule.sourceRuleIndex === 'number' ? rule.sourceRuleIndex : fallbackRuleIndex;
}

function getConfiguredHydrationPayloadLength(value: string | undefined): number {
	if (!value) {
		return DEFAULT_RULE_PROFILE_PAYLOAD_CHARS;
	}

	const parsed = Number.parseInt(value, 10);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_RULE_PROFILE_PAYLOAD_CHARS;
}
