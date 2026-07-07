import type { TechnologyDefinition } from '../../types';

export const impresspagesTechnologyDefinition = {
	id: "impresspages",
	name: "ImpressPages",
	website: "https://impresspages.org",
	description: "ImpressPages is an open-source content management system (CMS) that enables users to create and manage websites easily, featuring a user-friendly interface and customizable templates.",
	icon: "ImpressPages.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "impresspages:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ImpressPages(?: CMS)?( [\\d.]*)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "impresspages:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("impresspages(?: cms)?( [\\d.]*)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:impresspages:impresspages_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
