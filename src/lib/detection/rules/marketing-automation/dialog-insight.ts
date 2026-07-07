import type { TechnologyDefinition } from '../../types';

export const dialogInsightTechnologyDefinition = {
	id: "dialog-insight",
	name: "Dialog Insight",
	website: "https://www.dialoginsight.com",
	description: "Dialog Insight is a multi-channel marketing automation platform that enables personalization and campaign management across digital channels.",
	icon: "DialogInsight.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "dialog-insight:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.dialoginsight\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
