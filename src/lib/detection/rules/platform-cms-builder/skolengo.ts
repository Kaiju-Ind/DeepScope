import type { TechnologyDefinition } from '../../types';

export const skolengoTechnologyDefinition = {
	id: "skolengo",
	name: "Skolengo",
	website: "https://www.skolengo.com",
	description: "Skolengo is an Education Management Software developed by Kosmos Education.",
	icon: "Skolengo.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "skolengo:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Skolengo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "skolengo:meta:1",
			kind: "meta",
			key: "version",
			valuePattern: new RegExp("^([\\d\\.]+)$", "i"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "skolengo:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("skolengo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: false,
		pricing: [
			"mid",
			"recurring",
		],
	},
	implies: [
		"apache-tomcat",
		"java",
		"mariadb",
	],
} as const satisfies TechnologyDefinition;
