import type { TechnologyDefinition } from '../../types';

export const shopifyWebComponentsTechnologyDefinition = {
	id: "shopify-web-components",
	name: "Shopify Web Components",
	website: "https://shopify.dev/docs/api/storefront-web-components",
	description: "Storefront Web Components let you bring Shopify-powered commerce capabilities to any website.",
	icon: "Shopify.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "shopify-web-components:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shopify\\.com\\/storefront\\/web-components\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
