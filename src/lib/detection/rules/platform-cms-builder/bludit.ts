import type { TechnologyDefinition } from '../../types';

export const bluditTechnologyDefinition = {
	id: "bludit",
	name: "Bludit",
	website: "https://www.bludit.com",
	description: "Bludit is a flat file content management system that stores data in text files.",
	icon: "Bludit.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "bludit:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Bludit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "bludit:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^bludit$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:bludit:bludit:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
