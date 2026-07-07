import type { TechnologyDefinition } from '../../types';

export const worketcTechnologyDefinition = {
	id: "worketc",
	name: "WORKetc",
	website: "https://www.worketc.com",
	description: "WORKetc is an all-in-one cloud computing platform offering web-based CRM, project management, and collaboration tools.",
	icon: "WORKetc.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "worketc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.worketc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "worketc:dom:1",
			kind: "dom",
			selector: "iframe[src*='.worketc.com/']",
			description: "DOM selector matches a known technology marker.",
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
