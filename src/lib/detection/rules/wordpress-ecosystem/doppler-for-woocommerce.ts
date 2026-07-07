import type { TechnologyDefinition } from '../../types';

export const dopplerForWoocommerceTechnologyDefinition = {
	id: "doppler-for-woocommerce",
	name: "Doppler for WooCommerce",
	website: "https://wordpress.org/plugins/doppler-for-woocommerce/",
	description: "The Doppler for WooCommerce plugin adds submit your WooCommerce customers and buyers to a Doppler List.",
	icon: "Doppler.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "doppler-for-woocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/doppler-for-woocommerce\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"doppler",
	],
	requires: [
		"woocommerce",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
