import type { TechnologyDefinition } from '../../types';

export const affilaeTechnologyDefinition = {
	id: "affilae",
	name: "Affilae",
	website: "https://affilae.com",
	description: "Affilae is an affiliate marketing platform that enables brands to connect, collaborate with influencers and affiliates.",
	icon: "Affilae.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "affilae:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.affilae\\.com\\/(?:.+v([\\d\\.]+)|.+)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
