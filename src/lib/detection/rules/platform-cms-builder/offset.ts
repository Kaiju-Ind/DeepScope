import type { TechnologyDefinition } from '../../types';

export const offsetTechnologyDefinition = {
	id: "offset",
	name: "Offset",
	website: "https://offsetpartners.com/wine-ecommerce-platform/",
	description: "Offset is a platform designed to provide specialized solutions for wine ecommerce.",
	icon: "Offset.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "offset:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("www\\.offsetpartners\\.com", "i"),
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
