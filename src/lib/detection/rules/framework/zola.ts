import type { TechnologyDefinition } from '../../types';

export const zolaTechnologyDefinition = {
	id: "zola",
	name: "Zola",
	website: "https://www.getzola.org/",
	description: "Zola is a static site engine that consolidates essential features in a single binary.",
	icon: "Zola.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "zola:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getzola\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zola:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Zola(?:\\s[\\d\\.]+)?$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "zola:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^zola(?:\\s[\\d\\.]+)?$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
