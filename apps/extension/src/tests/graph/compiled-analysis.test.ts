import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import { analyzeCompiledSite, analyzeSite } from '@/lib/detection/engine';
import { createCompiledDetectionRegistry } from '@/lib/detection/registry-graph';
import type { PageSignals, TechnologyDefinition } from '@/lib/detection/types';

function createSignals(overrides: Partial<PageSignals> = {}): PageSignals {
	return {
		url: 'https://example.com',
		hostname: 'example.com',
		html: '',
		htmlMatches: {},
		text: '',
		scripts: [],
		stylesheets: [],
		links: [],
		resources: [],
		requests: [],
		scriptContents: [],
		stylesheetContents: [],
		cookies: {},
		headers: {},
		meta: {},
		dom: { selectors: {} },
		storage: { localStorage: {}, sessionStorage: {} },
		jsGlobals: {},
		robotsTxt: '',
		dnsRecords: {},
		certIssuer: '',
		probeResults: [],
		collectedAt: 1,
		...overrides,
	};
}

const registry: TechnologyDefinition[] = [
	{
		id: 'framework',
		name: 'Framework',
		website: 'https://example.com/framework',
		categories: ['framework'],
		rules: [
			{
				kind: 'html',
				pattern: /Framework ([0-9.]+)/i,
				version: { source: 'match', group: 1 },
			},
		],
		implies: ['runtime'],
		excludes: ['legacy-framework'],
	},
	{
		id: 'runtime',
		name: 'Runtime',
		website: 'https://example.com/runtime',
		categories: ['server-runtime-infra'],
		rules: [],
	},
	{
		id: 'legacy-framework',
		name: 'Legacy Framework',
		website: 'https://example.com/legacy',
		categories: ['framework'],
		rules: [{ kind: 'html', pattern: /Legacy Framework/i, confidence: 70 }],
	},
];

function stableAnalysisShape(analysis: ReturnType<typeof analyzeSite>) {
	return analysis.results.map((result) => ({
		technologyId: result.technologyId,
		confidence: result.confidence,
		version: result.version,
		inferred: result.inferred,
		evidence: result.evidence,
	}));
}

describe('compiled detection analysis', () => {
	it('matches raw-registry analysis for relationship and version behavior', () => {
		const signals = createSignals({ html: 'Framework 2.1.0 Legacy Framework' });
		const rawAnalysis = analyzeSite(signals, registry);
		const compiledAnalysis = analyzeCompiledSite(
			signals,
			createCompiledDetectionRegistry(registry),
		);

		expect(stableAnalysisShape(compiledAnalysis)).toEqual(stableAnalysisShape(rawAnalysis));
	});

	test.prop([
		fc.array(
			fc.constantFrom(
				'Framework 1.0.0',
				'Framework 2.5.1',
				'Legacy Framework',
				'unrelated text',
			),
			{ minLength: 0, maxLength: 5 },
		).map((parts) => parts.join(' ')),
	], { numRuns: 30 })(
		'keeps compiled registry output equivalent for HTML marker combinations',
		(html) => {
			const signals = createSignals({ html });
			const rawAnalysis = analyzeSite(signals, registry);
			const compiledAnalysis = analyzeCompiledSite(
				signals,
				createCompiledDetectionRegistry(registry),
			);

			expect(stableAnalysisShape(compiledAnalysis)).toEqual(stableAnalysisShape(rawAnalysis));
		},
	);
});
