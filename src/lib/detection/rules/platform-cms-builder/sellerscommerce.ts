import type { TechnologyDefinition } from '../../types';

export const sellerscommerceTechnologyDefinition = {
	id: "sellerscommerce",
	name: "SellersCommerce",
	website: "https://www.sellerscommerce.com",
	description: "SellersCommerce is a medium ecommerce software company that provides b2b ecommerce platform to retail companies.",
	icon: "SellersCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellerscommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sellerscommerce\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	requires: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
