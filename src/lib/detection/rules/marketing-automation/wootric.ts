import type { TechnologyDefinition } from '../../types';

export const wootricTechnologyDefinition = {
	id: "wootric",
	name: "Wootric",
	website: "https://www.wootric.com",
	description: "Wootric is a customer feedback platform designed to enhance customer experience management for digital applications and B2B SaaS.",
	icon: "Wootric.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wootric:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wootric\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wootric:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.wootric\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
