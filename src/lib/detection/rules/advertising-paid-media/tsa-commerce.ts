import type { TechnologyDefinition } from '../../types';

export const tsaCommerceTechnologyDefinition = {
	id: "tsa-commerce",
	name: "TSA Commerce",
	website: "https://tsacommerce.com",
	description: "TSA Commerce is a Turbo SEO Affiliate Commerce plugin for WordPress that integrates search engine optimization with affiliate marketing to enhance site monetization.",
	icon: "TSACommerce.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tsa-commerce:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/tsa-commerce/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
