import type { TechnologyDefinition } from '../../types';

export const naverRuaTechnologyDefinition = {
	id: "naver-rua",
	name: "Naver RUA",
	website: "https://analytics.naver.com",
	description: "Naver RUA (Real User Analytics) collects performance data from real users to analyze the speed of your website by country, operating system, and browser.",
	icon: "Naver.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "naver-rua:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rua-api\\.ncloud\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
