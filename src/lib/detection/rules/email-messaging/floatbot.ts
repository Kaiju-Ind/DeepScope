import type { TechnologyDefinition } from '../../types';

export const floatbotTechnologyDefinition = {
	id: "floatbot",
	name: "Floatbot",
	website: "https://floatbot.ai",
	description: "Floatbot is a conversational AI Platform, facilitating the construction and deployment of voicebot, chatbot, and agent assist functionalities.",
	icon: "Floatbot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "floatbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.floatbot\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "floatbot:dom:1",
			kind: "dom",
			selector: "#flb-widget-handle",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "floatbot:jsGlobal:2",
			kind: "jsGlobal",
			property: "flb.base_url",
			valuePattern: new RegExp("\\.floatbot\\.ai\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "floatbot:jsGlobal:3",
			kind: "jsGlobal",
			property: "flb.botId ",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
		],
	},
} as const satisfies TechnologyDefinition;
