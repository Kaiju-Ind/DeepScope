import type { TechnologyDefinition } from '../../types';

export const cotontiTechnologyDefinition = {
	id: "cotonti",
	name: "Cotonti",
	website: "https://www.cotonti.com",
	description: "Cotonti is an open-source content management system and development framework offering flexibility and modularity for building and managing websites and web applications.",
	icon: "Cotonti.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cotonti:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Cotonti", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "cotonti:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("cotonti", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:cotonti:cotonti_siena:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
