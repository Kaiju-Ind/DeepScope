import type { TechnologyDefinition } from '../../types';

export const soffrontCrmTechnologyDefinition = {
	id: "soffront-crm",
	name: "Soffront CRM",
	website: "https://soffront.com/white-label-crm",
	description: "Soffront is a white-label CRM software platform for managing customer data, sales workflows, and marketing activities within a customizable interface.",
	icon: "Soffront.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "soffront-crm:dom:0",
			kind: "dom",
			selector: "form[action*='api.soffront.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
