import type { TechnologyDefinition } from '../../types';

export const upscribeTechnologyDefinition = {
	id: "upscribe",
	name: "Upscribe",
	website: "https://upscribe.net",
	description: "Upscribe is a platform offering tools to create newsletter signup forms.",
	icon: "Upscribe.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "upscribe:jsGlobal:0",
			kind: "jsGlobal",
			property: "Upscribe.c",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
