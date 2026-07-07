import type { TechnologyDefinition } from '../../types';

export const friendlyAnalyticsTechnologyDefinition = {
	id: "friendly-analytics",
	name: "Friendly Analytics",
	website: "https://friendly.ch/en/analytics",
	description: "Friendly Analytics is the top Swiss alternative to Google Analytics, offering website analysis and optimization while prioritizing user privacy.",
	icon: "Friendly.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "friendly-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.friendlyanalytics\\.ch"),
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
