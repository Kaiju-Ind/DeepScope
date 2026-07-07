import { createEmptyRegistryArtifact, compileValidatedTechnologyRegistry } from './compiler-core';
import { REGISTRY_SOURCE_SCHEMA_VERSION, validateRegistrySource } from './source-schema';
import type { CompileTechnologyRegistryInput, CompiledTechnologyRegistryArtifact } from './compiler-core';

export {
	REGISTRY_COMPILER_ARTIFACT_VERSION,
	REGISTRY_SOURCE_KINDS,
	compileValidatedTechnologyRegistry,
} from './compiler-core';
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
} from './compiler-core';

/**
 * Compile the TypeScript registry into reusable artifacts after schema validation.
 *
 * Build tools and tests use this entry point because authored registry modules are
 * still trusted only after the source schema accepts their shape. Runtime code
 * should compile packaged JSON assets through `compileValidatedTechnologyRegistry`
 * so the Chrome extension bundle does not pull the Zod validator into workers or
 * background code.
 */
export function compileTechnologyRegistry(
	input: CompileTechnologyRegistryInput,
): CompiledTechnologyRegistryArtifact {
	const sourceKind = input.sourceKind ?? 'typescript-definition';
	const validation = validateRegistrySource({
		schemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
		technologies: input.technologies,
	});

	if (!validation.valid || !validation.value) {
		return createEmptyRegistryArtifact({ diagnostics: validation.diagnostics, sourceKind });
	}

	return compileValidatedTechnologyRegistry({
		technologies: validation.value.technologies,
		sourceKind,
		diagnostics: validation.diagnostics,
	});
}
