import type { TechnologyDefinition } from '../../types';

export const technology2peopleTechnologyDefinition = {
	id: "2people",
	name: "2people",
	website: "https://2people.com",
	description: "2people is a human resources and job board system that supports job postings, applicant tracking, and basic HR management functions for organizations.",
	icon: "2people.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "2people:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.2people\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
