import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import { matchObservationBatch } from '@/lib/detection/observation-matcher';
import {
	createObservationMatcherIndex,
	findIndexedObservationRules,
	matchIndexedObservationBatch,
} from '@/lib/detection/observation-matcher-index';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals } from '../support/factories';

function makeIndexedRegistry(): TechnologyDefinition[] {
	return [
		{
			id: 'wildcard-script',
			name: 'Wildcard Script',
			website: 'https://wildcard-script.example',
			categories: ['framework'],
			rules: [{ kind: 'scriptSrc', pattern: /cdn\.example\/runtime\.js/, confidence: 70 }],
		},
		{
			id: 'generator-a',
			name: 'Generator A',
			website: 'https://generator-a.example',
			categories: ['platform-cms-builder'],
			rules: [{ kind: 'meta', key: 'generator', valuePattern: /Generator A/, confidence: 90 }],
		},
		{
			id: 'html-owner',
			name: 'HTML Owner',
			website: 'https://html-owner.example',
			categories: ['platform-cms-builder'],
			rules: [{ kind: 'html', pattern: /HTML Owner ([\d.]+)/, version: { source: 'match', group: 1 } }],
		},
		{
			id: 'generator-b',
			name: 'Generator B',
			website: 'https://generator-b.example',
			categories: ['platform-cms-builder'],
			rules: [{ kind: 'meta', key: 'x-generator', valuePattern: /Generator B/, confidence: 90 }],
		},
	];
}

