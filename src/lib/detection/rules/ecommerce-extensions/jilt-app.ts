import type { TechnologyDefinition } from '../../types';

export const jiltAppTechnologyDefinition = {
	id: "jilt-app",
	name: "Jilt App",
	website: "https://community.shopify.com/c/shopify-apps/jilt-is-over-what-app-to-use-for-abandoned-carts-now/td-p/1575095",
	description: "Jilt App helps ecommerce store owners track and recover abandoned orders. Works seamlessly with Shopify and WooCommerce.",
	icon: "Jilt.svg",
	categories: [
		"ecommerce-extensions",
		"commerce-operations",
	],
	rules: [
		{
			id: "jilt-app:jsGlobal:0",
			kind: "jsGlobal",
			property: "jiltStorefrontParams.platform",
			valuePattern: new RegExp("^shopify$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
