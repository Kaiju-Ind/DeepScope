import type { TechnologyDefinition } from '../../types';

export const recTechnologyDefinition = {
	id: "rec",
	name: "REC",
	website: "https://www.recplus.co.uk",
	description: "REC is a customizable content management and ecommerce platform.",
	icon: "REC.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rec:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^REC$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rec:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rec$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
