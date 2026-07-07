import type { TechnologyDefinition } from '../../types';

export const uzerlyTechnologyDefinition = {
	id: "uzerly",
	name: "Uzerly",
	website: "https://uzerly.fr",
	description: "Uzerly is a technology-focused company specializing in retargeting.",
	icon: "Uzerly.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "uzerly:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.userly\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uzerly:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.u(?:s|z)erly\\.net", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
