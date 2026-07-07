import type { TechnologyDefinition } from '../../types';

export const kreatioTechnologyDefinition = {
	id: "kreatio",
	name: "Kreatio",
	website: "https://www.kreatio.com",
	description: "Kreatio is a content management system designed to enhance digital publishing efficiency and streamline content delivery.",
	icon: "Kreatio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kreatio:meta:0",
			kind: "meta",
			key: "Powered By",
			valuePattern: new RegExp("^Kreatio Platform$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kreatio:meta:1",
			kind: "meta",
			key: "powered by",
			valuePattern: new RegExp("^kreatio platform$", "i"),
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
