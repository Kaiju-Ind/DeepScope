import type { TechnologyDefinition } from '../../types';

export const q1mediaTechnologyDefinition = {
	id: "q1media",
	name: "Q1Media",
	website: "https://www.q1media.com",
	description: "Q1Media is a platform that facilitates the creation, demand, and supply of digital advertising.",
	icon: "Q1Media.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "q1media:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/q1mediahydraplatform\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
