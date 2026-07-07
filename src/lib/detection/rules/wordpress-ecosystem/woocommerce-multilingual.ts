import type { TechnologyDefinition } from '../../types';

export const woocommerceMultilingualTechnologyDefinition = {
	id: "woocommerce-multilingual",
	name: "WooCommerce Multilingual",
	website: "https://wordpress.org/plugins/woocommerce-multilingual",
	description: "WooCommerce Multilingual plugin makes it possible to run fully multilingual ecommerce sites using WooCommerce and WPML.",
	icon: "WooCommerce Multilingual.png",
	categories: [
		"wordpress-ecosystem",
		"translations",
	],
	rules: [
		{
			id: "woocommerce-multilingual:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/woocommerce-multilingual\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"woocommerce",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
