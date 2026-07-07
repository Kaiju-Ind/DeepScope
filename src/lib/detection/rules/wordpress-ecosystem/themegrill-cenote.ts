import type { TechnologyDefinition } from '../../types';

export const themegrillCenoteTechnologyDefinition = {
	id: "themegrill-cenote",
	name: "ThemeGrill Cenote",
	website: "https://themegrill.com/themes/cenote",
	description: "ThemeGrill Cenote is a creative blogging WordPress theme, fully compatible with WooCommerce and popular page builders.",
	icon: "ThemeGrill.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themegrill-cenote:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/cenote(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "themegrill-cenote:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/cenote/'], link[href*='/wp-content/themes/cenote-pro/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
