import type { TechnologyDefinition } from '../../types';

export const mavaTechnologyDefinition = {
	id: "mava",
	name: "Mava",
	website: "https://www.mava.app",
	description: "Mava is an AI-driven customer support platform that scales customer support and success by connecting to private, group, and community channels.",
	icon: "Mava.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mava:jsGlobal:0",
			kind: "jsGlobal",
			property: "Mava.identify",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mava:jsGlobal:1",
			kind: "jsGlobal",
			property: "MavaWebChatToggle",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
