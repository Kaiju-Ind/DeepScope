import type { TechnologyDefinition } from '../../types';

export const orimonAiTechnologyDefinition = {
	id: "orimon-ai",
	name: "Orimon.ai",
	website: "https://orimon.ai",
	description: "Orimon.ai is a platform that helps generate leads, automate customer support, and drive sales through AI-powered solutions.",
	icon: "Orimon.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "orimon-ai:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("bot\\.orimon\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "orimon-ai:dom:1",
			kind: "dom",
			selector: "iframe[src*='bot.orimon.ai/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
