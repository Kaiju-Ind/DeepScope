import type { TechnologyDefinition } from '../../types';

export const hamechioTechnologyDefinition = {
	id: "hamechio",
	name: "Hamechio",
	website: "https://hamech.io",
	description: "Hamechio is a web application framework.",
	icon: "Hamechio.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "hamechio:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("hamech\\.io\\/", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
