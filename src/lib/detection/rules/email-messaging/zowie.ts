import type { TechnologyDefinition } from '../../types';

export const zowieTechnologyDefinition = {
	id: "zowie",
	name: "Zowie",
	website: "https://getzowie.com",
	description: "Zowie is an AI-powered customer service suite tailored for ecommerce, aimed at cost-saving and revenue generation through value-driven interactions.",
	icon: "Zowie.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "zowie:dom:0",
			kind: "dom",
			selector: "div#zowieChatbotWrapper",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "zowie:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zowie",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "zowie:jsGlobal:2",
			kind: "jsGlobal",
			property: "zowieJsonp",
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
