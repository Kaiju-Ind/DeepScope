import type { TechnologyDefinition } from '../../types';

export const lookerTechnologyDefinition = {
	id: "looker",
	name: "Looker",
	website: "https://cloud.google.com/looker",
	description: "Looker is a data platform used to analyze governed data, generate business insights, and develop AI-powered applications.",
	icon: "Google Cloud.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "looker:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.cloud\\.looker\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "looker:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.cloud\\.looker\\.com", "i"),
			description: "Response header matches a known technology marker.",
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
