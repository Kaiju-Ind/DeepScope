import type { TechnologyDefinition } from '../../types';

export const akavitaTechnologyDefinition = {
	id: "akavita",
	name: "Akavita",
	website: "https://akavita.com",
	description: "Akavita is a Russian-based service offering analytics and advertising solutions.",
	icon: "Akavita.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "akavita:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adlik\\.akavita\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
