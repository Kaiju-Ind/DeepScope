import type { TechnologyDefinition } from '../../types';

export const woocommerceBlocksTechnologyDefinition = {
	id: "woocommerce-blocks",
	name: "WooCommerce Blocks",
	website: "https://github.com/woocommerce/woocommerce-gutenberg-products-block",
	description: "WooCommerce Blocks offers a range of blocks for the WordPress Block Editor you can use to build and customise your site.",
	icon: "WooCommerce Blocks.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "woocommerce-blocks:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/woo-gutenberg-products-block/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:automattic:woocommerce_blocks:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"wordpress-block-editor",
	],
	requires: [
		"woocommerce",
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
