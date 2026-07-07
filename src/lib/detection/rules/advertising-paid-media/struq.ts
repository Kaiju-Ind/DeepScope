import type { TechnologyDefinition } from '../../types';

export const struqTechnologyDefinition = {
	id: "struq",
	name: "Struq",
	website: "http://struq.com",
	description: "Struq is a personalized retargeting solution that serves as an alternative to standard display advertising.",
	icon: "Struq.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "struq:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.struq\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
