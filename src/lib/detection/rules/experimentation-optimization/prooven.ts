import type { TechnologyDefinition } from '../../types';

export const proovenTechnologyDefinition = {
	id: "prooven",
	name: "Prooven",
	website: "https://prooven.io",
	description: "Prooven is a platform designed to build credibility and increase conversion through trust-driven solutions.",
	icon: "Prooven.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "prooven:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.prooven\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
