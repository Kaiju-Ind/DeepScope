import type { TechnologyDefinition } from '../../types';

export const salespypeTechnologyDefinition = {
	id: "salespype",
	name: "Salespype",
	website: "https://salespype.com",
	description: "Salespype is a CRM platform with integrated marketing automation tools to streamline customer relationship management and marketing processes.",
	icon: "Salespype.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salespype:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.salespype\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salespype:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("app\\.salespype\\.com"),
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
