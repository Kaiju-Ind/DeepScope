import type { TechnologyDefinition } from '../../types';

export const griddoTechnologyDefinition = {
	id: "griddo",
	name: "Griddo",
	website: "https://griddo.io",
	description: "Griddo is an Martech Experience Platform for creating custom digital experiences.",
	icon: "Griddo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "griddo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Griddo$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "griddo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^griddo$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
	implies: [
		"gatsby",
		"react",
	],
} as const satisfies TechnologyDefinition;
