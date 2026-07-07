import type { TechnologyDefinition } from '../../types';

export const sbercrmTechnologyDefinition = {
	id: "sbercrm",
	name: "SberCRM",
	website: "https://sbercrm.com",
	description: "SberCRM is a customer relationship management system designed to help businesses manage leads, track customer interactions, and convert prospects into sales.",
	icon: "SberCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sbercrm:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.macro\\.sbercrm\\.com"),
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
