import type { TechnologyDefinition } from "../../types.ts";
import { amdTechnologyDefinition } from "./amd.ts";
import { commonjsTechnologyDefinition } from "./commonjs.ts";
import { esModulesTechnologyDefinition } from "./es-modules.ts";
import { importMapsTechnologyDefinition } from "./import-maps.ts";
import { umdTechnologyDefinition } from "./umd.ts";

export const moduleFormatTechnologyDefinitions = [
	amdTechnologyDefinition,
	commonjsTechnologyDefinition,
	esModulesTechnologyDefinition,
	importMapsTechnologyDefinition,
	umdTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
