import type { TechnologyDefinition } from '../../types';

export const splititTechnologyDefinition = {
	id: "splitit",
	name: "SplitIt",
	website: "https://www.splitit.com",
	description: "SplitIt is a payment solution that divides a purchase into smaller monthly installments.",
	icon: "SplitIt.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "splitit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.production\\.splitit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "splitit:jsGlobal:1",
			kind: "jsGlobal",
			property: "Splitit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "splitit:jsGlobal:2",
			kind: "jsGlobal",
			property: "wc_ga_pro.available_gateways.splitit",
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
