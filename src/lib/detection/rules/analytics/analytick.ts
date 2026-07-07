import type { TechnologyDefinition } from '../../types';

export const analytickTechnologyDefinition = {
	id: "analytick",
	name: "Analytick",
	website: "http://analytick.ir",
	description: "Analytick is an advanced analytics platform that collects and analyzes data on website performance and user behavior.",
	icon: "Analytick.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "analytick:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("platform\\.analytick\\.ir\\/"),
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
