import type { TechnologyDefinition } from '../../types';

export const nocnokTechnologyDefinition = {
	id: "nocnok",
	name: "NOCNOK",
	website: "https://www.nocnok.com",
	description: "NOCNOK is a CRM for real estate agencies that uses AI to automate lead responses, reduce response time, and support sales workflow management.",
	icon: "NOCNOK.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "nocnok:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("static\\.nocnok\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
