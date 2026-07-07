import type { TechnologyDefinition } from '../../types';

export const chekkitTechnologyDefinition = {
	id: "chekkit",
	name: "Chekkit",
	website: "https://www.chekkit.io",
	description: "Chekkit is an all-in-one review, messaging, and lead inbox software.",
	icon: "Chekkit.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chekkit:jsGlobal:0",
			kind: "jsGlobal",
			property: "chekkitSettings.toggleChat",
			description: "Page-owned global matches a known technology marker.",
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
