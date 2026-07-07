import type { TechnologyDefinition } from '../../types';

export const maharaTechnologyDefinition = {
	id: "mahara",
	name: "Mahara",
	website: "https://mahara.org",
	description: "Mahara is an open source ePortfolio and social networking web application.",
	icon: "Mahara.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mahara:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mahara ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mahara:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mahara ([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
