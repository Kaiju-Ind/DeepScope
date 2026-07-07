import type { TechnologyDefinition } from '../../types';

export const viabillTechnologyDefinition = {
	id: "viabill",
	name: "ViaBill",
	website: "https://viabill.com",
	description: "ViaBill is a cloud-based payment management solution designed to help small to midsize retailers and webshops.",
	icon: "ViaBill.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "viabill:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.viabill\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "viabill:jsGlobal:1",
			kind: "jsGlobal",
			property: "viabillOptions.state.subscriptions",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "viabill:jsGlobal:2",
			kind: "jsGlobal",
			property: "viabillPricetagInternal.conf.productsByLocale",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
