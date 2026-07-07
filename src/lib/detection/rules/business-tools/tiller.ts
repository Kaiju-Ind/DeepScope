import type { TechnologyDefinition } from '../../types';

export const tillerTechnologyDefinition = {
	id: "tiller",
	name: "Tiller",
	website: "https://www.tillerhq.com",
	description: "Tiller is a tool that automatically tracks your spending, balances, and budgets in flexible spreadsheets owned by you.",
	icon: "Tiller.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tiller:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.by\\.tiller\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
