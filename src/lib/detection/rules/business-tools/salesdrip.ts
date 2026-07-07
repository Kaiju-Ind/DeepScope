import type { TechnologyDefinition } from '../../types';

export const salesdripTechnologyDefinition = {
	id: "salesdrip",
	name: "SalesDrip",
	website: "https://www.salesdrip.com",
	description: "SalesDrip is a freight broker CRM and freight automation software.",
	icon: "SalesDrip.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salesdrip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.salesdrip\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
