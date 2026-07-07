import type { TechnologyDefinition } from '../../types';

export const beeshopTechnologyDefinition = {
	id: "beeshop",
	name: "Beeshop",
	website: "https://beeshop.pro",
	description: "Beeshop is a SaaS platform that enables the creation of B2C and B2B ecommerce sites.",
	icon: "Beeshop.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beeshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/beeshop\\/js\\/BeeShop\\.Ajax\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "beeshop:jsGlobal:1",
			kind: "jsGlobal",
			property: "BsCart.cartData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "beeshop:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/beeshop\\/js\\/beeshop\\.ajax\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
