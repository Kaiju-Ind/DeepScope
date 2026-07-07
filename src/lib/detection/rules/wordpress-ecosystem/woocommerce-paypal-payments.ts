import type { TechnologyDefinition } from '../../types';

export const woocommercePaypalPaymentsTechnologyDefinition = {
	id: "woocommerce-paypal-payments",
	name: "WooCommerce PayPal Payments",
	website: "https://github.com/woocommerce/woocommerce-paypal-payments",
	description: "WooCommerce PayPal Payments is a latest WordPress plugin with most complete payment processing solution. Accept PayPal exclusives, credit/debit cards and local payment methods.",
	icon: "WooCommerce PayPal.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce-paypal-payments:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-paypal-payments\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woocommerce-paypal-payments:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/woocommerce-paypal-payments/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"paypal",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
