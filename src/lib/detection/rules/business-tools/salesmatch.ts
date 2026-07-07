import type { TechnologyDefinition } from '../../types';

export const salesmatchTechnologyDefinition = {
	id: "salesmatch",
	name: "SalesMatch",
	website: "https://salesmatch.ai",
	description: "SalesMatch is a business automation platform that streamlines operations through integrated applications, optimizing process management and growth.",
	icon: "SalesMatch.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesmatch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.salesmatch\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesmatch:jsGlobal:1",
			kind: "jsGlobal",
			property: "salesmatchSettings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
