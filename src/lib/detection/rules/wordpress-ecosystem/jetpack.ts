import type { TechnologyDefinition } from '../../types';

export const jetpackTechnologyDefinition = {
	id: "jetpack",
	name: "Jetpack",
	website: "https://jetpack.com",
	description: "Jetpack is a popular WordPress plugin created by Automattic, the people behind WordPress.com.",
	icon: "Jetpack.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "jetpack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/jetpack\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jetpack:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/jetpack/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:automattic:jetpack:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
