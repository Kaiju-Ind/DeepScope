import type { TechnologyDefinition } from '../../types';

export const taxdomeTechnologyDefinition = {
	id: "taxdome",
	name: "Taxdome",
	website: "https://taxdome.com",
	description: "Taxdome is a practice management software designed for tax and accounting firms to streamline workflows, manage clients, and organize documents.",
	icon: "Taxdome.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "taxdome:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.taxdome\\.com\\/"),
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
