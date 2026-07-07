import type { TechnologyDefinition } from '../../types';

export const kribleTechnologyDefinition = {
	id: "krible",
	name: "Krible",
	website: "https://krible.ru",
	description: "Krible is a live chat management platform designed to facilitate real-time customer interactions and support.",
	icon: "Krible.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "krible:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.krible\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "krible:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.krible\\.ru"),
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
