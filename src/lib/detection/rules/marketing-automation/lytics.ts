import type { TechnologyDefinition } from '../../types';

export const lyticsTechnologyDefinition = {
	id: "lytics",
	name: "Lytics",
	website: "https://www.lytics.com",
	description: "Lytics is a customer data platform built for marketing teams.",
	icon: "Lytics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lytics\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "__lytics__jstag__.version",
			valuePattern: new RegExp("(.+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
