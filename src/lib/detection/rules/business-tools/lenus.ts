import type { TechnologyDefinition } from '../../types';

export const lenusTechnologyDefinition = {
	id: "lenus",
	name: "Lenus",
	website: "https://lenushealth.com",
	description: "Lenus is a platform that develops healthcare optimization systems designed to improve operational efficiency.",
	icon: "Lenus.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lenus:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Lenus$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "lenus:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^lenus$", "i"),
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
