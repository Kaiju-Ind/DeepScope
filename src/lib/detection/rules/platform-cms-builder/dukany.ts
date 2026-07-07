import type { TechnologyDefinition } from '../../types';

export const dukanyTechnologyDefinition = {
	id: "dukany",
	name: "Dukany",
	website: "https://dukany.io",
	description: "Dukany is subscription based platform, which enables clients to go online with their stores.",
	icon: "Dukany.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "dukany:meta:0",
			kind: "meta",
			key: "ecommerce-platform",
			valuePattern: new RegExp("Dukany", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dukany:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Dukany\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dukany:meta:2",
			kind: "meta",
			key: "ecommerce-platform",
			valuePattern: new RegExp("dukany", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "dukany:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("dukany\\.io", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
