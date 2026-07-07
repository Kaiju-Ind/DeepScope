import type { TechnologyDefinition } from '../../types';

export const huberwayAnalyticsTechnologyDefinition = {
	id: "huberway-analytics",
	name: "Huberway Analytics",
	website: "https://www.huberway.com/analytics-software",
	description: "Huberway Analytics is a free web analytics service that tracks and reports website traffic.",
	icon: "Huberway.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "huberway-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.huberway\\.com\\/pixel\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
