import type { TechnologyDefinition } from '../../types';

export const wpPuzzleBasicTechnologyDefinition = {
	id: "wp-puzzle-basic",
	name: "WP Puzzle Basic",
	website: "https://wp-puzzle.com/basic",
	description: "WP Puzzle Basic is fully responsive, clean and minimal WordPress theme.",
	icon: "WP Puzzle.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wp-puzzle-basic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/basic\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
