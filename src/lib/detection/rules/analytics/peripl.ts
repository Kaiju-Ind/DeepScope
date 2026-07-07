import type { TechnologyDefinition } from '../../types';

export const periplTechnologyDefinition = {
	id: "peripl",
	name: "Peripl",
	website: "https://www.peripl.fr",
	description: "Peripl is a French software company that provides cloud-based software solutions for business management, including accounting, invoicing, payroll, and project management.",
	icon: "Peripl.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "peripl:dom:0",
			kind: "dom",
			selector: "script#peripl-script",
			description: "DOM selector matches a known technology marker.",
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
