import type { TechnologyDefinition } from '../../types';

export const resultifyTechnologyDefinition = {
	id: "resultify",
	name: "Resultify",
	website: "https://www.resultify.com",
	description: "Resultify is a platform focused on online marketing management.",
	icon: "Resultify.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "resultify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.resultify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
