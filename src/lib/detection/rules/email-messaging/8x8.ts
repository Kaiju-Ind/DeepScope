import type { TechnologyDefinition } from '../../types';

export const technology8x8TechnologyDefinition = {
	id: "8x8",
	name: "8x8",
	website: "https://www.8x8.com",
	description: "8x8 is a communication tool offering chat functionality for streamlined business communication.",
	icon: "8x8.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "8x8:jsGlobal:0",
			kind: "jsGlobal",
			property: "Chat8x8",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "8x8:jsGlobal:1",
			kind: "jsGlobal",
			property: "__8x8Chat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
