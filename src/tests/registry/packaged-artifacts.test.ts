import { describe, expect, it, vi } from 'vitest';

import type { TechnologyDefinition } from '@/lib/detection/types';
import { compileTechnologyRegistry } from '@/lib/registry';
import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	createBootstrapTechnologyRegistry,
	createObservationKindTechnologyRegistry,
	getPackagedRegistryShardAssetPath,
	hydratePackagedTechnologyRegistry,
	isPackagedTechnologyRegistryAsset,
	isPackagedTechnologyRegistryShardAsset,
	renderPackagedRegistryJson,
} from '@/lib/registry/packaged-artifacts';
import { createPackagedTechnologyRegistryProvider } from '@/lib/registry/packaged-provider';

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

function makeShardAsset(registry: readonly TechnologyDefinition[], observationKind: 'meta' | 'scriptSrc' | 'htmlMatch' | 'header') {
	const shard = createObservationKindTechnologyRegistry(registry, observationKind);
	return {
		schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
		kind: 'kind-shard',
		observationKind,
		technologies: shard,
		ruleCount: shard.reduce((count, technology) => count + technology.rules.length, 0),
		technologyCount: shard.length,
		priority: 1,
		generatedAt: 1,
	};
}

describe('packaged registry artifacts', () => {
	it('round-trips regular expression rules through JSON assets', () => {
		const rendered = renderPackagedRegistryJson(makeRegistryAsset(makeRegistry()));
		const parsed = JSON.parse(rendered);

		expect(isPackagedTechnologyRegistryAsset(parsed, 'enrichment')).toBe(true);
		const hydrated = hydratePackagedTechnologyRegistry(parsed);

		expect(hydrated.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
		expect(hydrated[0]?.rules[0]).toMatchObject({ kind: 'meta', key: 'generator' });
		expect((hydrated[0]?.rules[0] as { valuePattern?: RegExp }).valuePattern).toBeInstanceOf(RegExp);
		expect((hydrated[0]?.rules[0] as { valuePattern: RegExp }).valuePattern.test('Bootstrap Visible')).toBe(true);
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

		const provider = createPackagedTechnologyRegistryProvider({
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
		const provider = createPackagedTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const firstPass = await provider.getCompiledBootstrapRegistry();
		const enrichment = await provider.getCompiledRegistry();

		expect(fetchAsset).toHaveBeenCalledTimes(2);
		expect(firstPass.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(enrichment.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible', 'enrichment-only']);
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
		const provider = createPackagedTechnologyRegistryProvider({
			resolveUrl: (path) => `extension://${path}`,
			fetchAsset,
		});

		const first = await provider.getCompiledObservationKindRegistry('scriptSrc');
		const second = await provider.getCompiledObservationKindRegistry('scriptSrc');

		expect(fetchAsset).toHaveBeenCalledOnce();
		expect(first).toBe(second);
		expect(first.technologies.map((technology) => technology.id)).toEqual(['bootstrap-visible']);
		expect(first.matcherIndex.ruleCount).toBe(1);
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
		const provider = createPackagedTechnologyRegistryProvider({
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
