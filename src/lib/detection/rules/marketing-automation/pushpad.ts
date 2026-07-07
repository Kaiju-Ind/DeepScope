import type { TechnologyDefinition } from '../../types';

export const pushpadTechnologyDefinition = {
	id: "pushpad",
	name: "Pushpad",
	website: "https://pushpad.xyz",
	description: "Pushpad is a reliable service for sending notifications from websites and web applications.",
	icon: "Pushpad.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushpad:jsGlobal:0",
			kind: "jsGlobal",
			property: "pushpad",
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
