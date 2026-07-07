import type { TechnologyDefinition } from '../../types';

export const rhymixTechnologyDefinition = {
	id: "rhymix",
	name: "Rhymix",
	website: "https://rhymix.org",
	description: "Rhymix is an open-source CMS and web application framework designed for building dynamic websites and managing content.",
	icon: "Rhymix.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rhymix:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Rhymix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "rhymix:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^rhymix$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:rhymix:rhymix:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
