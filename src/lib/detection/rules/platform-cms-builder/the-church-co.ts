import type { TechnologyDefinition } from '../../types';

export const theChurchCoTechnologyDefinition = {
	id: "the-church-co",
	name: "The Church Co",
	website: "https://thechurchco.com",
	description: "The Church Co is a church-focused website development platform that provides tools and features specifically designed to support the growth and online presence of churches and religious organisations.",
	icon: "The Church Co.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "the-church-co:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^THECHURCHCO\\s([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "the-church-co:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^thechurchco\\s([\\d\\.]+)$", "i"),
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
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
