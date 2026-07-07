import type { TechnologyDefinition } from '../../types';

export const pixcTechnologyDefinition = {
	id: "pixc",
	name: "Pixc",
	website: "https://pixc.com",
	description: "Pixc is human powered image editing platform.",
	icon: "Pixc.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pixc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/pixc\\.com\\/"),
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
