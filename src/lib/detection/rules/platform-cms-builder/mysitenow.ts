import type { TechnologyDefinition } from '../../types';

export const mysitenowTechnologyDefinition = {
	id: "mysitenow",
	name: "MySiteNow",
	website: "https://mysitenow.gr",
	description: "MySiteNow provides cloud-based web development services, allowing users to create HTML5 websites and mobile sites.",
	icon: "MySiteNow.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "mysitenow:meta:0",
			kind: "meta",
			key: "app-platform",
			valuePattern: new RegExp("^MySiteNow$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "mysitenow:meta:1",
			kind: "meta",
			key: "app-platform",
			valuePattern: new RegExp("^mysitenow$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
