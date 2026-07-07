import type { TechnologyDefinition } from '../../types';

export const trustmaryTechnologyDefinition = {
	id: "trustmary",
	name: "Trustmary",
	website: "https://trustmary.com",
	description: "Trustmary is a customer experience platform that structures and presents feedback data in a way that is accessible to both artificial intelligence systems and human audiences.",
	icon: "Trustmary.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustmary:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.trustmary\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
