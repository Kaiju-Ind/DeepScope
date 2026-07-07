import type { TechnologyDefinition } from '../../types';

export const chargeafterTechnologyDefinition = {
	id: "chargeafter",
	name: "ChargeAfter",
	website: "https://chargeafter.com/",
	description: "ChargeAfter is a platform that connects retailers and lenders to offer consumers personalized Point of Sale Financing options at checkout from multiple lenders.",
	icon: "ChargeAfter.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "chargeafter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.chargeafter\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chargeafter:jsGlobal:1",
			kind: "jsGlobal",
			property: "ChargeAfter",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
