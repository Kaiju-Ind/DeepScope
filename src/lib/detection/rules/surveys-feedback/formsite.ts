import type { TechnologyDefinition } from '../../types';

export const formsiteTechnologyDefinition = {
	id: "formsite",
	name: "Formsite",
	website: "https://www.formsite.com",
	description: "Formsite is a platform for creating professional online forms, surveys, and workflows for data collection and process automation.",
	icon: "Formsite.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formsite:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.formsite\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formsite:dom:1",
			kind: "dom",
			selector: "form[action*='.formsite.com/']",
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
