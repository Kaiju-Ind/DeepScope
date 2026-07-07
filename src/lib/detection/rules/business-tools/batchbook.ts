import type { TechnologyDefinition } from '../../types';

export const batchbookTechnologyDefinition = {
	id: "batchbook",
	name: "Batchbook",
	website: "https://batchbook.com",
	description: "Batchbook is a customer relationship management (CRM) tool designed for small businesses.",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "batchbook:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.batchbook\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "batchbook:dom:1",
			kind: "dom",
			selector: "iframe[src*='.batchbook.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
