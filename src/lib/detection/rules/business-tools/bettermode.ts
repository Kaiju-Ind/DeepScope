import type { TechnologyDefinition } from '../../types';

export const bettermodeTechnologyDefinition = {
	id: "bettermode",
	name: "Bettermode",
	website: "https://bettermode.com",
	description: "Bettermode is an all-in-one community engagement platform designed to help businesses streamline the customer experience and build better relationships.",
	icon: "Bettermode.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bettermode:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("bettermode\\.com"),
			description: "Script content contains a bounded technology signature.",
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
