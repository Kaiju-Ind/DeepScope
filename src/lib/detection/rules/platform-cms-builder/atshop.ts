import type { TechnologyDefinition } from '../../types';

export const atshopTechnologyDefinition = {
	id: "atshop",
	name: "ATSHOP",
	website: "https://atshop.io",
	description: "ATSHOP is an all-in-one ecommerce platform.",
	icon: "ATSHOP.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "atshop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.atshop\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "atshop:dom:1",
			kind: "dom",
			selector: "link[href*='cdn.atshop.io']",
			description: "DOM selector matches a known technology marker.",
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
