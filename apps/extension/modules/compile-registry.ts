import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdirSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';

import { addPublicAssets, defineWxtModule } from 'wxt/modules';
import type { Wxt } from 'wxt';

import { PACKAGED_REGISTRY_ASSET_PATHS, PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION, PACKAGED_REGISTRY_OBSERVATION_KINDS, countTechnologyPatterns, countTechnologyRules, createBootstrapTechnologyRegistry, createObservationKindTechnologyRegistry, getPackagedRegistryShardAssetPath, getPackagedRegistryShardPriority, renderPackagedRegistryJson, type PackagedRegistryObservationKind } from "@deepscope/detection/artifacts/packaged";
import type { CompiledTechnologyRegistryArtifact } from "@deepscope/detection/compiler/core";
import { packageMatcherIndex } from "@deepscope/detection/artifacts/matcher";
import { createRuntimeTechnologyRegistryArtifact } from "@deepscope/detection/artifacts/runtime";
import type { TechnologyDefinition } from "@deepscope/registry/types";

const REGISTRY_CACHE_DIR = 'kaiju-deepscope-registry';
const PUBLIC_ASSET_ROOT = 'kaiju-deepscope-public';

export interface RegistryAssetPayload {
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
	/** Register generated registry assets with WXT and share one generation promise between configuration and build hooks. */
	setup(wxt) {
		const cacheRegistryDir = resolve(wxt.config.wxtDir, REGISTRY_CACHE_DIR);
		const publicRootDir = resolve(wxt.config.wxtDir, PUBLIC_ASSET_ROOT);
		const publicRegistryDir = resolve(publicRootDir, REGISTRY_CACHE_DIR);
		mkdirSync(publicRegistryDir, { recursive: true });
		addPublicAssets(wxt, publicRootDir);

		let generation: Promise<void> | undefined;
		/** Reuse this WXT setup's generation promise so concurrent hooks cannot reset each other's asset directories. */
		const generate = async () => {
			generation ??= generateRegistryJsonAssets(wxt, cacheRegistryDir, publicRegistryDir);
			return generation;
		};

		wxt.hooks.hook('config:resolved', generate);
		wxt.hook('build:before', generate);
	},
});

/** Build registry assets once, replace cache and public directories, and publish only assets permitted in the extension artifact. */
async function generateRegistryJsonAssets(
	wxt: Wxt,
	cacheRegistryDir: string,
	publicRegistryDir: string,
): Promise<void> {
	const startedAt = performance.now();
	const { technologies, compileTechnologyRegistry } = await loadRegistrySources(wxt.config.root, wxt.config.wxtDir);
	const loadedAt = performance.now();
	const { fullArtifact, assets } = buildRegistryAssets(technologies, compileTechnologyRegistry);

	await Promise.all([
		resetRegistryDir(cacheRegistryDir),
		resetRegistryDir(publicRegistryDir),
	]);
	await Promise.all([
		writeRegistryAssets(cacheRegistryDir, assets),
		writeRegistryAssets(publicRegistryDir, assets.filter(isPublicRegistryAsset)),
	]);
	wxt.logger.info(
		`Generated registry build cache with ${fullArtifact.technologies.length} technologies and ${fullArtifact.matcherIndex.ruleCount} rules; packaged runtime contains one rule-free background artifact and ${assets.filter((asset) => asset.path.includes('/registry.kind.')).length} matcher shards (loaded in ${Math.round(loadedAt - startedAt)}ms, compiled and written in ${Math.round(performance.now() - loadedAt)}ms).`,
	);
}

/** What `modules/registry-sources.ts` exports once bundled. */
interface RegistrySources {
	readonly technologies: readonly TechnologyDefinition[];
	compileTechnologyRegistry(input: {
		readonly technologies: readonly TechnologyDefinition[];
		readonly sourceKind: 'typescript-definition';
	}): CompiledTechnologyRegistryArtifact;
}

