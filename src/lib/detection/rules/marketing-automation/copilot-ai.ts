import type { TechnologyDefinition } from '../../types';

export const copilotAiTechnologyDefinition = {
	id: "copilot-ai",
	name: "Copilot AI",
	website: "https://www.copilotai.com",
	description: "CoPilot AI is a LinkedIn automation software designed to identify and generate leads.",
	icon: "CopilotAI.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "copilot-ai:scriptSrc:0",
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
