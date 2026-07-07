import type { TechnologyDefinition } from '../../types';

export const duelTechnologyDefinition = {
	id: "duel",
	name: "Duel",
	website: "https://www.duel.tech",
	description: "Duel is a customer advocacy marketing platform.",
	icon: "Duel.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "duel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.duel\\.me\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "duel:jsGlobal:1",
			kind: "jsGlobal",
			property: "DUEL.apiURL",
			valuePattern: new RegExp("api\\.duel\\.me"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "duel:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_duelcsrf$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"onetime",
			"poa",
			"recurring",
		],
	},
	implies: [
		"angular",
		"mongodb",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
