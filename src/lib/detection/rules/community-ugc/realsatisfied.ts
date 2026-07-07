import type { TechnologyDefinition } from '../../types';

export const realsatisfiedTechnologyDefinition = {
	id: "realsatisfied",
	name: "RealSatisfied",
	website: "https://www.realsatisfied.com",
	description: "RealSatisfied is a platform that enables the collection of client feedback and facilitates its promotion across online channels to enhance credibility and visibility.",
	icon: "RealSatisfied.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "realsatisfied:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.realsatisfied\\.com"),
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
