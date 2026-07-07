import type { TechnologyDefinition } from '../../types';

export const arrowchatTechnologyDefinition = {
	id: "arrowchat",
	name: "ArrowChat",
	website: "https://www.arrowchat.com",
	description: "ArrowChat is a communication tool that enables users to send text messages and engage in video chats with one another.",
	icon: "ArrowChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "arrowchat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/arrowchat\\/.*\\/jquery\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
