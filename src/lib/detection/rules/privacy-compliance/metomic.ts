import type { TechnologyDefinition } from '../../types';

export const metomicTechnologyDefinition = {
	id: "metomic",
	name: "Metomic",
	website: "https://metomic.io",
	description: "Metomic is a platform that helps businesses manage and comply with data privacy regulations, offering tools for consent management, data governance, and compliance with data privacy laws such as GDPR and CCPA.",
	icon: "metomic.png",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "metomic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("metomic\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metomic:dom:1",
			kind: "dom",
			selector: "link[href*='.metomic.io']",
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
