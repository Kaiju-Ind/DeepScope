import type { TechnologyDefinition } from '../../types';

export const homefinitiTechnologyDefinition = {
	id: "homefiniti",
	name: "Homefiniti",
	website: "https://oneilinteractive.com/solutions/homefiniti/",
	description: "Homefiniti is a platform for home builders that offers tools for websites, virtual tours, and other marketing solutions.",
	icon: "Homefiniti.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "homefiniti:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Homefiniti$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "homefiniti:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^homefiniti$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
