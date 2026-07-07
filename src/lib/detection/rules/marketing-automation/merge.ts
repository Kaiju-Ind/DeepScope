import type { TechnologyDefinition } from '../../types';

export const mergeTechnologyDefinition = {
	id: "merge",
	name: "Merge",
	website: "https://www.merge.dev",
	description: "Merge is a data infrastructure platform for AI products that enables connection to multiple customer data sources through a single API.",
	icon: "Merge.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "merge:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.merge\\.dev", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "merge:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.merge\\.dev", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
