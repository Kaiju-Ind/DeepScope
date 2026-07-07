import type { TechnologyDefinition } from '../../types';

export const estoreShopserveTechnologyDefinition = {
	id: "estore-shopserve",
	name: "Estore Shopserve",
	website: "https://estore.co.jp/shopserve",
	description: "Estore Shopserve is an all-in-one payment processing and ecommerce solution.",
	icon: "EstoreShopserve.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "estore-shopserve:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cart\\d+\\.shopserve\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
