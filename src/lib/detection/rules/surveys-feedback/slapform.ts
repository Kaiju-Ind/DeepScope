import type { TechnologyDefinition } from '../../types';

export const slapformTechnologyDefinition = {
	id: "slapform",
	name: "Slapform",
	website: "https://slapform.com",
	description: "Slapform is a backend service for forms that securely stores submissions in the cloud and sends them via email.",
	icon: "Slapform.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "slapform:dom:0",
			kind: "dom",
			selector: "form[action*='api.slapform.com/']",
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
