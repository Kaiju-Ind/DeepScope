import type { TechnologyDefinition } from '../../types';
import { amdTechnologyDefinition } from './amd';
import { commonjsTechnologyDefinition } from './commonjs';
import { esModulesTechnologyDefinition } from './es-modules';
import { importMapsTechnologyDefinition } from './import-maps';
import { umdTechnologyDefinition } from './umd';

export const moduleFormatTechnologyDefinitions = [
	amdTechnologyDefinition,
	commonjsTechnologyDefinition,
	esModulesTechnologyDefinition,
	importMapsTechnologyDefinition,
	umdTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
