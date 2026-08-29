import { describe, expect, it, vi } from 'vitest';

import { createObservationMatcherIndex } from '@/lib/detection/observation-matcher-index';
import { testDetectionPattern } from '@/lib/detection/pattern';
import type { DetectionPatternType, TechnologyDefinition } from '@/lib/detection/types';
import { compileTechnologyRegistry } from '@/lib/registry';
import { createPackagedBuildTechnologyRegistryProvider } from '@/lib/registry/build-provider';
import { hydrateMatcherIndex, packageMatcherIndex } from '@/lib/registry/matcher-artifact';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	createBootstrapTechnologyRegistry,
	createObservationKindTechnologyRegistry,
	getPackagedRegistryShardAssetPath,
	hydratePackagedTechnologyRegistry,
	isPackagedRuntimeTechnologyRegistryAsset,
	isPackagedTechnologyRegistryAsset,
	isPackagedTechnologyRegistryShardAsset,
	renderPackagedRegistryJson,
	type PackagedRegistryObservationKind,
} from '@/lib/registry/packaged-artifacts';
import { createPackagedMatcherTechnologyRegistryProvider } from '@/lib/registry/packaged-matcher';
import { createPackagedRuntimeTechnologyRegistryProvider } from '@/lib/registry/packaged-runtime';

