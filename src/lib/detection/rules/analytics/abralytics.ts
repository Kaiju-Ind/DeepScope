import type { TechnologyDefinition } from '../../types';

export const abralyticsTechnologyDefinition = {
	id: "abralytics",
	name: "Abralytics",
	website: "https://www.abralytics.com",
	description: "Abralytics is a privacy-focused alternative to Google Analytics that provides email reports.",
	icon: "Abralytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "abralytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.abralytics\\.com\\/"),
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
