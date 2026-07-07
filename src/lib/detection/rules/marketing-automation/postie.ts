import type { TechnologyDefinition } from '../../types';

export const postieTechnologyDefinition = {
	id: "postie",
	name: "Postie",
	website: "https://postie.com",
	description: "Postie is an all-in-one platform facilitating audience building, A/B testing, and campaign deployment.",
	icon: "Postie.svg",
	categories: [
		"marketing-automation",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "postie:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("scripts\\.postie\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
