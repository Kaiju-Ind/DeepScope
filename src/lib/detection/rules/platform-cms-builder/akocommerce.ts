import type { TechnologyDefinition } from '../../types';

export const akocommerceTechnologyDefinition = {
	id: "akocommerce",
	name: "AkoCommerce",
	website: "https://akocommerce.com",
	description: "AkoCommerce is a Shopify partner based in Taiwan that provides website planning and construction, as well as ecommerce store opening consultation services.",
	icon: "AkoCommerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "akocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.akocommerce\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
