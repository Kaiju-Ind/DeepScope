import type { TechnologyDefinition } from '../../types';

export const piggyTechnologyDefinition = {
	id: "piggy",
	name: "Piggy",
	website: "https://www.piggy.eu",
	description: "Piggy is a loyalty program management platform.",
	icon: "Piggy.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "piggy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.piggy\\.eu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "piggy:jsGlobal:1",
			kind: "jsGlobal",
			property: "PiggyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
