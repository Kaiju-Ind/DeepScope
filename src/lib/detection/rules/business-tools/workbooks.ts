import type { TechnologyDefinition } from '../../types';

export const workbooksTechnologyDefinition = {
	id: "workbooks",
	name: "Workbooks",
	website: "https://www.workbooks.com",
	description: "Workbooks is a platform that helps manage sales leads, automate tasks, and track marketing efforts from advertisements to invoices.",
	icon: "Workbooks.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "workbooks:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.workbooks\\.com"),
			description: "Script source URL matches a known technology marker.",
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
