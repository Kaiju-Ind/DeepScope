import type { TechnologyDefinition } from '../../types';

export const reconvertTechnologyDefinition = {
	id: "reconvert",
	name: "ReConvert",
	website: "https://www.reconvert.io",
	description: "ReConvert is a post-purchase upsell & thank you page.",
	icon: "ReConvert.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "reconvert:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stilyoapps\\.com\\/reconvert\\/assets\\/js\\/store_reconvert_node\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
