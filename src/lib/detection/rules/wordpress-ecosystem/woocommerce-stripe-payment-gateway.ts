import type { TechnologyDefinition } from '../../types';

export const woocommerceStripePaymentGatewayTechnologyDefinition = {
	id: "woocommerce-stripe-payment-gateway",
	name: "WooCommerce Stripe Payment Gateway",
	website: "https://woocommerce.com/products/stripe",
	description: "WooCommerce Stripe Payment Gateway plugin extends WooCommerce allowing you to take payments directly on your store via Stripe’s API.",
	icon: "WooCommerce Stripe Payment Gateway.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce-stripe-payment-gateway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-gateway-stripe\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woocommerce-stripe-payment-gateway:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/woocommerce-gateway-stripe/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	implies: [
		"stripe",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
