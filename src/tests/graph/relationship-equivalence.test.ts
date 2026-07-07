import { describe, expect, it } from 'vitest';

import { analyzeSite } from '@/lib/detection/engine';
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

type RelationshipTechnologyInput = {
	id: string;
	name?: string;
	marker?: string;
	confidence?: number;
	version?: TechnologyDefinition['rules'][number]['version'];
	implies?: string[];
	requires?: string[];
	excludes?: string[];
	relationships?: TechnologyDefinition['relationships'];
};

function relationshipTechnology(input: RelationshipTechnologyInput): TechnologyDefinition {
	return {
		id: input.id,
		name: input.name ?? input.id,
		website: `https://example.com/${input.id}`,
		categories: ['unknown'],
		rules: input.marker === undefined
			? []
				: [
						{
							kind: 'text',
							pattern: new RegExp(input.marker, 'i'),
							confidence: input.confidence ?? 100,
							version: input.version,
					},
				],
		implies: input.implies,
		requires: input.requires,
		excludes: input.excludes,
		relationships: input.relationships,
	};
}

function resultIds(registry: TechnologyDefinition[], html: string): string[] {
	return analyzeSite(createSignals({ text: html }), registry).results.map(
		(result) => result.technologyId,
	);
}

describe('graph compatibility baseline', () => {
	it('keeps explicit relationship objects equivalent to shorthand relationship arrays', () => {
		const shorthandRegistry = [
			relationshipTechnology({
				id: 'framework',
				marker: 'framework',
				implies: ['runtime'],
				requires: ['language'],
				excludes: ['legacy-framework'],
			}),
			relationshipTechnology({ id: 'language', marker: 'language' }),
			relationshipTechnology({ id: 'runtime' }),
			relationshipTechnology({ id: 'legacy-framework', marker: 'legacy', confidence: 70 }),
		];
		const explicitRegistry = [
			relationshipTechnology({
				id: 'framework',
				marker: 'framework',
				relationships: [
					{ kind: 'implies', target: 'runtime' },
					{ kind: 'requires', target: 'language' },
					{ kind: 'excludes', target: 'legacy-framework' },
				],
			}),
			relationshipTechnology({ id: 'language', marker: 'language' }),
			relationshipTechnology({ id: 'runtime' }),
			relationshipTechnology({ id: 'legacy-framework', marker: 'legacy', confidence: 70 }),
		];

		expect(resultIds(shorthandRegistry, 'framework language legacy')).toEqual([
			'framework',
			'language',
			'runtime',
		]);
		expect(resultIds(explicitRegistry, 'framework language legacy')).toEqual([
			'framework',
			'language',
			'runtime',
		]);
	});

	it('preserves registry order as the final equal-confidence conflict tie break', () => {
		const registry = [
			relationshipTechnology({ id: 'alpha', marker: 'alpha', excludes: ['beta'] }),
			relationshipTechnology({ id: 'beta', marker: 'beta', excludes: ['alpha'] }),
		];

		expect(resultIds(registry, 'alpha beta')).toEqual(['alpha']);
	});

	it('keeps version extraction before relationship expansion changes final order', () => {
		const registry = [
			relationshipTechnology({
				id: 'framework',
				marker: 'Framework ([0-9.]+)',
				version: { source: 'match', group: 1 },
				implies: ['runtime'],
			}),
			relationshipTechnology({ id: 'runtime' }),
		];

		const analysis = analyzeSite(createSignals({ text: 'Framework 2.4.1' }), registry);
		const framework = analysis.results.find((result) => result.technologyId === 'framework');
		const runtime = analysis.results.find((result) => result.technologyId === 'runtime');

		expect(analysis.results.map((result) => result.technologyId)).toEqual([
			'framework',
			'runtime',
		]);
		expect(framework?.version).toBe('2.4.1');
		expect(runtime?.evidence).toEqual([
			expect.objectContaining({
				direct: false,
				sourceTechnologyId: 'framework',
			}),
		]);
	});
});
