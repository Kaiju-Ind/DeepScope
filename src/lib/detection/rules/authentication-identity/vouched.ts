import type { TechnologyDefinition } from '../../types';

export const vouchedTechnologyDefinition = {
	id: "vouched",
	name: "Vouched",
	website: "https://www.vouched.id",
	description: "Vouched is a platform designed to support identity verification across various industries.",
	icon: "Vouched.svg",
	categories: [
		"authentication-identity",
	],
	rules: [
		{
			id: "vouched:jsGlobal:0",
			kind: "jsGlobal",
			property: "Vouched",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
