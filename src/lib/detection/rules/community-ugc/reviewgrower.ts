import type { TechnologyDefinition } from '../../types';

export const reviewgrowerTechnologyDefinition = {
	id: "reviewgrower",
	name: "Reviewgrower",
	website: "https://reviewgrower.com",
	description: "Reviewgrower is a white-label reputation management platform that provides tools and services to improve online presence, increase reviews, convert prospects, and boost Google rankings.",
	icon: "ReviewGrower.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reviewgrower:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.reviewgrower\\.com"),
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
