import type { TechnologyDefinition } from '../../types';

export const scoreappTechnologyDefinition = {
	id: "scoreapp",
	name: "ScoreApp",
	website: "https://www.scoreapp.com",
	description: "ScoreApp is a quiz marketing platform designed for lead generation and customer engagement.",
	icon: "ScoreApp.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "scoreapp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.scoreapp\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
