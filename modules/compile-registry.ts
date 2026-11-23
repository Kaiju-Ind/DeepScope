import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';

import { addPublicAssets, defineWxtModule } from 'wxt/modules';
import type { Wxt } from 'wxt';

import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	PACKAGED_REGISTRY_OBSERVATION_KINDS,
	countTechnologyPatterns,
	countTechnologyRules,
	createBootstrapTechnologyRegistry,
	createObservationKindTechnologyRegistry,
	getPackagedRegistryShardAssetPath,
	getPackagedRegistryShardPriority,
	renderPackagedRegistryJson,
	type PackagedRegistryObservationKind,
} from '../src/lib/registry/packaged-artifacts';
import type { CompiledTechnologyRegistryArtifact } from '../src/lib/registry/index';
import { packageMatcherIndex } from '../src/lib/registry/matcher-artifact';
import { createRuntimeTechnologyRegistryArtifact } from '../src/lib/registry/runtime-artifact';
import type { TechnologyDefinition } from '../src/lib/detection/types';

const REGISTRY_CACHE_DIR = 'kaiju-deepscope-registry';
const PUBLIC_ASSET_ROOT = 'kaiju-deepscope-public';

interface RegistryAssetPayload {
	readonly path: string;
	readonly contents: string;
}

interface RegistryShardSummary {
	readonly observationKind: PackagedRegistryObservationKind;
	readonly path: string;
	readonly ruleCount: number;
	readonly technologyCount: number;
	readonly patternCount: number;
	readonly encodedPayloadBytes: number;
	readonly priority: number;
}

/**
 * Registry generation runs before WXT type preparation and builds.
 *
 * Technology definitions stay authored as TypeScript, but the extension package
 * receives JSON artifacts. Runtime matching now uses observation-kind shards so
 * workers can fetch only the rules that can match the partition they own, while
 * the background reads a rule-free runtime artifact for collection planning and graph emission.
 */
export default defineWxtModule({
	setup(wxt) {
		const cacheRegistryDir = resolve(wxt.config.wxtDir, REGISTRY_CACHE_DIR);
		const publicRootDir = resolve(wxt.config.wxtDir, PUBLIC_ASSET_ROOT);
		const publicRegistryDir = resolve(publicRootDir, REGISTRY_CACHE_DIR);
		mkdirSync(publicRegistryDir, { recursive: true });
		addPublicAssets(wxt, publicRootDir);

		let generation: Promise<void> | undefined;
		const generate = async () => {
			generation ??= generateRegistryJsonAssets(wxt, cacheRegistryDir, publicRegistryDir);
			return generation;
		};

		wxt.hooks.hook('config:resolved', generate);
		wxt.hook('build:before', generate);
	},
});

async function generateRegistryJsonAssets(
	wxt: Wxt,
	cacheRegistryDir: string,
	publicRegistryDir: string,
): Promise<void> {
	const root = wxt.config.root;
	const [{ technologies }, { compileTechnologyRegistry }] = await Promise.all([
		import(resolve(root, 'src/registry/technologies.ts')) as Promise<{ readonly technologies: readonly TechnologyDefinition[] }>,
		import(resolve(root, 'src/lib/registry/compiler.ts')) as Promise<{ compileTechnologyRegistry(input: { readonly technologies: readonly TechnologyDefinition[]; readonly sourceKind: 'typescript-definition' }): CompiledTechnologyRegistryArtifact }>,
	]);
	const fullArtifact = compileTechnologyRegistry({
		technologies,
		sourceKind: 'typescript-definition',
	});
	const bootstrapTechnologies = createBootstrapTechnologyRegistry(technologies);
	const generatedAt = Date.now();
	const assets = createRegistryAssets({
		bootstrapTechnologies,
		fullArtifact,
		technologies,
		generatedAt,
	});

	await Promise.all([
		resetRegistryDir(cacheRegistryDir),
		resetRegistryDir(publicRegistryDir),
	]);
	await Promise.all([
		writeRegistryAssets(cacheRegistryDir, assets),
		writeRegistryAssets(publicRegistryDir, assets.filter(isPublicRegistryAsset)),
	]);
	wxt.logger.info(
		`Generated registry build cache with ${fullArtifact.technologies.length} technologies and ${fullArtifact.matcherIndex.ruleCount} rules; packaged runtime contains one rule-free background artifact and ${assets.filter((asset) => asset.path.includes('/registry.kind.')).length} matcher shards.`,
	);
}

