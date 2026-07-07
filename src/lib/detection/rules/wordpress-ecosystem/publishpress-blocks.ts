import type { TechnologyDefinition } from '../../types';

export const publishpressBlocksTechnologyDefinition = {
	id: "publishpress-blocks",
	name: "PublishPress Blocks",
	website: "https://publishpress.com/blocks/",
	description: "PublishPress Blocks is a Gutenberg Blocks page builder plugin that adds extra functionality to the WordPress Block Editor.",
	icon: "publishpress-blocks.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "publishpress-blocks:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']wp-block-advgb-*"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "publishpress-blocks:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/advanced-gutenberg/assets/css/blocks.css?ver=([\\d\\.]+))?\\;version:\\1']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
