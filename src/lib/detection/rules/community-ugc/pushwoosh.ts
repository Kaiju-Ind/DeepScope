import type { TechnologyDefinition } from '../../types';

export const pushwooshTechnologyDefinition = {
	id: "pushwoosh",
	name: "PushWoosh",
	website: "https://www.pushwoosh.com",
	description: "PushWoosh is a messaging system that supports push notifications and in-app messages.",
	icon: "PushWoosh.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "pushwoosh:jsGlobal:0",
			kind: "jsGlobal",
			property: "Pushwoosh",
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
