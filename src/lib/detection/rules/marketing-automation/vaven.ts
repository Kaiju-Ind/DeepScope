import type { TechnologyDefinition } from '../../types';

export const vavenTechnologyDefinition = {
	id: "vaven",
	name: "Vaven",
	website: "https://vaven.co",
	description: "Vaven is a platform that allows users to create and display Ad widgets on websites, enabling the development of a personalized Ad network with precise targeting capabilities.",
	icon: "Vaven.svg",
	categories: [
		"marketing-automation",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "vaven:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.vaven\\.co\\/"),
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
