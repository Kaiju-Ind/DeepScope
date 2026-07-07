import type { TechnologyDefinition } from '../../types';

export const chatthingTechnologyDefinition = {
	id: "chatthing",
	name: "ChatThing",
	website: "https://chatthing.ai",
	description: "Chat Thing is a platform that provides tools to build AI agents trained on custom content.",
	icon: "ChatThing.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chatthing:jsGlobal:0",
			kind: "jsGlobal",
			property: "chatThing.chatFrame",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chatthing:jsGlobal:1",
			kind: "jsGlobal",
			property: "chatThingConfig",
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
