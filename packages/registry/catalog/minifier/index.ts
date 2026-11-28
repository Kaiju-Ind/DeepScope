import type { TechnologyDefinition } from "../../types.ts";
import { babelMinifyTechnologyDefinition } from "./babel-minify.ts";
import { closureTechnologyDefinition } from "./closure.ts";
import { prepackTechnologyDefinition } from "./prepack.ts";
import { swcTechnologyDefinition } from "./swc.ts";
import { terserTechnologyDefinition } from "./terser.ts";
import { uglifyTechnologyDefinition } from "./uglify.ts";

export const minifierTechnologyDefinitions = [
	babelMinifyTechnologyDefinition,
	closureTechnologyDefinition,
	prepackTechnologyDefinition,
	swcTechnologyDefinition,
	terserTechnologyDefinition,
	uglifyTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
