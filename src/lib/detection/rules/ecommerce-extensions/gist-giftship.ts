import type { TechnologyDefinition } from '../../types';

export const gistGiftshipTechnologyDefinition = {
	id: "gist-giftship",
	name: "Gist Giftship",
	website: "https://gist-apps.com/giftship",
	description: "Gist Giftship is a gifting app on Shopify that allows your customers to complete all of their gift shopping at once.",
	icon: "Gist.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "gist-giftship:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\/js\\/giftship\\.([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
