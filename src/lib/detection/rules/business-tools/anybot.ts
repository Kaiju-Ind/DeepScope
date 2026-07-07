import type { TechnologyDefinition } from '../../types';

export const anybotTechnologyDefinition = {
	id: "anybot",
	name: "Anybot",
	website: "https://anybot.me",
	description: "Anybot is an omnichannel customer service automation platform that centralizes and streamlines customer interactions across multiple communication channels using automated workflows and response handling.",
	icon: "Anybot.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "anybot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("anybot\\.me\\/js\\/anybot(?:\\.min)?\\.sdk\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "anybot:jsGlobal:1",
			kind: "jsGlobal",
			property: "$anybot.chat",
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
