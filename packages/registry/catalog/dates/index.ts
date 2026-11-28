import type { TechnologyDefinition } from "../../types.ts";
import { dayJsTechnologyDefinition } from "./day-js.ts";
import { momentTimezoneTechnologyDefinition } from "./moment-timezone.ts";
import { momentJsTechnologyDefinition } from "./moment-js.ts";
import { dateFnsTechnologyDefinition } from "./date-fns.ts";
import { jsJodaTechnologyDefinition } from "./js-joda.ts";
import { luxonTechnologyDefinition } from "./luxon.ts";

export const datesTechnologyDefinitions = [
	dayJsTechnologyDefinition,
	momentTimezoneTechnologyDefinition,
	momentJsTechnologyDefinition,
	dateFnsTechnologyDefinition,
	jsJodaTechnologyDefinition,
	luxonTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
