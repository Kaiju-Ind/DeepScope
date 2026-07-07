import type { TechnologyDefinition } from '../../types';

export const mozardSuiteTechnologyDefinition = {
	id: "mozard-suite",
	name: "Mozard Suite",
	website: "https://mozard.nl",
	icon: "Mozard Suite.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mozard-suite:url:0",
			kind: "url",
			pattern: new RegExp("\\/mozard\\/!suite"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "mozard-suite:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("Mozard", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mozard-suite:meta:2",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("mozard", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
