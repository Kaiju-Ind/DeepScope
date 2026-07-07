import type { TechnologyDefinition } from '../../types';

export const nepchaAnalyticsTechnologyDefinition = {
	id: "nepcha-analytics",
	name: "Nepcha Analytics",
	website: "https://nepcha.com",
	description: "Nepcha Analytics is a privacy-focused analytics platform that collects and processes website usage data without relying on cookies or personal tracking, ensuring compliance with modern data protection standards.",
	icon: "NepchaAnalytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "nepcha-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.nepcha\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
