import type { TechnologyDefinition } from '../../types';

export const bricksTechnologyDefinition = {
	id: "bricks",
	name: "Bricks",
	website: "https://bricksbuilder.io",
	description: "Bricks is a premium WordPress theme that lets you visually build performant WordPress sites.",
	icon: "Bricks.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "bricks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/bricks\\/assets\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:bricksbuilder:bricks:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
