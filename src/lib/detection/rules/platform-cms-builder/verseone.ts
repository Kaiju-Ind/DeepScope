import type { TechnologyDefinition } from '../../types';

export const verseoneTechnologyDefinition = {
	id: "verseone",
	name: "VerseOne",
	website: "https://www.verseone.com",
	description: "VerseOne is a provider of Content Management Systems (CMS) for the healthcare and housing sectors.",
	icon: "VerseOne.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "verseone:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Intranet VerseOne$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "verseone:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("VerseOne (?:ECM|CMS) v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "verseone:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^intranet verseone$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "verseone:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("verseone (?:ecm|cms) v([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
