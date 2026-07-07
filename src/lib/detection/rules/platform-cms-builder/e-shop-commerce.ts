import type { TechnologyDefinition } from '../../types';

export const eShopCommerceTechnologyDefinition = {
	id: "e-shop-commerce",
	name: "e-Shop Commerce",
	website: "https://www.e-shop.co.il",
	description: "e-Shop is a all-in-one Software-as-a-Service (SaaS) that allows Israeli customers to set up an online store and sell their products.",
	icon: "eShop eCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "e-shop-commerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/template_inc\\/eshopstoresframework"),
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
