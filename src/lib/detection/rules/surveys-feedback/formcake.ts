import type { TechnologyDefinition } from '../../types';

export const formcakeTechnologyDefinition = {
	id: "formcake",
	name: "Formcake",
	website: "https://formcake.com",
	description: "Formcake is a backend service that enables developers to integrate forms and manage form data within their applications.",
	icon: "Formcake.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formcake:dom:0",
			kind: "dom",
			selector: "form[action*='api.formcake.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
