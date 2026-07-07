import type { TechnologyDefinition } from '../../types';

export const flyingAnalyticsTechnologyDefinition = {
	id: "flying-analytics",
	name: "Flying Analytics",
	website: "https://wordpress.org/plugins/flying-analytics/",
	description: "Flying Analytics is a performance optimisation plugin for WordPress websites designed to reduce page load times and improve the user experience.",
	icon: "default.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "flying-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/flying-analytics\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flying-analytics:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/flying-analytics/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
