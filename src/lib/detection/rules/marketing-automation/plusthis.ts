import type { TechnologyDefinition } from '../../types';

export const plusthisTechnologyDefinition = {
	id: "plusthis",
	name: "PlusThis",
	website: "https://www.plusthis.com",
	description: "PlusThis is a campaign toolkit for marketing automation that offers tools to streamline, integrate, and enhance marketing workflows.",
	icon: "PlusThis.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "plusthis:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.plusthis\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plusthis:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.plusthis\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