/**
 * Load the technology catalog and the registry compiler in one bundling pass.
 *
 * WXT loads this module through jiti, which transforms each imported TypeScript
 * file separately. The catalog is about 8,000 files, so importing it that way
 * took about 19 seconds on a fresh machine. Rolldown (already used by Vite)
 * bundles the same source packages in one pass. All package imports are explicit,
 * so no extension alias is needed before WXT prepares its TypeScript config. The bundle is written to WXT's own `.wxt` folder
 * because it creates `require` from its own file URL for CommonJS dependencies.
 */
async function loadRegistrySources(root: string, wxtDir: string): Promise<RegistrySources> {
	const { rolldown } = await import('rolldown');
	const bundle = await rolldown({
		input: resolve(root, 'modules/registry-sources.ts'),
		platform: 'node',
		logLevel: 'silent',
		// Source packages own explicit imports and do not depend on WXT's generated config.
		tsconfig: false,
	});
	try {
		const { output } = await bundle.generate({ format: 'esm' });
		const [chunk] = output;
		if (!chunk || chunk.type !== 'chunk') throw new Error('Registry source bundle produced no JavaScript.');
		const file = resolve(wxtDir, 'registry-sources.mjs');
		await writeFile(file, chunk.code);
		// A query string forces a fresh module when `wxt dev` regenerates in the same process.
		return await import(`${pathToFileURL(file).href}?t=${Date.now()}`) as RegistrySources;
	} finally {
		await bundle.close();
	}
}

/**
 * Compile the catalog and render every registry file, without touching disk.
 *
 * The output depends only on `technologies`: no clock, randomness or machine
 * state goes into it. Rebuilding the same commit must give byte-identical files,
 * because Firefox add-on review rebuilds the submitted sources and release
 * checksums are only meaningful when a rebuild matches them.
 */
export function buildRegistryAssets(
	technologies: readonly TechnologyDefinition[],
	compile: (input: { readonly technologies: readonly TechnologyDefinition[]; readonly sourceKind: 'typescript-definition' }) => CompiledTechnologyRegistryArtifact,
): { readonly fullArtifact: CompiledTechnologyRegistryArtifact; readonly assets: readonly RegistryAssetPayload[] } {
	const fullArtifact = compile({ technologies, sourceKind: 'typescript-definition' });
	const assets = createRegistryAssets({
		bootstrapTechnologies: createBootstrapTechnologyRegistry(technologies),
		fullArtifact,
		technologies,
	});
	return { fullArtifact, assets };
}

/** Assemble versioned bootstrap, enrichment, runtime, shard and metadata payloads from the same validated registry input. */
function createRegistryAssets(input: {
	readonly bootstrapTechnologies: readonly TechnologyDefinition[];
	readonly fullArtifact: CompiledTechnologyRegistryArtifact;
	readonly technologies: readonly TechnologyDefinition[];
}): readonly RegistryAssetPayload[] {
	const shardAssets = createRegistryShardAssets(input.technologies);
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
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.enrichment,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'enrichment',
				technologies: input.fullArtifact.technologies,
				ruleCount: input.fullArtifact.matcherIndex.ruleCount,
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
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.manifest,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'manifest',
				shards: Object.fromEntries(shardSummaries.map((summary) => [summary.observationKind, summary])),
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
			}),
		},
		{
			path: PACKAGED_REGISTRY_ASSET_PATHS.relationships,
			contents: renderPackagedRegistryJson({
				schemaVersion: PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
				kind: 'relationships',
				relationshipEdges: input.fullArtifact.relationshipGraph.relationshipEdges,
			}),
		},
	];
}

/** Package each supported observation kind with matching rule counts, pattern counts, size metadata and scheduling priority. */
function createRegistryShardAssets(
	technologies: readonly TechnologyDefinition[],
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

/** Write caller-selected asset payloads into one registry directory using their final packaged filenames. */
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

/** Strip the public URL directory from a known registry asset path before writing it inside the selected output directory. */
function getRegistryAssetFilename(path: string): string {
	return path.slice(path.lastIndexOf('/') + 1);
}
