import type { TechnologyDefinition } from '../../types';

export const clearbitRevealTechnologyDefinition = {
	id: "clearbit-reveal",
	name: "Clearbit Reveal",
	website: "https://clearbit.com/reveal",
	description: "Clearbit Reveal identifies anonymous visitors to websites.",
	icon: "Clearbit.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "clearbit-reveal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("reveal\\.clearbit\\.com\\/v[(0-9)]\\/"),
			description: "Script source URL matches a known technology marker.",
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
