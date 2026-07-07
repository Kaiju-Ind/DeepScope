import type { TechnologyDefinition } from '../../types';

export const simplotelTechnologyDefinition = {
	id: "simplotel",
	name: "Simplotel",
	website: "https://www.simplotel.com",
	description: "Simplotel is a hotel booking engine.",
	icon: "Simplotel.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "simplotel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.simplotel\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "simplotel:jsGlobal:1",
			kind: "jsGlobal",
			property: "validateform_simplotel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
