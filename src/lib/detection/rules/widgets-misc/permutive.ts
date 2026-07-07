import type { TechnologyDefinition } from '../../types';

export const permutiveTechnologyDefinition = {
	id: "permutive",
	name: "Permutive",
	website: "https://permutive.com",
	description: "Permutive is a publisher-focused data management platform.",
	icon: "Permutive.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "permutive:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.permutive\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "permutive:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("api\\.permutive\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "permutive:jsGlobal:2",
			kind: "jsGlobal",
			property: "permutive",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
