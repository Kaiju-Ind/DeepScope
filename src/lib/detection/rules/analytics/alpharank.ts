import type { TechnologyDefinition } from '../../types';

export const alpharankTechnologyDefinition = {
	id: "alpharank",
	name: "Alpharank",
	website: "https://www.alpharank.ai",
	description: "Alpharank is a tool focused on customer journey mapping to enhance conversion optimization specifically for banks.",
	icon: "Alpharank.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "alpharank:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.alpharank\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
