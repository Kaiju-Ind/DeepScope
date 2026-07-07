import type { TechnologyDefinition } from '../../types';

export const hubtigerTechnologyDefinition = {
	id: "hubtiger",
	name: "Hubtiger",
	website: "https://hubtiger.com",
	description: "Hubtiger offers rental and workshop management software solutions to help businesses elevate their operations and efficiency.",
	icon: "Hubtiger.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "hubtiger:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Hubtiger$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hubtiger:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^hubtiger$", "i"),
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
