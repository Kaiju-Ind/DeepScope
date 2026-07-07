import type { TechnologyDefinition } from '../../types';

export const godaddyUptownStyleTechnologyDefinition = {
	id: "godaddy-uptown-style",
	name: "GoDaddy Uptown Style",
	website: "https://github.com/godaddy-wordpress/primer-child-uptownstyle",
	description: "GoDaddy Uptown Style is a GoDaddy Primer child theme with elegance and class.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "godaddy-uptown-style:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/uptown-style/']",
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
