import type { TechnologyDefinition } from '../../types';

export const websiteCreatorTechnologyDefinition = {
	id: "website-creator",
	name: "Website Creator",
	website: "https://www.hosttech.ch/websitecreator",
	icon: "WebsiteCreator.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "website-creator:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Website Creator by hosttech", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "website-creator:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("website creator by hosttech", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"mysql",
		"php",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
