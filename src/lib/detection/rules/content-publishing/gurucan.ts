import type { TechnologyDefinition } from '../../types';

export const gurucanTechnologyDefinition = {
	id: "gurucan",
	name: "Gurucan",
	website: "https://www.gurucan.com",
	description: "Gurucan is a platform that enables users to create and sell online courses through a single interface.",
	icon: "Gurucan.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "gurucan:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.gurucan\\.com"),
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
