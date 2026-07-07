import type { TechnologyDefinition } from '../../types';

export const croogoTechnologyDefinition = {
	id: "croogo",
	name: "Croogo",
	website: "https://croogo.org",
	description: "Croogo is an open-source CMS built on CakePHP, offering a platform for managing website content.",
	icon: "Croogo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "croogo:jsGlobal:0",
			kind: "jsGlobal",
			property: "Croogo.basePath",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "croogo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Croogo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "croogo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^croogo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
		cpe: "cpe:2.3:a:croogo:croogo:*:*:*:*:*:*:*:*",
	},
	requires: [
		"php",
	],
} as const satisfies TechnologyDefinition;
