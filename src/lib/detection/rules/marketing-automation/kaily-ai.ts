import type { TechnologyDefinition } from '../../types';

export const kailyAiTechnologyDefinition = {
	id: "kaily-ai",
	name: "Kaily.ai",
	website: "https://www.kaily.ai/",
	description: "Kaily.ai is a conversational AI agent platform that connects to your data, APIs, and business tools to answer queries, execute actions, and automate workflows in real time.",
	icon: "KailyAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kaily-ai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.copilotadvisor\\.com"),
			description: "Script source URL matches a known technology marker.",
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
