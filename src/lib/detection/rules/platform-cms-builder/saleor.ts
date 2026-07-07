import type { TechnologyDefinition } from '../../types';

export const saleorTechnologyDefinition = {
	id: "saleor",
	name: "Saleor",
	website: "https://saleor.io",
	description: "Saleor is a headless, GraphQL ecommerce platform.",
	icon: "Saleor.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "saleor:dom:0",
			kind: "dom",
			selector: "img[src*='saleor'], img[srcset*='saleor'], link[imagesrcset*='saleor']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "saleor:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NEXT_DATA__.runtimeConfig.SALEOR",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "saleor:jsGlobal:2",
			kind: "jsGlobal",
			property: "___NEXT_DATA__.runtimeConfig.SALEOR",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
		cpe: "cpe:2.3:a:saleor:saleor:*:*:*:*:*:*:*:*",
	},
	implies: [
		"graphql",
	],
} as const satisfies TechnologyDefinition;
