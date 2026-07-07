import type { TechnologyDefinition } from '../../types';

export const makairaTechnologyDefinition = {
	id: "makaira",
	name: "Makaira",
	website: "https://www.makaira.io",
	description: "Makaira is a commerce frontend designed for headless shop systems.",
	icon: "Makaira.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "makaira:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.makaira\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "makaira:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.makaira\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "makaira:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.makaira\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
