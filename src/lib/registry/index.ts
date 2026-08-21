export type {
	RegistryDiagnostic,
	RegistryDiagnosticCode,
	RegistryDiagnosticLocation,
	RegistryDiagnosticSeverity,
	RegistryValidationResult,
} from './diagnostics';
export type {
	CompiledRegistryPatternTableSummary,
	CompiledRegistryTechnologyMetadata,
	CompiledTechnologyRegistryArtifact,
	CompileTechnologyRegistryInput,
	RegistryArtifactSection,
	RegistryCompilerArtifactVersion,
	RegistrySourceKind,
	RegistrySourceMap,
	RegistrySourceMapEntry,
} from './compiler';
export type { RegistrySource, RegistrySourceSchemaVersion } from './source-schema';
export type {
	PackagedRegistryAssetKind,
	PackagedRegistryAssetSchemaVersion,
	PackagedRegistryMetadataAsset,
	PackagedRegistryObservationKind,
	PackagedRuntimeTechnologyRegistryAsset,
	PackagedRegistryShardManifestAsset,
	PackagedRegistryShardManifestEntry,
	PackagedRegistryRelationshipsAsset,
	PackagedTechnologyRegistryAsset,
	PackagedTechnologyRegistryShardAsset,
} from './packaged-artifacts';
export {
	REGISTRY_DIAGNOSTIC_SEVERITIES,
	createRegistryDiagnostic,
	diagnosticsFromZodError,
	formatDiagnosticPath,
	formatRegistryDiagnostics,
} from './diagnostics';
export {
	REGISTRY_COMPILER_ARTIFACT_VERSION,
	REGISTRY_SOURCE_KINDS,
	compileTechnologyRegistry,
} from './compiler';
export { REGISTRY_SOURCE_SCHEMA_VERSION, registrySourceSchema, validateRegistrySource } from './source-schema';
export {
	PACKAGED_REGISTRY_ASSET_PATHS,
	PACKAGED_REGISTRY_OBSERVATION_KINDS,
	PACKAGED_REGISTRY_ASSET_SCHEMA_VERSION,
	countTechnologyRules,
	createBootstrapTechnologyRegistry,
	createObservationKindTechnologyRegistry,
	decodeRegistryJsonValue,
	encodeRegistryJsonValue,
	getPackagedRegistryShardAssetPath,
	getPackagedRegistryShardPriority,
	hydratePackagedTechnologyRegistry,
	hydratePackagedTechnologyRegistryShard,
	isPackagedRuntimeTechnologyRegistryAsset,
	isPackagedTechnologyRegistryAsset,
	isPackagedTechnologyRegistryShardAsset,
	normalizePackagedRegistryObservationKind,
	renderPackagedRegistryJson,
} from './packaged-artifacts';
export {
	createPackagedMatcherTechnologyRegistryProvider,
	createPackagedRuntimeTechnologyRegistryProvider,
	createPackagedTechnologyRegistryProvider,
} from './packaged-provider';
export { createPrecompiledTechnologyRegistryProvider } from './precompiled-artifact';

export type { CompiledMatcherRegistryArtifact } from './matcher-artifact';
export { compileMatcherRegistry } from './matcher-artifact';
export type { PackagedRuntimeTechnologyRegistryData, RuntimeTechnologyRegistryArtifact } from './runtime-artifact';
export { createRuntimeTechnologyRegistryArtifact, createRuntimeTechnologyRegistryFromData } from './runtime-artifact';
