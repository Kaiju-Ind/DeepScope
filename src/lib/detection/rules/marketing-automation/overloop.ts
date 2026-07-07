import type { TechnologyDefinition } from '../../types';

export const overloopTechnologyDefinition = {
	id: "overloop",
	name: "Overloop",
	website: "https://overloop.com",
	description: "Overloop is an AI-powered sales prospecting platform that automates lead generation, outreach, and engagement to optimize customer acquisition and conversion.",
	icon: "Overloop.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "overloop:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.overloop\\.com"),
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
