import type { TechnologyDefinition } from '../../types';

export const taskAnalyticsTechnologyDefinition = {
	id: "task-analytics",
	name: "Task Analytics",
	website: "https://www.taskanalytics.com",
	description: "Task Analytics is a platform that captures and analyzes customer intent and engagement outcomes to provide insights into interaction effectiveness.",
	icon: "TaskAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "task-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/analytics\\.task\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "task-analytics:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.taskanalytics\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
