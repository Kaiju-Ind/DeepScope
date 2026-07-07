import type { TechnologyDefinition } from '../../types';

export const seojuiceTechnologyDefinition = {
	id: "seojuice",
	name: "SEOJuice",
	website: "https://seojuice.com",
	description: "SEOJuice is a software platform that utilizes artificial intelligence to automate internal linking and on-page search engine optimization tasks for websites.",
	icon: "SEOJuice.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seojuice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.seojuice\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
