import type { TechnologyDefinition } from '../../types';

export const kalioTechnologyDefinition = {
	id: "kalio",
	name: "Kalio",
	website: "https://www.kaliocommerce.com",
	description: "Kalio is an ecommerce system designed for mid-market and enterprise stores.",
	icon: "Kalio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kalio:meta:0",
			kind: "meta",
			key: "Author",
			valuePattern: new RegExp("^Kalio$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "kalio:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^kalio$", "i"),
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
