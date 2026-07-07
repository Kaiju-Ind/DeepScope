import type { TechnologyDefinition } from '../../types';

export const batflatTechnologyDefinition = {
	id: "batflat",
	name: "Batflat",
	website: "https://batflat.org",
	description: "Batflat is a lightweight CMS for free.",
	icon: "Batflat.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "batflat:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Batflat$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "batflat:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^batflat$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:batflat:batflat:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
		"sqlite",
	],
} as const satisfies TechnologyDefinition;
