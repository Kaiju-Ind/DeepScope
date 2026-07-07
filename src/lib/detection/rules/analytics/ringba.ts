import type { TechnologyDefinition } from '../../types';

export const ringbaTechnologyDefinition = {
	id: "ringba",
	name: "Ringba",
	website: "https://www.ringba.com",
	description: "Ringba is a platform that offers call tracking solutions to businesses, pay-per-call networks, brokers, agencies, and performance marketers of all sizes.",
	icon: "Ringba.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ringba:jsGlobal:0",
			kind: "jsGlobal",
			property: "ringba.release",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ringba:jsGlobal:1",
			kind: "jsGlobal",
			property: "ringba_known_numbers",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
