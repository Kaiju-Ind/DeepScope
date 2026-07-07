import type { TechnologyDefinition } from '../../types';

export const identixwebIcartTechnologyDefinition = {
	id: "identixweb-icart",
	name: "Identixweb iCart",
	website: "https://www.identixweb.com/shopify-app/icart/",
	description: "Identixweb iCart is a Shopify upsell app designed to boost pre-purchase sales and conversions directly in the cart without disrupting the shopping experience.",
	icon: "IdentixwebiCart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "identixweb-icart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnicart\\.identixweb\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "identixweb-icart:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackChunk_identixweb_order_delivery_date",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
