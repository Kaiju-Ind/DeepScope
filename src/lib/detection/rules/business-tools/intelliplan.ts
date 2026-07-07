import type { TechnologyDefinition } from '../../types';

export const intelliplanTechnologyDefinition = {
	id: "intelliplan",
	name: "Intelliplan",
	website: "https://www.intelliplan.se",
	description: "Intelliplan is a recruitment and staffing system designed to support modern hiring workflows, candidate management, and workforce planning.",
	icon: "Intelliplan.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "intelliplan:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.app\\.intelliplan\\.eu"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
