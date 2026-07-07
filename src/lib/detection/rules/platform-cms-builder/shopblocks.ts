import type { TechnologyDefinition } from '../../types';

export const shopblocksTechnologyDefinition = {
	id: "shopblocks",
	name: "Shopblocks",
	website: "https://www.shopblocks.com",
	description: "Shopblocks is a B2B ecommerce partner that transforms complex commercial challenges into growth opportunities.",
	icon: "Shopblocks.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "shopblocks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.myshopblocks\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shopblocks:dom:1",
			kind: "dom",
			selector: "link[href*='.myshopblocks.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
