import type { TechnologyDefinition } from '../../types';

export const digifiTechnologyDefinition = {
	id: "digifi",
	name: "DigiFi",
	website: "https://digify.shop",
	description: "DigiFi is a subscription-based software that allows anyone to set up an online store and sell their products.",
	icon: "DigiFi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "digifi:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Digify$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "digifi:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^digify$", "i"),
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
