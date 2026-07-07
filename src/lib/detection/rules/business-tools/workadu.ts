import type { TechnologyDefinition } from '../../types';

export const workaduTechnologyDefinition = {
	id: "workadu",
	name: "Workadu",
	website: "https://www.workadu.com",
	description: "Workadu is a business management system designed to simplify operations and streamline processes for businesses.",
	icon: "Workadu.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "workadu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.workadu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
