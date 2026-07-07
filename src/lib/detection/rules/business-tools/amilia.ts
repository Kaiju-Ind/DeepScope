import type { TechnologyDefinition } from '../../types';

export const amiliaTechnologyDefinition = {
	id: "amilia",
	name: "Amilia",
	website: "https://www.amilia.com",
	description: "Amilia is a membership management software.",
	icon: "Amilia.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "amilia:jsGlobal:0",
			kind: "jsGlobal",
			property: "AMILIA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amilia:jsGlobal:1",
			kind: "jsGlobal",
			property: "AMILIA_APP",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "amilia:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Amilia$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "amilia:meta:3",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^amilia$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
