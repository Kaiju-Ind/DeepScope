import type { TechnologyDefinition } from '../../types';

export const wheelySalesTechnologyDefinition = {
	id: "wheely-sales",
	name: "Wheely Sales",
	website: "https://wheelysales.com",
	description: "Wheely Sales is a tool that boosts email opt-in rates using a gamified exit intent popup designed to engage users as they leave a website.",
	icon: "WheelSales.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wheely-sales:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.wheelysales\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
