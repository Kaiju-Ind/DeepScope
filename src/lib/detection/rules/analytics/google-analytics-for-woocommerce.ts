import type { TechnologyDefinition } from '../../types';

export const googleAnalyticsForWoocommerceTechnologyDefinition = {
	id: "google-analytics-for-woocommerce",
	name: "Google Analytics for WooCommerce",
	website: "https://woocommerce.com/products/woocommerce-google-analytics/",
	description: "Google Analytics for WooCommerce connects your store to your Google Analytics account for ecommerce and site analytics, providing valuable metrics on your store’s performance.",
	icon: "WooCommerceGA.png",
	categories: [
		"analytics",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "google-analytics-for-woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-google-analytics-integration\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"woocommerce",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
