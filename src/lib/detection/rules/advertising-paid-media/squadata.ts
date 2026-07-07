import type { TechnologyDefinition } from '../../types';

export const squadataTechnologyDefinition = {
	id: "squadata",
	name: "Squadata",
	website: "https://www.squadata.net",
	description: "Squadata provides data based marketing and advertising solutions including email retargeting, CRM onboarding, data monetisation, data management platform.",
	icon: "Squadata.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "squadata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/asset\\.easydmp\\.net\\/"),
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
