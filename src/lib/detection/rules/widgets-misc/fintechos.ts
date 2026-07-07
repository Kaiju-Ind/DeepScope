import type { TechnologyDefinition } from '../../types';

export const fintechosTechnologyDefinition = {
	id: "fintechos",
	name: "FintechOS",
	website: "https://fintechos.com",
	description: "FintechOS is a low-code platform for banking and insurance.",
	icon: "FintechOS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "fintechos:jsGlobal:0",
			kind: "jsGlobal",
			property: "FtosChat",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fintechos:jsGlobal:1",
			kind: "jsGlobal",
			property: "ftos.core.getB2CCulture",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "fintechos:meta:2",
			kind: "meta",
			key: "ftos-app-version",
			valuePattern: new RegExp("\\sv([\\d\\.]+)\\s", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
