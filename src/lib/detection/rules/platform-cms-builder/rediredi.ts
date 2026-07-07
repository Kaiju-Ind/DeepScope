import type { TechnologyDefinition } from '../../types';

export const redirediTechnologyDefinition = {
	id: "rediredi",
	name: "RediRedi",
	website: "https://rediredi.com",
	description: "RediRedi is a platform that combines product catalog, customer management, and AI-powered sales intelligence to help businesses increase sales from existing customers.",
	icon: "RediRedi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rediredi:url:0",
			kind: "url",
			pattern: new RegExp("\\.rdi\\.store"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
