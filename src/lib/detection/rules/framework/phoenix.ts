import type { TechnologyDefinition } from '../../types';

export const phoenixTechnologyDefinition = {
	id: "phoenix",
	name: "Phoenix",
	website: "https://github.com/Sazito/phoenix/",
	icon: "sazito-phoenix.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "phoenix:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^phoenix", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phoenixframework:phoenix:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
		"react",
		"webpack",
	],
} as const satisfies TechnologyDefinition;
