import type { TechnologyDefinition } from '../../types';

export const publishrrTechnologyDefinition = {
	id: "publishrr",
	name: "Publishrr",
	website: "https://publishrr.com",
	description: "Publishrr is a custom web CMS designed for newspapers, magazines, TV channels, and radio channels.",
	icon: "Publishrr.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "publishrr:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Publishrr\\.com$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "publishrr:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^publishrr\\.com$", "i"),
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
