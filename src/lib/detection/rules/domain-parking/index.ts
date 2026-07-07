import type { TechnologyDefinition } from '../../types';
import { arsysDomainParkingTechnologyDefinition } from './arsys-domain-parking';
import { godaddyDomainParkingTechnologyDefinition } from './godaddy-domain-parking';
import { jsOrgTechnologyDefinition } from './js-org';
import { verisignTechnologyDefinition } from './verisign';

export const domainParkingTechnologyDefinitions = [
	arsysDomainParkingTechnologyDefinition,
	godaddyDomainParkingTechnologyDefinition,
	jsOrgTechnologyDefinition,
	verisignTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
