import type { TechnologyDefinition } from '../../types';
import { mobxTechnologyDefinition } from './mobx';
import { piniaTechnologyDefinition } from './pinia';
import { reduxTechnologyDefinition } from './redux';
import { reduxFrameworkTechnologyDefinition } from './redux-framework';
import { effectorTechnologyDefinition } from './effector';
import { jotaiTechnologyDefinition } from './jotai';
import { ngrxTechnologyDefinition } from './ngrx';
import { recoilTechnologyDefinition } from './recoil';
import { tanstackQueryTechnologyDefinition } from './tanstack-query';
import { valtioTechnologyDefinition } from './valtio';
import { xstateTechnologyDefinition } from './xstate';
import { zustandTechnologyDefinition } from './zustand';

export const stateManagementTechnologyDefinitions = [
	mobxTechnologyDefinition,
	piniaTechnologyDefinition,
	reduxTechnologyDefinition,
	reduxFrameworkTechnologyDefinition,
	effectorTechnologyDefinition,
	jotaiTechnologyDefinition,
	ngrxTechnologyDefinition,
	recoilTechnologyDefinition,
	tanstackQueryTechnologyDefinition,
	valtioTechnologyDefinition,
	xstateTechnologyDefinition,
	zustandTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
