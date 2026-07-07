import type { TechnologyDefinition } from '../../types';

export const iscriptsTechnologyDefinition = {
	id: "iscripts",
	name: "iScripts",
	website: "https://www.iscripts.com",
	description: "iScripts is a multi product CMS system based on PHP.",
	icon: "iScripts.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "iscripts:meta:0",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^Copyright \\(C\\) www\\.iScripts\\.com,? \\d{4}\\. All rights reserved\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "iscripts:meta:1",
			kind: "meta",
			key: "copyright",
			valuePattern: new RegExp("^copyright \\(c\\) www\\.iscripts\\.com,? \\d{4}\\. all rights reserved\\.$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
