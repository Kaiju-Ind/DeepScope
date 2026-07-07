import { bench, describe } from 'vitest';

import type { PageSignals } from '@/lib/detection/types';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../tests/support/factories';

/** Vitest benchmark settings tuned for local regression checks without making CI runs excessive. */
const BENCHMARK_OPTIONS = {
	time: 1_000,
	warmupTime: 250,
	iterations: 64,
	warmupIterations: 16,
} as const;

/** Page shapes used to approximate first-scan and late-heavy content workloads. */
const CONTENT_BOOTSTRAP_WORKLOADS = ['common-page', 'late-heavy-page'] as const;

/** Workload name measured by the content bootstrap benchmark. */
type ContentBootstrapWorkload = typeof CONTENT_BOOTSTRAP_WORKLOADS[number];

/** One benchmark scenario with page-signal setup kept outside measured iterations. */
interface ContentBootstrapScenario {
	readonly workload: ContentBootstrapWorkload;
	readonly signals: PageSignals;
}

/**
 * Observable benchmark sink.
 *
 * Tinybench does not expose Mitata's `do_not_optimize()`. Writing the normalized
 * observation count into module state gives each benchmark body a visible side
 * effect, which keeps the normalization work from becoming an unused expression.
 */
let consumedObservationCount = 0;

/** Consume benchmark output through a visible side effect. */
function consumeObservationCount(count: number): void {
	consumedObservationCount = (consumedObservationCount + count) % Number.MAX_SAFE_INTEGER;
}

/**
 * Create a deterministic page snapshot for a content bootstrap workload.
 *
 * The common page mirrors a first usable scan: a handful of scripts, metadata,
 * links, resources, and storage keys. The late-heavy page approximates an SPA
 * that keeps adding resources and metadata after the popup has opened.
 */
function createPageSignals(workload: ContentBootstrapWorkload): PageSignals {
	if (workload === 'common-page') {
		return makePageSignals({
			scripts: [
				'https://cdn.example/app.js',
				'https://cdn.example/vendor.js',
			],
			stylesheets: ['https://cdn.example/app.css'],
			links: [{ rel: 'preconnect', href: 'https://cdn.example' }],
			resources: [{ url: 'https://cdn.example/app.js', initiatorType: 'script' }],
			meta: { generator: ['Example CMS'] },
			storage: {
				localStorage: { featureFlag: true },
				sessionStorage: { sessionHint: true },
			},
		});
	}

	return makePageSignals({
		scripts: Array.from({ length: 200 }, (_item, index) => `https://cdn.example/chunk-${index}.js`),
		stylesheets: Array.from({ length: 80 }, (_item, index) => `https://cdn.example/chunk-${index}.css`),
		links: Array.from({ length: 80 }, (_item, index) => ({
			rel: index % 2 === 0 ? 'modulepreload' : 'preload',
			href: `https://cdn.example/asset-${index}`,
		})),
		resources: Array.from({ length: 300 }, (_item, index) => ({
			url: `https://cdn.example/resource-${index}.js`,
			initiatorType: index % 2 === 0 ? 'script' : 'fetch',
		})),
		meta: Object.fromEntries(Array.from({ length: 80 }, (_item, index) => [
			`meta-${index}`,
			[`value-${index}`],
		])),
		storage: {
			localStorage: Object.fromEntries(Array.from({ length: 80 }, (_item, index) => [`local-${index}`, true])),
			sessionStorage: Object.fromEntries(Array.from({ length: 80 }, (_item, index) => [`session-${index}`, true])),
		},
	});
}

/** Normalize one content bootstrap snapshot into observation events. */
function runContentBootstrapNormalization(signals: PageSignals): number {
	return normalizePageSignals(signals).observations.length;
}

/** Create benchmark scenarios once so the measured task is normalization work only. */
function createContentBootstrapScenario(workload: ContentBootstrapWorkload): ContentBootstrapScenario {
	return {
		workload,
		signals: createPageSignals(workload),
	};
}

const scenarios = CONTENT_BOOTSTRAP_WORKLOADS.map(createContentBootstrapScenario);

/**
 * Compare content bootstrap normalization cost for common and late-heavy pages.
 *
 * A regression here means the content-owned page-session path is getting more
 * expensive before the matcher even runs. That matters because early snapshot
 * revisions should reach storage fast enough for the popup to stop feeling
 * blocked on background work.
 */
describe('content bootstrap observation', () => {
	for (const scenario of scenarios) {
		bench(scenario.workload, () => {
			consumeObservationCount(runContentBootstrapNormalization(scenario.signals));
		}, BENCHMARK_OPTIONS);
	}
});
