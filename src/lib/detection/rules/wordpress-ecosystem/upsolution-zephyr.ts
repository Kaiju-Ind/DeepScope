import type { TechnologyDefinition } from '../../types';

export const upsolutionZephyrTechnologyDefinition = {
	id: "upsolution-zephyr",
	name: "UpSolution Zephyr",
	website: "https://zephyr.us-themes.com",
	description: "Zephyr is a WordPress theme developed by UpSolution, a software development company based in Ukraine that specialises in creating themes and plugins for WordPress.",
	icon: "UpSolution.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "upsolution-zephyr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/Zephyr\\/.+us\\.theme\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "upsolution-zephyr:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/zephyr\\/.+us\\.theme\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
