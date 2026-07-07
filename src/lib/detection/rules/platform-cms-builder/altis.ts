import type { TechnologyDefinition } from '../../types';

export const altisTechnologyDefinition = {
	id: "altis",
	name: "Altis",
	website: "https://www.altis-dxp.com",
	description: "Altis is a digital experience platform built on top of WordPress.",
	icon: "Altis.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "altis:jsGlobal:0",
			kind: "jsGlobal",
			property: "Altis",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "altis:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Altis ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "altis:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^altis ?([\\d.]+)?", "i"),
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
			"high",
			"poa",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
