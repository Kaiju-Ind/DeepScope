import type { TechnologyDefinition } from '../../types';

export const civicplusTechnologyDefinition = {
	id: "civicplus",
	name: "CivicPlus",
	website: "https://www.civicplus.com/municipal-websites",
	description: "CivicPlus is a government community engagement tool designed to facilitate communication, collaboration, and public participation.",
	icon: "CivicPlus.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "civicplus:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.civicplus\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "civicplus:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.civicplus\\.com", "i"),
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
