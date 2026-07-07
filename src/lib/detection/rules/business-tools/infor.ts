import type { TechnologyDefinition } from '../../types';

export const inforTechnologyDefinition = {
	id: "infor",
	name: "Infor",
	website: "https://www.infor.com",
	description: "Infor is a resource planning solution designed to streamline operations, manage workflows, and support data-driven decision-making across various business functions.",
	icon: "Infor.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "infor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cloud\\.infor\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "infor:dom:1",
			kind: "dom",
			selector: "iframe[src*='.cloud.infor.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
