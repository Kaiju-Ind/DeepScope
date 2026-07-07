import type { TechnologyDefinition } from '../../types';

export const varosTechnologyDefinition = {
	id: "varos",
	name: "Varos",
	website: "https://www.varos.com",
	description: "Varos is a personal advisor for competitive intelligence, benchmarks, and market research, providing an one-time report to compare performance against the market.",
	icon: "Varos.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "varos:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.app\\.varos\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
