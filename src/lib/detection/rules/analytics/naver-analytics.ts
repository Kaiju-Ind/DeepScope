import type { TechnologyDefinition } from '../../types';

export const naverAnalyticsTechnologyDefinition = {
	id: "naver-analytics",
	name: "Naver Analytics",
	website: "https://analytics.naver.com",
	description: "Naver Analytics is a Korean based analytics service.",
	icon: "Naver Analytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "naver-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wcs\\.naver\\.net\\/wcslog\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
