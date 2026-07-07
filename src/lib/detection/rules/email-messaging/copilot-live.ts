import type { TechnologyDefinition } from '../../types';

export const copilotLiveTechnologyDefinition = {
	id: "copilot-live",
	name: "Copilot.Live",
	website: "https://www.copilot.live",
	description: "Copilot. Live is an AI agent with human-level capabilities, enabling the creation of AI agents for customer support.",
	icon: "CopilotLive.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "copilot-live:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("script\\.copilot\\.live"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
