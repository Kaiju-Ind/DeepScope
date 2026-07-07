import type { TechnologyDefinition } from '../../types';

export const nagishliTechnologyDefinition = {
	id: "nagishli",
	name: "NagishLi",
	website: "https://www.nagish.li",
	description: "NagishLi is a free accessibility plugin from Localize*, created to provide an equal oppurtunity for webmasters to make their website accessible and make the internet more accessible for people with disability.",
	icon: "NagishLi.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "nagishli:jsGlobal:0",
			kind: "jsGlobal",
			property: "$NagishLi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nagishli:jsGlobal:1",
			kind: "jsGlobal",
			property: "initNagishLi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nagishli:jsGlobal:2",
			kind: "jsGlobal",
			property: "nagishli_commons.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
