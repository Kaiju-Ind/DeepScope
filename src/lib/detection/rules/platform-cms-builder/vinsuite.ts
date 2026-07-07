import type { TechnologyDefinition } from '../../types';

export const vinsuiteTechnologyDefinition = {
	id: "vinsuite",
	name: "vinSUITE",
	website: "https://vinsuite.com",
	description: "vinSUITE is a DTC software platform designed specifically for wineries, enabling streamlined management of customer relationships, inventory, sales, and marketing operations in one centralized system.",
	icon: "vinSUITE.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vinsuite:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^vinSUITE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "vinsuite:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^vinsuite$", "i"),
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
