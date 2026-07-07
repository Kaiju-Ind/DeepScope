import type { TechnologyDefinition } from '../../types';

export const klikenTechnologyDefinition = {
	id: "kliken",
	name: "Kliken",
	website: "https://www.kliken.com/#sitewit",
	description: "Kliken is a shopping and ads marketing platform that helps businesses create, manage, and optimize online advertising campaigns.",
	icon: "Kliken.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kliken:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.sitewit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
