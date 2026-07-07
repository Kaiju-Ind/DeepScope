import type { TechnologyDefinition } from '../../types';

export const dittoTechnologyDefinition = {
	id: "ditto",
	name: "Ditto",
	website: "https://www.ditto.com",
	description: "Ditto is a system that enables personalized selection and fitting of eyewear based on individual preferences and measurements.",
	icon: "Ditto.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ditto:dom:0",
			kind: "dom",
			selector: "link[href*='.api.ditto.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
