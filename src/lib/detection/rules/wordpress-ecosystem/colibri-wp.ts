import type { TechnologyDefinition } from '../../types';

export const colibriWpTechnologyDefinition = {
	id: "colibri-wp",
	name: "Colibri WP",
	website: "https://colibriwp.com",
	description: "Colibri WP is a drag-and-drop website builder and theme system for WordPress.",
	icon: "Colibri WP.png",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "colibri-wp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/colibri-page-builder.+\\.js(?:.+ver=([\\d\\.\\-\\w]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colibri-wp:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/colibri-page-builder']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "colibri-wp:jsGlobal:2",
			kind: "jsGlobal",
			property: "Colibri",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "colibri-wp:jsGlobal:3",
			kind: "jsGlobal",
			property: "colibriData",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "colibri-wp:jsGlobal:4",
			kind: "jsGlobal",
			property: "colibriFrontendData",
			description: "Page-owned global matches a known technology marker.",
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
