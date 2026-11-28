import type { TechnologyDefinition } from "../../types.ts";
import { mobxTechnologyDefinition } from "./mobx.ts";
import { piniaTechnologyDefinition } from "./pinia.ts";
import { reduxTechnologyDefinition } from "./redux.ts";
import { reduxFrameworkTechnologyDefinition } from "./redux-framework.ts";
import { effectorTechnologyDefinition } from "./effector.ts";
import { jotaiTechnologyDefinition } from "./jotai.ts";
import { ngrxTechnologyDefinition } from "./ngrx.ts";
import { recoilTechnologyDefinition } from "./recoil.ts";
import { tanstackQueryTechnologyDefinition } from "./tanstack-query.ts";
import { valtioTechnologyDefinition } from "./valtio.ts";
import { xstateTechnologyDefinition } from "./xstate.ts";
import { zustandTechnologyDefinition } from "./zustand.ts";

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
