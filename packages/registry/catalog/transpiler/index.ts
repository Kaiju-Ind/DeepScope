import type { TechnologyDefinition } from "../../types.ts";
import { canyonTechnologyDefinition } from "./canyon.ts";
import { wijmoTechnologyDefinition } from "./wijmo.ts";
import { babelTechnologyDefinition } from "./babel.ts";
import { sucraseTechnologyDefinition } from "./sucrase.ts";
import { typescriptTechnologyDefinition } from "./typescript.ts";

export const transpilerTechnologyDefinitions = [
	canyonTechnologyDefinition,
	wijmoTechnologyDefinition,
	babelTechnologyDefinition,
	sucraseTechnologyDefinition,
	typescriptTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
