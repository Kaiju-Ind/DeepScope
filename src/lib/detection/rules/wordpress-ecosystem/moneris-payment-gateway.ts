import type { TechnologyDefinition } from '../../types';

export const monerisPaymentGatewayTechnologyDefinition = {
	id: "moneris-payment-gateway",
	name: "Moneris Payment Gateway",
	website: "https://wordpress.org/plugins/wc-moneris-payment-gateway",
	description: "Moneris is Canada’s leading processor of Debit and credit card payments. This WooCommerce extension automatically adds moneris payment gateway to your woocommerce website and allows you to keep the customer on your site for the checkout process.",
	icon: "Moneris.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "moneris-payment-gateway:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-gateway-moneris\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moneris-payment-gateway:jsGlobal:1",
			kind: "jsGlobal",
			property: "wc_moneris_hosted_tokenization_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	implies: [
		"moneris",
		"woocommerce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
