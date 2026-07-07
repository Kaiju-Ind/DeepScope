import type { TechnologyDefinition } from '../../types';

export const trivagoTechnologyDefinition = {
	id: "trivago",
	name: "Trivago",
	website: "https://www.trivago.com",
	description: "Trivago is a hotel search and booking engine that allows users to compare accommodation options and prices from various travel websites, helping them find the best deals.",
	icon: "Trivago.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "trivago:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.trivago\\.it"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
