import type { TechnologyDefinition } from '../../types';

export const extendthemesCalliopeTechnologyDefinition = {
	id: "extendthemes-calliope",
	name: "ExtendThemes Calliope",
	website: "https://wordpress.org/themes/calliope",
	description: "ExtendThemes Calliope is an flexible, multipurpose WordPress child theme of Colibri WP.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "extendthemes-calliope:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/calliope\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "extendthemes-calliope:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/calliope/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
