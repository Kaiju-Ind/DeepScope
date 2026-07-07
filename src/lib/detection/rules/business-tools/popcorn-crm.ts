import type { TechnologyDefinition } from '../../types';

export const popcornCrmTechnologyDefinition = {
	id: "popcorn-crm",
	name: "Popcorn CRM",
	website: "https://popcorncrm.co.uk",
	description: "Popcorn CRM is a visual CRM providing essential tools to manage customer relationships and support business growth.",
	icon: "PopcornCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "popcorn-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.popcorn\\.email"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
