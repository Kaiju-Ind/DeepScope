import type { TechnologyDefinition } from '../../types';

export const botsifyTechnologyDefinition = {
	id: "botsify",
	name: "Botsify",
	website: "https://botsify.com",
	description: "Botsify is a platform that enables businesses to create chatbots without requiring any coding knowledge.",
	icon: "Botsify.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "botsify:jsGlobal:0",
			kind: "jsGlobal",
			property: "botsify.load",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "botsify:jsGlobal:1",
			kind: "jsGlobal",
			property: "setbotsifyIcon",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
