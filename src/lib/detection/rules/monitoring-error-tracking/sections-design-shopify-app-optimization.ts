import type { TechnologyDefinition } from '../../types';

export const sectionsDesignShopifyAppOptimizationTechnologyDefinition = {
	id: "sections-design-shopify-app-optimization",
	name: "Sections.design Shopify App Optimization",
	website: "https://github.com/mirceapiturca/Sections/tree/master/App%20Optimization",
	description: "Sections.design Shopify App Optimization is a Shopify section written in liquid for the purpose of improving performance of Shopify stores by optimizing how Shopify app loads.",
	icon: "Sections-Design.png",
	categories: [
		"monitoring-error-tracking",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "sections-design-shopify-app-optimization:dom:0",
			kind: "dom",
			selector: "div#shopify-section-app-optimization",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
