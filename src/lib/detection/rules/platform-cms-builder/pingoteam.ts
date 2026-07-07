import type { TechnologyDefinition } from '../../types';

export const pingoteamTechnologyDefinition = {
	id: "pingoteam",
	name: "Pingoteam",
	website: "https://www.pingoteam.ir/",
	icon: "Pingoteam.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pingoteam:meta:0",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("Pingoteam", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "pingoteam:meta:1",
			kind: "meta",
			key: "designer",
			valuePattern: new RegExp("pingoteam", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
