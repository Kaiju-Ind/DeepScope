import type { TechnologyDefinition } from '../../types';

export const yayFormsTechnologyDefinition = {
	id: "yay-forms",
	name: "Yay! Forms",
	website: "https://yayforms.com",
	description: "Yay! Forms is an AI-powered tool for creating forms and surveys designed to capture audience sentiments.",
	icon: "YayForms.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "yay-forms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.yayforms\\.link"),
			description: "Script source URL matches a known technology marker.",
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
