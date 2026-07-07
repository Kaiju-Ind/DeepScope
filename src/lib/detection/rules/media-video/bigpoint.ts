import type { TechnologyDefinition } from '../../types';

export const bigpointTechnologyDefinition = {
	id: "bigpoint",
	name: "BigPoint",
	website: "https://www.bigpoint.net",
	description: "BigPoint is a browser game portal that offers a collection of free online games.",
	icon: "BigPoint.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bigpoint:dom:0",
			kind: "dom",
			selector: "form[action*='/Authentication/Bigpoint']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bigpoint:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Bigpoint GmbH", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bigpoint:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("bigpoint gmbh", "i"),
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
