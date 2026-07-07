import type { TechnologyDefinition } from '../../types';

export const sotelTechnologyDefinition = {
	id: "sotel",
	name: "Sotel",
	website: "https://www.soteledu.com/en/",
	description: "Sotel is a company that provides educational solutions and tools for e-learning and online training.",
	icon: "Sotel.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sotel:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("sotel", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
