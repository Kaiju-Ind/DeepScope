import type { TechnologyDefinition } from '../../types';

export const knorishTechnologyDefinition = {
	id: "knorish",
	name: "Knorish",
	website: "https://knorish.com",
	description: "Knorish is a platform that enables users to create and sell online courses directly from their own websites.",
	icon: "Knorish.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "knorish:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^kn\\-antiforgery\\-cookie$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
