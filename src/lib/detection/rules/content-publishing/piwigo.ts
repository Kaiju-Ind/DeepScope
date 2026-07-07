import type { TechnologyDefinition } from '../../types';

export const piwigoTechnologyDefinition = {
	id: "piwigo",
	name: "Piwigo",
	website: "https://piwigo.com",
	description: "Piwigo is an open-source photo management software designed for creating and managing online photo galleries.",
	icon: "Piwigo.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "piwigo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Piwigo\\s", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "piwigo:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^piwigo\\s", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:piwigo:piwigo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
	],
} as const satisfies TechnologyDefinition;
