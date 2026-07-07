import type { TechnologyDefinition } from '../../types';

export const lindaTechnologyDefinition = {
	id: "linda",
	name: "Linda",
	website: "https://linda.co",
	description: "Linda is a provider of local marketing software designed for businesses to enhance online marketing, generate leads, and increase revenue.",
	icon: "Linda.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "linda:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("gb-widget\\.linda\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
