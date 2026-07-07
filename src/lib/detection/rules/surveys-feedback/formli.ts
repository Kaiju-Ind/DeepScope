import type { TechnologyDefinition } from '../../types';

export const formliTechnologyDefinition = {
	id: "formli",
	name: "Formli",
	website: "https://formli.com",
	description: "Formli is a web-based form builder service that permits users to produce and personalise online forms for different purposes, including surveys, feedback forms, event registrations, and others.",
	icon: "Formli.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formli:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:app|cdn)\\.(?:formli|humanagency)\\.(?:com|org)\\/"),
			description: "Script source URL matches a known technology marker.",
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
