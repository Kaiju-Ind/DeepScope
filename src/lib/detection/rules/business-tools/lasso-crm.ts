import type { TechnologyDefinition } from '../../types';

export const lassoCrmTechnologyDefinition = {
	id: "lasso-crm",
	name: "Lasso CRM",
	website: "https://www.ecisolutions.com/products/lasso-crm",
	description: "Lasso CRM is a new home sales CRM solution for builders, developers, and new homes agencies.",
	icon: "LassoCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lasso-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lassocrm\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lasso-crm:jsGlobal:1",
			kind: "jsGlobal",
			property: "LassoAnalytics",
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
