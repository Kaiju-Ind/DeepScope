import type { TechnologyDefinition } from '../../types';

export const e37TechnologyDefinition = {
	id: "e37",
	name: "E37",
	website: "https://www.e37.se",
	description: "E37 is an enterprise ecommerce platform designed to support large-scale online retail operations.",
	icon: "E37.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "e37:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("E37 Triton ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "e37:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("e37 triton ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
