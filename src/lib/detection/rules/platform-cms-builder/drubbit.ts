import type { TechnologyDefinition } from '../../types';

export const drubbitTechnologyDefinition = {
	id: "drubbit",
	name: "Drubbit",
	website: "https://drubbit.com",
	description: "Drubbit is an ecommerce platform with a Content Management System (CMS) for creating product pages, managing checkout processes, facilitating payments, and handling shipping.",
	icon: "Drubbit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "drubbit:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Drubbit Commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "drubbit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^drubbit commerce$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
	implies: [
		"mysql",
		"node-js",
	],
} as const satisfies TechnologyDefinition;
