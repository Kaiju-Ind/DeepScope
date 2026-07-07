import type { TechnologyDefinition } from '../../types';

export const wordpressDefaultTechnologyDefinition = {
	id: "wordpress-default",
	name: "WordPress Default",
	website: "https://wordpress.org/themes/default",
	description: "WordPress Default is a default WordPress theme.",
	icon: "WordPress.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wordpress-default:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/default\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wordpress-default:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/themes/default/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
