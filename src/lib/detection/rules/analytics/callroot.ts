import type { TechnologyDefinition } from '../../types';

export const callrootTechnologyDefinition = {
	id: "callroot",
	name: "CallRoot",
	website: "https://callroot.com",
	description: "CallRoot is a phone call tracking system designed for marketers to monitor, analyze, and optimize inbound calls.",
	icon: "CallRoot.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "callroot:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.callroot\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
