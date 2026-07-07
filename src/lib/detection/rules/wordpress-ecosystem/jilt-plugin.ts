import type { TechnologyDefinition } from '../../types';

export const jiltPluginTechnologyDefinition = {
	id: "jilt-plugin",
	name: "Jilt plugin",
	website: "https://wordpress.org/plugins/jilt-for-woocommerce",
	description: "Jilt plugin helps ecommerce store owners track and recover abandoned orders. Works seamlessly with Shopify and WooCommerce.",
	icon: "Jilt.svg",
	categories: [
		"wordpress-ecosystem",
		"commerce-operations",
	],
	rules: [
		{
			id: "jilt-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jilt\\.com\\/.+\\/jilt\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
