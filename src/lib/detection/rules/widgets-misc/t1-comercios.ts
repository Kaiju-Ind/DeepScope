import type { TechnologyDefinition } from '../../types';

export const t1ComerciosTechnologyDefinition = {
	id: "t1-comercios",
	name: "T1 Comercios",
	website: "https://www.t1comercios.com",
	description: "T1 Comercios is an integrator platform with marketplaces(https://www.claroshop.com/,https://www.sears.com.mx/,https://www.sanborns.com.mx/).",
	icon: "T1 Comercios.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "t1-comercios:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^T1COMERCIOS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "t1-comercios:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^t1comercios$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
