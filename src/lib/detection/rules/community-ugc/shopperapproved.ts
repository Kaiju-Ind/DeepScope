import type { TechnologyDefinition } from '../../types';

export const shopperapprovedTechnologyDefinition = {
	id: "shopperapproved",
	name: "ShopperApproved",
	website: "https://www.shopperapproved.com",
	description: "ShopperApproved is a platform that enhances eCommerce traffic, sales, and conversions by leveraging trust signals, user-generated content, and social proof.",
	icon: "ShopperApproved.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "shopperapproved:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.shopperapproved\\.com\\/"),
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
