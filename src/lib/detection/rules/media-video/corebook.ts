import type { TechnologyDefinition } from '../../types';

export const corebookTechnologyDefinition = {
	id: "corebook",
	name: "Corebook",
	website: "https://www.corebook.io",
	description: "Corebook is a platform for brand guidelines, designed to assist creators of brilliant brands in managing their brand.",
	icon: "CoreBook.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "corebook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.corebook\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
