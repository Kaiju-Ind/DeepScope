import type { TechnologyDefinition } from '../../types';

export const godaddyLyricalTechnologyDefinition = {
	id: "godaddy-lyrical",
	name: "GoDaddy Lyrical",
	website: "https://github.com/godaddy-wordpress/primer-child-lyrical",
	description: "GoDaddy Lyrical is a GoDaddy Primer child theme with a focus on photography and beautiful fonts.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "godaddy-lyrical:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/lyrical/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
	excludes: [
		"godaddy-primer",
	],
} as const satisfies TechnologyDefinition;
