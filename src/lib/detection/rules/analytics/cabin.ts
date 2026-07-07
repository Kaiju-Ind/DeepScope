import type { TechnologyDefinition } from '../../types';

export const cabinTechnologyDefinition = {
	id: "cabin",
	name: "Cabin",
	website: "https://withcabin.com",
	description: "Cabin is a web analytics service that tracks and reports website traffic.",
	icon: "Cabin.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "cabin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.withcabin\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cabin:jsGlobal:1",
			kind: "jsGlobal",
			property: "cabin",
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
