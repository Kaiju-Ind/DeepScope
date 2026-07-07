import type { TechnologyDefinition } from '../../types';

export const groovekartTechnologyDefinition = {
	id: "groovekart",
	name: "GrooveKart",
	website: "https://groove.cm/store",
	description: "GrooveKart is an ecommerce platform for building and managing online stores, offering tools for product listing, payments, and marketing with no additional transaction fees.",
	icon: "GrooveKart.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "groovekart:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^GrooveKart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "groovekart:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^groovekart$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
		],
	},
	excludes: [
		"prestashop",
	],
} as const satisfies TechnologyDefinition;
