import type { TechnologyDefinition } from '../../types';

export const mashoreMethodTechnologyDefinition = {
	id: "mashore-method",
	name: "Mashore Method",
	website: "https://mashoremethod.com",
	description: "Mashore Method is a CRM software designed for real estate businesses to manage customer relationships in one centralized platform.",
	icon: "MashoreMethod.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "mashore-method:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.mashoremethod\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
