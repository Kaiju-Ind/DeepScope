import type { TechnologyDefinition } from '../../types';

export const scrivitoTechnologyDefinition = {
	id: "scrivito",
	name: "Scrivito",
	website: "https://www.scrivito.com",
	description: "Scrivito is a decoupled/headless enterprise web CMS.",
	icon: "Scrivito.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "scrivito:jsGlobal:0",
			kind: "jsGlobal",
			property: "Scrivito",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "scrivito:jsGlobal:1",
			kind: "jsGlobal",
			property: "scrivito",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "scrivito:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Scrivito\\sby\\sInfopark\\sAG\\s\\(scrivito\\.com\\)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "scrivito:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^scrivito\\sby\\sinfopark\\sag\\s\\(scrivito\\.com\\)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