describe('indexed observation matcher', () => {
	it('emits the same matches and evidence as the sequential matcher', () => {
		const registry = makeIndexedRegistry();
		const batch = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example/runtime.js'],
			meta: {
				generator: ['Generator A'],
				'x-generator': ['Generator B'],
			},
			html: '',
			htmlMatches: {
				'html-owner:0': { matchedValue: 'HTML Owner 2.1.0', captures: ['2.1.0'] },
			},
		}));

		const sequential = matchObservationBatch({ registry, batch });
		const indexed = matchIndexedObservationBatch({ registry, batch });

		expect(indexed.matches.map((match) => match.technologyId)).toEqual(
			sequential.matches.map((match) => match.technologyId),
		);
		expect(indexed.evidenceBatch.entries).toEqual(sequential.evidenceBatch.entries);
	});

	it('routes exact-key observations without evaluating unrelated exact-key rules', () => {
		const registry = makeIndexedRegistry();
		const index = createObservationMatcherIndex(registry);
		const batch = normalizePageSignals(makePageSignals({
			meta: {
				generator: ['Generator A'],
				'x-generator': ['Generator B'],
			},
		}));
		const generatorObservation = batch.observations.find((observation) => (
			observation.kind === 'meta' && observation.key === 'generator'
		));

		expect(generatorObservation).toBeDefined();
		expect(findIndexedObservationRules(index, generatorObservation!).map((rule) => rule.technology.id)).toEqual([
			'generator-a',
		]);
	});

	it('keeps responseHeader rules compatible with header observations', () => {
		const registry: TechnologyDefinition[] = [{
			id: 'server-tech',
			name: 'Server Tech',
			website: 'https://server-tech.example',
			categories: ['infrastructure-hosting'],
			rules: [{ kind: 'responseHeader', key: 'server', valuePattern: /Server Tech/i, confidence: 95 }],
		}];
		const batch = normalizePageSignals(makePageSignals({
			headers: { Server: 'Server Tech' },
		}));
		const sequentialEntries = matchObservationBatch({ registry, batch }).evidenceBatch.entries;
		const indexedEntries = matchIndexedObservationBatch({ registry, batch }).evidenceBatch.entries;

		expect(indexedEntries).toEqual(sequentialEntries);
		expect(indexedEntries).toEqual([
			expect.objectContaining({
				technologyId: 'server-tech',
				kind: 'header',
			}),
		]);
	});

	it('reuses a prebuilt index across batches from the same registry', () => {
		const registry = makeIndexedRegistry();
		const index = createObservationMatcherIndex(registry);
		const firstBatch = normalizePageSignals(makePageSignals({
			meta: { generator: ['Generator A'] },
		}));
		const secondBatch = normalizePageSignals(makePageSignals({
			meta: { 'x-generator': ['Generator B'] },
		}));

		expect(matchIndexedObservationBatch({ registry, batch: firstBatch, index }).matches).toHaveLength(1);
		expect(matchIndexedObservationBatch({ registry, batch: secondBatch, index }).matches).toHaveLength(1);
		expect(index).toMatchObject({ technologyCount: 4, ruleCount: 4 });
	});

	it('uses literal prefilters to skip unrelated URL-like rules', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'matching-cdn',
				name: 'Matching CDN',
				website: 'https://matching-cdn.example',
				categories: ['infrastructure-hosting'],
				rules: [{ kind: 'scriptSrc', pattern: /cdn\.example\/runtime\.js/ }],
			},
			{
				id: 'other-cdn',
				name: 'Other CDN',
				website: 'https://other-cdn.example',
				categories: ['infrastructure-hosting'],
				rules: [{ kind: 'scriptSrc', pattern: /other\.example\/runtime\.js/ }],
			},
		];
		const index = createObservationMatcherIndex(registry);
		const [scriptObservation] = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example/runtime.js'],
		})).observations.filter((observation) => observation.kind === 'scriptSrc');

		expect(scriptObservation).toBeDefined();
		expect(findIndexedObservationRules(index, scriptObservation!).map((rule) => rule.technology.id)).toEqual([
			'matching-cdn',
		]);
		expect(matchIndexedObservationBatch({
			registry,
			batch: normalizePageSignals(makePageSignals({ scripts: ['https://cdn.example/runtime.js'] })),
			index,
		}).diagnostics).toMatchObject({
			literalRuleCount: 1,
			literalRejectedRuleCount: 1,
			candidateRuleCount: 1,
		});
	});

	it('keeps alternative URL patterns in fallback to avoid false negatives', () => {
		const registry: TechnologyDefinition[] = [{
			id: 'alternative-cdn',
			name: 'Alternative CDN',
			website: 'https://alternative-cdn.example',
			categories: ['infrastructure-hosting'],
			rules: [{ kind: 'scriptSrc', pattern: /alpha\.example|beta\.example/ }],
		}];
		const index = createObservationMatcherIndex(registry);
		const [scriptObservation] = normalizePageSignals(makePageSignals({
			scripts: ['https://beta.example/runtime.js'],
		})).observations.filter((observation) => observation.kind === 'scriptSrc');

		expect(scriptObservation).toBeDefined();
		expect(findIndexedObservationRules(index, scriptObservation!).map((rule) => rule.technology.id)).toEqual([
			'alternative-cdn',
		]);
		expect(matchIndexedObservationBatch({
			registry,
			batch: normalizePageSignals(makePageSignals({ scripts: ['https://beta.example/runtime.js'] })),
			index,
		}).matches.map((match) => match.technologyId)).toEqual(['alternative-cdn']);
	});

	it('routes link rules by relation tokens without changing matcher output', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'module-preload',
				name: 'Module Preload',
				website: 'https://module-preload.example',
				categories: ['infrastructure-hosting'],
				rules: [{ kind: 'link', rel: 'modulepreload' }],
			},
			{
				id: 'alternate-feed',
				name: 'Alternate Feed',
				website: 'https://alternate-feed.example',
				categories: ['content-publishing'],
				rules: [{ kind: 'link', rel: 'alternate', typePattern: /application\/rss\+xml/i }],
			},
			{
				id: 'href-only',
				name: 'Href Only',
				website: 'https://href-only.example',
				categories: ['framework'],
				rules: [{ kind: 'link', hrefPattern: /cdn\.example\/module\.js/i }],
			},
			{
				id: 'type-only',
				name: 'Type Only',
				website: 'https://type-only.example',
				categories: ['media-video'],
				rules: [{ kind: 'link', typePattern: /text\/javascript/i }],
			},
		];
		const batch = normalizePageSignals(makePageSignals({
			links: [{
				rel: 'stylesheet MODULEPRELOAD',
				href: 'https://cdn.example/module.js',
				type: 'text/javascript',
			}],
		}));
		const linkObservation = batch.observations.find((observation) => observation.kind === 'link');
		const index = createObservationMatcherIndex(registry);
		const sequential = matchObservationBatch({ registry, batch });
		const indexed = matchIndexedObservationBatch({ registry, batch, index });

		expect(linkObservation).toBeDefined();
		expect(indexed.matches).toEqual(sequential.matches);
		expect(indexed.evidenceBatch.entries).toEqual(sequential.evidenceBatch.entries);
		expect(findIndexedObservationRules(index, linkObservation!).map((rule) => rule.technology.id)).toEqual([
			'module-preload',
			'href-only',
			'type-only',
		]);
		expect(indexed.diagnostics).toMatchObject({
			candidateRuleCount: 3,
			keyedRuleCount: 1,
			literalRuleCount: 1,
			fallbackRuleCount: 1,
		});
	});

	it('does not evaluate every link rule for every link observation', () => {
		const relationRules = Array.from({ length: 19 }, (_item, index) => ({
			kind: 'link' as const,
			rel: `relation-${index}`,
		}));
		const registry: TechnologyDefinition[] = [{
			id: 'link-heavy',
			name: 'Link Heavy',
			website: 'https://link-heavy.example',
			categories: ['framework'],
			rules: [
				...relationRules,
				{ kind: 'link', hrefPattern: /accounts\.example\/identity\/style/i },
				{ kind: 'link', hrefPattern: /cdn\.example\/platform\//i },
				{ kind: 'link', typePattern: /image\/avif/i },
				{ kind: 'link', typePattern: /image\/webp/i },
			],
		}];
		const links = Array.from({ length: 91 }, (_item, index) => ({
			rel: 'stylesheet',
			href: `https://assets.example/styles/${index}.css`,
			type: 'text/css',
		}));
		const batch = normalizePageSignals(makePageSignals({ links }));
		const sequential = matchObservationBatch({ registry, batch });
		const indexed = matchIndexedObservationBatch({
			registry,
			batch,
			index: createObservationMatcherIndex(registry),
		});

		expect(indexed.matches).toEqual(sequential.matches);
		expect(indexed.diagnostics).toMatchObject({
			observationCount: 93,
			candidateRuleCount: 182,
			keyedRuleCount: 0,
			literalRuleCount: 0,
			literalRejectedRuleCount: 182,
			fallbackRuleCount: 182,
			candidateRulesByKind: { link: 182 },
		});
		expect(indexed.diagnostics.candidateRuleCount).toBeLessThan(91 * 23);
	});

	it('skips disabled observation kinds before candidate routing', () => {
		const registry: TechnologyDefinition[] = [
			{
				id: 'script-tech',
				name: 'Script Tech',
				website: 'https://script-tech.example',
				categories: ['framework'],
				rules: [{ kind: 'scriptSrc', pattern: /runtime\.js/, confidence: 90 }],
			},
			{
				id: 'generator-tech',
				name: 'Generator Tech',
				website: 'https://generator-tech.example',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'meta', key: 'generator', valuePattern: /Generator Tech/, confidence: 90 }],
			},
		];
		const batch = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example/runtime.js'],
			meta: { generator: ['Generator Tech'] },
		}));

		const result = matchIndexedObservationBatch({
			registry,
			batch,
			options: { disabledKinds: ['scriptSrc'] },
		});

		expect(result.matches.map((match) => match.technologyId)).toEqual(['generator-tech']);
		expect(result.diagnostics).toMatchObject({
			observationCount: 4,
			skippedObservationCount: 1,
			candidateRuleCount: 1,
			observationsByKind: {
				url: 1,
				html: 1,
				scriptSrc: 1,
				meta: 1,
			},
			skippedObservationsByKind: { scriptSrc: 1 },
			candidateRulesByKind: { meta: 1 },
		});
	});






    it('prefilters content-like rules by required literals without changing matcher output', () => {
        const registry: TechnologyDefinition[] = [
            {
                id: 'script-match',
                name: 'Script Match',
                website: 'https://script-match.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptContent', pattern: /window\.Sentry\.init/ }],
            },
            {
                id: 'script-other',
                name: 'Script Other',
                website: 'https://script-other.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptContent', pattern: /window\.Datadog\.init/ }],
            },
            {
                id: 'script-fallback',
                name: 'Script Fallback',
                website: 'https://script-fallback.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptContent', pattern: /Sentry|Datadog/ }],
            },
            {
                id: 'style-match',
                name: 'Style Match',
                website: 'https://style-match.example',
                categories: ['ui-library'],
                rules: [{ kind: 'stylesheetContent', pattern: /--tw-ring-offset-shadow/ }],
            },
            {
                id: 'style-other',
                name: 'Style Other',
                website: 'https://style-other.example',
                categories: ['ui-library'],
                rules: [{ kind: 'stylesheetContent', pattern: /--mui-palette-primary/ }],
            },
            {
                id: 'html-match',
                name: 'HTML Match',
                website: 'https://html-match.example',
                categories: ['platform-cms-builder'],
                rules: [{ kind: 'html', pattern: /data-kaiju-root/ }],
            },
            {
                id: 'html-other',
                name: 'HTML Other',
                website: 'https://html-other.example',
                categories: ['platform-cms-builder'],
                rules: [{ kind: 'html', pattern: /data-other-root/ }],
            },
            {
                id: 'text-match',
                name: 'Text Match',
                website: 'https://text-match.example',
                categories: ['platform-cms-builder'],
                rules: [{ kind: 'text', pattern: /KaijuPlatform marker/ }],
            },
            {
                id: 'text-other',
                name: 'Text Other',
                website: 'https://text-other.example',
                categories: ['platform-cms-builder'],
                rules: [{ kind: 'text', pattern: /AcmePlatform marker/ }],
            },
        ];
        const batch = normalizePageSignals(makePageSignals({
            html: '<main data-kaiju-root></main>',
            text: 'KaijuPlatform marker',
            scriptContents: ['window.Sentry.init({});'],
            stylesheetContents: [':root{--tw-ring-offset-shadow:0 0 #0000}'],
        }));

        const sequential = matchObservationBatch({ registry, batch });
        const indexed = matchIndexedObservationBatch({
            registry,
            batch,
            index: createObservationMatcherIndex(registry),
        });

        expect(indexed.matches).toEqual(sequential.matches);
        expect(indexed.evidenceBatch.entries).toEqual(sequential.evidenceBatch.entries);
        expect(indexed.diagnostics).toMatchObject({
            candidateRuleCount: 5,
            fallbackRuleCount: 1,
            literalRuleCount: 4,
            literalRejectedRuleCount: 4,
            candidateRulesByKind: {
                html: 1,
                text: 1,
                scriptContent: 2,
                stylesheetContent: 1,
            },
        });
    });

    it('keeps required-literal extraction conservative around regex syntax', () => {
        const registry: TechnologyDefinition[] = [
            {
                id: 'wildcard',
                name: 'Wildcard',
                website: 'https://wildcard.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptSrc', pattern: /abcd.efgh/ }],
            },
            {
                id: 'digit-class',
                name: 'Digit Class',
                website: 'https://digit-class.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptSrc', pattern: /prefix\d+suffix/ }],
            },
            {
                id: 'optional-suffix',
                name: 'Optional Suffix',
                website: 'https://optional-suffix.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptSrc', pattern: /foobar?/ }],
            },
            {
                id: 'unicode-escape',
                name: 'Unicode Escape',
                website: 'https://unicode-escape.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptSrc', pattern: /\u0066oo-marker/ }],
            },
            {
                id: 'bounded-optional',
                name: 'Bounded Optional',
                website: 'https://bounded-optional.example',
                categories: ['framework'],
                rules: [{ kind: 'scriptSrc', pattern: /prefixx{0,10000}suffix/ }],
            },
        ];
        const batch = normalizePageSignals(makePageSignals({
            scripts: [
                'https://cdn.example/abcdXefgh.js',
                'https://cdn.example/prefix123suffix.js',
                'https://cdn.example/fooba.js',
                'https://cdn.example/foo-marker.js',
                'https://cdn.example/prefixsuffix.js',
            ],
        }));
        const index = createObservationMatcherIndex(registry);
        const sequential = matchObservationBatch({ registry, batch });
        const indexed = matchIndexedObservationBatch({ registry, batch, index });

        expect(indexed.matches).toEqual(sequential.matches);
        expect(indexed.matches.map((match) => match.technologyId)).toEqual([
            'wildcard',
            'digit-class',
            'optional-suffix',
            'unicode-escape',
            'bounded-optional',
        ]);
        expect(index.fallbackRules.scriptSrc?.map((entry) => entry.technology.id)).toContain('optional-suffix');
    });

});
