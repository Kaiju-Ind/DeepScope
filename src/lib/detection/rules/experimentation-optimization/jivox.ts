import type { TechnologyDefinition } from '../../types';

export const jivoxTechnologyDefinition = {
	id: "jivox",
	name: "Jivox",
	website: "https://jivox.com",
	description: "Jivox is a cloud-based, data-driven platform for delivering personalised digital advertising and marketing experiences at scale.",
	icon: "Jivox.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "jivox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jivox\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jivox:dom:1",
			kind: "dom",
			selector: "link[href*='.jivox.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
