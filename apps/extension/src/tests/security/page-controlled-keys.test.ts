import { readdirSync, readFileSync } from 'node:fs';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

import { collectCookieNames } from '@/lib/content/collect-page-signals';
import { normalizeMetaMap } from '@/lib/detection/normalizers';
import { createObservationMatcherIndex, matchIndexedObservationBatch } from '@/lib/detection/observation-matcher-index';
import type { TechnologyDefinition } from '@/lib/detection/types';
import { normalizePageSignals } from '@/lib/observations';
import { hydrateMatcherIndex, packageMatcherIndex } from '@/lib/registry/matcher-artifact';
import * as dictionary from '@/utils/dictionary';
import { makePageSignals } from '../support/factories';

/**
 * Keys a page can choose that collide with `Object.prototype` members.
 *
 * `__proto__` is the dangerous write; the others are dangerous reads because
 * an ordinary object returns the inherited function instead of `undefined`.
 */
const HOSTILE_KEYS = ['__proto__', 'constructor', 'prototype', 'toString', 'hasOwnProperty', 'valueOf'] as const;

/** Build a page-shaped record the way JSON or a message would deliver it. */
function hostileRecord<Value>(value: Value): Record<string, Value> {
	return JSON.parse(JSON.stringify(Object.fromEntries(HOSTILE_KEYS.map((key) => [key, value])))) as Record<string, Value>;
}

describe('page-controlled keys', () => {
	it('stores every hostile key as data without touching a prototype', () => {
		const record = dictionary.fromEntries(HOSTILE_KEYS.map((key) => [key, key.length]));
		expect(Object.getPrototypeOf(record)).toBeNull();
		for (const key of HOSTILE_KEYS) expect(dictionary.get(record, key)).toBe(key.length);
		expect(Object.getPrototypeOf({})).toBe(Object.prototype);
	});

	it('never returns inherited members from a record that crossed a context boundary', () => {
		const cloned = structuredClone(dictionary.create<number[]>());
		expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
		for (const key of HOSTILE_KEYS) {
			expect(dictionary.get(cloned, key)).toBeUndefined();
			expect(dictionary.has(cloned, key)).toBe(false);
		}
	});

	it('collects hostile cookie names as ordinary names', () => {
		const cookies = collectCookieNames(HOSTILE_KEYS.map((key, index) => `${key}=${index}`).join('; '));
		for (const key of HOSTILE_KEYS) expect(dictionary.get(cookies, key)).toBe(true);
		expect(Object.getPrototypeOf(cookies)).toBeNull();
	});

	it('normalizes hostile meta names without changing a prototype', () => {
		const meta = normalizeMetaMap(hostileRecord(['value']));
		for (const key of HOSTILE_KEYS) expect(dictionary.get(meta, key.toLowerCase())).toEqual(['value']);
		expect(Object.getPrototypeOf(meta)).toBeNull();
	});

	it('matches pages whose observation keys collide with prototype members', () => {
		const registry: TechnologyDefinition[] = [{
			id: 'generator',
			name: 'Generator',
			website: 'https://generator.example',
			categories: ['platform-cms-builder'],
			rules: [{ kind: 'meta', key: 'generator', valuePattern: /Generator/, confidence: 90 }],
		}];
		const meta = hostileRecord(['not a generator']);
		meta.generator = ['Generator 1'];
		const batch = normalizePageSignals(makePageSignals({ meta }));

		const result = matchIndexedObservationBatch({ registry, batch, index: createObservationMatcherIndex(registry) });

		expect(result.matches.map((match) => match.technologyId)).toEqual(['generator']);
	});

	it('matches prototype-named keys through a build-routed index after a JSON round trip', () => {
		// Packaged shards reach the worker as JSON. JSON.parse turns every bucket back
		// into an ordinary object, so hydration must rebuild them prototype-free.
		const registry: TechnologyDefinition[] = [
			{
				id: 'constructor-meta',
				name: 'Constructor Meta',
				website: 'https://constructor.example',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'meta', key: 'constructor', valuePattern: /Builder/, confidence: 90 }],
			},
			{
				id: 'proto-meta',
				name: 'Proto Meta',
				website: 'https://proto.example',
				categories: ['platform-cms-builder'],
				rules: [{ kind: 'meta', key: '__proto__', valuePattern: /Proto/, confidence: 90 }],
			},
		];
		const packaged = JSON.parse(JSON.stringify(packageMatcherIndex(registry)));
		const index = hydrateMatcherIndex(registry, packaged);
		const metaBuckets = index.keyedRules.meta!;
		expect(Object.getPrototypeOf(metaBuckets)).toBeNull();
		expect(dictionary.get(metaBuckets, 'constructor')).toHaveLength(1);
		expect(dictionary.get(metaBuckets, '__proto__')).toHaveLength(1);
		expect(dictionary.get(metaBuckets, 'toString')).toBeUndefined();

		const meta = hostileRecord(['unrelated']);
		// Bracket access with a widened key: `.constructor` would be typed as Object's member.
		meta['constructor' as string] = ['Builder 2'];
		const matching = matchIndexedObservationBatch({ registry, batch: normalizePageSignals(makePageSignals({ meta })), index });
		expect(matching.matches.map((match) => match.technologyId)).toEqual(['constructor-meta']);

		// With both prototype-named keys present as page data, each routes to its own rule.
		const both = normalizePageSignals(makePageSignals({ meta: hostileRecord(['Proto Builder']) }));
		const bothMatched = matchIndexedObservationBatch({ registry, batch: both, index });
		expect(bothMatched.matches.map((match) => match.technologyId).sort()).toEqual(['constructor-meta', 'proto-meta']);
	});
});

describe('page-controlled key ownership', () => {
	const SRC_ROOT = fileURLToPath(new URL('../../', import.meta.url));
	const RUNTIME_ROOTS = ['lib', 'entrypoints', 'app'].map((folder) => resolve(SRC_ROOT, folder));
	const OWNER = resolve(SRC_ROOT, 'utils/dictionary.ts');

	/**
	 * Patterns that create an ordinary-prototype string-keyed map.
	 *
	 * Runtime code builds those maps through `@/utils/dictionary` instead, so a
	 * page key such as `__proto__` cannot change the prototype and a lookup such
	 * as `constructor` cannot return an inherited function.
	 */
	const FORBIDDEN = [
		{ pattern: /\bObject\.fromEntries\(/u, use: 'dictionary.fromEntries' },
		{ pattern: /\b(?:const|let|var)\s+\w+\s*:\s*Record<string,[^=;]*>\s*=\s*\{\s*\}/u, use: 'dictionary.create' },
		{ pattern: /=\s*\{\s*\}\s*as\s+Record<string,/u, use: 'dictionary.create' },
	];

	function runtimeSources(): string[] {
		const files: string[] = [];
		const visit = (directory: string): void => {
			for (const entry of readdirSync(directory, { withFileTypes: true })) {
				const path = resolve(directory, entry.name);
				if (entry.isDirectory()) visit(path);
				else if (['.ts', '.tsx'].includes(extname(entry.name)) && path !== OWNER) files.push(path);
			}
		};
		for (const root of RUNTIME_ROOTS) visit(root);
		return files;
	}

	it('builds runtime string-keyed maps through the dictionary owner', () => {
		const violations = runtimeSources().flatMap((path) => readFileSync(path, 'utf8').split('\n').flatMap((text, index) => (
			FORBIDDEN.filter(({ pattern }) => pattern.test(text))
				.map(({ use }) => `${relative(SRC_ROOT, path)}:${index + 1} use ${use}`)
		)));
		expect(violations).toEqual([]);
	});
});
