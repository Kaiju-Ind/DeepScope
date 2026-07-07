import type { TechnologyDefinition } from '../../types';

export const datagrailTechnologyDefinition = {
	id: "datagrail",
	name: "DataGrail",
	website: "https://www.datagrail.io",
	description: "DataGrail is an AI-powered privacy automation platform designed to help organizations manage data privacy compliance, automate risk assessments, and maintain regulatory alignment across data processing activities.",
	icon: "DataGrail.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "datagrail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.datagrail\\.io\\/"),
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
