import type { TechnologyDefinition } from '../../types';

export const patreonTechnologyDefinition = {
	id: "patreon",
	name: "Patreon",
	website: "https://www.patreon.com",
	description: "Patreon is an American membership platform that provides business tools for content creators to run a subscription service.",
	icon: "Patreon.svg",
	categories: [
		"widgets-misc",
		"commerce-operations",
	],
	rules: [
		{
			id: "patreon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("patreon-connect\\/assets\\/.+ver=([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "patreon:dom:1",
			kind: "dom",
			selector: "a[href*='www.patreon.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
