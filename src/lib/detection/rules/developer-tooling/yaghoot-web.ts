import type { TechnologyDefinition } from '../../types';

export const yaghootWebTechnologyDefinition = {
	id: "yaghoot-web",
	name: "Yaghoot Web",
	website: "https://yaghootweb.com",
	description: "Yaghoot Web is a provider of website design, search engine optimization, and performance optimization.",
	icon: "YaghootWeb.svg",
	categories: [
		"developer-tooling",
		"marketing-automation",
	],
	rules: [
		{
			id: "yaghoot-web:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^yaghootweb$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
