import type { TechnologyDefinition } from '../../types';

export const formcanTechnologyDefinition = {
	id: "formcan",
	name: "Formcan",
	website: "https://www.formcan.com",
	description: "Formcan is a form builder that enables creation, customization, and deployment of online forms for data collection and management.",
	icon: "Formcan.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "formcan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.formcan\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "formcan:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^formcan\\-color\\-mode$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
