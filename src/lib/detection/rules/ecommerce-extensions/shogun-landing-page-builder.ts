import type { TechnologyDefinition } from '../../types';

export const shogunLandingPageBuilderTechnologyDefinition = {
	id: "shogun-landing-page-builder",
	name: "Shogun Landing Page Builder",
	website: "https://apps.shopify.com/shogun",
	description: "Shogun Landing Page Builder is a drag and drop Shopify page builder for creating high-converting store pages.",
	icon: "Shogun Page Builder.svg",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "shogun-landing-page-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getshogun\\.com\\/.+\\.myshopify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
	implies: [
		"shogun-page-builder",
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
