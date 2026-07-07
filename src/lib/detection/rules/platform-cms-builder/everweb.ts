import type { TechnologyDefinition } from '../../types';

export const everwebTechnologyDefinition = {
	id: "everweb",
	name: "EverWeb",
	website: "https://www.everwebapp.com",
	description: "EverWeb is a website builder that allows users to create websites without any coding required.",
	icon: "EverWeb.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "everweb:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("EverWeb ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "everweb:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("everweb ([\\d.]+)", "i"),
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
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
