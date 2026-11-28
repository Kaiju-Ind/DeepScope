import { createEmptyRegistryArtifact, compileValidatedTechnologyRegistry } from "./core.ts";
import { REGISTRY_SOURCE_SCHEMA_VERSION, validateRegistrySource } from "@deepscope/registry/schema";
import type { CompileTechnologyRegistryInput, CompiledTechnologyRegistryArtifact } from "./core.ts";

export { REGISTRY_COMPILER_ARTIFACT_VERSION, REGISTRY_SOURCE_KINDS, compileValidatedTechnologyRegistry } from "./core.ts";
export type { CompiledRegistryPatternTableSummary, CompiledRegistryTechnologyMetadata, CompiledTechnologyRegistryArtifact, CompileTechnologyRegistryInput, RegistryArtifactSection, RegistryCompilerArtifactVersion, RegistrySourceKind, RegistrySourceMap, RegistrySourceMapEntry } from "./core.ts";

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
