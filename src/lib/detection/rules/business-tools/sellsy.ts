import type { TechnologyDefinition } from '../../types';

export const sellsyTechnologyDefinition = {
	id: "sellsy",
	name: "Sellsy",
	website: "https://go.sellsy.com",
	description: "Sellsy is a cloud-based sales management solution for small to midsize businesses.",
	icon: "Sellsy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sellsy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sellsy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sellsy:jsGlobal:1",
			kind: "jsGlobal",
			property: "SellsySnippet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
