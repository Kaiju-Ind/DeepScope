import type { TechnologyDefinition } from '../../types';

export const soliticsTechnologyDefinition = {
	id: "solitics",
	name: "Solitics",
	website: "https://solitics.com",
	description: "Solitics is a platform that analyzes customer data to optimize engagement and drive targeted marketing strategies.",
	icon: "Solitics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "solitics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.solitics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "solitics:jsGlobal:1",
			kind: "jsGlobal",
			property: "$solitics.anonymousConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "solitics:jsGlobal:2",
			kind: "jsGlobal",
			property: "$soliticsHeartbit",
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