function createRegistryAssets(input: {
	readonly bootstrapTechnologies: readonly TechnologyDefinition[];
	readonly fullArtifact: CompiledTechnologyRegistryArtifact;
	readonly technologies: readonly TechnologyDefinition[];
	readonly generatedAt: number;
}): readonly RegistryAssetPayload[] {
	const shardAssets = createRegistryShardAssets(input.technologies, input.generatedAt);
	const shardSummaries = shardAssets.map((asset) => asset.summary);
	const runtime = createRuntimeTechnologyRegistryArtifact(input.fullArtifact);

	return [
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.bootstrap,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'bootstrap',
				technologies: input.bootstrapTechnologies,
				ruleCount: countTechnologyRules(input.bootstrapTechnologies),
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.enrichment,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'enrichment',
				technologies: input.fullArtifact.technologies,
				ruleCount: input.fullArtifact.matcherIndex.ruleCount,
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.runtime,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'runtime',
				technologies: runtime.technologies,
				patternTables: runtime.patternTables,
				relationshipEdges: runtime.relationshipGraph.relationshipEdges,
				collectionPlan: runtime.collectionPlan,
				diagnosticCount: runtime.diagnosticCount,
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.manifest,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'manifest',
				shards: Object.fromEntries(shardSummaries.map((summary) => [summary.observationKind, summary])),
				generatedAt: input.generatedAt,
			}),
		},
		...shardAssets.map(({ path, contents }) => ({ path, contents })),
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.metadata,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'metadata',
				technologyMetadata: input.fullArtifact.technologyMetadata,
				patternTables: input.fullArtifact.patternTables,
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.relationships,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'relationships',
				relationshipEdges: input.fullArtifact.relationshipGraph.relationshipEdges,
				generatedAt: input.generatedAt,
			}),
		},
	];
}

function createRegistryShardAssets(
	technologies: readonly TechnologyDefinition[],
	generatedAt: number,
): readonly { readonly path: string; readonly contents: string; readonly summary: RegistryShardSummary }[] {
	return PACKAGED_REGISTRY_OBSERVATION_KINDS.map((observationKind) => {
		const shardTechnologies = createObservationKindTechnologyRegistry(technologies, observationKind);
		const path = getPackagedRegistryShardAssetPath(observationKind);
		const ruleCount = countTechnologyRules(shardTechnologies);
		const patternCount = countTechnologyPatterns(shardTechnologies);
		const matcherIndex = packageMatcherIndex(shardTechnologies);
		const encodedPayloadBytes = new TextEncoder().encode(renderPackagedRegistryJson({
			technologies: shardTechnologies,
			matcherIndex,
		})).byteLength;
		const summary: RegistryShardSummary = {
			observationKind,
			path,
			ruleCount,
			technologyCount: shardTechnologies.length,
			patternCount,
			encodedPayloadBytes,
			priority: getPackagedRegistryShardPriority(observationKind),
		};

		return {
			path,
			summary,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'kind-shard',
				observationKind,
				technologies: shardTechnologies,
				ruleCount,
				technologyCount: shardTechnologies.length,
				matcherIndex,
				patternCount,
				encodedPayloadBytes,
				priority: summary.priority,
				generatedAt,
			}),
		};
	});
}


/** Return true for the only registry products needed by the packaged extension runtime. */
function isPublicRegistryAsset(asset: RegistryAssetPayload): boolean {
	return asset.path === PACKAGED_REGISTRY_ASSET_PATHS.runtime || asset.path.includes('/registry.kind.');
}

/** Remove stale generated products before writing the current schema generation. */
async function resetRegistryDir(registryDir: string): Promise<void> {
	await rm(registryDir, { force: true, recursive: true });
	await mkdir(registryDir, { recursive: true });
}

async function writeRegistryAssets(
	registryDir: string,
	assets: readonly RegistryAssetPayload[],
): Promise<void> {
	await mkdir(registryDir, { recursive: true });
	await Promise.all(assets.map((asset) => writeFile(
		resolve(registryDir, getRegistryAssetFilename(asset.path)),
		asset.contents,
	)));
}

function getRegistryAssetFilename(path: string): string {
	return path.slice(path.lastIndexOf('/') + 1);
}
