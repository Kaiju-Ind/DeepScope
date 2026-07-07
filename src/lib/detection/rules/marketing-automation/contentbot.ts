import type { TechnologyDefinition } from '../../types';

export const contentbotTechnologyDefinition = {
	id: "contentbot",
	name: "ContentBot",
	website: "https://contentbot.ai",
	description: "ContentBot is an AI-driven platform for creating custom content workflows, processing imports, and generating blog posts with an AI blog writer.",
	icon: "ContentBot.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contentbot:jsGlobal:0",
			kind: "jsGlobal",
			property: "bleeper_api_key",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "contentbot:jsGlobal:1",
			kind: "jsGlobal",
			property: "bleeper_user_ip_address",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
