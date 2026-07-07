import type { TechnologyDefinition } from '../../types';

export const shortcodesUltimateTechnologyDefinition = {
	id: "shortcodes-ultimate",
	name: "Shortcodes Ultimate",
	website: "https://getshortcodes.com",
	description: "Shortcodes Ultimate is a comprehensive collection of visual components for WordPress.",
	icon: "Shortcodes Ultimate.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "shortcodes-ultimate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/shortcodes-ultimate\\/.+index\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shortcodes-ultimate:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/shortcodes-ultimate/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:getshortcodes:shortcodes_ultimate:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
