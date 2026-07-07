import type { TechnologyDefinition } from '../../types';

export const wpRoyalAsheTechnologyDefinition = {
	id: "wp-royal-ashe",
	name: "WP-Royal Ashe",
	website: "https://wp-royal.com/themes/item-ashe-free",
	description: "WP-Royal Ashe is a personal and multi-author WordPress blog theme.",
	icon: "WP-Royal.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-royal-ashe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/ashe(?:-pro-premium)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-royal-ashe:dom:1",
			kind: "dom",
			selector: "link#ashe-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wp-royal-ashe:jsGlobal:2",
			kind: "jsGlobal",
			property: "ashePreloader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wp-royal-ashe:jsGlobal:3",
			kind: "jsGlobal",
			property: "asheStickySidebar",
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
