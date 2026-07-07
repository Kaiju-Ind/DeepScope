import type { TechnologyDefinition } from '../../types';

export const sotaCrmTechnologyDefinition = {
	id: "sota-crm",
	name: "SOTA CRM",
	website: "https://sotacrm.com",
	description: "SOTA CRM is a software solution designed to help businesses manage customer relationships and related data.",
	icon: "SOTACRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sota-crm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.sotacrm\\.com"),
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
