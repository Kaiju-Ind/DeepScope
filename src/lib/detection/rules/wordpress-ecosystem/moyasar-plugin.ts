import type { TechnologyDefinition } from '../../types';

export const moyasarPluginTechnologyDefinition = {
	id: "moyasar-plugin",
	name: "Moyasar Plugin",
	website: "https://wordpress.org/plugins/moyasar/",
	description: "Moyasar Plugin is a WooCommerce payment gateway plugin that adds Moyasar card and wallet payment methods to WordPress stores.",
	icon: "Moyasar.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "moyasar-plugin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/moyasar\\/assets\\/general\\/js\\/helpers\\/(?:triggers|samsungHelper)\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moyasar-plugin:dom:1",
			kind: "dom",
			selector: "script#moyasar_triggers_js-js, script#moyasar_samsung_helper_js-js",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"moyasar",
	],
	requires: [
		"woocommerce",
	],
} as const satisfies TechnologyDefinition;
