import type { TechnologyDefinition } from '../../types';

export const websitebakerTechnologyDefinition = {
	id: "websitebaker",
	name: "WebsiteBaker",
	website: "https://websitebaker2.org/en/home.php",
	icon: "WebsiteBaker.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "websitebaker:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("WebsiteBaker", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "websitebaker:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("websitebaker", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:websitebaker:websitebaker:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
