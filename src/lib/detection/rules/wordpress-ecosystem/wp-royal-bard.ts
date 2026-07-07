import type { TechnologyDefinition } from '../../types';

export const wpRoyalBardTechnologyDefinition = {
	id: "wp-royal-bard",
	name: "WP-Royal Bard",
	website: "https://wp-royal.com/themes/item-bard-free",
	description: "WP-Royal Bard is a personal and multi-author WordPress blog theme.",
	icon: "WP-Royal.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-royal-bard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bard(?:-pro-premium)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-royal-bard:dom:1",
			kind: "dom",
			selector: "link#bard-style-css, style#bard_predefined_custom_css",
			description: "DOM selector matches a known technology marker.",
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
