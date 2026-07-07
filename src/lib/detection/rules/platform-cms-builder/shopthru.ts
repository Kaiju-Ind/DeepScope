import type { TechnologyDefinition } from '../../types';

export const shopthruTechnologyDefinition = {
	id: "shopthru",
	name: "Shopthru",
	website: "https://www.shopthru.xyz",
	description: "Shopthru is an ecommerce platform empowering businesses with tools to enhance connections, inspire delight, and foster prosperity.",
	icon: "Shopthru.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopthru:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.shopthru\\.xyz\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopthru:jsGlobal:1",
			kind: "jsGlobal",
			property: "shopthru_add_to_cart",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
