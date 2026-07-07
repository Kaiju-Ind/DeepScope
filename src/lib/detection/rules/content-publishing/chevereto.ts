import type { TechnologyDefinition } from '../../types';

export const cheveretoTechnologyDefinition = {
	id: "chevereto",
	name: "Chevereto",
	website: "https://chevereto.com",
	description: "Chevereto is an image hosting software that allows you to create a full-featured image hosting website on your own server.",
	icon: "Chevereto.svg",
	categories: [
		"content-publishing",
		"widgets-misc",
	],
	rules: [
		{
			id: "chevereto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/chevereto\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chevereto:jsGlobal:1",
			kind: "jsGlobal",
			property: "CHEVERETO.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chevereto:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Chevereto\\s(?:[\\d\\.]+)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "chevereto:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("chevereto\\s(?:[\\d\\.]+)", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
		],
		cpe: "cpe:2.3:a:chevereto:chevereto:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
