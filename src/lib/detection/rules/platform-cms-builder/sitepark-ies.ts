import type { TechnologyDefinition } from '../../types';

export const siteparkIesTechnologyDefinition = {
	id: "sitepark-ies",
	name: "Sitepark IES",
	website: "https://www.sitepark.com/oeffentlicher-sektor/produkte/cms-technologie.php",
	description: "Sitepark IES is a content management system written in PHP and paired with a MySQL database.",
	icon: "Sitepark.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitepark-ies:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Sitepark\\sInformation\\sEnterprise\\sServer\\s-\\sIES\\sGenerator\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "sitepark-ies:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^sitepark\\sinformation\\senterprise\\sserver\\s-\\sies\\sgenerator\\sv([\\d\\.]+)$", "i"),
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
		cpe: "cpe:2.3:a:sitepark:information_enterprise_server:*:*:*:*:*:*:*:*",
	},
	implies: [
		"lucene",
		"mysql",
	],
} as const satisfies TechnologyDefinition;
