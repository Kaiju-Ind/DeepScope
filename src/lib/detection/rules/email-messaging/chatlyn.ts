import type { TechnologyDefinition } from '../../types';

export const chatlynTechnologyDefinition = {
	id: "chatlyn",
	name: "Chatlyn",
	website: "https://chatlyn.com",
	description: "Chatlyn is an AI-powered customer engagement platform designed to automate client communication and optimize engagement, enhancing customer satisfaction.",
	icon: "Chatlyn.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "chatlyn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.chatlyn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
