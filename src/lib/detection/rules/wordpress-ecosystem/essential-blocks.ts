import type { TechnologyDefinition } from '../../types';

export const essentialBlocksTechnologyDefinition = {
	id: "essential-blocks",
	name: "Essential Blocks",
	website: "https://essential-blocks.com",
	description: "Essential Blocks is a Gutenberg Blocks page builder plugin that adds extra functionality to the WordPress Block Editor.",
	icon: "essential-blocks.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "essential-blocks:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']wp-block-essential-blocks-*"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "essential-blocks:dom:1",
			kind: "dom",
			selector: "link#essential-blocks-frontend-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "essential-blocks:dom:2",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/eb-style/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
