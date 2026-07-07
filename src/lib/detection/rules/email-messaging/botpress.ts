import type { TechnologyDefinition } from '../../types';

export const botpressTechnologyDefinition = {
	id: "botpress",
	name: "Botpress",
	website: "https://botpress.com",
	description: "Botpress is a conversational AI platform that empowers individuals and teams of all sizes to design, build, and deploy AI-powered chatbots for various applications.",
	icon: "Botpress.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botpress:jsGlobal:0",
			kind: "jsGlobal",
			property: "botpressWebChat.init",
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
