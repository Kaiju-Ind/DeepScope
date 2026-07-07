import type { TechnologyDefinition } from '../../types';

export const spotonTechnologyDefinition = {
	id: "spoton",
	name: "SpotOn",
	website: "https://www.spoton.com",
	description: "SpotOn is a provider of point-of-sale systems and payment processing software tailored to fit your workflow.",
	icon: "SpotOn.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "spoton:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cdn\\.spoton\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
