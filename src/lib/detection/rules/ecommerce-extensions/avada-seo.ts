import type { TechnologyDefinition } from '../../types';

export const avadaSeoTechnologyDefinition = {
	id: "avada-seo",
	name: "Avada SEO",
	website: "https://apps.shopify.com/avada-seo-suite",
	description: "Avada SEO is a Shopify app built and designed following strict SEO practices.",
	icon: "Avada.svg",
	categories: [
		"ecommerce-extensions",
		"marketing-automation",
	],
	rules: [
		{
			id: "avada-seo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("seo\\.apps\\.avada\\.io\\/"),
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
