import type { TechnologyDefinition } from '../../types';

export const accessoTechnologyDefinition = {
	id: "accesso",
	name: "Accesso",
	website: "https://accesso.com/",
	description: "Accesso provides ticketing, ecommerce and Point-of-Sale (PoS) solutions.",
	icon: "Accesso.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "accesso:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/embed\\/accesso\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "accesso:jsGlobal:1",
			kind: "jsGlobal",
			property: "accesso",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
