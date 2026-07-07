import type { TechnologyDefinition } from '../../types';

export const tucalendiTechnologyDefinition = {
	id: "tucalendi",
	name: "TuCalendi",
	website: "https://www.tucalendi.com",
	description: "TuCalendi is an online appointment scheduling tool for meetings.",
	icon: "TuCalendi.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tucalendi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tucalendi\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tucalendi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Tucalendi.initConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
