import type { TechnologyDefinition } from '../../types';

export const smartAnalyticsTechnologyDefinition = {
	id: "smart-analytics",
	name: "Smart Analytics",
	website: "https://smartanalytics.io",
	description: "Smart Analytics is an AI-powered platform that helps increase sales and reduce advertising costs through automated data analysis.",
	icon: "SmartAnalytics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "smart-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartanalytics\\.io"),
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
