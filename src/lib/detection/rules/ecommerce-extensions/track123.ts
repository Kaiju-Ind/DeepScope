import type { TechnologyDefinition } from '../../types';

export const track123TechnologyDefinition = {
	id: "track123",
	name: "Track123",
	website: "https://www.track123.com",
	description: "Track123 is a product under Lingxing, founded in September 2021, with a focus on providing all-in-one tracking and management services for cross-border sellers.",
	icon: "Track123.svg",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "track123:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("track123\\.com\\/common\\/checkout-script-loader\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "track123:jsGlobal:1",
			kind: "jsGlobal",
			property: "track123",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
