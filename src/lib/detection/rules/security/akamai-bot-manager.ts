import type { TechnologyDefinition } from '../../types';

export const akamaiBotManagerTechnologyDefinition = {
	id: "akamai-bot-manager",
	name: "Akamai Bot Manager",
	website: "https://www.akamai.com/us/en/products/security/bot-manager.jsp",
	description: "Akamai Bot Manager detect bots using device fingerprinting bot signatures.",
	icon: "Akamai.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "akamai-bot-manager:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ak_bmsc$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "akamai-bot-manager:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^bm_sv$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "akamai-bot-manager:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^bm_sz$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"akamai",
	],
} as const satisfies TechnologyDefinition;
