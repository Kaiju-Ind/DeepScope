import type { TechnologyDefinition } from '../../types';

export const gumgumTechnologyDefinition = {
	id: "gumgum",
	name: "GumGum",
	website: "https://gumgum.com",
	description: "GumGum is a technology and media company specializing in contextual intelligence.",
	icon: "GumGum.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "gumgum:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.gumgum\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "gumgum:dom:1",
			kind: "dom",
			selector: "iframe[src*='gumgum.com'], img[src*='gumgum.com']",
			description: "DOM selector matches a known technology marker.",
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
