import type { TechnologyDefinition } from '../../types';

export const cuChatTechnologyDefinition = {
	id: "cu-chat",
	name: "CU Chat",
	website: "https://cu.chat",
	description: "CU Chat is a custom AI chatbot designed to provide 24/7 support, tailored to the specific needs of members.",
	icon: "CUChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "cu-chat:jsGlobal:0",
			kind: "jsGlobal",
			property: "chatapp.api",
			valuePattern: new RegExp("api\\.cu\\.chat"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
