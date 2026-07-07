import type { TechnologyDefinition } from '../../types';

export const selectizeTechnologyDefinition = {
	id: "selectize",
	name: "Selectize",
	website: "https://selectize.dev",
	description: "Selectize is an extensible jQuery-based custom <select> UI control.",
	icon: "Selectize.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "selectize:jsGlobal:0",
			kind: "jsGlobal",
			property: "Selectize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "selectize:jsGlobal:1",
			kind: "jsGlobal",
			property: "selectize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
