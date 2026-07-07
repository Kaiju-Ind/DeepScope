import type { TechnologyDefinition } from '../../types';

export const perzonalizationTechnologyDefinition = {
	id: "perzonalization",
	name: "Perzonalization",
	website: "https://www.perzonalization.com/",
	description: "Perzonalization is an AI powered personalization engine for eCommerce.",
	icon: "Perzonalization.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "perzonalization:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.perzonalization\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
