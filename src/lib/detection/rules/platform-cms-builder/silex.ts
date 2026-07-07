import type { TechnologyDefinition } from '../../types';

export const silexTechnologyDefinition = {
	id: "silex",
	name: "Silex",
	website: "https://www.silex.me",
	description: "Silex is an open-source web-based website builder that allows users to create websites without writing code.",
	icon: "Silex.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "silex:jsGlobal:0",
			kind: "jsGlobal",
			property: "silex.getCurrentPage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "silex:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Silex v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "silex:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^silex v([\\d.]+)", "i"),
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
		cpe: "cpe:2.3:a:silexlabs:silex:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
