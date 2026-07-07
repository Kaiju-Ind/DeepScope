import type { TechnologyDefinition } from '../../types';

export const shoprenterTechnologyDefinition = {
	id: "shoprenter",
	name: "Shoprenter",
	website: "https://www.shoprenter.hu",
	description: "Shoprenter offers a platform for building and running an ecommerce store.",
	icon: "Shoprenter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shoprenter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cdn\\.shoprenter\\.hu\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shoprenter:jsGlobal:1",
			kind: "jsGlobal",
			property: "ShopRenter.customer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
