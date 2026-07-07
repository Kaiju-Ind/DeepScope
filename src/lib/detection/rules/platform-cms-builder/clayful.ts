import type { TechnologyDefinition } from '../../types';

export const clayfulTechnologyDefinition = {
	id: "clayful",
	name: "Clayful",
	website: "https://clayful.io",
	description: "Clayful is a Korean-based ecommerce platform focused on link functionality and commerce platform development.",
	icon: "Clayful.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "clayful:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clayful\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clayful:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.clayful\\.io"),
			description: "Script content contains a bounded technology signature.",
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
