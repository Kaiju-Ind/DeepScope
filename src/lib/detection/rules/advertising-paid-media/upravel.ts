import type { TechnologyDefinition } from '../../types';

export const upravelTechnologyDefinition = {
	id: "upravel",
	name: "Upravel",
	website: "https://upravel.com",
	description: "Upravel is a marketing advertising system.",
	icon: "Upravel.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "upravel:dom:0",
			kind: "dom",
			selector: "link[href*='.upravel.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "upravel:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^user_id\\-legacy$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
