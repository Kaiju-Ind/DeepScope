import type { TechnologyDefinition } from '../../types';

export const voogTechnologyDefinition = {
	id: "voog",
	name: "Voog",
	website: "https://www.voog.com",
	description: "Voog is a user-friendly website building platform.",
	icon: "Voog.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "voog:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.voog\\.com\\/"),
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
