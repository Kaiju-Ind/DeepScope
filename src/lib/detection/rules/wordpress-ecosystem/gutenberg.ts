import type { TechnologyDefinition } from '../../types';

export const gutenbergTechnologyDefinition = {
	id: "gutenberg",
	name: "Gutenberg",
	website: "https://github.com/WordPress/gutenberg",
	description: "Gutenberg is the development plugin in which new features for the WordPress Block Editor are tested.",
	icon: "Gutenberg.png",
	categories: [
		"wordpress-ecosystem",
		"rich-text-editors",
	],
	rules: [
		{
			id: "gutenberg:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/gutenberg\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gutenberg:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/gutenberg/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:wordpress:gutenberg:*:*:*:*:*:wordpress:*:*",
	},
	implies: [
		"wordpress-block-editor",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
