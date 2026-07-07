import type { TechnologyDefinition } from '../../types';

export const cecilTechnologyDefinition = {
	id: "cecil",
	name: "Cecil",
	website: "https://cecil.app",
	description: "Cecil is a CLI application, powered by PHP, that merge plain text files (written in Markdown), images and Twig templates to generate a static website.",
	icon: "Cecil.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "cecil:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Cecil(?: ([0-9.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cecil:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^cecil(?: ([0-9.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:cecil:cecil:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
