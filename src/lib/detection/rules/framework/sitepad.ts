import type { TechnologyDefinition } from '../../types';

export const sitepadTechnologyDefinition = {
	id: "sitepad",
	name: "SitePad",
	website: "https://sitepad.com",
	description: "SitePad is a WYSIWYG drag and drop website building and maintenance program.",
	icon: "SitePad.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "sitepad:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^SitePad(?:\\s([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sitepad:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sitepad(?:\\s([\\d\\.]+))?$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
