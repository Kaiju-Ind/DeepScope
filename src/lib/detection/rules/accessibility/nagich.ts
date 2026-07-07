import type { TechnologyDefinition } from '../../types';

export const nagichTechnologyDefinition = {
	id: "nagich",
	name: "Nagich",
	website: "https://www.nagich.co.il",
	description: "Nagich is a website accessibility overlay provider from Israel.",
	icon: "Nagich.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "nagich:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.nagich\\.co(?:m|\\.il)\\/core\\/([\\d.]+)\\/accessibility\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nagich:jsGlobal:1",
			kind: "jsGlobal",
			property: "interdeal.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
