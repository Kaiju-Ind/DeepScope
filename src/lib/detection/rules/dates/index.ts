import type { TechnologyDefinition } from '../../types';
import { dayJsTechnologyDefinition } from './day-js';
import { momentTimezoneTechnologyDefinition } from './moment-timezone';
import { momentJsTechnologyDefinition } from './moment-js';
import { dateFnsTechnologyDefinition } from './date-fns';
import { jsJodaTechnologyDefinition } from './js-joda';
import { luxonTechnologyDefinition } from './luxon';

export const datesTechnologyDefinitions = [
	dayJsTechnologyDefinition,
	momentTimezoneTechnologyDefinition,
	momentJsTechnologyDefinition,
	dateFnsTechnologyDefinition,
	jsJodaTechnologyDefinition,
	luxonTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
