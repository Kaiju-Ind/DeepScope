import type { TechnologyDefinition } from '../../types';

export const shoutoutTechnologyDefinition = {
	id: "shoutout",
	name: "ShoutOut",
	website: "https://www.shoutout.global",
	description: "ShoutOut is a multi-level marketing SaaS solution that allows tracking of affiliates.",
	icon: "ShoutOut.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "shoutout:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.shoutout\\.global\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
