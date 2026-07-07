import type { TechnologyDefinition } from '../../types';

export const otterBlocksTechnologyDefinition = {
	id: "otter-blocks",
	name: "Otter Blocks",
	website: "https://wordpress.org/plugins/otter-blocks/",
	description: "Otter blocks is a Gutenberg Blocks page builder plugin that adds extra functionality to the WordPress Block Editor.",
	icon: "otter-blocks.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "otter-blocks:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']wp-block-themeisle-blocks-*"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "otter-blocks:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/otter-blocks']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
