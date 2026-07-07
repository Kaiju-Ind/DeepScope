import type { TechnologyDefinition } from '../../types';

export const entresoftTechnologyDefinition = {
	id: "entresoft",
	name: "Entresoft",
	website: "https://entresoft.com",
	description: "Entresoft is a platform that offers CRM and pipeline management tools for business operations.",
	icon: "Entresoft.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "entresoft:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.entresoft\\.com"),
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
