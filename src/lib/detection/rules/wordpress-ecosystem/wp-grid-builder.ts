import type { TechnologyDefinition } from '../../types';

export const wpGridBuilderTechnologyDefinition = {
	id: "wp-grid-builder",
	name: "WP Grid Builder",
	website: "https://wpgridbuilder.com",
	description: "WP Grid Builder is a WordPress plugin that enables the creation of advanced grid layouts.",
	icon: "WpGridBuilder.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-grid-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-grid-builder\\/frontend\\/assets\\/js\\/layout\\.js\\?ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wp-grid-builder:jsGlobal:1",
			kind: "jsGlobal",
			property: "WP_Grid_Builder",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
