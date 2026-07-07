import type { TechnologyDefinition } from '../../types';

export const sketchanetTechnologyDefinition = {
	id: "sketchanet",
	name: "Sketchanet",
	website: "https://www.sketchanet.com/",
	description: "Sketchanet is a code-free website creation system that enables users to design and publish websites without writing or managing source code.",
	icon: "Sketchanet.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sketchanet:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sketchanet\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
