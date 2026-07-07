import type { TechnologyDefinition } from '../../types';

export const sendpadTechnologyDefinition = {
	id: "sendpad",
	name: "Sendpad",
	website: "https://www.sendtex.com",
	description: "Sendpad is a platform that enables automated audience engagement through personalization to support loyalty growth.",
	icon: "Sendtex.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "sendpad:dom:0",
			kind: "dom",
			selector: "form[action*='forms.sendtex.com/']",
			description: "DOM selector matches a known technology marker.",
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
