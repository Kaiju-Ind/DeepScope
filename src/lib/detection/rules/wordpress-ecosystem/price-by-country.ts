import type { TechnologyDefinition } from '../../types';

export const priceByCountryTechnologyDefinition = {
	id: "price-by-country",
	name: "Price By Country",
	website: "https://woocommerce.com/products/price-by-country",
	description: "Price By Country is a WooCommerce plugin that enables store owners to set different product prices based on the customer's country.",
	icon: "WooCommerce.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "price-by-country:jsGlobal:0",
			kind: "jsGlobal",
			property: "wc_price_based_country_ajax_geo_params",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "price-by-country:jsGlobal:1",
			kind: "jsGlobal",
			property: "wc_price_based_country_pro_frontend_params",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
