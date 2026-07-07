import type { TechnologyDefinition } from '../../types';

export const themeFreesiaShoppingcartTechnologyDefinition = {
	id: "theme-freesia-shoppingcart",
	name: "Theme Freesia ShoppingCart",
	website: "https://themefreesia.com/themes/shoppingcart",
	description: "ShoppingCart is a WordPress theme especially build for store and ecommerce by Theme Freesia.",
	icon: "Theme Freesia.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "theme-freesia-shoppingcart:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/shoppingcart(?:-plus)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "theme-freesia-shoppingcart:jsGlobal:1",
			kind: "jsGlobal",
			property: "shoppingcart_slider_value",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
