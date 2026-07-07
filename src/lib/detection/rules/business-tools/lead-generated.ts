import type { TechnologyDefinition } from '../../types';

export const leadGeneratedTechnologyDefinition = {
	id: "lead-generated",
	name: "Lead Generated",
	website: "https://leadgenerated.com",
	description: "Lead Generated is a marketing CRM tool that centralizes customer data, tracks engagement, and automates marketing campaigns.",
	icon: "LeadGenerated.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "lead-generated:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.leadgenerated\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
