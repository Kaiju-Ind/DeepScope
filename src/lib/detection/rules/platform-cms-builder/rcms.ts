import type { TechnologyDefinition } from '../../types';

export const rcmsTechnologyDefinition = {
	id: "rcms",
	name: "RCMS",
	website: "https://www.valve.fi",
	icon: "RCMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rcms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^(?:RCMS|ReallyCMS)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rcms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^(?:rcms|reallycms)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
