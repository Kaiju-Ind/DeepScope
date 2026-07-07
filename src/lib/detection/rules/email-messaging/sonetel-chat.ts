import type { TechnologyDefinition } from '../../types';

export const sonetelChatTechnologyDefinition = {
	id: "sonetel-chat",
	name: "Sonetel Chat",
	website: "https://sonetel.com",
	description: "Sonetel is a website chat system that enables online communication between businesses and their website visitors.",
	icon: "Sonetel.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "sonetel-chat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.sonetel\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sonetel-chat:jsGlobal:1",
			kind: "jsGlobal",
			property: "SonetelWidget",
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
