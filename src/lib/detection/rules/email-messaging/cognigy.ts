import type { TechnologyDefinition } from '../../types';

export const cognigyTechnologyDefinition = {
	id: "cognigy",
	name: "Cognigy",
	website: "https://www.cognigy.com",
	description: "Cognigy is a provider of generative and conversational AI-powered customer service agents for businesses.",
	icon: "Cognigy.svg",
	categories: [
		"email-messaging",
		"business-tools",
	],
	rules: [
		{
			id: "cognigy:jsGlobal:0",
			kind: "jsGlobal",
			property: "__COGNIGY_WEBCHAT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cognigy:jsGlobal:1",
			kind: "jsGlobal",
			property: "cognigyWebchatInputPlugins",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cognigy:jsGlobal:2",
			kind: "jsGlobal",
			property: "cognigyWebchatMessagePlugins",
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
