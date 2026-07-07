import type { TechnologyDefinition } from '../../types';

export const woopraTechnologyDefinition = {
	id: "woopra",
	name: "Woopra",
	website: "https://www.woopra.com",
	description: "Woopra is a customer journey and product analytics software tool that helps businesses track user behavior and analyze customer interactions in real-time.",
	icon: "Woopra.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "woopra:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.woopra\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
