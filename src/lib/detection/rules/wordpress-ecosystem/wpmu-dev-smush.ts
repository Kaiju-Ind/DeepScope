import type { TechnologyDefinition } from '../../types';

export const wpmuDevSmushTechnologyDefinition = {
	id: "wpmu-dev-smush",
	name: "WPMU DEV Smush",
	website: "https://wpmudev.com/project/wp-smush-pro",
	description: "WPMU DEV Smush is a WordPress plugin that allows you to optimise images without losing quality.",
	icon: "WPMU DEV.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "wpmu-dev-smush:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/wp-smushit(?:-pro)?\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
