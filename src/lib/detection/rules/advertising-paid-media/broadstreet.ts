import type { TechnologyDefinition } from '../../types';

export const broadstreetTechnologyDefinition = {
	id: "broadstreet",
	name: "Broadstreet",
	website: "https://broadstreetads.com",
	description: "Broadstreet is an ad manager that caters specifically to the needs of direct, digital ad sales.",
	icon: "Broadstreet.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "broadstreet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.broadstreetads\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "broadstreet:jsGlobal:1",
			kind: "jsGlobal",
			property: "broadstreet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
