import type { TechnologyDefinition } from '../../types';

export const postanoTechnologyDefinition = {
	id: "postano",
	name: "Postano",
	website: "https://www.postano.com",
	description: "Postano is a social content management platform that aggregates, curates, and displays user-generated content across digital channels.",
	icon: "Postano.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "postano:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.postano\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
