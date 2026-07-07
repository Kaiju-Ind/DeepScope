import type { TechnologyDefinition } from '../../types';

export const celumTechnologyDefinition = {
	id: "celum",
	name: "Celum",
	website: "https://www.celum.com",
	description: "Celum is a software developer that specialises in enterprise digital asset management and marketing content management systems.",
	icon: "Celum.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "celum:dom:0",
			kind: "dom",
			selector: "img[src*='/celum/'], img[src*='/celum_assets/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
