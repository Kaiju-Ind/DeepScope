import type { TechnologyDefinition } from '../../types';

export const duopanaTechnologyDefinition = {
	id: "duopana",
	name: "Duopana",
	website: "https://duopana.com",
	description: "Duopana is a platform for creating online communities, blogs and managing collaborative content.",
	icon: "Duopana.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "duopana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.beracode\\.com\\/"),
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
