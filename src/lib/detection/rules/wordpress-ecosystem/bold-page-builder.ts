import type { TechnologyDefinition } from '../../types';

export const boldPageBuilderTechnologyDefinition = {
	id: "bold-page-builder",
	name: "Bold Page Builder",
	website: "https://wordpress.org/plugins/bold-page-builder",
	description: "Bold Page Builder is a plugin or a theme component that allows users to structure and design responsive pages.",
	icon: "Bold Page Builder.png",
	categories: [
		"wordpress-ecosystem",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bold-page-builder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/bold-page-builder\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:bold-themes:bold_page_builder:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
