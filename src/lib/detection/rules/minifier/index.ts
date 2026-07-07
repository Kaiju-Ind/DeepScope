import type { TechnologyDefinition } from '../../types';
import { babelMinifyTechnologyDefinition } from './babel-minify';
import { closureTechnologyDefinition } from './closure';
import { prepackTechnologyDefinition } from './prepack';
import { swcTechnologyDefinition } from './swc';
import { terserTechnologyDefinition } from './terser';
import { uglifyTechnologyDefinition } from './uglify';

export const minifierTechnologyDefinitions = [
	babelMinifyTechnologyDefinition,
	closureTechnologyDefinition,
	prepackTechnologyDefinition,
	swcTechnologyDefinition,
	terserTechnologyDefinition,
	uglifyTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
