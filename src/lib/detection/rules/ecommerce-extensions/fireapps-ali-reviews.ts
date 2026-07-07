import type { TechnologyDefinition } from '../../types';

export const fireappsAliReviewsTechnologyDefinition = {
	id: "fireapps-ali-reviews",
	name: "FireApps Ali Reviews",
	website: "https://apps.shopify.com/ali-reviews",
	description: "FireApps Ali Reviews is an all-in-one solution that helps to collect, showcase, and manage impactful reviews.",
	icon: "FireApps.svg",
	categories: [
		"ecommerce-extensions",
		"community-ugc",
	],
	rules: [
		{
			id: "fireapps-ali-reviews:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/alireviews\\.fireapps\\.io\\/"),
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
