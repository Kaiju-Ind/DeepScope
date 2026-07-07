import type { TechnologyDefinition } from '../../types';

export const pageBuilderFrameworkTechnologyDefinition = {
	id: "page-builder-framework",
	name: "Page Builder Framework",
	website: "https://wp-pagebuilderframework.com",
	description: "Page Builder Framework is a lightweight (less than 50kb on the frontend) and highly customizible WordPress theme.",
	icon: "Page Builder Framework.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "page-builder-framework:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/page-builder-framework\\/.+site-min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
