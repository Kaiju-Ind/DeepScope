import type { TechnologyDefinition } from '../../types';

export const lgcTechnologyDefinition = {
	id: "lgc",
	name: "LGC",
	website: "https://luigigabrieleconti.com",
	description: "LGC is a modern CMS designed to improve the management of your website.",
	icon: "LGC.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "lgc:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^LGC$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lgc:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^lgc$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
