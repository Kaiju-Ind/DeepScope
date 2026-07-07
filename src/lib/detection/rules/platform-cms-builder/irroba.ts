import type { TechnologyDefinition } from '../../types';

export const irrobaTechnologyDefinition = {
	id: "irroba",
	name: "Irroba",
	website: "https://www.irroba.com.br/",
	icon: "irroba.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "irroba:html:0",
			kind: "html",
			pattern: new RegExp("<a[^>]*href=\"https:\\/\\/www\\.irroba\\.com\\.br"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "irroba:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^IRROBA E-COMMERCE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "irroba:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^IRROBA E-COMMERCE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "irroba:meta:3",
			kind: "meta",
			key: "webmaster",
			valuePattern: new RegExp("^IRROBA E-COMMERCE$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
