import type { TechnologyDefinition } from '../../types';

export const godaddyPrimerTechnologyDefinition = {
	id: "godaddy-primer",
	name: "GoDaddy Primer",
	website: "https://github.com/godaddy-wordpress/primer",
	description: "GoDaddy Primer is a powerful theme that brings clarity to your content in a fresh design. This is the parent for all themes in the GoDaddy Primer theme family.",
	icon: "GoDaddy.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "godaddy-primer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/primer\\/.+navigation\\.min\\.js(?:.+ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "godaddy-primer:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/primer/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
