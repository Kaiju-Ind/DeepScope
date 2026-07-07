import { fc, test } from '@fast-check/vitest';
import { describe, expect, it } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import {
	matchObservationBatch,
	matchObservationRule,
} from '@/lib/detection/observation-matcher';
import { normalizePageSignals } from '@/lib/observations';
import { makePageSignals, TEST_NOW } from '../support/factories';

describe('observation pattern matcher', () => {
	it('creates evidence from a script URL observation that matches a registry rule', () => {
		const registry: TechnologyDefinition[] = [{
			id: 'react',
			name: 'React',
			website: 'https://react.dev',
			categories: ['ui-library'],
			rules: [{
				id: 'react:script-src',
				kind: 'scriptSrc',
				pattern: /react(?:\.production)?(?:\.min)?\.js/i,
				confidence: 90,
				description: 'React browser bundle URL',
			}],
		}];
		const batch = normalizePageSignals(makePageSignals({
			scripts: ['https://cdn.example.com/react.production.min.js'],
		}), { observedAt: TEST_NOW + 1 });

		const result = matchObservationBatch({ registry, batch });

		expect(result.matches).toHaveLength(1);
		expect(result.evidenceBatch.entries).toEqual([
			expect.objectContaining({
				technologyId: 'react',
				kind: 'scriptSrc',
				source: 'observation',
				confidence: 90,
				matchedValue: 'react.production.min.js',
				ruleId: 'react:script-src',
				ruleDescription: 'React browser bundle URL',
				observedAt: TEST_NOW + 1,
				direct: true,
			}),
		]);
		expect(result.matches[0]?.observation).toEqual(expect.objectContaining({
			kind: 'scriptSrc',
			value: 'https://cdn.example.com/react.production.min.js',
		}));
	});

	it('uses htmlMatch probe keys as bounded HTML evidence for the owning rule', () => {
		const technology: TechnologyDefinition = {
			id: 'wordpress',
			name: 'WordPress',
			website: 'https://wordpress.org',
			categories: ['platform-cms-builder'],
			rules: [{
				kind: 'html',
				pattern: /WordPress\s*([\d.]+)?/i,
				version: { source: 'match', group: 1 },
			}],
		};
		const batch = normalizePageSignals(makePageSignals({
			html: '',
			htmlMatches: {
				'wordpress:0': {
					matchedValue: 'WordPress 6.5.4',
					captures: ['6.5.4'],
				},
				'other:0': {
					matchedValue: 'WordPress 6.5.4',
					captures: ['6.5.4'],
				},
			},
		}));

		const result = matchObservationBatch({ registry: [technology], batch });

		expect(result.matches).toHaveLength(1);
		expect(result.evidenceBatch.entries[0]).toEqual(expect.objectContaining({
			technologyId: 'wordpress',
			kind: 'html',
			matchedValue: 'WordPress 6.5.4',
			version: '6.5.4',
		}));
	});

	it('matches key-oriented observation surfaces without reading redacted values', () => {
		const technology: TechnologyDefinition = {
			id: 'shopify',
			name: 'Shopify',
			website: 'https://shopify.com',
			categories: ['ecommerce-extensions'],
			rules: [
				{ kind: 'cookie', keyPattern: /^_shopify_/, confidence: 70 },
				{ kind: 'storage', area: 'localStorage', key: 'shopify_pay_redirect', confidence: 80 },
			],
		};
		const batch = normalizePageSignals(makePageSignals({
			cookies: { _shopify_y: true },
			storage: {
				localStorage: { shopify_pay_redirect: true },
				sessionStorage: { shopify_pay_redirect: true },
			},
		}));

		const result = matchObservationBatch({ registry: [technology], batch });

		expect(result.evidenceBatch.entries).toEqual(expect.arrayContaining([
			expect.objectContaining({ kind: 'cookie', matchedValue: '_shopify_y' }),
			expect.objectContaining({ kind: 'storage', matchedValue: 'localStorage:shopify_pay_redirect' }),
		]));
		expect(result.evidenceBatch.entries).toHaveLength(2);
	});

	it('respects disabled kinds and rule ids', () => {
		const technology: TechnologyDefinition = {
			id: 'example',
			name: 'Example',
			website: 'https://example.com',
			categories: ['framework'],
			rules: [{
				id: 'example:meta',
				kind: 'meta',
				key: 'generator',
				valuePattern: /ExampleCMS/,
			}],
		};
		const batch = normalizePageSignals(makePageSignals({
			meta: { generator: ['ExampleCMS'] },
		}));
		const observation = batch.observations.find((item) => item.kind === 'meta');

		expect(observation).toBeDefined();
		expect(matchObservationRule({
			technology,
			rule: technology.rules[0]!,
			ruleIndex: 0,
			observation: observation!,
			options: { disabledKinds: ['meta'] },
		})).toBeNull();
		expect(matchObservationRule({
			technology,
			rule: technology.rules[0]!,
			ruleIndex: 0,
			observation: observation!,
			options: { disabledRuleIds: ['example:meta'] },
		})).toBeNull();
	});

	test.prop([
		fc.array(fc.webUrl().filter((url) => !/react/i.test(url)), { maxLength: 8 }),
	], { numRuns: 25 })(
		'does not create script evidence when no observation matches the rule pattern',
		(scripts) => {
			const technology: TechnologyDefinition = {
				id: 'react',
				name: 'React',
				website: 'https://react.dev',
				categories: ['ui-library'],
				rules: [{ kind: 'scriptSrc', pattern: /react/i }],
			};
			const batch = normalizePageSignals(makePageSignals({ scripts }));

			expect(matchObservationBatch({ registry: [technology], batch }).evidenceBatch.entries).toHaveLength(0);
		},
	);
});
