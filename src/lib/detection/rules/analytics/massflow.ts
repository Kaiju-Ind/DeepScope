import type { TechnologyDefinition } from '../../types';

export const massflowTechnologyDefinition = {
	id: "massflow",
	name: "Massflow",
	website: "https://massflow.io",
	description: "Massflow is a platform offering analytics for businesses, providing tools to evaluate performance, identify trends, and make data-driven decisions.",
	icon: "Massflow.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "massflow:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.massflow\\.io\\/"),
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
