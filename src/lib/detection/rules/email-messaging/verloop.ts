import type { TechnologyDefinition } from '../../types';

export const verloopTechnologyDefinition = {
	id: "verloop",
	name: "Verloop",
	website: "https://verloop.io/",
	description: "Verloop is a customer support and engagement platform that focuses on automating interactions with customers through AI-powered chatbots and conversational interfaces.",
	icon: "Verloop.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "verloop:jsGlobal:0",
			kind: "jsGlobal",
			property: "Verloop",
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
