import type { TechnologyDefinition } from '../../types';

export const saprenTechnologyDefinition = {
	id: "sapren",
	name: "Sapren",
	website: "https://www.sapren.net",
	description: "Sapren is a CMS produced by PHP, Laravel framework and MySQL.",
	icon: "Sapren.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sapren:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Saprenco.com Website Builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sapren:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^saprenco.com website builder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"laravel",
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
