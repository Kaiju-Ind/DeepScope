import type { TechnologyDefinition } from '../../types';

export const shopixTechnologyDefinition = {
	id: "shopix",
	name: "Shopix",
	website: "https://shopixai.com",
	description: "Shopix is a visual search tool for ecommerce that allows users to find products by uploading images.",
	icon: "Shopix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.shopixai\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopix:jsGlobal:1",
			kind: "jsGlobal",
			property: "shopixAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
