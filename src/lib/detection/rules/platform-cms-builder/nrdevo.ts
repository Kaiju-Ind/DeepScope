import type { TechnologyDefinition } from '../../types';

export const nrdevoTechnologyDefinition = {
	id: "nrdevo",
	name: "Nrdevo",
	website: "https://nrdevo.com/",
	description: "Nrdevo is a subscription-based software that allows anyone to set up a website, online store, and more.",
	icon: "Nrdevo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nrdevo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Nrdevo(?: ([0-9.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "nrdevo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^nrdevo(?: ([0-9.]+))?$", "i"),
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
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
