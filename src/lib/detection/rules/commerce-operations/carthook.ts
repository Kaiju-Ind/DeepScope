import type { TechnologyDefinition } from '../../types';

export const carthookTechnologyDefinition = {
	id: "carthook",
	name: "CartHook",
	website: "https://carthook.com",
	description: "CartHook is a solution for creating post-purchase upsell offers on Shopify.",
	icon: "CartHook.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "carthook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.c\\.carthook\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
