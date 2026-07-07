import type { TechnologyDefinition } from '../../types';

export const technology4partnersTechnologyDefinition = {
	id: "4partners",
	name: "4Partners",
	website: "https://4partners.io/en/",
	description: "4Partners is an international dropshipping service that allows you to launch a ready-made online store.",
	icon: "4Partners.svg",
	categories: [
		"commerce-operations",
	],
	rules: [],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
