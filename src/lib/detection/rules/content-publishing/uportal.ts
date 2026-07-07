import type { TechnologyDefinition } from '../../types';

export const uportalTechnologyDefinition = {
	id: "uportal",
	name: "uPortal",
	website: "https://www.apereo.org/projects/uportal",
	description: "uPortal is an open source enterprise portal framework built by and for higher education institutions.",
	icon: "uPortal.png",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "uportal:jsGlobal:0",
			kind: "jsGlobal",
			property: "uportal",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uportal:meta:1",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp(" uPortal ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "uportal:meta:2",
			kind: "meta",
			key: "description",
			valuePattern: new RegExp(" uportal ", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:apereo:uportal:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
