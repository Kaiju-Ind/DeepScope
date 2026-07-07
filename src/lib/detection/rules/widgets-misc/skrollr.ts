import type { TechnologyDefinition } from '../../types';

export const skrollrTechnologyDefinition = {
	id: "skrollr",
	name: "Skrollr",
	website: "https://prinzhorn.github.io/skrollr/",
	description: "Skrollr is a JavaScript library supporting parallax scrolling on mobile and desktop platforms in a compact 12k minified size.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "skrollr:jsGlobal:0",
			kind: "jsGlobal",
			property: "skrollr.VERSION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
