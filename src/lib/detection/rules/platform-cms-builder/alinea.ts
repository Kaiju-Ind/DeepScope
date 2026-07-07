import type { TechnologyDefinition } from '../../types';

export const alineaTechnologyDefinition = {
	id: "alinea",
	name: "Alinea",
	website: "https://alinea.sh",
	description: "Alinea is a Git-based content management system designed specifically for integration with Next.js projects.",
	icon: "Alinea.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "alinea:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^ALinea ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "alinea:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^alinea ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
