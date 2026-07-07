import type { TechnologyDefinition } from '../../types';

export const driftTechnologyDefinition = {
	id: "drift",
	name: "Drift",
	website: "https://www.drift.com/",
	description: "Drift is a conversational marketing and sales platform with chat, messaging, and meeting tools.",
	icon: "Drift.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "drift:jsGlobal:0",
			kind: "jsGlobal",
			property: "drift",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "drift:jsGlobal:1",
			kind: "jsGlobal",
			property: "driftt",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
