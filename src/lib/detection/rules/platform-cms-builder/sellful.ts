import type { TechnologyDefinition } from '../../types';

export const sellfulTechnologyDefinition = {
	id: "sellful",
	name: "Sellful",
	website: "https://sellful.com",
	description: "Sellful is an AI-powered, all-in-one software for entrepreneurs and agencies, enabling the creation of web and mobile applications without coding through a white-label website builder.",
	icon: "Sellful.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sellful\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
