import type { TechnologyDefinition } from '../../types';

export const woocommercePaypalCheckoutPaymentGatewayTechnologyDefinition = {
	id: "woocommerce-paypal-checkout-payment-gateway",
	name: "WooCommerce PayPal Checkout Payment Gateway",
	website: "https://github.com/woocommerce/woocommerce-gateway-paypal-express-checkout",
	description: "WooCommerce PayPal Checkout Payment Gateway is a WordPress plugin which allows you to securely sell your products and subscriptions online using in-context checkout.",
	icon: "WooCommerce PayPal.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce-paypal-checkout-payment-gateway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-gateway-paypal-express-checkout\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woocommerce-paypal-checkout-payment-gateway:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/woocommerce-gateway-paypal-express-checkout/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
	implies: [
		"paypal",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
