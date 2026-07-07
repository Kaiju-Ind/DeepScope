import type { TechnologyDefinition } from '../../types';

export const botsonicTechnologyDefinition = {
	id: "botsonic",
	name: "Botsonic",
	website: "https://botsonic.com",
	description: "Botsonic is a no-code, custom AI chatbot builder that enables businesses to interact with their website visitors/users through natural language conversations.",
	icon: "Botsonic.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botsonic:jsGlobal:0",
			kind: "jsGlobal",
			property: "Botsonic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botsonic:jsGlobal:1",
			kind: "jsGlobal",
			property: "botsonicConfig-Botsonic",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botsonic:jsGlobal:2",
			kind: "jsGlobal",
			property: "botsonic_widget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botsonic:jsGlobal:3",
			kind: "jsGlobal",
			property: "loaded-Botsonic",
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
