import type { TechnologyDefinition } from '../../types';
import { boolTypescriptTechnologyDefinition } from './bool-typescript';
import { turbopackTechnologyDefinition } from './turbopack';
import { vikeTechnologyDefinition } from './vike';
import { brunchTechnologyDefinition } from './brunch';
import { bunTechnologyDefinition } from './bun';
import { denoTechnologyDefinition } from './deno';
import { esbuildTechnologyDefinition } from './esbuild';
import { rollupTechnologyDefinition } from './rollup';
import { viteTechnologyDefinition } from './vite';
import { webpackTechnologyDefinition } from './webpack';

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
