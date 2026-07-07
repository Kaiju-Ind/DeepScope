import { resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';

import { addPublicAssets, defineWxtModule } from 'wxt/modules';
import type { Wxt } from 'wxt';

import {
	PACKAGED_REGISTRY_ASSET_PATHS,
	PACKAGED_REGISTRY_OBSERVATION_KINDS,
	countTechnologyRules,
	createBootstrapTechnologyRegistry,
	createObservationKindTechnologyRegistry,
	getPackagedRegistryShardAssetPath,
	getPackagedRegistryShardPriority,
	renderPackagedRegistryJson,
	type PackagedRegistryObservationKind,
} from '../src/lib/registry/packaged-artifacts';
import type { CompiledTechnologyRegistryArtifact } from '../src/lib/registry/index';
import type { TechnologyDefinition } from '../src/lib/detection/types';

const REGISTRY_CACHE_DIR = 'kaiju-site-scope-registry';
const PUBLIC_ASSET_ROOT = 'kaiju-site-scope-public';

interface RegistryAssetPayload {
	readonly path: string;
	readonly contents: string;
}

interface RegistryShardSummary {
	readonly observationKind: PackagedRegistryObservationKind;
	readonly path: string;
	readonly ruleCount: number;
	readonly technologyCount: number;
	readonly priority: number;
}

/**
 * Registry generation runs before WXT type preparation and builds.
 *
 * Technology definitions stay authored as TypeScript, but the extension package
 * receives JSON artifacts. Runtime matching now uses observation-kind shards so
 * workers can fetch only the rules that can match the partition they own, while
 * the full registry remains available for collection planning and graph emission.
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
		import(resolve(root, 'src/data/technologies.ts')) as Promise<{ readonly technologies: readonly TechnologyDefinition[] }>,
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
		writeRegistryAssets(cacheRegistryDir, assets),
		writeRegistryAssets(publicRegistryDir, assets),
	]);
	wxt.logger.info(
		`Generated registry JSON assets with ${fullArtifact.technologies.length} technologies, ${fullArtifact.matcherIndex.ruleCount} full rules, ${assets.filter((asset) => asset.path.includes('/registry.kind.')).length} matcher shards, and ${countTechnologyRules(bootstrapTechnologies)} compatibility bootstrap rules`,
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

	return [
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.bootstrap,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
				kind: 'bootstrap',
				technologies: input.bootstrapTechnologies,
				ruleCount: countTechnologyRules(input.bootstrapTechnologies),
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.enrichment,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
				kind: 'enrichment',
				technologies: input.fullArtifact.technologies,
				ruleCount: input.fullArtifact.matcherIndex.ruleCount,
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.manifest,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
				kind: 'manifest',
				shards: Object.fromEntries(shardSummaries.map((summary) => [summary.observationKind, summary])),
				generatedAt: input.generatedAt,
			}),
		},
		...shardAssets.map(({ path, contents }) => ({ path, contents })),
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.metadata,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
				kind: 'metadata',
				technologyMetadata: input.fullArtifact.technologyMetadata,
				patternTables: input.fullArtifact.patternTables,
				generatedAt: input.generatedAt,
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.relationships,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
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
		const summary: RegistryShardSummary = {
			observationKind,
			path,
			ruleCount,
			technologyCount: shardTechnologies.length,
			priority: getPackagedRegistryShardPriority(observationKind),
		};

		return {
			path,
			summary,
			contents: renderPackagedRegistryJson({
				schemaVersion: 1,
				kind: 'kind-shard',
				observationKind,
				technologies: shardTechnologies,
				ruleCount,
				technologyCount: shardTechnologies.length,
				priority: summary.priority,
				generatedAt,
			}),
		};
	});
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
