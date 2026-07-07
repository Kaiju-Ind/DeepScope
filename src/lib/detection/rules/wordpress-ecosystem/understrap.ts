import type { TechnologyDefinition } from '../../types';

export const understrapTechnologyDefinition = {
	id: "understrap",
	name: "Understrap",
	website: "https://understrap.com",
	description: "Understrap is a renowned WordPress starter theme framework that combined Underscores and Bootstrap.",
	icon: "Understrap.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "understrap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/themes\\/understrap(?:[masterchild-]+)?(?:[masterchild-]+)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	implies: [
		"bootstrap",
		"underscore-js",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
