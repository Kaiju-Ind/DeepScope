import type { TechnologyDefinition } from '../../types';

export const readmeTechnologyDefinition = {
	id: "readme",
	name: "ReadMe",
	website: "https://readme.com",
	description: "ReadMe is a content management system that businesses use to create and manage technical or API documentation.",
	icon: "readme.svg",
	categories: [
		"content-publishing",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "readme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/cdn\\.readme\\.io\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "readme:meta:1",
			kind: "meta",
			key: "readme-deploy",
			valuePattern: new RegExp("^[\\d\\.]+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "readme:meta:2",
			kind: "meta",
			key: "readme-version",
			valuePattern: new RegExp("^[\\d\\.]+$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
