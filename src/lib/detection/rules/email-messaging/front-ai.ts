import type { TechnologyDefinition } from '../../types';

export const frontAiTechnologyDefinition = {
	id: "front-ai",
	name: "Front AI",
	website: "https://front.ai",
	description: "Front AI is a platform that offers services for Conversational AI, Virtual Agents, and Service Bots to support automated customer interactions.",
	icon: "FrontAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "front-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.front\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "front-ai:jsGlobal:1",
			kind: "jsGlobal",
			property: "FrontCFcreateCookie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
