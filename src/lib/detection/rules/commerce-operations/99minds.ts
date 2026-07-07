import type { TechnologyDefinition } from '../../types';

export const technology99mindsTechnologyDefinition = {
	id: "99minds",
	name: "99minds",
	website: "https://www.99minds.io",
	description: "99minds is an online platform for managing and scaling gift cards, store credit, digital wallets, and loyalty programs.",
	icon: "99minds.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "99minds:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.99minds\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "99minds:jsGlobal:1",
			kind: "jsGlobal",
			property: "_99mindsDataLayer",
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
