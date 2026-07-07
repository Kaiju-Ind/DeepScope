import type { TechnologyDefinition } from '../../types';

export const aivoTechnologyDefinition = {
	id: "aivo",
	name: "Aivo",
	website: "https://www.aivo.co",
	description: "Aivo is a conversational AI platform offering omnichannel tools and live agent solutions to automate customer experiences.",
	icon: "Aivo.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "aivo:jsGlobal:0",
			kind: "jsGlobal",
			property: "$aivo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aivo:jsGlobal:1",
			kind: "jsGlobal",
			property: "aivoStorage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
