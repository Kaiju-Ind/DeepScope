import type { TechnologyDefinition } from '../../types';

export const technology6senseTechnologyDefinition = {
	id: "6sense",
	name: "6sense",
	website: "https://6sense.com",
	description: "6sense is a B2B predictive intelligence platform for marketing and sales.",
	icon: "6sense.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "6sense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.6sc\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "6sense:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.6sc\\.co\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "6sense:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.6sc\\.co\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
