import type { TechnologyDefinition } from '../../types';

export const extendthemesHighlightTechnologyDefinition = {
	id: "extendthemes-highlight",
	name: "ExtendThemes Highlight",
	website: "https://extendthemes.com/highlight",
	description: "ExtendThemes Highlight is an flexible, multipurpose WordPress theme.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendthemes-highlight:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/highlight(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extendthemes-highlight:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/highlight/'], link[href*='/wp-content/themes/highlight-pro/']",
			description: "DOM selector matches a known technology marker.",
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
	excludes: [
		"extendthemes-mesmerize",
	],
} as const satisfies TechnologyDefinition;
