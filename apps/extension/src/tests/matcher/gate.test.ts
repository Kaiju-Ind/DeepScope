import { describe, expect, it } from 'vitest';

import { gate, gateSubject } from "@deepscope/detection/match/gate";
import { createObservationMatcherIndex } from "@deepscope/detection/matcher/routing";
import { matchIndexedObservationBatch } from "@deepscope/detection/matcher";
import { type IndexedObservationRule } from "@deepscope/detection/matcher/routing/types";
import { makeRuleProfileObservation } from "@deepscope/detection/profile/observations";
import type { DetectionRule } from "@deepscope/registry/rules";
import type { MatcherTechnologyType } from "@deepscope/registry/types";
import type { ObservationBatch } from "@deepscope/detection/observations";
import { hydrateMatcherIndex, packageMatcherIndex } from "@deepscope/detection/artifacts/matcher";

describe('literal gates', () => {
	it('gate only the regex the matcher needs', () => {
		expect(gate({ kind: 'cookie', keyPattern: /^_shopify_/ })).toBe('_shopify_');
		expect(gate({ kind: 'cookie', key: '_ga' })).toBeUndefined();
		expect(gate({ kind: 'header', key: 'server', valuePattern: /cloudflare/i })).toBe('cloudflare');
		expect(gate({ kind: 'header', key: 'x-powered-by' })).toBeUndefined();
		expect(gate({ kind: 'responseHeader', key: 'server', valuePattern: /nginx\/([\d.]+)/ })).toBe('nginx/');
		expect(gate({ kind: 'meta', key: 'generator', valuePattern: /WordPress/ })).toBe('wordpress');
		expect(gate({ kind: 'meta', key: 'generator', pattern: /Hugo/ } as DetectionRule)).toBe('hugo');
		expect(gate({ kind: 'meta', key: 'generator' })).toBeUndefined();
		expect(gate({ kind: 'dns', recordType: 'TXT', valuePattern: /mailgun\.org/ })).toBe('mailgun.org');
		// Same soundness rules as literal routes.
		expect(gate({ kind: 'header', key: 'server', valuePattern: /nginx|apache/ })).toBeUndefined();
		expect(gate({ kind: 'header', key: 'server', valuePattern: /ssss/iu })).toBeUndefined();
		// Kinds whose routes do not all run the regex (htmlMatch probes) are never gated.
		expect(gate({ kind: 'html', pattern: /wp-content/ })).toBeUndefined();
		expect(gate({ kind: 'jsGlobal', property: 'jQuery', valuePattern: /3\.7\.1/ })).toBeUndefined();
	});

	it('read the cookie name for cookie rules and the value otherwise', () => {
		const cookie = makeRuleProfileObservation('cookie', true, { key: '_Shopify_Y' });
		expect(gateSubject({ kind: 'cookie', keyPattern: /^_shopify_/i }, cookie)).toBe('_Shopify_Y');
		const header = makeRuleProfileObservation('header', 'Cloudflare', { key: 'Server' });
		expect(gateSubject({ kind: 'header', key: 'server', valuePattern: /cloudflare/i }, header)).toBe('Cloudflare');
	});

	it('survive packaging and keep matches identical to an ungated run', () => {
		const technologies: MatcherTechnologyType[] = [
			{ id: 'cf', name: 'CF', rules: [{ kind: 'header', key: 'server', valuePattern: /cloudflare/i }] },
			{ id: 'shop', name: 'Shop', rules: [{ kind: 'cookie', keyPattern: /^_shopify_/i }] },
			{ id: 'wp', name: 'WP', rules: [{ kind: 'meta', key: 'generator', valuePattern: /WordPress ([\d.]+)/, version: { group: 1 } } as DetectionRule] },
		];
		const index = createObservationMatcherIndex(technologies);
		const hydrated = hydrateMatcherIndex(technologies, JSON.parse(JSON.stringify(packageMatcherIndex(technologies, index))));
		expect(hydrated.keyedRules.header?.server?.[0]?.gate).toBe('cloudflare');
		expect(hydrated.fallbackRules.cookie?.[0]?.gate).toBe('_shopify_');

		const observations = [
			makeRuleProfileObservation('header', 'CloudFlare', { key: 'Server' }),
			makeRuleProfileObservation('header', 'nginx', { key: 'server' }),
			makeRuleProfileObservation('cookie', true, { key: '_SHOPIFY_y' }),
			makeRuleProfileObservation('cookie', true, { key: '_ga' }),
			makeRuleProfileObservation('meta', 'WordPress 6.4.2', { key: 'generator' }),
			makeRuleProfileObservation('meta', 'Hugo', { key: 'generator' }),
		];
		const batch: ObservationBatch = { target: observations[0]!.target, interface: 'extension', observedAt: 1, observations };
		const ungated = { ...index, keyedRules: strip(index.keyedRules), fallbackRules: strip(index.fallbackRules) };
		const run = (used: typeof index) => matchIndexedObservationBatch({ registry: technologies, batch, index: used }).matches.map((match) => match.evidence);
		expect(run(hydrated)).toEqual(run(ungated));
		expect(run(hydrated).map((evidence) => evidence.technologyId)).toEqual(['cf', 'shop', 'wp']);
	});
});

/** Copy route buckets with every gate removed, keeping rule identities. */
function strip<T extends object>(buckets: T): T {
	const ungate = (rules: readonly IndexedObservationRule[]) => rules.map(({ gate: _gate, ...rule }) => rule);
	return Object.fromEntries(Object.entries(buckets).map(([kind, value]) => [
		kind,
		Array.isArray(value) ? ungate(value) : Object.fromEntries(Object.entries(value as Record<string, IndexedObservationRule[]>).map(([key, rules]) => [key, ungate(rules)])),
	])) as T;
}
