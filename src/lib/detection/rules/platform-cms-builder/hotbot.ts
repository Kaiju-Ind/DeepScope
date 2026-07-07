import type { TechnologyDefinition } from '../../types';

export const hotbotTechnologyDefinition = {
	id: "hotbot",
	name: "Hotbot",
	website: "https://hotbot.ai",
	description: "Hotbot is a platform that enables online management of hotel service sales.",
	icon: "Hotbot.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "hotbot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.hotbot\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hotbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "HotBot.authorize",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hotbot:jsGlobal:2",
			kind: "jsGlobal",
			property: "Hotbot.authorize",
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
