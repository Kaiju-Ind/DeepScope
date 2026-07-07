import type { TechnologyDefinition } from '../../types';

export const elinaPmsTechnologyDefinition = {
	id: "elina-pms",
	name: "Elina PMS",
	website: "https://www.elinapms.com",
	description: "Elina PMS is a software suite that includes a channel manager, booking engine, and property management system for handling reservations, availability, and operations.",
	icon: "Elina.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "elina-pms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.elinapms\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elina-pms:jsGlobal:1",
			kind: "jsGlobal",
			property: "elinaGlobalConst",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
