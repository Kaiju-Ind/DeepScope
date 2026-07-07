import type { TechnologyDefinition } from '../../types';

export const hosttechWebsiteCreatorTechnologyDefinition = {
	id: "hosttech-website-creator",
	name: "Hosttech Website Creator",
	website: "https://www.hosttech.ch/websitecreator",
	description: "Hosttech Website Creator is a web development tool by the Swiss company Hosttech, providing customizable templates and website management features.",
	icon: "Hosttech.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hosttech-website-creator:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Website Creator by hosttech", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "hosttech-website-creator:meta:1",
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
