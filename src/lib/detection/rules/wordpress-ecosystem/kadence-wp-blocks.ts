import type { TechnologyDefinition } from '../../types';

export const kadenceWpBlocksTechnologyDefinition = {
	id: "kadence-wp-blocks",
	name: "Kadence WP Blocks",
	website: "https://www.kadencewp.com/kadence-blocks/",
	description: "Kadence Blocks is a plugin for WordPress that provides a collection of custom blocks for the WordPress Block Editor, allowing users to create custom layouts and designs for their website without needing to know how to code.",
	icon: "Kadence WP.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "kadence-wp-blocks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/kadence-blocks\\/dist\\/.+\\/kb-form-block\\.min\\.js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kadence-wp-blocks:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/kadence-blocks/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kadence-wp-blocks:html:2",
			kind: "html",
			pattern: new RegExp("<style[^>]* id=[^>]+kadence-blocks-"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"gutenberg",
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
