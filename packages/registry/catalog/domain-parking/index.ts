import type { TechnologyDefinition } from "../../types.ts";
import { arsysDomainParkingTechnologyDefinition } from "./arsys-domain-parking.ts";
import { godaddyDomainParkingTechnologyDefinition } from "./godaddy-domain-parking.ts";
import { jsOrgTechnologyDefinition } from "./js-org.ts";
import { verisignTechnologyDefinition } from "./verisign.ts";

export const domainParkingTechnologyDefinitions = [
	arsysDomainParkingTechnologyDefinition,
	godaddyDomainParkingTechnologyDefinition,
	jsOrgTechnologyDefinition,
	verisignTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
