import type { TechnologyDefinition } from '../../types';

export const muraCmsTechnologyDefinition = {
	id: "mura-cms",
	name: "Mura CMS",
	website: "https://www.getmura.com",
	description: "Mura CMS is the cloud-based, API driven, content management platform.",
	icon: "Mura CMS.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "mura-cms:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Mura\\sCMS\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mura-cms:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("mura\\scms\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:blueriver:muracms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"adobe-coldfusion",
	],
} as const satisfies TechnologyDefinition;
