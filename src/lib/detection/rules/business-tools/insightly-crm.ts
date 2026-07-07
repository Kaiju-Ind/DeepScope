import type { TechnologyDefinition } from '../../types';

export const insightlyCrmTechnologyDefinition = {
	id: "insightly-crm",
	name: "Insightly CRM",
	website: "https://www.insightly.com/crm/",
	description: "Insightly CRM is a cloud-based customer relationship management software, helps businesses manage leads, contacts, and opportunities, track customer interactions, create custom reports, automate workflows, and integrate with third-party applications, improving customer engagement and streamlining business processes.",
	icon: "Insightly.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "insightly-crm:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.insightly\\.services\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "insightly-crm:dom:1",
			kind: "dom",
			selector: "form[action*='.insightly.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
