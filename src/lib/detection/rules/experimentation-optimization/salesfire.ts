import type { TechnologyDefinition } from '../../types';

export const salesfireTechnologyDefinition = {
	id: "salesfire",
	name: "SalesFire",
	website: "https://www.salesfire.co.uk",
	description: "SalesFire is a SaaS company specialising in conversion rate optimisation, intelligent personalisation and on-site search solutions.",
	icon: "SalesFire.svg",
	categories: [
		"experimentation-optimization",
		"search",
	],
	rules: [
		{
			id: "salesfire:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.salesfire\\.co\\.uk\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesfire:jsGlobal:1",
			kind: "jsGlobal",
			property: "loadSalesfire",
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
