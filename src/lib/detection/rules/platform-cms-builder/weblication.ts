import type { TechnologyDefinition } from '../../types';

export const weblicationTechnologyDefinition = {
	id: "weblication",
	name: "Weblication",
	website: "https://weblication.de",
	description: "Weblication is an enterprise-class website content management system developed by Scholl Communications AG in Germany.",
	icon: "Weblication.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "weblication:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Weblication® CMS$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "weblication:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^weblication® cms$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"onetime",
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:weblication:cms_core_&_grid:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
		"xslt",
	],
} as const satisfies TechnologyDefinition;
