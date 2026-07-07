import type { TechnologyDefinition } from '../../types';

export const jigluTechnologyDefinition = {
	id: "jiglu",
	name: "Jiglu",
	website: "https://www.jiglu.com",
	description: "Jiglu is a collaboration and communities suite that connects enterprise content with conversations to support improved communication.",
	icon: "Jiglu.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "jiglu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jiglu\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
