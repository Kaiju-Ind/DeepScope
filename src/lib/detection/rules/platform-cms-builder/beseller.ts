import type { TechnologyDefinition } from '../../types';

export const besellerTechnologyDefinition = {
	id: "beseller",
	name: "beseller",
	website: "https://beseller.by",
	description: "beseller is a website builder for creating ecommerce websites and online stores.",
	icon: "beseller.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "beseller:meta:0",
			kind: "meta",
			key: "cms",
			valuePattern: new RegExp("beSeller\\.by", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "beseller:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("beSeller\\.by", "i"),
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
