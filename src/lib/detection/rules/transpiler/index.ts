import type { TechnologyDefinition } from '../../types';
import { canyonTechnologyDefinition } from './canyon';
import { wijmoTechnologyDefinition } from './wijmo';
import { babelTechnologyDefinition } from './babel';
import { sucraseTechnologyDefinition } from './sucrase';
import { typescriptTechnologyDefinition } from './typescript';

export const transpilerTechnologyDefinitions = [
	canyonTechnologyDefinition,
	wijmoTechnologyDefinition,
	babelTechnologyDefinition,
	sucraseTechnologyDefinition,
	typescriptTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