function makeRegistry(): readonly TechnologyDefinition[] {
	return [
		{
			id: 'bootstrap-visible',
			name: 'Bootstrap Visible',
			website: 'https://bootstrap-visible.example',
			categories: ['framework'],
			rules: [
				{ kind: 'meta', key: 'generator', valuePattern: /Bootstrap Visible/, confidence: 90 },
				{ kind: 'scriptSrc', pattern: /bootstrap-visible\.js/, confidence: 90 },
			],
		},
		{
			id: 'enrichment-only',
			name: 'Enrichment Only',
			website: 'https://enrichment-only.example',
			categories: ['developer-tooling'],
			rules: [
				{ kind: 'scriptContent', pattern: /enrichmentOnly\(/, confidence: 90 },
				{ kind: 'html', pattern: /enrichment-only-root/, confidence: 80 },
				{ kind: 'responseHeader', key: 'x-powered-by', valuePattern: /Example/, confidence: 70 },
			],
		},
	];
}

function makeRegistryAsset(registry: readonly TechnologyDefinition[], kind: 'bootstrap' | 'enrichment' = 'enrichment') {
	return {
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind,
		technologies: registry,
		ruleCount: registry.reduce((count, technology) => count + technology.rules.length, 0),
		generatedAt: 1,
	};
}

function makeShardAsset(registry: readonly TechnologyDefinition[], observationKind: PackagedRegistryObservationKind) {
	const technologies = createObservationKindTechnologyRegistry(registry, observationKind);
	const matcherIndex = packageMatcherIndex(technologies);
	const patternCount = technologies.reduce((count, technology) => count + technology.rules.length, 0);
	const encodedPayloadBytes = new TextEncoder().encode(renderPackagedRegistryJson({ technologies, matcherIndex })).byteLength;
	return {
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind: 'kind-shard' as const,
		observationKind,
		technologies,
		ruleCount: matcherIndex.ruleCount,
		technologyCount: technologies.length,
		matcherIndex,
		patternCount,
		encodedPayloadBytes,
		priority: 1,
		generatedAt: 1,
	};
}

function makeRuntimeAsset(registry: readonly TechnologyDefinition[]) {
	const artifact = compileTechnologyRegistry({ technologies: registry });
	return {
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind: 'runtime' as const,
		technologies: artifact.technologies.map(({ id, name, website, description, icon, categories }) => ({
			id, name, website, ...(description ? { description } : {}), ...(icon ? { icon } : {}), categories,
		})),
		patternTables: artifact.patternTables,
		relationshipEdges: artifact.relationshipGraph.relationshipEdges,
		collectionPlan: artifact.collectionPlan,
		diagnosticCount: artifact.diagnostics.length,
		generatedAt: 1,
	};
}

function summarizeMatcherIndex(index: ReturnType<typeof createObservationMatcherIndex>) {
	const rule = (value: {
		readonly technology: { readonly id: string };
		readonly ruleIndex: number;
		readonly sequence: number;
		readonly requiredLiteral?: string;
	}) => ({
		technologyId: value.technology.id,
		ruleIndex: value.ruleIndex,
		sequence: value.sequence,
		...('requiredLiteral' in value ? { requiredLiteral: value.requiredLiteral } : {}),
	});
	return {
		technologyCount: index.technologyCount,
		ruleCount: index.ruleCount,
		fallbackRules: Object.fromEntries(Object.entries(index.fallbackRules).map(([kind, rules]) => [kind, (rules ?? []).map(rule)])),
		keyedRules: Object.fromEntries(Object.entries(index.keyedRules).map(([kind, keys]) => [kind, Object.fromEntries(
			Object.entries(keys ?? {}).map(([key, rules]) => [key, (rules ?? []).map(rule)]),
		)])),
		literalRules: Object.fromEntries(Object.entries(index.literalRules).map(([kind, rules]) => [kind, (rules ?? []).map(rule)])),
	};
}

describe('packaged registry artifacts', () => {
	it('round-trips regular expression rules through JSON assets', () => {
		const rendered = renderPackagedRegistryJson(makeRegistryAsset(makeRegistry()));
		expect(rendered).not.toContain('$kaijuDeepScopeRegExp');
		const parsed = JSON.parse(rendered);

		expect(isPackagedTechnologyRegistryAsset(parsed, 'enrichment')).toBe(true);
		const hydrated = hydratePackagedTechnologyRegistry(parsed);

		expect(hydrated.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
		expect(hydrated[0]?.rules[0]).toMatchObject({ kind: 'meta', key: 'generator' });
		const valuePattern = (hydrated[0]?.rules[0] as { valuePattern: DetectionPatternType }).valuePattern;
		expect(valuePattern).not.toBeInstanceOf(RegExp);
		expect(valuePattern).toEqual({ source: 'Bootstrap Visible', flags: '' });
		expect(testDetectionPattern(valuePattern, 'Bootstrap Visible')).toBe(true);
	});

	it('keeps bootstrap registry rules limited to cheap page-local surfaces', () => {
		const bootstrap = createBootstrapTechnologyRegistry(makeRegistry());

		expect(bootstrap.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(bootstrap[0]?.rules.map((rule) => rule.kind)).toEqual(['meta']);
	});

	it('creates observation-kind shards that preserve detector order with narrowed rules', () => {
		const registry = makeRegistry();
		const scriptShard = createObservationKindTechnologyRegistry(registry, 'scriptSrc');
		const htmlProbeShard = createObservationKindTechnologyRegistry(registry, 'htmlMatch');
		const headerShard = createObservationKindTechnologyRegistry(registry, 'header');

		expect(scriptShard.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(Object.keys(scriptShard[0] ?? {}).sort()).toEqual(['id', 'name', 'rules']);
		expect(scriptShard[0]).not.toHaveProperty('website');
		expect(scriptShard[0]).not.toHaveProperty('categories');
		expect(scriptShard[0]?.rules.map((rule) => rule.kind)).toEqual(['scriptSrc']);
		expect(scriptShard[0]?.rules[0]?.sourceRuleIndex).toBe(1);
		expect(htmlProbeShard.map((technology) => technology.id)).toEqual(['enrichment-only']);
		expect(htmlProbeShard[0]?.rules.map((rule) => rule.kind)).toEqual(['html']);
		expect(htmlProbeShard[0]?.rules[0]?.sourceRuleIndex).toBe(1);
		expect(headerShard.map((technology) => technology.id)).toEqual(['enrichment-only']);
		expect(headerShard[0]?.rules.map((rule) => rule.kind)).toEqual(['responseHeader']);
		expect(headerShard[0]?.rules[0]?.sourceRuleIndex).toBe(2);
	});

	it('creates a rendered-image shard for image-backed technology rules', () => {
		const registry: readonly TechnologyDefinition[] = [{
			id: 'image-backed-tech',
			name: 'Image Backed Tech',
			website: 'https://image-backed.example',
			categories: ['infrastructure-hosting'],
			rules: [{ kind: 'imageSrc', pattern: /cdn\.image-backed\.example/ }],
		}];
		const shard = createObservationKindTechnologyRegistry(registry, 'imageSrc');

		expect(shard).toHaveLength(1);
		expect(shard[0]?.rules).toMatchObject([{ kind: 'imageSrc', sourceRuleIndex: 0 }]);
	});

	it('keeps packaged registry paths relative to the extension root', () => {
		expect(PACKAGED_REGISTRY_ASSET_PATHS.enrichment).toBe('kaiju-deepscope-registry/registry.enrichment.json');
		expect(PACKAGED_REGISTRY_ASSET_PATHS.runtime).toBe('kaiju-deepscope-registry/registry.runtime.json');
		expect(PACKAGED_REGISTRY_ASSET_PATHS.enrichment.startsWith('/')).toBe(false);
		expect(getPackagedRegistryShardAssetPath('imageSrc')).toBe('kaiju-deepscope-registry/registry.kind.imageSrc.json');
		expect(getPackagedRegistryShardAssetPath('scriptSrc')).toBe('kaiju-deepscope-registry/registry.kind.scriptSrc.json');
	});

	it('calls the default worker fetch through the global receiver', async () => {
		const registry = makeRegistry();
		const rendered = renderPackagedRegistryJson(makeRegistryAsset(registry));
		const fetchAsset = vi.fn(function (this: unknown) {
			expect(this).toBe(globalThis);
			return Promise.resolve({
				ok: true,
				async json() {
					return JSON.parse(rendered);
				},
			});
		});
		vi.stubGlobal('fetch', fetchAsset);

		const provider = createPackagedBuildTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
		});

		try {
			const artifact = await provider.getCompiledRegistry();

			expect(fetchAsset).toHaveBeenCalledOnce();
			expect(artifact.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
		} finally {
			vi.unstubAllGlobals();
		}
	});

	it('loads bootstrap and enrichment registries through separate packaged assets', async () => {
		const registry = makeRegistry();
		const bootstrap = createBootstrapTechnologyRegistry(registry);
		const fetchAsset = vi.fn(async (url: string) => ({
			ok: true,
			async json() {
				return JSON.parse(url.includes('bootstrap')
					? renderPackagedRegistryJson(makeRegistryAsset(bootstrap, 'bootstrap'))
					: renderPackagedRegistryJson(makeRegistryAsset(registry, 'enrichment')));
			},
		}));
		const provider = createPackagedBuildTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const firstPass = await provider.getCompiledBootstrapRegistry();
		const enrichment = await provider.getCompiledRegistry();

		expect(fetchAsset).toHaveBeenCalledTimes(2);
		expect(firstPass.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(enrichment.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
	});

	it('loads the rule-free runtime registry without fetching enrichment rules', async () => {
		const registry = makeRegistry();
		const runtimeAsset = makeRuntimeAsset(registry);
		expect(isPackagedRuntimeTechnologyRegistryAsset(runtimeAsset)).toBe(true);
		const fetchAsset = vi.fn(async (url: string) => {
			expect(url).toContain('registry.runtime.json');
			return {
				ok: true,
				async json() {
					return JSON.parse(renderPackagedRegistryJson(runtimeAsset));
				},
			};
		});
		const provider = createPackagedRuntimeTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const artifact = await provider.getRuntimeRegistry();

		expect(fetchAsset).toHaveBeenCalledOnce();
		expect(artifact.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
		expect(artifact.technologies.every((technology) => !('rules' in technology))).toBe(true);
		expect(artifact.relationshipGraph.definitionsById.get('bootstrap-visible')).not.toHaveProperty('rules');
		expect(artifact.collectionPlan).toEqual(runtimeAsset.collectionPlan);
	});

	it('loads observation-kind shard JSON once and compiles a narrowed matcher index', async () => {
		const registry = makeRegistry();
		const fetchAsset = vi.fn(async (url: string) => ({
			ok: true,
			async json() {
				if (url.includes('registry.kind.scriptSrc')) {
					return JSON.parse(renderPackagedRegistryJson(makeShardAsset(registry, 'scriptSrc')));
				}
				return JSON.parse(renderPackagedRegistryJson(makeRegistryAsset(registry, 'enrichment')));
			},
		}));
		const provider = createPackagedMatcherTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const first = await provider.getCompiledObservationKindRegistry('scriptSrc');
		const second = await provider.getCompiledObservationKindRegistry('scriptSrc');

		expect(fetchAsset).toHaveBeenCalledOnce();
		expect(first).toBe(second);
		expect(first.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(first.matcherIndex.ruleCount).toBe(1);
		expect(first).not.toHaveProperty('relationshipGraph');
		expect(first).not.toHaveProperty('collectionPlan');
		expect(first).not.toHaveProperty('sourceMap');
	});

	it('evicts least-recently-used observation-kind shards when a provider cache budget is configured', async () => {
		const registry = makeRegistry();
		const fetchAsset = vi.fn(async (url: string) => ({
			ok: true,
			async json() {
				const observationKind: PackagedRegistryObservationKind = url.includes('registry.kind.meta')
					? 'meta'
					: 'scriptSrc';
				return { ...makeShardAsset(registry, observationKind), encodedPayloadBytes: 200_000 };
			},
		}));
		const provider = createPackagedMatcherTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
			maxShardCacheBytes: 256 * 1024,
		});

		const firstScriptShard = await provider.getCompiledObservationKindRegistry('scriptSrc');
		await provider.getCompiledObservationKindRegistry('meta');
		const secondScriptShard = await provider.getCompiledObservationKindRegistry('scriptSrc');

		expect(fetchAsset).toHaveBeenCalledTimes(3);
		expect(firstScriptShard).not.toBe(secondScriptShard);
		expect(secondScriptShard.matcherIndex.ruleCount).toBe(1);
	});

	it('retries an observation-kind shard after a transient load failure', async () => {
		const registry = makeRegistry();
		let attempt = 0;
		const fetchAsset = vi.fn(async () => {
			attempt += 1;
			if (attempt === 1) throw new Error('temporary extension asset failure');
			return {
				ok: true,
				async json() {
					return makeShardAsset(registry, 'scriptSrc');
				},
			};
		});
		const provider = createPackagedMatcherTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		await expect(provider.getCompiledObservationKindRegistry('scriptSrc')).rejects.toThrow('temporary extension asset failure');
		const artifact = await provider.getCompiledObservationKindRegistry('scriptSrc');

		expect(fetchAsset).toHaveBeenCalledTimes(2);
		expect(artifact.matcherIndex.ruleCount).toBe(1);
	});

	it('reports weighted cache state from generated shard metadata', async () => {
		const registry = makeRegistry();
		const asset = { ...makeShardAsset(registry, 'scriptSrc'), encodedPayloadBytes: 321_000, patternCount: 17 };
		const provider = createPackagedMatcherTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset: vi.fn(async () => ({ ok: true, async json() { return asset; } })),
			maxShardCacheBytes: 512 * 1024,
		});

		const before = provider.getCacheState('scriptSrc');
		await provider.getCompiledObservationKindRegistry('scriptSrc');
		const after = provider.getCacheState('scriptSrc');

		expect(before).toMatchObject({ cached: false, retainedBytes: 0, retainedShardCount: 0 });
		expect(after).toMatchObject({
			cached: true,
			retainedBytes: 321_000,
			retainedShardCount: 1,
			shardRetainedBytes: 321_000,
			shardPatternCount: 17,
			shardRuleCount: 1,
		});
	});

	it('rehydrates the same matcher routes that the build-time index compiled', () => {
		const technologies = createObservationKindTechnologyRegistry(makeRegistry(), 'scriptSrc');
		const compiled = createObservationMatcherIndex(technologies);
		const hydrated = hydrateMatcherIndex(technologies, packageMatcherIndex(technologies, compiled));

		expect(summarizeMatcherIndex(hydrated)).toEqual(summarizeMatcherIndex(compiled));
	});

	it('loads packaged enrichment JSON once and preserves detector order', async () => {
		const registry = makeRegistry();
		const rendered = renderPackagedRegistryJson(makeRegistryAsset(registry));
		const fetchAsset = vi.fn(async () => ({
			ok: true,
			async json() {
				return JSON.parse(rendered);
			},
		}));
		const provider = createPackagedBuildTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const first = await provider.getCompiledRegistry();
		const second = await provider.getCompiledRegistry();
		const expected = compileTechnologyRegistry({ technologies: registry });

		expect(fetchAsset).toHaveBeenCalledOnce();
		expect(first).toBe(second);
		expect(first.technologies.map((technology) => technology.id)).toEqual(
			expected.technologies.map((technology) => technology.id),
		);
		expect(first.matcherIndex.ruleCount).toBe(expected.matcherIndex.ruleCount);
	});
});
