import type { TechnologyDefinition } from '../../types';

export const technology42chatTechnologyDefinition = {
	id: "42chat",
	name: "42Chat",
	website: "https://www.42chat.com",
	description: "42Chat is a provider of conversational AI solutions and text-based chatbots designed to connect clients with their communities.",
	icon: "42Chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "42chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.42chat\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
