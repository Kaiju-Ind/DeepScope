import type { TechnologyDefinition } from '../../types';

export const payjustnowTechnologyDefinition = {
	id: "payjustnow",
	name: "PayJustNow",
	website: "https://payjustnow.com",
	description: "PayJustNow is a buy now, pay later checkout option for ecommerce sites.",
	icon: "PayJustNow.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "payjustnow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.payjustnow\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
