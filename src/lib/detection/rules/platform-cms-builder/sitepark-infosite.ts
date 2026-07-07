import type { TechnologyDefinition } from '../../types';

export const siteparkInfositeTechnologyDefinition = {
	id: "sitepark-infosite",
	name: "Sitepark InfoSite",
	website: "https://www.sitepark.com/mittelstand/content-management-system/index.php",
	description: "Sitepark InfoSite is a content management system and complete application of Sitepark IES which written in PHP and paired with a MySQL database.",
	icon: "Sitepark.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitepark-infosite:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^InfoSite\\s([\\d\\.]+)\\s-\\sSitepark\\sInformation\\sEnterprise\\sServer$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sitepark-infosite:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^infosite\\s([\\d\\.]+)\\s-\\ssitepark\\sinformation\\senterprise\\sserver$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"sitepark-ies",
	],
} as const satisfies TechnologyDefinition;
