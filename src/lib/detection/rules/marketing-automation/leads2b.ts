import type { TechnologyDefinition } from '../../types';

export const leads2bTechnologyDefinition = {
	id: "leads2b",
	name: "Leads2b",
	website: "https://leads2b.com",
	description: "Leads2b is a prospecting system that helps identify and access company data from Brazil for sales, marketing, and business development purposes.",
	icon: "Leads2b.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leads2b:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.app\\.leads2b\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
