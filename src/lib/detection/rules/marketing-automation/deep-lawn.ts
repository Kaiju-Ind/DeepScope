import type { TechnologyDefinition } from '../../types';

export const deepLawnTechnologyDefinition = {
	id: "deep-lawn",
	name: "Deep Lawn",
	website: "https://deeplawn.com",
	description: "Deep Lawn is a sales tool designed for lawn care and pest control companies.",
	icon: "DeepLawn.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "deep-lawn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.deeplawn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
