import type { TechnologyDefinition } from '../../types';

export const rapidActiveCrmTechnologyDefinition = {
	id: "rapid-active-crm",
	name: "Rapid Active CRM",
	website: "https://rapidactivecrm.com",
	description: "Rapid Active CRM is an all-in-one sales and marketing automation platform designed to drive business growth.",
	icon: "RapidActiveCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "rapid-active-crm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.rapidactivecrm\\.com"),
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
