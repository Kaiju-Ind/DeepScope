import type { TechnologyDefinition } from '../../types';

export const homesteadTechnologyDefinition = {
	id: "homestead",
	name: "Homestead",
	website: "https://www.homestead.com",
	description: "Homestead is a website builder.",
	icon: "Homestead.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "homestead:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Homestead SiteBuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "homestead:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^homestead sitebuilder$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
