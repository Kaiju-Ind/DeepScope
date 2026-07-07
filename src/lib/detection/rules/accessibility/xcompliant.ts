import type { TechnologyDefinition } from '../../types';

export const xcompliantTechnologyDefinition = {
	id: "xcompliant",
	name: "XCompliant",
	website: "https://xcompliant.com",
	description: "XCompliant is an automated accessibility solution designed to support ADA and WCAG compliance by identifying and addressing accessibility issues across digital platforms.",
	icon: "XCompliant.svg",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "xcompliant:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.xcompliant\\.com"),
			description: "Script source URL matches a known technology marker.",
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
