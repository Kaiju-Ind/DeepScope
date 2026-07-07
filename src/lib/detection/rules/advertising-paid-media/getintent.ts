import type { TechnologyDefinition } from '../../types';

export const getintentTechnologyDefinition = {
	id: "getintent",
	name: "Getintent",
	website: "https://getintent.com",
	description: "Getintent is an adtech company that offers AI-powered programmatic suite for agencies, publishers, broadcasters and content owners.",
	icon: "Getintent.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "getintent:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.adhigh\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
