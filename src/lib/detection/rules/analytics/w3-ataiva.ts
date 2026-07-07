import type { TechnologyDefinition } from '../../types';

export const w3AtaivaTechnologyDefinition = {
	id: "w3-ataiva",
	name: "W3 Ataiva",
	website: "https://w3.ataiva.com",
	description: "W3 Ataiva is a website valuation and analysis tool that estimates site value, traffic metrics, and technical indicators using publicly available web data.",
	icon: "W3Ataiva.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "w3-ataiva:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.statvoo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
