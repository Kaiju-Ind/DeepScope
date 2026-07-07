import type { TechnologyDefinition } from '../../types';

export const optimyTechnologyDefinition = {
	id: "optimy",
	name: "Optimy",
	website: "https://www.optimy.com",
	description: "Optimy is an all-in-one CSR platform that enhances social and business impact by streamlining social programs.",
	icon: "Optimy.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "optimy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/optimy\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimy:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("optimyapp-css\\.s3", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "optimy:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("optimyapp-css\\.s3", "i"),
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
