import type { TechnologyDefinition } from '../../types';

export const appcastTechnologyDefinition = {
	id: "appcast",
	name: "Appcast",
	website: "https://www.appcast.io",
	description: "Appcast is a service that allows job advertisements on a 'pay-per-applicant' basis across a network of career and consumer sites, instead of the traditional per-click or per-post charges.",
	icon: "Appcast.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "appcast:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("click\\.appcast\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
