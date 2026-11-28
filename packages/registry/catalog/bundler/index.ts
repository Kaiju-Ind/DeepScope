import type { TechnologyDefinition } from "../../types.ts";
import { boolTypescriptTechnologyDefinition } from "./bool-typescript.ts";
import { turbopackTechnologyDefinition } from "./turbopack.ts";
import { vikeTechnologyDefinition } from "./vike.ts";
import { brunchTechnologyDefinition } from "./brunch.ts";
import { bunTechnologyDefinition } from "./bun.ts";
import { denoTechnologyDefinition } from "./deno.ts";
import { esbuildTechnologyDefinition } from "./esbuild.ts";
import { rollupTechnologyDefinition } from "./rollup.ts";
import { viteTechnologyDefinition } from "./vite.ts";
import { webpackTechnologyDefinition } from "./webpack.ts";

export const bundlerTechnologyDefinitions = [
	boolTypescriptTechnologyDefinition,
	turbopackTechnologyDefinition,
	vikeTechnologyDefinition,
	brunchTechnologyDefinition,
	bunTechnologyDefinition,
	denoTechnologyDefinition,
	esbuildTechnologyDefinition,
	rollupTechnologyDefinition,
	viteTechnologyDefinition,
	webpackTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
