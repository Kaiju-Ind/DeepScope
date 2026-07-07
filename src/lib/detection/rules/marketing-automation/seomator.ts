import type { TechnologyDefinition } from '../../types';

export const seomatorTechnologyDefinition = {
	id: "seomator",
	name: "SEOmator",
	website: "https://seomator.com",
	description: "SEOmator is an AI-powered SEO and SEM platform designed for website optimisation.",
	icon: "SEOmator.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seomator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/seomator\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
