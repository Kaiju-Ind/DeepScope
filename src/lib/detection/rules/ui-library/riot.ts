import type { TechnologyDefinition } from '../../types';

export const riotTechnologyDefinition = {
	id: "riot",
	name: "Riot",
	website: "https://riot.js.org/",
	icon: "Riot.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "riot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("riot(?:\\+compiler)?(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "riot:jsGlobal:1",
			kind: "jsGlobal",
			property: "riot",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
