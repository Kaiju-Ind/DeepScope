import type { TechnologyDefinition } from '../../types';

export const tintWizTechnologyDefinition = {
	id: "tint-wiz",
	name: "Tint Wiz",
	website: "https://tintwiz.com",
	description: "Tint Wiz is a customer management platform designed to streamline operations, increase sales and provide exceptional service to customers.",
	icon: "TintWiz.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tint-wiz:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.tintwiz.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
