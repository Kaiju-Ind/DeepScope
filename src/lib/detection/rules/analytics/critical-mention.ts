import type { TechnologyDefinition } from '../../types';

export const criticalMentionTechnologyDefinition = {
	id: "critical-mention",
	name: "Critical Mention",
	website: "https://www.criticalmention.com",
	description: "Critical Mention is a media monitoring technology that tracks, collects, and analyzes content from broadcast, online, and social media sources to provide insights into coverage and trends.",
	icon: "CriticalMention.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "critical-mention:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.criticalmention\\.com"),
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
