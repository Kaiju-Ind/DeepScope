import type { TechnologyDefinition } from '../../types';

export const coinCurrencyConverterTechnologyDefinition = {
	id: "coin-currency-converter",
	name: "Coin Currency Converter",
	website: "https://apps.shopify.com/coin",
	description: "Coin Currency Converter is an automatic currency conversion app for Shopify.",
	icon: "Coin Currency Converter.png",
	categories: [
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "coin-currency-converter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/apps\\/coin\\/coin\\.js.+\\.myshopify\\.com"),
			description: "Script source URL matches a known technology marker.",
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
		"shopify",
	],
} as const satisfies TechnologyDefinition;
