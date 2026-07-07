import type { TechnologyDefinition } from '../../types';

export const askspotTechnologyDefinition = {
	id: "askspot",
	name: "AskSpot",
	website: "https://askspot.ai",
	description: "AskSpot is an AI chatbot platform tailored for marketing, digital, and web development agencies.",
	icon: "AskSpot.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "askspot:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.askspot\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "askspot:jsGlobal:1",
			kind: "jsGlobal",
			property: "askspot.Chatbot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "askspot:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.askspot\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "askspot:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("chat\\.askspot\\.io\\/api\\/v1\\/integration\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "askspot:scriptContent:4",
			kind: "scriptContent",
			pattern: new RegExp("chat\\.askspot\\.io\\/api\\/v1\\/chat-widget\\/"),
			description: "Script content contains a bounded technology signature.",
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
