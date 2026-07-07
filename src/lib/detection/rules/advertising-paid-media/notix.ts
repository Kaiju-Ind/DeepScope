import type { TechnologyDefinition } from '../../types';

export const notixTechnologyDefinition = {
	id: "notix",
	name: "Notix",
	website: "https://notix.co",
	description: "Notix is a web push notifications service for audience re-engagement.",
	icon: "Notix.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "notix:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("notix\\.io\\/ent"),
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
