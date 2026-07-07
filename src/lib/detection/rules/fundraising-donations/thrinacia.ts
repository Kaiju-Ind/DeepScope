import type { TechnologyDefinition } from '../../types';

export const thrinaciaTechnologyDefinition = {
	id: "thrinacia",
	name: "Thrinacia",
	website: "https://www.thrinacia.com",
	description: "Thrinacia is a scalable Enterprise SaaS crowdfunding engine that enables the operation of custom white-labeled crowdfunding websites.",
	icon: "Thrinacia.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "thrinacia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.thrinacia\\.com\\/"),
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
