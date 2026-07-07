import type { TechnologyDefinition } from '../../types';

export const checkfrontTechnologyDefinition = {
	id: "checkfront",
	name: "Checkfront",
	website: "https://www.checkfront.com",
	description: "Checkfront is a cloud-based booking management application and ecommerce platform.",
	icon: "Checkfront.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "checkfront:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.checkfront\\.com\\/"),
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
