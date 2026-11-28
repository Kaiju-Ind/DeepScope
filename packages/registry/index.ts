import type { TechnologyDefinition } from "./types.ts";
import { generatedTechnologyDefinitions } from "./catalog/index.ts";

/** Ordered declarative technology definitions bundled with the extension. */
export const technologies = generatedTechnologyDefinitions satisfies TechnologyDefinition[];

/** Direct alias used by compiler and matcher code that names the registry concept explicitly. */
export const technologyDefinitions = technologies;
