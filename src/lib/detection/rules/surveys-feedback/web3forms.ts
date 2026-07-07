import type { TechnologyDefinition } from '../../types';

export const web3formsTechnologyDefinition = {
	id: "web3forms",
	name: "Web3Forms",
	website: "https://web3forms.com",
	description: "Web3Forms is a contact form to email service utilising the Web3 API.",
	icon: "Web3Forms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "web3forms:dom:0",
			kind: "dom",
			selector: "form[action*='api.web3forms.com/']",
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
