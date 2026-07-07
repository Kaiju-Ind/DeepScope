import type { TechnologyDefinition } from '../../types';

export const saabuTechnologyDefinition = {
	id: "saabu",
	name: "Saabu",
	website: "https://saabu.io",
	description: "Saabu is a CRM automation platform designed to streamline sales processes and support the growth of sales teams.",
	icon: "Saabu.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "saabu:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.saabu\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
