import type { TechnologyDefinition } from '../../types';

export const addshoppersTechnologyDefinition = {
	id: "addshoppers",
	name: "AddShoppers",
	website: "https://www.addshoppers.com",
	description: "AddShoppers is the social media marketing command center for small-medium online retailers.",
	icon: "AddShoppers.png",
	categories: [
		"widgets-misc",
		"analytics",
	],
	rules: [
		{
			id: "addshoppers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:cdn\\.)?shop\\.pe\\/widget\\/"),
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
