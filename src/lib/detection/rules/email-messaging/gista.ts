import type { TechnologyDefinition } from '../../types';

export const gistaTechnologyDefinition = {
	id: "gista",
	name: "Gista",
	website: "https://gista.co",
	description: "Gista is an AI conversion agent that helps websites turn visitors into leads and customers through automated engagement.",
	icon: "Gista.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gista:jsGlobal:0",
			kind: "jsGlobal",
			property: "$gista.config",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
