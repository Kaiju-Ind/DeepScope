import type { TechnologyDefinition } from '../../types';

export const woocommerceSubscriptionsTechnologyDefinition = {
	id: "woocommerce-subscriptions",
	name: "WooCommerce Subscriptions",
	website: "https://woocommerce.com/products/woocommerce-subscriptions",
	description: "WooCommerce Subscriptions primarily allows you to create and sell subscription products from your WooCommerce shop.",
	icon: "WooCommerce.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce-subscriptions:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/woocommerce-subscriptions/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
	implies: [
		"woocommerce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
