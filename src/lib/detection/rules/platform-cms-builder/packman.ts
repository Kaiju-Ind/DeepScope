import type { TechnologyDefinition } from '../../types';

export const packmanTechnologyDefinition = {
	id: "packman",
	name: "Packman",
	website: "https://packman.ai",
	description: "Packman is a platform for enabling AI-powered ecommerce businesses.",
	icon: "Packman.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "packman:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.packman\\.app"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "packman:meta:1",
			kind: "meta",
			key: "powered-by",
			valuePattern: new RegExp("packman", "i"),
			description: "Meta tag matches a known technology marker.",
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
