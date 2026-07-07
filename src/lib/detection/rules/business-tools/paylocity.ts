import type { TechnologyDefinition } from '../../types';

export const paylocityTechnologyDefinition = {
	id: "paylocity",
	name: "Paylocity",
	website: "https://www.paylocity.com",
	description: "Paylocity is an American company which provides cloud-based payroll and human capital management software.",
	icon: "Paylocity.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "paylocity:dom:0",
			kind: "dom",
			selector: "a[href*='recruiting\\.paylocity\\.com/recruiting/jobs/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
