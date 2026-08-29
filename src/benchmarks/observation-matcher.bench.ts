import { bench, do_not_optimize, summary } from 'mitata';

import type { DetectionRule, TechnologyDefinition } from '@/lib/detection/types';
import { matchObservationBatch } from '@/lib/detection/observation-matcher';
import {
	createObservationMatcherIndex,
	matchIndexedObservationBatch,
} from '@/lib/detection/observation-matcher-index';
import type { ObservationBatch } from '@/lib/observations';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../tests/support/factories';

/** Number of synthetic technologies used to approximate a large bundled registry. */
const LARGE_REGISTRY_SIZE = 1_000;

/** Number of rule groups per generated technology. */
const RULE_GROUPS_PER_TECHNOLOGY = 4;

/** Workload names measured by the observation matcher benchmark. */
const OBSERVATION_MATCHER_WORKLOADS = ['common', 'adversarial'] as const;

/** URL-like surfaces deferred from the first visible visible-tab pass. */
const INITIAL_DISABLED_KINDS = Object.freeze([
	'resourceUrl',
	'requestUrl',
	'scriptSrc',
	'stylesheetHref',
] as const);

/** Workload name measured by this benchmark. */
type ObservationMatcherWorkload = typeof OBSERVATION_MATCHER_WORKLOADS[number];

/** One benchmark scenario with setup kept outside measured iterations. */
interface ObservationMatcherScenario {
	readonly workload: ObservationMatcherWorkload;
	readonly registry: readonly TechnologyDefinition[];
	readonly index: ReturnType<typeof createObservationMatcherIndex>;
	readonly batch: ObservationBatch;
}

/** Keep the measured result observable to the JIT. */
function consumeMatchCount(count: number): void {
	do_not_optimize(count);
}

/**
 * Create deterministic registry entries for matcher benchmark scenarios.
 *
 * The generated rules intentionally mix exact-key and wildcard surfaces. That
 * mirrors the runtime workload where metadata, headers, and selectors can be
 * routed cheaply, while URL and content patterns still require regex checks.
 */
function createBenchmarkRegistry(size: number): TechnologyDefinition[] {
	return Array.from({ length: size }, (_, index) => {
		const rules = Array.from({ length: RULE_GROUPS_PER_TECHNOLOGY }, (_rule, ruleIndex): DetectionRule[] => [
			{ kind: 'meta', key: `generator-${index}-${ruleIndex}`, valuePattern: /matched-generator/ },
			{ kind: 'header', key: `x-tech-${index}-${ruleIndex}`, valuePattern: /matched-header/ },
			{ kind: 'scriptSrc', pattern: new RegExp(`tech-${index}-${ruleIndex}\\.js`) },
		]).flat();

		return {
			id: `tech-${index}`,
			name: `Tech ${index}`,
			website: `https://tech-${index}.example`,
			categories: ['framework'],
			rules,
		};
	});
}

/** Create an observation batch for one benchmark workload. */
function createBenchmarkBatch(workload: ObservationMatcherWorkload): ObservationBatch {
	if (workload === 'common') {
		return normalizePageSignals(makePageSignals({
			scripts: [
				'https://cdn.example/tech-10-2.js',
				'https://cdn.example/no-match.js',
			],
			headers: {
				'X-Tech-20-1': 'matched-header',
				'X-Unmatched': 'ignored',
			},
			meta: {
				'generator-30-3': ['matched-generator'],
				'unmatched-generator': ['ignored'],
			},
		}));
	}

	return normalizePageSignals(makePageSignals({
		meta: Object.fromEntries(Array.from({ length: 250 }, (_, index) => [`unmatched-${index}`, ['ignored']])),
		headers: Object.fromEntries(Array.from({ length: 250 }, (_, index) => [`x-unmatched-${index}`, 'ignored'])),
		scripts: Array.from({ length: 250 }, (_, index) => `https://cdn.example/unmatched-${index}.js`),
	}));
}

/** Create benchmark scenarios once so measured tasks compare matcher cost only. */
function createObservationMatcherScenario(workload: ObservationMatcherWorkload): ObservationMatcherScenario {
	const registry = createBenchmarkRegistry(LARGE_REGISTRY_SIZE);

	return {
		workload,
		registry,
		index: createObservationMatcherIndex(registry),
		batch: createBenchmarkBatch(workload),
	};
}

const scenarios = OBSERVATION_MATCHER_WORKLOADS.map(createObservationMatcherScenario);

for (const scenario of scenarios) {
	summary(() => {
		bench(`${scenario.workload} / sequential`, () => {
			consumeMatchCount(matchObservationBatch({
				registry: scenario.registry,
				batch: scenario.batch,
			}).matches.length);
		});

		bench(`${scenario.workload} / indexed`, () => {
			consumeMatchCount(matchIndexedObservationBatch({
				registry: scenario.registry,
				batch: scenario.batch,
				index: scenario.index,
			}).matches.length);
		});

		bench(`${scenario.workload} / indexed initial-pass disabled URL surfaces`, () => {
			consumeMatchCount(matchIndexedObservationBatch({
				registry: scenario.registry,
				batch: scenario.batch,
				index: scenario.index,
				options: { disabledKinds: INITIAL_DISABLED_KINDS },
			}).matches.length);
		});
	});
}
