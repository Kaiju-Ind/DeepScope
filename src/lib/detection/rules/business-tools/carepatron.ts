import type { TechnologyDefinition } from '../../types';

export const carepatronTechnologyDefinition = {
	id: "carepatron",
	name: "Carepatron",
	website: "https://www.carepatron.com",
	description: "Carepatron is a cloud-based practice management platform for healthcare providers that supports scheduling, documentation, billing, and client management.",
	icon: "Carepatron.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "carepatron:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.carepatron\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
