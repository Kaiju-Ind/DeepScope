import type { TechnologyDefinition } from '../../types';

export const skilldoTechnologyDefinition = {
	id: "skilldo",
	name: "Skilldo",
	website: "https://developers.sikido.vn/docs/cms/",
	description: "Skilldo is a content management system written in PHP and paired with a MySQL or MariaDB database.",
	icon: "Skilldo.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "skilldo:header:0",
			kind: "header",
			key: "cms-name",
			valuePattern: new RegExp("^Skilldo$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "skilldo:header:1",
			kind: "header",
			key: "cms-version",
			valuePattern: new RegExp("([\\d\\.]+)", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "skilldo:header:2",
			kind: "header",
			key: "cms-name",
			valuePattern: new RegExp("^skilldo$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
	implies: [
		"mysql",
		"php",
	],
} as const satisfies TechnologyDefinition;
