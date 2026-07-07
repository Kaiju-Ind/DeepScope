import type { TechnologyDefinition } from '../../types';

export const catsTechnologyDefinition = {
	id: "cats",
	name: "CATS",
	website: "https://catsone.com",
	description: "CATS is an applicant tracking system designed to help professional recruiters manage job postings, candidate applications, and hiring workflows.",
	icon: "CATS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "cats:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cp\\.static\\.catsone\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
