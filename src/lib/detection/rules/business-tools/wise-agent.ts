import type { TechnologyDefinition } from '../../types';

export const wiseAgentTechnologyDefinition = {
	id: "wise-agent",
	name: "Wise Agent",
	website: "https://wiseagent.com",
	description: "Wise Agent is a real estate CRM platform that helps manage contacts and automate workflows.",
	icon: "WiseAgent.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "wise-agent:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.wiseagent\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
