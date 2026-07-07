import type { TechnologyDefinition } from '../../types';

export const splutterAiTechnologyDefinition = {
	id: "splutter-ai",
	name: "Splutter AI",
	website: "https://www.splutter.ai",
	description: "Splutter AI is a platform that enables the creation of AI chatbots for websites.",
	icon: "SplutterAI.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "splutter-ai:jsGlobal:0",
			kind: "jsGlobal",
			property: "embeddedChatbotConfig.domain",
			valuePattern: new RegExp("\\/\\/splutter\\.ai"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
