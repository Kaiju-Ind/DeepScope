import type { TechnologyDefinition } from '../../types';

export const arsysDomainParkingTechnologyDefinition = {
	id: "arsys-domain-parking",
	name: "Arsys Domain Parking",
	website: "https://www.arsys.es",
	description: "Arsys is a Spanish domain registrar.",
	icon: "arsys.png",
	categories: [
		"domain-parking",
	],
	rules: [
		{
			id: "arsys-domain-parking:dom:0",
			kind: "dom",
			selector: "link[rel='stylesheet'][href*='arsys.es/css/parking2.css']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
