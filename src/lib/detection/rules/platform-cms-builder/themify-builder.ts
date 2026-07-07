import type { TechnologyDefinition } from '../../types';

export const themifyBuilderTechnologyDefinition = {
	id: "themify-builder",
	name: "Themify Builder",
	website: "https://themify.me/builder",
	description: "Themify Builder is a plugin that allows users to create complex layouts and designs by dragging and dropping elements onto their pages.",
	icon: "themify-builder.png",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themify-builder:html:0",
			kind: "html",
			pattern: new RegExp("<div[^>]+class=[\"']themify_builder_*"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
