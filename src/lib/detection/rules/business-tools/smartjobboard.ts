import type { TechnologyDefinition } from '../../types';

export const smartjobboardTechnologyDefinition = {
	id: "smartjobboard",
	name: "Smartjobboard",
	website: "https://www.smartjobboard.com",
	description: "Smartjobboard is a job board platform that uses AI-driven matching to connect employers and candidates, supporting job posting, search, and automated recommendations.",
	icon: "Smartjobboard.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "smartjobboard:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.smartjobboard\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
