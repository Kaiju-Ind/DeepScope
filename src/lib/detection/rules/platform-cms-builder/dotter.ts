import type { TechnologyDefinition } from '../../types';

export const dotterTechnologyDefinition = {
	id: "dotter",
	name: "Dotter",
	website: "https://www.dotter.me",
	description: "Dotter is a platform offering solutions for making media and websites shoppable.",
	icon: "Dotter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dotter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("apps\\.dotter\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dotter:jsGlobal:1",
			kind: "jsGlobal",
			property: "Dotter",
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
