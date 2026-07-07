import type { TechnologyDefinition } from '../../types';

export const dominateWoocommerceTechnologyDefinition = {
	id: "dominate-woocommerce",
	name: "Dominate WooCommerce",
	website: "https://www.dominate.co/woocommerce",
	description: "Dominate WooCommerce is a cloud-based checkout-page which supports PayPal Smart buttons for Venmo, PayPal Credit, and other payment methods.",
	icon: "Dominate.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "dominate-woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/iwd-checkout-connector\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
	requires: [
		"woocommerce",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
