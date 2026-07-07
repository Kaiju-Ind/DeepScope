import type { TechnologyDefinition } from '../../types';

export const yoastSeoForShopifyTechnologyDefinition = {
	id: "yoast-seo-for-shopify",
	name: "Yoast SEO for Shopify",
	website: "https://yoast.com/shopify/apps/yoast-seo/",
	description: "Yoast SEO for Shopify optimizes Shopify shops.",
	icon: "yoast-seo-shopify.png",
	categories: [
		"marketing-automation",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "yoast-seo-for-shopify:html:0",
			kind: "html",
			pattern: new RegExp("<!-- This site is optimized with Yoast SEO for Shopify -->"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "yoast-seo-for-shopify:dom:1",
			kind: "dom",
			selector: "script#yoast-schema-graph",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "yoast-seo-for-shopify:html:2",
			kind: "html",
			pattern: new RegExp("<!-- this site is optimized with yoast seo for shopify -->"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
