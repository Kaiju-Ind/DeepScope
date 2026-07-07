import type { TechnologyDefinition } from '../../types';

export const nurtureTechnologyDefinition = {
	id: "nurture",
	name: "Nurture",
	website: "https://www.nurturehq.com",
	description: "Nurture is an all-in-one marketing automation software designed to streamline campaign management, lead tracking, and customer engagement in a single platform.",
	icon: "Nurture.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "nurture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("nurtureapi\\.nurturehq\\.com"),
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
