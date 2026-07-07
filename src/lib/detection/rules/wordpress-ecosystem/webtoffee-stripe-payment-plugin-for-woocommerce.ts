import type { TechnologyDefinition } from '../../types';

export const webtoffeeStripePaymentPluginForWoocommerceTechnologyDefinition = {
	id: "webtoffee-stripe-payment-plugin-for-woocommerce",
	name: "WebToffee Stripe Payment Plugin for WooCommerce",
	website: "https://www.webtoffee.com/product/woocommerce-stripe-payment-gateway/",
	description: "WebToffee Stripe Payment Plugin for WooCommerce is a software add-on that allows online retailers using the WooCommerce ecommerce platform to accept payments through the Stripe payment gateway.",
	icon: "WebToffee.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "webtoffee-stripe-payment-plugin-for-woocommerce:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/payment-gateway-stripe-and-woocommerce-integration/']",
			description: "DOM selector matches a known technology marker.",
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
		"stripe",
		"woocommerce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
