import type { TechnologyDefinition } from '../../types';

export const ifcMarketsTechnologyDefinition = {
	id: "ifc-markets",
	name: "IFC Markets",
	website: "https://www.ifcmarkets.com",
	description: "IFC Markets is a provider of Forex and CFD trading.",
	icon: "IFCMarkets.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ifc-markets:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.ifcmarkets\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ifc-markets:jsGlobal:1",
			kind: "jsGlobal",
			property: "ifc_chartcontainer_id",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
