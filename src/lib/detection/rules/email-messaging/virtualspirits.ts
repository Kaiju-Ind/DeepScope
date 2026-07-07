import type { TechnologyDefinition } from '../../types';

export const virtualspiritsTechnologyDefinition = {
	id: "virtualspirits",
	name: "VirtualSpirits",
	website: "https://www.virtualspirits.com",
	description: "VirtualSpirits is a chatbot and live-chat service for websites.",
	icon: "VirtualSpirits.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "virtualspirits:jsGlobal:0",
			kind: "jsGlobal",
			property: "vspiritbutton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "virtualspirits:jsGlobal:1",
			kind: "jsGlobal",
			property: "vspirits_chat_client",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "virtualspirits:jsGlobal:2",
			kind: "jsGlobal",
			property: "vspiritsizeheight",
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
