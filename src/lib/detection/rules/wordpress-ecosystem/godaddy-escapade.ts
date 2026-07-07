import type { TechnologyDefinition } from '../../types';

export const godaddyEscapadeTechnologyDefinition = {
	id: "godaddy-escapade",
	name: "GoDaddy Escapade",
	website: "https://github.com/godaddy-wordpress/primer-child-escapade",
	description: "GoDaddy Escapade is a GoDaddy Primer child theme with a unique sidebar navigation.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "godaddy-escapade:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/escapade/']",
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
