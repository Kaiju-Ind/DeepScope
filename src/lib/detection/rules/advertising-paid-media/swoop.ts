import type { TechnologyDefinition } from '../../types';

export const swoopTechnologyDefinition = {
	id: "swoop",
	name: "Swoop",
	website: "https://www.swoop.com",
	description: "Swoop is a search targeting advertising system.",
	icon: "Swoop.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "swoop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.swoop\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "swoop:dom:1",
			kind: "dom",
			selector: "link[href*='ardrone.swoop.com'], script#swoop_sdk",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
