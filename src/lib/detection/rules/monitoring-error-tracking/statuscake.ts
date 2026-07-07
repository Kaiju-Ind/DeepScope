import type { TechnologyDefinition } from '../../types';

export const statuscakeTechnologyDefinition = {
	id: "statuscake",
	name: "StatusCake",
	website: "https://www.statuscake.com",
	description: "StatusCake is a website monitoring service that sends alerts when a website goes down or experiences technical issues, such as slow loading times.",
	icon: "StatusCake.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "statuscake:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.statuscake\\.com"),
			description: "Script content contains a bounded technology signature.",
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
