import type { TechnologyDefinition } from '../../types';

export const ezoicTechnologyDefinition = {
	id: "ezoic",
	name: "Ezoic",
	website: "https://www.ezoic.com",
	description: "Ezoic is a website optimisation platform for digital publishers and website owners powered by machine learning.",
	icon: "Ezoic.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "ezoic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ezo(?:js|ic|dn)\\.(?:com|net)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ezoic:jsGlobal:1",
			kind: "jsGlobal",
			property: "EzoicA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ezoic:jsGlobal:2",
			kind: "jsGlobal",
			property: "EzoicBanger",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ezoic:jsGlobal:3",
			kind: "jsGlobal",
			property: "ezoicTestActive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
