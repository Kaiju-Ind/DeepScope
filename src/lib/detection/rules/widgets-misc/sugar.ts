import type { TechnologyDefinition } from '../../types';

export const sugarTechnologyDefinition = {
	id: "sugar",
	name: "Sugar",
	website: "https://sugarjs.com",
	description: "Sugar is a Javascript utility library for working with native objects.",
	icon: "Sugar.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sugar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/sugar\\/([\\d\\.]+)\\/release\\/sugar\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sugar:jsGlobal:1",
			kind: "jsGlobal",
			property: "SUGAR.AutoComplete",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
