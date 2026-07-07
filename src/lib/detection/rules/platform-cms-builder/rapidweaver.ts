import type { TechnologyDefinition } from '../../types';

export const rapidweaverTechnologyDefinition = {
	id: "rapidweaver",
	name: "RapidWeaver",
	website: "https://www.realmacsoftware.com/rapidweaver/",
	description: "RapidWeaver is a web design software for Mac that enables users to create and publish websites using a visual interface with templates and plugins.",
	icon: "RapidWeaver.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rapidweaver:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^RapidWeaver$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rapidweaver:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rapidweaver$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
